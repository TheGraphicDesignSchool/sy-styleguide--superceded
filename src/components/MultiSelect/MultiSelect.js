import React from 'react'
import PropTypes from 'prop-types'
import optclass from '../internal/OptClass'
import TagList from '../internal/TagList'
import style from './style.scss'

class MultiSelect extends React.Component {


  static defaultProps = {
    disabled: false
  }

  static propTypes = {
    /**
     * A string to display as the placeholder text.
     */
    placeholder: PropTypes.string,
    /**
     * An array of objects which will be used as the options for the MultiSelect component.
     */
    options: PropTypes.array.isRequired,
    /**
     * The values of the options to be selected.
     */
    value: PropTypes.array,
    /**
     * Which field in the option object will be used as the value of the MultiSelect component.
     */
    valueProp: PropTypes.string.isRequired,
    /**
     * Which field in the option object will be used as the display of the MultiSelect component.
     */
    displayProp: PropTypes.string.isRequired,
    /**
     * Whether the MultiSelect component is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * A callback function to be called when an option is selected.
     */
    changeCallback: PropTypes.func,
    /**
     * Optional CSS class(es) to be used for local styles (string or array of strings)
     */
    optClass: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ])
  }

  state = {
    isOpen: false,
    value: this.props.value || []
  }

  componentWillMount = () => {
    // Set state
    if (this.state.value instanceof Array && this.state.value.length > 0 && this.containsValidValue(this.state.value, this.props.options)) {
      this.setState({selected: this.getSelectedOptions(this.state.value), value: this.state.value})
    }
    // No value is passed in
    else {
      this.setState({selected: [], value: []})
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== this.state.value) {
      // Set state
      if (nextProps.value instanceof Array && (this.containsValidValue(nextProps.value, nextProps.options) || nextProps.value.length === 0)) {
        this.setState({selected: this.getSelectedOptions(nextProps.value), value: nextProps.value})
      }
      // No value is passed in
      else {
        this.setState({selected: [], value: []})
      }
    }
  }

  getIndex = value => {
    let optionIndex = -1

    this.props.options.forEach((option, index) => {
      if (option[this.props.valueProp] === value) {
        optionIndex = index
      }
    })

    return optionIndex
  }

  containsValidValue = (values, options) => {
    let isValid = false

    for (let i = 0; i < values.length; i++) {
      if (this.getIndex(values[i], options) > -1) {
        isValid = true
      }
    }

    return isValid
  }

  getSelectedOptions = values => {
    let selectedOptions = []

    values.map((value, index) => {
      this.props.options.map((option, index) => {
        if (option[this.props.valueProp] === value) {
          selectedOptions.push(option)
        }
      })
    })

    return selectedOptions
  }

  handleChange = event => {
    // when value & option are empty it means that reset button was clicked
    if (event.target.value !== '' && event.target.option !== '') {
      let values = this.state.value

      values.push(event.target.value)

      this.setState({selected: this.getSelectedOptions(values), value: values}, () => {
        if (this.props.changeCallback) {
          this.props.changeCallback({
            target: {
              name: this.props.name,
              value: this.state.value,
              options: this.state.selected
            }
          })
        }
      })
    }
  }

  filterOptions = option => {
    const optionValue = option[this.props.valueProp]

    return (this.state.value.indexOf(optionValue) === -1)
  }

  getElements = children => {
    let {options, value, ...props} = this.props

    props.options = this.props.options.filter(this.filterOptions)
    props.changeCallback = this.handleChange

    if (['WrappedTypeahead', 'Wrappedt'].includes(children.type.displayName)) {
      props.resetAfterSelection = true
      props.optionsFilterPredicate = this.filterOptions
    }

    return React.Children.map(children, child => {
      let {options, value, ...childProps} = child.props

      return React.cloneElement(child, Object.assign(childProps, props))
    })
  }

  onRemove = index => {
    const values = this.state.value.slice()

    values.splice(index, 1)

    this.setState({selected: this.getSelectedOptions(values), value: values}, () => {
      if (this.props.changeCallback) {
        this.props.changeCallback({
          target: {
            name: this.props.name,
            value: this.state.value,
            options: this.state.selected
          }
        })
      }
    })
  }

  render() {
    const multiSelectClasses = optclass(style, 'multi-select', this.props.optClass)
    const elements = this.getElements(this.props.children)

    return (
      <div className={multiSelectClasses}>
        {elements}
        <TagList tags={this.state.selected} displayProp={this.props.displayProp} onRemove={this.onRemove} />
      </div>
    )
  }
}

export default MultiSelect
