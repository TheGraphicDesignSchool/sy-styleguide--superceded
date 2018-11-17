import React from 'react'
import PropTypes from 'prop-types'

class TabTemplate extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    class: PropTypes.string
  }

  render() {
    const styles = {
      width: '100%',
      position: 'relative',
      textAlign: 'initial'
    }

    if (!this.props.active) {
      styles.height = 0
      styles.overflow = 'hidden'
      styles.padding = 0
      styles.border = 'none'
    }

    return (
      <div style={styles} className={this.props.class} aria-hidden={this.props.active}>
        {this.props.children}
      </div>
    )
  }
}

export default TabTemplate
