import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './style.scss'
import themesStyles from './Themes/themes.scss'
import Overlay from './Overlay'
import RenderToLayer from '../internal/RenderToLayer'
import Icon from '../Icon/index'

/**
 * The Modal component.
 */
class Modal extends React.Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    open: false,
    closeOnAction: false
  }

  static propTypes = {
    /**
     * Action buttons to display below the Modal content (`children`).
     * This property accepts either a React element, or an array of React elements.
     */
    actions: PropTypes.node,
    /**
     * Controls whether the Modal is opened or not.
     */
    open: PropTypes.bool.isRequired,
    /**
     * When set to true it will force the user to use one of the actions in the `Modal`.
     * Clicking outside the `Modal` will not trigger the `onRequestClose` in that case.
     */
    closeOnAction: PropTypes.bool,
    /**
     * Fired when the `Modal` is requested to be closed by a click outside the `Modal` or on the buttons.
     *
     * @param {bool} buttonClicked Determines whether a button click triggered this request.
     */
    onRequestClose: PropTypes.func,
    /**
     * The title to display on the `Modal`. Could be number, string, element or an array containing these types.
     */
    title: PropTypes.node,
    /**
     * Optional styles to add to the modal.
     */
    optClass: PropTypes.string,
    /**
     * The size of the modal. The default is 'md' (medium).
     */
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    /**
     * Optional theme to apply.
     */
    theme: PropTypes.oneOf(['color-splash'])
  }

  handleKeyUp = event => {
    // When Esc is pressed
    if (event.keyCode === 27) {
      this.requestClose(false)
    }
  }

  handleClick = event => {
    event.persist()
    if (typeof event.target.className === 'string' && event.target.className.indexOf('modal-scroll-container') !== -1) {
      this.handleCloseClick()
    }
  }

  handleCloseClick = () => {
    this.requestClose(false)
  }

  requestClose = buttonClicked => {
    if (!buttonClicked && this.props.closeOnAction) {
      return
    }

    if (this.props.onRequestClose) {
      this.props.onRequestClose(!!buttonClicked)
    }
  }

  setKeyupListener = () => {
    if (this.props.open) {
      window.addEventListener('keyup', this.handleKeyUp)
    } else {
      window.removeEventListener('keyup', this.handleKeyUp)
    }
  }

  renderModal = () => {
    const cx = classNames.bind(style)
    const theme = themesStyles[this.props.theme]
    const modalOpenClass = this.props.open ? style['modal-open'] : ''
    const modalSizeClass = this.props.size ? style['modal-' + this.props.size] : ''
    const modalClass = cx(style['modal-component'], this.props.optClass, modalOpenClass, theme)
    const modalContentClass = cx(style['modal-content'], modalSizeClass)
    const modalTitleIsElement = !(typeof this.props.title === 'string')
    const modalTitle = modalTitleIsElement ? this.props.title : <h1>{this.props.title}</h1>

    const actionsContainer = React.Children.count(this.props.actions) > 0 && (
      <div className={style['modal-actions']}>
        {React.Children.toArray(this.props.actions)}
      </div>
    )

    this.setKeyupListener()

    return (
      <div className={modalClass}>
        <div className={style['modal-scroll-container']} onClick={this.handleClick}>
          <Overlay
            show={this.props.open}
            onClick={this.handleCloseClick}
          />
          <div className={modalContentClass}>
            <div className={style['modal-header']}>
              {
                // render close button if closeOnAction is false and modalTitle is not an element
                !this.props.closeOnAction && !modalTitleIsElement
                  ? <div className={style['modal-close']}>
                      <Icon
                        name="md-close"
                        width="15"
                        height="15"
                        onClick={this.handleCloseClick}
                      />
                    </div>
                  : null
              }

              {modalTitle}
            </div>
            <div className={style['modal-body']}>
              {this.props.children}
            </div>
            <div className={style['modal-footer']}>
              {actionsContainer}
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      // Render the modal inside a div at the bottom of the document body
      <RenderToLayer render={this.renderModal} open={true} />
    )
  }
}

export default Modal
