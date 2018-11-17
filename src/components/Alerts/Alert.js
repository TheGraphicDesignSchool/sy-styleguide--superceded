import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import classNames from 'classnames/bind'
import Icon from '../Icon/index'

class Alert extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    timerStart: 0,
    timeout: this.props.timeout,
    timer: false
  }

  static defaultProps = {
    type: 'success'
  }

  static propTypes = {
    /**
     * The alert type.
     */
    type: PropTypes.oneOf(['success', 'warning', 'info', 'danger']),
    /**
     * Optional styles to add to the alert component.
     */
    optClass: PropTypes.string,
    /**
     * Whether the alert can be closed.
     */
    closable: PropTypes.bool,
    /**
     * How long before the alert disappears.
     */
    timeout: PropTypes.number,
    /**
     * A callback to be triggered when the close icon is clicked or when the timeout expires.
     */
    onClose: PropTypes.func

  }

  startTimer = () => {
    if (this.props.timeout) {
      this.setState({ timerStart: new Date(), timer: setTimeout(this.closeAlert, this.state.timeout) })
    }
  }

  pauseTimer = () => {
    clearTimeout(this.state.timer)
    let timeout = this.state.timeout

    timeout -= new Date() - this.state.timerStart

    this.setState({ timeout: timeout })
  }

  closeAlert = () => {
    if (this.state.timer) {
      clearTimeout(this.state.timer)
    }
    this.props.onClose()
  }

  componentDidMount = () => {
    this.startTimer()
  }

  render() {
    const cx = classNames.bind(style)
    const alertClasses = cx(style.alert, this.props.optClass, this.props.type, (this.props.closable ? 'closable' : ''))
    const alertIcons = {
      success: 'md-success',
      warning: 'md-warning',
      info: 'md-info',
      danger: 'md-danger'
    }

    return (
      <div className={alertClasses} onMouseOver={this.pauseTimer} onMouseOut={this.startTimer}>
        {this.props.closable ? <div className={style['close-icon']} onClick={this.closeAlert}><Icon name='md-close' width='12' height='12' /></div> : null}
        <Icon name={alertIcons[this.props.type]} width='17' height='17' />
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default Alert
