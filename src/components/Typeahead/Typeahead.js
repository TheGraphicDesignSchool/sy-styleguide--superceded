import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import enhanceWithClickOutside from 'react-click-outside'
import fuzzy from 'fuzzy'
import debounce from 'lodash/debounce'
import Loader from 'react-loader'
import Input from '../Input/index'
import Icon from '../Icon/index'
import style from './style.scss'

export class Typeahead extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = typeof this.props.searchCallback === 'function' && props.searchDebounceTime > 0 ? debounce(this.handleChange, props.searchDebounceTime) : this.handleChange
  }

  static defaultProps = {
    disabled: false,
    options: [],
    valueProp: '',
    displayProp: '',
    resetAfterSelection: false,
    searchDebounceTime: 0
  }

  static propTypes = {
    /**
     * Name of the typeahead.
     */
    name: PropTypes.string,
    /**
     * A string to display as the placeholder text.
     */
    placeholder: PropTypes.string,
    /**
     * An array of objects which will be used as the options for the select field.
     */
    options: PropTypes.array.isRequired,
    /**
     * Value of the typeahead.
     */
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    /**
     * Which field in the option object will be used as the value of the select field.
     */
    valueProp: PropTypes.string.isRequired,
    /**
     * Which field in the option object will be used as the display of the select field.
     */
    displayProp: PropTypes.string.isRequired,
    /**
     * Whether the select field is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Optional styles to add to the select field.
     */
    optClass: PropTypes.string,
    /**
     * A callback function to be called when an option is selected.
     */
    changeCallback: PropTypes.func,
    /**
     * A callback for updating options when typeahead search value is changed.
     */
    searchCallback: PropTypes.func,
    /**
     * A loading state to be set to true when asynchronous searching is in progress.
     */
    loading: PropTypes.bool,
    /**
     * A function to filter options.
     */
    optionsFilterPredicate: PropTypes.func,
    /**
     * Clear search string after selection.
     */
    resetAfterSelection: PropTypes.bool,
    /**
     * Search debounce time.
     */
    searchDebounceTime: PropTypes.number,
    /**
     * Text shown above the typeahead.
     */
    label: PropTypes.string,
    /**
     * When set to true, the component (input) will accept a custom value
     */
    allowCustomValue: PropTypes.bool
  }

  state = {
    isActive: false,
    value: this.props.value || '',
    results: [],
    selected: '',
    searchStr: this.props.value || ''
  }

  componentWillMount = () => {
    if (typeof this.state.value !== 'undefined' && this.state.value !== '' && this.getIndex(this.state.value, this.props.options) > -1) {
      this.selectItem(this.state.value, this.props.options)
    } else {
      this.setState({selected: ''})
    }
  }

  componentWillReceiveProps = nextProps => {
    const { allowCustomValue, changeCallback } = this.props
    const valueIsEmpty = nextProps.value === ''
    const valueChanged = nextProps.value !== this.state.value
    const searchStringIsEmpty = this.state.searchStr !== ''
    const optionExists = this.getIndex(nextProps.value, nextProps.options) > -1

    // If the option exists select it
    if (nextProps.value && valueChanged && optionExists) {
      this.setState({ value: nextProps.value }, () => {
        this.selectItem(nextProps.value, nextProps.options)
      })
    }
    // Else if allowCustomValue is true trigger the change callback
    else if (nextProps.value && valueChanged && allowCustomValue) {
      this.setState({ value: nextProps.value, searchStr: nextProps.value }, () => {
        changeCallback && changeCallback({ target: { name: nextProps.name, value: nextProps.value } })
      })
    }
    // When the value is an empty string and the current state value is not an empty string
    // Or when the value is an empty string and the search string exists
    // This ensures that 'custom' values are cleared
    else if ((valueIsEmpty && valueChanged) || (allowCustomValue && valueIsEmpty && searchStringIsEmpty)) {
      this.clearSearch()
    }
  }

  selectOption = option => {
    let normalizedOption = option.original ? option.original : option

    let newState = {
      selected: normalizedOption,
      searchStr: normalizedOption[this.props.displayProp],
      value: normalizedOption[this.props.valueProp],
      isActive: false
    }

    if (this.props.resetAfterSelection) {
      newState.searchStr = ''
      newState.value = ''

      // Focus the input field
      this._inputField.focus()
    }

    this.setState(newState, () => {
      if (typeof this.props.changeCallback === 'function') {
        this.props.changeCallback({
          target: {
            name: this.props.name,
            value: normalizedOption[this.props.valueProp],
            option: normalizedOption
          }
        })
      }
    })
  }

  selectItem = (value, options) => {
    let index = this.getIndex(value, options)

    if (index >= 0) {
      this.selectOption(options[index], false)
    }
  }

  getIndex = (value, options) => {
    let optionIndex = -1

    options.forEach((option, index) => {
      if (option[this.props.valueProp] === value) {
        optionIndex = index
      }
    })
    return optionIndex
  }

  handleChange = event => {
    if (!event.target.value.length) {
      this.clearSearch()
      return
    }

    this.setState({searchStr: event.target.value})

    if (this.props.allowCustomValue) {
      this.props.changeCallback({
        target: {
          name: this.props.name,
          value: event.target.value
        }
      })
    }

    if (typeof this.props.searchCallback === 'function') {
      this.props.searchCallback(event.target.value).then(options => {
        this.updateResults(event, options)
      })
    } else {
      this.updateResults(event, this.props.options)
    }
  }

  handleClickOutside = () => {
    this.setState({isActive: false})
  }

  updateResults = (event, options) => {
    let str = {
      pre: '<b>',
      post: '</b>',
      extract: el => {
        return el[this.props.displayProp]
      }
    }

    if (this.props.optionsFilterPredicate) {
      options = options.filter(this.props.optionsFilterPredicate)
    }

    let results = fuzzy.filter(event.target.value, options, str)

    this.setState({results: results, isActive: true})
  }

  getDynamicList = str => {
    return {
      __html: str
    }
  }

  clearSearch = () => {
    this.setState({isActive: false, searchStr: '', selected: '', value: ''}, () => {
      if (typeof this.props.changeCallback === 'function') {
        this.props.changeCallback({
          target: {
            name: this.props.name,
            value: '',
            option: ''
          }
        })
      }
    })
  }

  render() {
    const cx = classNames.bind(style)
    const loaderClass = this.props.loading ? 'loading' : null
    const typeaheadClass = cx(style['typeahead-component'], loaderClass, this.props.optClass)

    const spinnerOptions = {
      color: '#9198A0',
      length: 4,
      lines: 10,
      radius: 5,
      left: 'calc(100% - 21px)',
      width: 3
    }

    const { placeholder, disabled, loading, label } = this.props

    const options = this.state.results.map((option, index) =>
      <li
        key={index}
        onClick={this.selectOption.bind(null, option, true)}
        dangerouslySetInnerHTML={this.getDynamicList(option.string)} />
    )

    return (
      <div className={typeaheadClass}>
        { label && <label>{label}</label> }

        <div className={style['input-wrapper']}>
          <Input ref={c => this._inputField = c} changeCallback={this.onChange} value={this.state.searchStr} placeholder={placeholder} disabled={disabled} />

          { this.state.searchStr !== '' && !loading && !disabled
            ? <Icon name='md-close' onClick={this.clearSearch} className={style['reset-button']}>Reset</Icon>
            : null
          }
        </div>

        { loading ? <Loader loaded={false} options={spinnerOptions} /> : null }

        { this.state.isActive
          ? <ul className={style['typeahead-list']}>
            {options}
          </ul>
          : null
        }
      </div>
    )
  }
}

export default enhanceWithClickOutside(Typeahead)
