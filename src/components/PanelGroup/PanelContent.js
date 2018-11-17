import React from 'react'
import PropTypes from 'prop-types'
import optclass from '../internal/OptClass'
import style from './style.scss'

class PanelContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const panelContentClasses = optclass(style, 'panel-content', this.props.optClass)

    return (
      <div className={panelContentClasses}>
        {this.props.children}
      </div>
    )
  }
}

PanelContent.propTypes = {
  /**
   * Optional CSS class(es) to be used for local styles (string or array of strings)
   */
  optClass: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ])
}

export default PanelContent
