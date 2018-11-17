import React from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import classNames from 'classnames/bind'
import style from './style.scss'
import Icon from '../Icon/index'

export class SelectField extends React.Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    disabled: false,
    options: [],
    valueProp: '',
    displayProp: ''
  }

  static propTypes = {
    /**
     * A string to display as the placeholder text.
     */
    placeholder: PropTypes.string,
    /**
     * An array of objects which will be used as the options for the select field.
     */
    options: PropTypes.array.isRequired,
    /**
     * The value of the option to be selected.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Which field in the option object will be used as the value of the select field.
     */
    valueProp: PropTypes.string.isRequired,
    /**
     * Which field in the option object will be used as the display of the select field.
     */
    displayProp: PropTypes.string.isRequired,
    /**
     * Which field in the option object will be used to determine whether the option should be hidden.
     */
    hideProp: PropTypes.string,
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
     * Icon to be displayed on the left
     */
    icon: PropTypes.string,
    /**
     * Text shown above the select field.
     */
    label: PropTypes.string,
    /**
     * An optional style object to render inline CSS.
     */
    style: PropTypes.object
  }

  state = {
    isOpen: false,
    value: this.props.value
  }

  componentWillMount = () => {
    // Select item
    if (this.state.value !== '' && this.getIndex(this.state.value, this.props.options) > -1) {
      this.selectItem(this.state.value, this.props.options)
    }
    // No value is passed in
    else {
      this.setState({selected: '', value: ''})
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.value === this.state.value) {
      return
    }
    let validIndex = this.getIndex(nextProps.value, nextProps.options) > -1

    if (nextProps.value === undefined || nextProps.value === null || !validIndex) {
      this.setState({selected: '', value: ''})
    } else {
      this.selectItem(nextProps.value, nextProps.options)
    }
  }

  handleClickOutside = () => {
    if (this.state.isOpen) this.toggleSelectField()
  }

  toggleSelectField = () => {
    if (this.props.disabled) return

    this.setState({isOpen: !this.state.isOpen})
  }

  selectOption = (option, triggerCallback) => {
    this.setState({ selected: option, value: option[this.props.valueProp], isOpen: false }, () => {
      if (triggerCallback && typeof this.props.changeCallback === 'function') {
        this.props.changeCallback({
          target: {
            name: this.props.name,
            value: option[this.props.valueProp],
            option: option
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

    options.map((option, index) => {
      if (option[this.props.valueProp] === value) {
        optionIndex = index
      }
    })

    return optionIndex
  }

  getDisplayText = () => {
    if (this.state.selected !== '') {
      return this.state.selected[this.props.displayProp]
    } else if (typeof this.props.placeholder !== 'undefined') {
      return this.props.placeholder
    }
    return 'Please select an option'

  }

  getDisplayIcon = () => {
    if (this.state.selected && this.state.selected.icon) {
      return <Icon name={this.state.selected.icon} fill={this.state.selected.iconColor || null} className={style.icon} height='16' width='16' />
    } else if (this.props.icon) {
      return <Icon name={this.props.icon} className={style.icon} height='16' width='16' />
    }
    return null

  }

  render() {
    const cx = classNames.bind(style)
    const disabledClass = this.props.disabled ? style['selectfield-disabled'] : ''
    const activeClass = this.state.isOpen ? style['active'] : ''
    const selectFieldClass = cx(style['selectfield-component'], activeClass, disabledClass, this.props.optClass)
    const { valueProp, hideProp, label } = this.props

    let options = this.props.options.map((option, index) =>
      <li
        key={index}
        onClick={this.selectOption.bind(null, option, true)}
        className={(hideProp && option[hideProp]) ? style['hidden'] : undefined}>
          {option.icon
            ? <Icon
              name={option.icon}
              fill={option.iconColor || null}
              className={style.icon}
              height='16'
              width='16' />
            : null
          }
          {option[this.props.displayProp]}
        </li>
    )

    if (options.length === 0) {
      options.push(<li key={0} className={style['not-clickable']}>Nothing to select</li>)
    }

    let value = ''

    if (this.state.selected) {
      value = this.state.selected[valueProp]
    }

    return (
      <div className={selectFieldClass} style={this.props.style}>
        <input type='hidden' name='selectfield-value' value={value} />
        { label && <label>{label}</label> }
        <div className={style['selectfield-value']} onClick={this.toggleSelectField}>
          {this.getDisplayIcon()}
          <span className={style['display-text']}>{this.getDisplayText()}</span>
          <Icon name='mbsy-caret' width='10' height='10' />
        </div>
        <ul>
          {options}
        </ul>
      </div>
    )
  }
}

export default enhanceWithClickOutside(SelectField)
