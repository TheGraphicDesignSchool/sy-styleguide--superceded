import React from 'react'
import PropTypes from 'prop-types'
import optclass from '../internal/OptClass'
import style from './style.scss'

/**
 * The Input component.
 */
class Input extends React.Component {

  static defaultProps = {
    disabled: false,
    value: '',
    valueType: 'string'
  }

  static propTypes = {
    /**
     * A class name to be used for local styles or integrations (required to support styled-components)
     */
    className: PropTypes.string,
    /**
     * Whether the input is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Disallow the user from editing the input.
     */
    readOnly: PropTypes.bool,
    /**
     * Text shown above the input.
     */
    label: PropTypes.string,
    /**
     * Value of the input.
     */
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    /**
     * Type of the value.
     */
    valueType: PropTypes.oneOf(['string', 'number']),
    /**
     * Optional placeholder text.
     */
    placeholder: PropTypes.string,
    /**
     * Name of the input.
     */
    name: PropTypes.string,
    /**
     * Name of the input.
     */
    prefix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    /**
     * Optional prefix to add to the input.
     */
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    /**
     * Optional suffix to add to the input.
     */
    optClass: PropTypes.string,
    /**
     * A callback function to be called when the input changes.
     */
    changeCallback: PropTypes.func,
    /**
     * A callback function to be called when the input is focused.
     */
    focusCallback: PropTypes.func,
    /**
     * A callback function to be called when the input is blurred.
     */
    blurCallback: PropTypes.func,
    /**
     * A callback function to be called when the input is clicked.
     */
    onClick: PropTypes.func,
    /**
     * A callback function to be called when the onkeyup event is fired.
     */
    onKeyUp: PropTypes.func,
    /**
     * A callback function to be called when the onkeypress event is fired.
     */
    onKeyPress: PropTypes.func,
    /**
     * A callback function to be called when the onkeydown event is fired.
     */
    onKeyDown: PropTypes.func,
    /**
     * A helper will render inline style='width: <value>'.
     */
    width: PropTypes.string,
    /**
     * A fallback value for when the value is null.
     */
    nullValue: PropTypes.string,
    /**
     * A string to be used as the ID.
     */
    id: PropTypes.string
  }

  _getValue = props => {
    return (props.value === null && typeof props.nullValue !== 'undefined') ? props.nullValue : props.value
  }

  componentWillMount = () => {
    this.setState({ value: this._getValue(this.props) })
  }

  componentDidMount = () => {
    this.handleInlineStyles()
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: this._getValue(nextProps) })
    }
  }

  componentDidUpdate = prevProps => {
    if (prevProps.suffix !== this.props.suffix || prevProps.prefix !== this.props.prefix) {
      this.handleInlineStyles()
    }
  }

  handleInlineStyles = () => {
    const inputStyles = {}

    if (this.props.prefix) {
      // Add 24 to accommodate for left and right padding of prefix (16+8)
      inputStyles.paddingLeft = this._prefix.getBoundingClientRect().width + 24
    }
    if (this.props.suffix) {
      // Add 24 to accommodate for left and right padding of prefix (8+16)
      inputStyles.paddingRight = this._suffix.getBoundingClientRect().width + 24
    }

    this.setState({ inputStyles })
  }

  handleChange = event => {
    event.persist()
    const value = (this.props.valueType === 'number' && event.target.value !== '' && !isNaN(event.target.value))
                  ? parseFloat(event.target.value) : event.target.value

    this.setState({value: event.target.value}, () => {
      this.props.changeCallback && this.props.changeCallback({ target: { name: this.props.name, value } })
    })
  }

  handleFocus = event => {
    this.props.focusCallback && this.props.focusCallback(event)
  }

  handleBlur = event => {
    this.props.blurCallback && this.props.blurCallback(event)
  }

  focus = () => {
    this._input.focus()
  }

  blur = () => {
    this._input.blur()
  }

  render = () => {
    const {prefix, suffix, label, optClass, className, width, disabled} = this.props

    const disabledClass = disabled ? style['input-disabled'] : null
    const widthStyle = width ? { width: width } : null
    const prefixClass = prefix ? style['prefix'] : null
    const suffixClass = suffix ? style['suffix'] : null
    const inputClass = optclass(style, ['input-component', className, optClass, disabledClass, prefixClass, suffixClass])
    const inputContainerClass = style['input-container']
    const flexWrapperClass = optclass(style, 'flex-wrapper')
    const flexWrapperClassSuffix = optclass(style, [flexWrapperClass, 'suffix'])

    return (
      <div className={inputClass}>
        {label && <label>{label}</label>}
        <div className={inputContainerClass} style={widthStyle}>
          {prefix && <div className={flexWrapperClass}>
            <div ref={c => this._prefix = c} className={prefixClass}>{prefix}</div>
          </div>}

          <input
            id={this.props.id}
            ref={c => this._input = c}
            value={this.state.value}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onClick={this.props.onClick}
            onBlur={this.handleBlur}
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
            placeholder={this.props.placeholder}
            style={this.state.inputStyles}
            onKeyUp={this.props.onKeyUp}
            onKeyPress={this.props.onKeyPress}
            onKeyDown={this.props.onKeyDown}>
          </input>

          {suffix && <div className={flexWrapperClassSuffix}>
            <div ref={c => this._suffix = c} className={suffixClass}>{suffix}</div>
          </div>}
        </div>
      </div>
    )
  }
}

export default Input
