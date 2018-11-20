import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import classNames from 'classnames/bind'
import Alert from './Alert'

class AlertSystem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alerts: props.alerts
    }
  }

  static propTypes = {
    /**
     * The alerts to display.
     */
    alerts: PropTypes.array.isRequired,
    /**
     * Optional styles to add to the alert system component.
     */
    optClass: PropTypes.string,
    /**
     * Whether or not to slide the alerts in from the right
     */
    slideIn: PropTypes.bool
  }

  getAlerts = () => {
    return this.state.alerts.map((alert, index) =>
      !alert.hidden ? <Alert key={alert.key} type={alert.type || 'success'} optClass={alert.class || ''} closable={typeof alert.closable !== 'undefined' ? alert.closable : true} timeout={alert.timeout} onClose={this.removeAlert.bind(this, alert)}>{alert.content}</Alert> : null
    )
  }

  removeAlert = alert => {
    let alerts = this.state.alerts

    alerts.forEach((a, index) => {
      if (alert.key === a.key) {
        a.hidden = true

        if (typeof a.onClose === 'function') {
          a.onClose(alert)
        }
      }
    })

    this.setState({ alerts: alerts })
  }

  componentWillReceiveProps = nextProps => {
    let alerts = nextProps.alerts

    alerts.forEach((alert, index) => {
      if (!alert.key) {
        alert.key = (alert.type || 'success') + '-' + new Date().getTime()
      }
    })

    this.setState({ alerts: alerts })
  }

  render() {
    const cx = classNames.bind(style)
    const slideInClass = this.props.slideIn ? style['slide-in-right'] : null
    const alertSystemClasses = cx(style['alert-system'], slideInClass, this.props.optClass)

    return (
      <div className={alertSystemClasses}>
        {this.getAlerts()}
      </div>
    )
  }
}

export default AlertSystem
