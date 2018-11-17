import React from 'react'
import { string, func } from 'prop-types'
import Clipboard from 'clipboard'
import Tooltip from '../Tooltip/index'

const EnhanceWithCopy = WrappedComponent => {
  return class extends React.Component {
    static propTypes = {
      getValue: func,
      id: string.isRequired,
      tooltipPlacement: string
    }

    static defaultProps = {
      tooltipPlacement: 'top'
    }

    state = {
      copied: false,
      showTooltip: false
    }

    shouldComponentUpdate = (nextProps, nextState) => {
      if (nextState.copied !== this.state.copied) return true
      if (nextState.showTooltip !== this.state.showTooltip) return true
      return false
    }

    componentDidMount = () => {
      // When the component mounts configure the clipboard
      this.activateCopyToClipboard()
    }

    componentWillUnmount = () => {
      // When the component unmounts destroy the clipboard
      this._clipboard.destroy()
    }

    getValue = trigger => {
      // Set the local trigger variable
      this._trigger = trigger

      // If a custom getValue method is provided use it to get the value
      if (this.props.getValue) {
        return this.props.getValue(trigger)
      }

      switch (trigger.nodeName) {
        case 'INPUT':
          return trigger.value
        default:
          return trigger.textContent
      }
    }

    focusTriggerElement = () => {
      // If the trigger element has a focus method call it
      if (typeof this._trigger.focus === 'function') {
        this._trigger.focus()
      }
    }

    activateCopyToClipboard = () => {
      // Create the clipboard using the ID prop
      this._clipboard = new Clipboard(`#${this.props.id}`, { text: this.getValue })

      this._clipboard.on('success', () => {
        this.handleCopy()
      })
    }

    handleCopy = () => {
      // Set the copied state to true
      this.setState({ copied: true }, () => {
        // The input gets blurred every time the component is updated so we need to
        // focus the trigger element if it needs to be focused (input or textarea)
        this.focusTriggerElement()

        setTimeout(() => {
          // Set the copied state to false
          this.setState({ copied: false }, () => {
            // The input gets blurred every time the component is updated so we need to
            // focus the trigger element if it needs to be focused (input or textarea)
            this.focusTriggerElement()
          })
        }, 1800)
      })
    }

    handleMouseEnterLeave = event => {
      // Set the showTooltip state to true on mouse enter so the tooltip doesn't disappear when its content changes
      // Set the showTooltip state to false on mouse leave so the tooltip disappears when the mouse leaves the element
      this.setState({ showTooltip: event.type === 'mouseenter' })
    }

    render = () => {
      const { tooltipPlacement, ...otherProps } = this.props
      const tooltipText = this.state.copied ? 'Copied!' : 'Click to copy'
      const tooltipShow = this.state.copied || this.state.showTooltip

      return (
        <div onMouseEnter={this.handleMouseEnterLeave} onMouseLeave={this.handleMouseEnterLeave}>
          <Tooltip content={tooltipText} tooltipPlacement={tooltipPlacement} show={tooltipShow}>
            <WrappedComponent {...otherProps} />
          </Tooltip>
        </div>
      )
    }
  }
}

export default EnhanceWithCopy
