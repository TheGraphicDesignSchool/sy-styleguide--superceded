import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import classNames from 'classnames/bind'
import Icon from '../Icon/index'

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    disabled: false,
    iconName: 'md-check',
    locked: false
  }

  state = {
    value: this.props.value,
    iconName: this.props.iconName
  }

  static propTypes = {
    /**
     * Displays a native checkbox, instead of the custom implementation.
     */
    allowNative: PropTypes.bool,
    /**
     * Whether the checkbox is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Value of the input. Sets whether the component is checked or not.
     */
    value: PropTypes.bool,
    /**
     * Unique string to be passed to the label 'for' attrbute and the native checkbox 'id',
     * to allow using label to check/uncheck
     */
    forLabelAttr: PropTypes.string,
    /**
     * Node displayed with the checkbox (can be a string).
     */
    label: PropTypes.node,
    /**
     * Optional styles to add to the checkbox.
     */
    optClass: PropTypes.string,
    /**
     * A callback function to be called when the checkbox changes.
     */
    changeCallback: PropTypes.func,
    /**
     * Icon to be used in the checkbox.
     */
    iconName: PropTypes.string,
    /**
     * Whether the checkbox is locked from change outside of receiving props.
     */
    locked: PropTypes.bool,
    /**
     * Optional description that appears below the label.
     */
    description: PropTypes.string
  }

  handleChange = event => {
    event.persist()

    // Allow user to interact with locked checkboxes only if the value is false (unchecked)
    if (!this.props.locked || !this.props.value) {
      this.setState({ value: event.target.checked }, () => {
        if (typeof this.props.changeCallback === 'function') {
          this.props.changeCallback(event)
        }
      })
    }
  }

  componentWillReceiveProps = nextProps => {
    let newState = {}

    if (nextProps.value !== this.props.value) {
      newState.value = nextProps.value
    }

    if (nextProps.iconName !== this.state.iconName) {
      newState.iconName = nextProps.iconName
    }

    this.setState(newState)
  }

  getLabel = () => {
    const title = typeof this.props.label === 'string' ? this.props.label : ''

    if (this.props.label && this.props.description) {
      return <div className={style['label-wrapper']}>
        <label htmlFor={this.props.forLabelAttr}>
          <span className={style['label-title']} title={title}>{this.props.label}</span>
          <span className={style['label-description']}>{this.props.description}</span>
        </label>
      </div>
    }

    if (this.props.label) {
      return <label htmlFor={this.props.forLabelAttr} title={title}>{this.props.label}</label>
    }

    return null
  }

  render = () => {
    const {
      optClass,
      changeCallback,
      value,
      disabled,
      name,
      label,
      forLabelAttr,
      ...other
    } = this.props

    const cx = classNames.bind(style)
    const disabledClass = this.props.disabled ? style['checkbox-disabled'] : ''
    const allowNativeClass = this.props.allowNative ? style['checkbox-native'] : null
    const descriptionClass = this.props.description ? style['has-description'] : null
    const checkboxClass = cx(style['checkbox-component'], allowNativeClass, descriptionClass, disabledClass, optClass)
    const inputFillColor = this.props.disabled ? '#9198A0' : '#3C97D3'
    const labelWrapperClass = this.props.description ? style['label-group'] : null
    const title = typeof label === 'string' ? label : ''

    return (
      <div className={checkboxClass}>
        <input type='checkbox' id={this.props.forLabelAttr} checked={this.state.value} onChange={this.handleChange} value={value} disabled={disabled} name={name} label={label} title={title}></input>
        <div className={labelWrapperClass}>
          <div className={style['checkbox-input']}>
            <Icon name={this.state.iconName} fill={inputFillColor} />
          </div>
          {this.getLabel()}
        </div>
      </div>
    )
  }
}

export default Checkbox
