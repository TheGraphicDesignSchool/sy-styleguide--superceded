import React from 'react'
import PropTypes from 'prop-types'
import InlineStylePrefixer from '../internal/InlineStylePrefixer'

const Overlay = props => {

  const getStyles = function () {
    var style = {
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: 0,
      left: '-100%',
      opacity: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', // Remove mobile color flashing (deprecated)
      willChange: 'opacity',
      transform: 'translateZ(0)',
      zIndex: -1,
      transition: 'left 0ms, opacity 0.3s'
    }

    document.body.style.removeProperty('overflow')

    if (props.show) {
      document.body.style.overflow = 'hidden'
      style.left = 0
      style.opacity = 0.6
      style.transition = 'left 0ms, opacity 0.3s'
    }

    return InlineStylePrefixer(style)
  }

  var style = getStyles()

  const {
    show,
    ...other
  } = props

  return (
    <div {...other} style={style}>
    </div>
  )
}

Overlay.propTypes = {
  show: PropTypes.bool.isRequired
}

Overlay.defaultProps = {
  show: false
}

export default Overlay
