import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import Radio from './Radio'
import style from './style.scss'

class RadioGroup extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    value: this.props.value,
    options: []
  }

  static defaultProps = {
    disabled: false
  }

  static propTypes = {
    /**
     * Text shown above the radio group.
     */
    label: PropTypes.string,
    /**
     * The name that will be applied to all radio buttons inside it.
     */
    name: PropTypes.string.isRequired,
    /**
     * Whether the radio group is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * A list of options for the radio group.
     */
    options: PropTypes.array,
    /**
     * Which option is checked.
     */
    value: PropTypes.string,
    /**
     * A callback function to be called when an option is changed.
     */
    changeCallback: PropTypes.func,
    /**
     * An optional string that appears below the label
     */
    description: PropTypes.string
  }

  componentWillMount = () => {
    // form an array of options based on the children that were passed in
    // this can be done in the case of a RadioGroup with explicit children (see docs example)
    if (this.props.children) {
      const childOptions = this.props.children.reduce((options, child) => {
        if (child.type === Radio) {
          options.push({ name: child.props.name, label: child.props.label })
        }
        return options
      }, [])

      this.setState({options: childOptions})
    }

    if (typeof this.state.value !== 'undefined' && (this.state.options || this.props.options)) {
      this.checkItem(this.state.value, this.state.options || this.props.options)
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== undefined && nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value}, () => {
        this.checkItem(nextProps.value, this.state.options || nextProps.options)
      })
    }
  }

  handleChange = (event, value) => {
    event.persist()
    if (value !== this.state.value) {
      this.setState({value: value}, () => {
        this.checkItem(value, this.state.options || this.props.options)
      })
      if (typeof this.props.changeCallback === 'function') {
        this.props.changeCallback(event, value)
      }
    }
  }

  checkItem = (value, options) => {
    let index = this.getIndex(value, options)

    if (index >= 0) {
      options[index].checked = true
    }
  }

  getIndex = (value, options) => {
    let optionIndex = -1

    options.map((radio, index) => {
      if (radio.value === value) {
        optionIndex = index
        return
      }
    })

    return optionIndex
  }

  getOptions = () => {
    const groupName = this.props.name
    const { options, label, name, value, description, changeCallback, ...other } = this.props

    // this means explicit radio buttons were defined (usually paired with other form fields)
    // we create an options array in the state (because there is no options in props) for checkItem to use
    if (this.props.children) {
      return this.props.children.map((child, index) => {
        if (child.type === Radio) {
          return React.cloneElement(child, {
            key: index,
            name: groupName,
            checked: this.state.value === child.props.value,
            changeCallback: this.handleChange
          })
        }
        return child

      })
    }
    // this means a normal RadioGroup with an options array was defined

    return this.props.options.map(option =>
        <Radio
          key={option.value}
          value={option.value}
          label={option.label}
          description={option.description}
          name={groupName}
          checked={this.state.value === option.value}
          optClass={option.optClass}
          changeCallback={this.handleChange}
          {...other} />
      )

  }

  render() {
    const cx = classNames.bind(style)
    const radioGroupClass = cx(style['radio-group'], this.props.optClass)

    return (
      <div className={radioGroupClass}>
        {this.props.label ? <label className={style['radio-group-label']}>{this.props.label}</label> : null}
        {this.getOptions()}
      </div>
    )
  }
}

export default RadioGroup
