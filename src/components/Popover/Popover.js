import React, { Component } from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import StyledDiv from '../StyledDiv/index'
import styles from './styles.css'

export class Popover extends Component {
  constructor(props) {
    super(props)
    if (props.optClass && process.env.NODE_ENV !== 'production') {
      console.warn('Popover: Use of optClass will be deprecated as of react-ions 6.0.0, please use `className` instead')
    }
  }

  static propTypes = {
    /**
     * Whether to show the popover.
     */
    showing: PropTypes.bool,
    /**
     * The default position of the popover.
     */
    defaultPosition: PropTypes.oneOf(['top', 'bottom', 'right', 'left']),
    /**
     * The content to display inside the popover.
     */
    content: PropTypes.node,
    /**
    * The width of the popover, in any unit supported in css
    */
    width: PropTypes.string,
    /**
     * Optional class to add to the popover. (DEPRECATED, use className instead)
     */
    optClass: PropTypes.string,
    /**
     * Optional class to add to the popover.
     */
    className: PropTypes.string,
    /**
     * The method to be triggered on close.
     */
    onRequestClose: PropTypes.func
  }

  static defaultProps = {
    defaultPosition: 'bottom',
    showing: false
  }

  state = {
    position: this.props.defaultPosition
  }

  componentDidMount = () => {
    this.updateRect()
    this.forceUpdate()
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.updateRect()

    const updatedPosition = this.getPosition(this.state.position)

    if (updatedPosition !== prevState.position) this.setState({ position: updatedPosition })
  }

  updateRect = () => {
    this._parentRect = this._popoverWrapper && this._popoverWrapper.getBoundingClientRect()
    this._boundingRect = this._popoverWrapper && this._popoverElement.getBoundingClientRect()
  }

  getPosition = defaultPosition => {
    switch (defaultPosition) {
      case 'top':
        if (this._boundingRect.top < 0) return 'bottom'
        break
      case 'bottom':
        if (this._boundingRect.bottom > window.innerHeight) return 'top'
        break
      case 'left':
        if (this._boundingRect.left < 0) return 'right'
        break
      case 'right':
        if (this._boundingRect.right > window.innerWidth) return 'left'
        break
    }
    return defaultPosition
  }

  handleClickOutside = () => {
    if (this.props.showing && this.props.onRequestClose) this.props.onRequestClose()
  }

  render = () => (
    <StyledDiv
      css={styles({ ...this.props, ...this.state, parent: this._parentRect })}
      className={[this.props.optClass, this.props.className].join(' ').trim()}
      innerRef={p => {this._popoverWrapper = p}}
    >
      <div
        className='popoverInner'
        ref={c => (this._popoverElement = c)}
      >
        <div className='popoverContent'>
          {this.props.content}
        </div>
      </div>
      {this.props.children}

    </StyledDiv>
  )
}

export default enhanceWithClickOutside(Popover)
