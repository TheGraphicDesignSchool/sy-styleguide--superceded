import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './style.scss'
import optclass from '../internal/OptClass'

class Tooltip extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    /**
     * The ID of the app wrapper.
     */
    appWrapper: PropTypes.string,
    /**
     * The content to display inside the `Tooltip`.
     */
    content: PropTypes.string,
    /**
     * Optional styles to add to the tooltip.
     */
    optClass: PropTypes.string,
    /**
     * The placement of the tooltip.
     */
    tooltipPlacement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    /**
     * Whether to show the tooltip element by default.
     */
    show: PropTypes.bool,
    /**
     * ID to use for referencing the tooltip (default: tip-wrapper)
     */
    tipWrapper: PropTypes.string,
    /**
     * When set to true, the tooltip will only appear if the tip wrapper
     * is ellipsized
     */
    detectEllipsis: PropTypes.bool,
    /**
     * Callback to call when mouseover is called.
     */
    mouseOverCallback: PropTypes.func,
    /**
     * Callback to call when mouseout is called.
     */
    mouseOutCallback: PropTypes.func
  }

  static defaultProps = {
    appWrapper: 'app',
    tooltipPlacement: 'top',
    tipWrapper: 'tip-wrapper'
  }

  state = {
    showing: false
  }

  componentDidMount = () => {
    if (this.props.show) {
      setTimeout(() => {
        this.showTip()
      }, 1000)
    }

    this.renderTipWrapper()
  }

  componentWillReceiveProps = nextProps => {
    // If not currently showing and should show or already showing but the content changed
    if (nextProps.show && (!this.state.showing || (nextProps.content !== this.props.content))) {
      this.showTip()
    }
    // If currently showing and should not show
    else if (this.state.showing && !nextProps.show) {
      this.hideTip()
    }
  }

  componentWillUnmount = () => {
    this.hideTip()
  }

  renderTipWrapper = () => {
    // Look for an existing reference
    let tipNode = this.nodeReference()

    // If none exists
    if (!tipNode) {
      // Create the wrapper node
      tipNode = document.createElement('div')

      // Add the CSS hook
      tipNode.setAttribute('class', style['tip-wrapper'])

      // Set the DOM reference
      tipNode.setAttribute('id', this.props.tipWrapper)

      document.getElementById(this.props.appWrapper).appendChild(tipNode)
    }
  }

  getTipElementBoundingRect = () => {
    return this._tipElement.getBoundingClientRect()
  }

  tooltipPlacement = () => {
    let tipRect = this.getTipElementBoundingRect()

    this._tooltipPlacement = {}
    this._tooltipPlacement.translate = tipRect.width / 2

    switch (this.props.tooltipPlacement) {
      case 'bottom':
        this._tooltipPlacement.left = tipRect.left + ((tipRect.right - tipRect.left) / 2)
        this._tooltipPlacement.top = tipRect.bottom
        break
      case 'right':
        this._tooltipPlacement.left = tipRect.right
        this._tooltipPlacement.top = tipRect.top + ((tipRect.bottom - tipRect.top) / 2)
        break
      case 'left':
        this._tooltipPlacement.left = tipRect.left
        this._tooltipPlacement.top = tipRect.top + ((tipRect.bottom - tipRect.top) / 2)
        break
      default:
        this._tooltipPlacement.left = tipRect.left + ((tipRect.right - tipRect.left) / 2)
        this._tooltipPlacement.top = tipRect.top
    }
  }

  showTip = () => {
    if (!this.props.detectEllipsis || this.isEllipsisActive()) {
      // We set the placement each time the user hovers over a tooltip-bound element
      this.tooltipPlacement()

      this.setState({ showing: true }, () => {
        this.renderTooltip()
      })
    }
  }

  hideTip = () => {
    this.setState({ showing: false })

    // Get the node
    let tipNode = this.nodeReference()

    // Re-assign the wrapper style
    // because we blow away the classnames
    tipNode.setAttribute('class', style['tip-wrapper'])

    // Set the position to it's original (off screen)
    tipNode.setAttribute('style', 'top: -300px; left: -300px;')
  }

  getTranslate = () => {
    return this._tooltipPlacement.translate + 'px'
  }

  getComputedStyle = propVal => {
    // getComputedStyle allows us to access a node's CSS values
    return window.getComputedStyle(this._tipElement, null).getPropertyValue(propVal)
  }

  isEllipsisActive = () => {
    let clone = this._tipElement.cloneNode()

    // Returns the CSS values for properties
    // that affect the element's width
    const cloneFontSize = this.getComputedStyle('font-size')
    const cloneFontWeight = this.getComputedStyle('font-weight')
    const cloneTextTransform = this.getComputedStyle('text-transform')

    // Inline the values, with visibility: hidden
    clone.setAttribute('style', `display: inline; width: auto; visibility: hidden; font-size: ${cloneFontSize}; font-weight: ${cloneFontWeight}; text-transform: ${cloneTextTransform}`)
    clone.textContent = this._tipElement.textContent

    // Append the node so we can read the DOM attributes
    document.body.appendChild(clone)

    // Detect whether the hidden node width is wider than the reference element
    const isEllipsized = clone.offsetWidth > this._tipElement.offsetWidth

    // Remove the clone
    document.body.removeChild(clone)

    return isEllipsized
  }

  /**
   * Helper function to return the tooltip wrapper
   * Note: a future implmementation might allow for a node to
   * be passed in here, to allow for a custom tooltip wrapper
   */
  nodeReference = () => {
    return document.getElementById(this.props.tipWrapper)
  }

  renderTooltip = () => {
    const tipNode = this.nodeReference()
    const tipShowingClass = this.state.showing ? style['tip-showing'] : null
    const tipClass = optclass(style, ['tip-wrapper', 'is-visible', this.props.optClass, tipShowingClass, this.props.tooltipPlacement])
    const styles = this.state.showing && `top: ${this._tooltipPlacement.top + window.pageYOffset}px; left: ${this._tooltipPlacement.left + window.pageXOffset}px;`

    tipNode.setAttribute('style', styles)
    tipNode.className = tipClass
    tipNode.textContent = this.props.content
  }

  handleMouseOver = () => {
    this.showTip()
    this.props.mouseOverCallback && this.props.mouseOverCallback()
  }

  handleMouseOut = () => {
    if (!this.props.show) this.hideTip()
    this.props.mouseOutCallback && this.props.mouseOutCallback()
  }

  render = () => {
    return (
      <span onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} ref={c => this._tipElement = c} >
        {this.props.children}
      </span>
    )
  }
}

export default Tooltip
