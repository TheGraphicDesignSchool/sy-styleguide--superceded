import React from 'react'
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'
import style from './style.scss'
import classNames from 'classnames/bind'
import Icon from '../Icon/index'
import Spinner from '../Spinner/index'
import Tooltip from '../Tooltip/index'
import SelectField from '../SelectField/index'

class InlineEdit extends React.Component {

  static propTypes = {
    /**
     * Name of the input.
     */
    name: PropTypes.string,
    /**
     * A callback function to be called when save is clicked.
     */
    changeCallback: PropTypes.func,
    /**
     * Value of the input.
     */
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.array
    ]),
    /**
     * Boolean used to show/hide the input vs formatted display.
     */
    isEditing: PropTypes.bool,
    /**
     * Optional styles to add to the inline-edit.
     */
    optClass: PropTypes.string,
    /**
     * Optional placeholder string for empty submission.
     */
    placeholder: PropTypes.string,
    /**
     * Whether the inline-edit is readonly.
     */
    readonly: PropTypes.bool,
    /**
     * Boolean used to show/hide the loader.
     */
    loading: PropTypes.bool,
    /**
     * Error to display under the field.
     */
    error: PropTypes.string,
    /**
     * Boolean used to display the copy to clipboard icon.
     */
    copyToClipboard: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]),
    /**
     * A label to display next to the component.
     */
    label: PropTypes.string,
    /**
     * An icon to display next to the component.
     */
    icon: PropTypes.string,
    /**
     * Text to display inside the tooltip.
     */
    tooltipText: PropTypes.string,
    /**
     * The placement of the tooltip.
     */
    tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    /**
     * An optional class to add to the tooltip.
     */
    tooltipClass: PropTypes.string,
    /**
     * Type of the field.
     */
    type: PropTypes.oneOf(['text', 'select']),
    /**
     * Options for the dropdown menu (required if type is 'select').
     */
    selectOptions: PropTypes.array
  }

  static defaultProps = {
    isEditing: false,
    placeholder: 'Click to edit',
    loading: false,
    readonly: false,
    error: '',
    value: '',
    tooltipPlacement: 'right',
    type: 'text'
  }

  state = {
    isEditing: this.props.isEditing,
    value: this.props.value || '',
    loading: this.props.loading,
    error: this.props.error,
    copied: false
  }

  componentWillReceiveProps = nextProps => {
    const newState = {}

    if (nextProps.isEditing && !this.state.isEditing) {
      newState.isEditing = true
      this.showButtons()
    }

    if (nextProps.loading !== this.state.loading) {
      newState.loading = nextProps.loading
    }

    if (nextProps.error !== this.state.error) {
      newState.error = nextProps.error
    }

    if (nextProps.error !== '' && this.props.type === 'text') {
      this.showButtons()
    }
    else if (!newState.loading && !newState.isEditing && this.props.type === 'text') {
      newState.isEditing = false
      this.props.copyToClipboard && this.activateCopyToClipboard()
      this._textValue.blur()
      this._textValue.scrollLeft = 0
    }

    if (Object.keys(newState).length > 0) {
      this.setState(newState)
    }
  }

  componentDidMount = () => {
    if (this.props.type === 'text') {
      this.attachKeyListeners()
      this.activateCopyToClipboard()
    }

    this.getStyles()
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state.isEditing !== nextState.isEditing ||
      this.state.value !== nextState.value ||
      this.state.loading !== nextState.loading ||
      this.props.error !== nextProps.error ||
      this.state.error !== nextState.error ||
      this.state.copied !== nextState.copied ||
      this.state.inlineEditMaxWidth !== nextState.inlineEditMaxWidth ||
      this.props.tooltipText !== nextProps.tooltipText ||
      this.props.tooltipPlacement !== nextProps.tooltipPlacement ||
      this.props.readonly !== nextProps.readonly ||
      this.props.copyToClipboard !== nextProps.copyToClipboard
  }

  handleSave = event => {
    if (this.props.type === 'text') {
      const inputText = this._textValue.textContent
      const shouldTriggerCallback = inputText !== this.state.value

      this.setState({ isEditing: false, value: inputText }, () => {
        if (typeof this.props.changeCallback === 'function' && shouldTriggerCallback) {
          const event = {
            target: {
              name: this.props.name,
              value: this.state.value
            }
          }

          this.props.changeCallback(event)
        }
      })
    }
    else {
      const shouldTriggerCallback = event.target.value !== this.state.value

      this.setState({ value: event.target.value }, () => {
        if (typeof this.props.changeCallback === 'function' && shouldTriggerCallback) {
          const event = {
            target: {
              name: this.props.name,
              value: this.state.value
            }
          }

          this.props.changeCallback(event)
        }
      })
    }
  }

  handleCancel = () => {
    const newState = { isEditing: false }
    let shouldTriggerCallback = false

    if (this.state.error !== '' && this.props.value !== this.state.value) {
      newState.error = ''
      newState.value = this.props.value
      shouldTriggerCallback = true
    }

    this.setState(newState, () => {
      this.activateCopyToClipboard()
      this._textValue.blur()
      this._textValue.scrollLeft = 0

      if (typeof this.props.changeCallback === 'function' && shouldTriggerCallback) {
        const event = {
          target: {
            name: this.props.name,
            value: this.state.value,
            canceled: true
          }
        }

        this.props.changeCallback(event)
      }
    })
  }

  showButtons = () => {
    if (!this.props.readonly) {
      this.setState({ isEditing: true }, () => {
        this.selectElementContents(this._textValue)
      })
    }
  }

  getField = () => {
    if (this.props.type === 'select') {
      return this.getSelect()
    }
    return this.getSpan()

  }

  getSelect = () => {
    const selectClass = classNames.bind(style)(style['inline-edit-select'], this.state.loading ? 'loading' : '')

    return (
      <SelectField
        options={this.props.options}
        valueProp='value'
        displayProp='label'
        changeCallback={this.handleSave}
        value={this.state.value}
        optClass={selectClass}
        disabled={this.props.readonly}>
      </SelectField>
    )
  }

  getSpan = () => {
    if (this.state.isEditing) {
      return <span id='span_id' contentEditable className={style['inline-text-wrapper']} dangerouslySetInnerHTML={{ __html: this.state.value }} ref={c => this._textValue = c} />
    }

    return (
      <span id='span_id' onClick={this.showButtons} className={style['inline-text-wrapper-hover']} ref={c => this._textValue = c}>
        {this.props.tooltipText
          ? <Tooltip content={this.props.tooltipText} tooltipPlacement={this.props.tooltipPlacement} appendToBody={true} className={style['value-tooltip']} optClass={this.props.tooltipClass || ''}>{this.state.value || this.props.placeholder}</Tooltip>
          : <span>{this.state.value || this.props.placeholder}</span>
        }
      </span>
    )
  }

  getCopyIcon = () => {
    if (this.state.copied) {
      return 'copied!'
    }

    const copyIconFill = this.state.value === '' ? '#9198A0' : '#3C97D3'

    return <Icon name='md-copy' height='14' width='14' fill={copyIconFill} />
  }

  getIcon = () => {
    if (this.props.icon) {
      return <span className={style['inline-icon']} ref={c => this._inlineIcon = c}><Icon name={this.props.icon} height='14' width='14' fill='#9198A0' /></span>
    }
  }

  getLabel = () => {
    if (this.props.label) {
      return <label className={style['inline-label']} ref={c => this._inlineLabel = c}>{this.props.label}</label>
    }
  }

  selectElementContents = element => {
    const range = document.createRange()

    range.selectNodeContents(element)

    const selection = window.getSelection()

    selection.removeAllRanges()
    selection.addRange(range)
    element.focus()
  }

  attachKeyListeners = () => {
    this._textValue.addEventListener('keypress', this.handleKeyPress)
    this._textValue.addEventListener('keyup', this.handleKeyUp)
  }

  handleKeyPress = event => {
    // Grabs the character code, even in FireFox
    const charCode = event.keyCode || event.which

    if (charCode === 13) {
      event.preventDefault()
      this.handleSave()
    }
  }

  handleKeyUp = event => {
    // Grabs the character code, even in FireFox
    const charCode = event.keyCode ? event.keyCode : event.which

    if (charCode === 27) {
      event.preventDefault()
      this.handleCancel()
    }
  }

  activateCopyToClipboard = () => {
    if (!this.props.copyToClipboard) {
      return
    }

    const clipboard = new Clipboard(this._copyTrigger)

    clipboard.on('success', () => {
      this.handleCopy()
    })
  }

  handleCopy = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false })
      }, 1800)
    })
  }

  getStyles = () => {
    let offset = 0

    if (this._inlineIcon) {
      // Add width and margin to the offset
      offset += this._inlineIcon.getBoundingClientRect().width + 5
    }
    if (this._inlineLabel) {
      // Add width and margin to the offset
      offset += this._inlineLabel.getBoundingClientRect().width + 10
    }

    this.setState({ inlineEditMaxWidth: `calc(100% - ${offset}px)` })
  }

  render = () => {
    const cx = classNames.bind(style)
    const readonlyClass = this.props.readonly ? 'readonly' : ''
    const errorClass = this.state.error !== '' ? 'error' : ''
    const placeholderClass = this.state.value === '' ? 'placeholder' : ''
    const copyDisabledClass = this.state.value === '' ? 'disabled' : ''
    const copyIconClass = cx(style['copy-icon'], copyDisabledClass, this.state.copied ? 'copied' : '')
    const inlineEditClass = cx(style['inline-edit-wrapper'], this.props.optClass, readonlyClass, errorClass, placeholderClass)
    const overflowWrapperClass = cx(style['inline-text-overflow-wrapper'], this.props.type === 'select' ? style['visible'] : '')
    const copyValue = typeof this.props.copyToClipboard === 'string' ? this.props.copyToClipboard : this.state.value

    return (
      <div className={inlineEditClass}>
        <div className={style['inline-edit-wrapper-inner']}>
          {this.getIcon()}
          {this.getLabel()}
          <div className={overflowWrapperClass} style={{ maxWidth: this.state.inlineEditMaxWidth }}>
            {this.getField()}
            {
              this.state.isEditing && !this.state.loading &&
              <div className={style['inline-button-wrapper']}>
                <Icon name='md-check' onClick={this.handleSave} height='20' width='20' className={style['save-button']}>Save</Icon>
                <Icon name='md-close' onClick={this.handleCancel} height='20' width='20' className={style['cancel-button']}>Cancel</Icon>
              </div>
            }
            {
              this.props.copyToClipboard &&
              <span ref={c => this._copyTrigger = c} data-clipboard-text={copyValue}>
                {
                  !this.state.isEditing && !this.state.loading &&
                  <span className={copyIconClass}>{this.getCopyIcon()}</span>
                }
              </span>
            }
            <div className={style['loader-wrapper']}>
              <Spinner loading={this.state.loading} optClass={style['spinner']} type='spinner-bounce' color='#9198A0' />
            </div>
          </div>
        </div>
        {
          this.state.error && this.state.error !== '' &&
          <div className={style['error-text']}>{this.state.error}</div>
        }
      </div>
    )
  }
}

export default InlineEdit
