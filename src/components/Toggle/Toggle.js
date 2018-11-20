import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import classNames from 'classnames/bind'
import Popover from '../Popover/Popover'
import Button from '../Button/index'
import Spinner from '../Spinner/index'
import ConfirmationOverlay from '../internal/ConfirmationOverlay'
import colors from '../internal/colors'

class Toggle extends PureComponent {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    disabled: false,
    value: false,
    hasText: false,
    loading: false,
    confirmWidth: '184'
  }

  state = {
    value: this.props.value,
    text: ['Yes', 'No'],
    confirmIsOpen: false
  }

  static propTypes = {
    /**
     * Name of the toggle.
     */
    name: PropTypes.string,
    /**
     * Value of the toggle.
     */
    value: PropTypes.bool,
    /**
     * Text displayed with the toggle.
     */
    label: PropTypes.string,
    /**
     * Whether the toggle is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Optional styles to add to the toggle.
     */
    optClass: PropTypes.string,
    /**
     * A callback function to be called when the toggle changes.
     */
    changeCallback: PropTypes.func,
    /**
    * Boolean used to signify if text is used on the toggle
    */
    hasText: PropTypes.bool,
    /**
    * Whether to display the sweet loader.
    */
    loading: PropTypes.bool,
    /**
     * Prop to add a confirmation to the toggle when toggled on or off (or both)
    */
    confirm: PropTypes.oneOf(['on', 'off', 'both']),
    /**
    * Prop to signify if the toggle should have a confirmation when toggled on or off (or both)
    */
    confirmText: PropTypes.string,
    /**
    * Set the width of the confirmation popover
    */
    confirmWidth: PropTypes.string
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  }

  handleChange = () => {
    if (this.props.disabled) return

    if ((this.props.confirm === 'both') ||
       (this.props.confirm === 'on' && !this.state.value) ||
       (this.props.confirm === 'off' && this.state.value)) {
      this.setState({ confirmIsOpen: true })
    }
    else {
      this.toggleValue()
      this.setState({ confirmIsOpen: false })
    }
  }

  handleConfirmation = (confirm, e) => {
    e.stopPropagation()

    if (confirm) this.toggleValue()

    this.setState({ confirmIsOpen: false })
  }

  toggleValue = () => {
    this.setState({ value: !this.state.value }, () => {
      this.props.changeCallback &&
        this.props.changeCallback({
          target: { name: this.props.name, value: this.state.value }
        })
    })
  }

  getToggleText = isOn => {
    if (!this.props.hasText) return ''

    return isOn ? this.state.text[0] : this.state.text[1]
  }

  render = () => {
    const cx = classNames.bind(style)
    const onClass = this.state.value ? style.on : ''
    const loadingClass = this.props.loading ? style['toggle-loading'] : ''
    const innerLoading = this.props.loading ? 'loading' : ''
    const outerClasses = cx(style.outer, onClass)
    const innerClasses = cx(style.inner, onClass, innerLoading)
    const textClasses = cx(style.text, onClass)
    const hasTextClass = this.props.hasText ? style['has-text'] : style['no-text']
    const disabledClass = this.props.disabled || this.state.confirmIsOpen ? style['toggle-disabled'] : ''
    const toggleWrapper = cx(style['toggle-wrapper'], disabledClass, hasTextClass)
    const toggleClass = cx(style['toggle-component'], loadingClass, this.props.optClass)
    const toggleText = this.getToggleText(onClass)
    const toggle = (
      <div className={toggleWrapper}>
        <div className={outerClasses} />
         {this.props.hasText && <span className={textClasses}>{toggleText}</span>}
        <div className={innerClasses}>
        {
          this.props.loading &&
          <Spinner loading={true} type='spinner-circular' backgroundColor='transparent' color={colors.white} size='16' className={style['toggle-loader']} />
        }
        </div>
      </div>
    )

    return (
      <div className={toggleClass} onClick={this.handleChange}>
        { this.props.label && <label className={disabledClass}>{this.props.label}</label> }

        {
          this.props.confirm ?
            <Popover
              showing={this.state.confirmIsOpen}
              defaultPosition='bottom'
              content={
                <ConfirmationOverlay
                  handleConfirmation={this.handleConfirmation}
                  prompt={this.props.confirmText} />
              }
              width={this.props.confirmWidth + 'px'}
              onRequestClose={() => this.setState({ confirmIsOpen: false }) }>

              {toggle}

            </Popover>

          : toggle
        }
      </div>
    )
  }
}

export default Toggle
