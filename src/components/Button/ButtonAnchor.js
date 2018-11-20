import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import style from './style.scss'
import classNames from 'classnames/bind'

const ButtonAnchor = props => {
  const cx = classNames.bind(style)
  const collapseClass = props.collapse ? 'collapse' : null
  const btnAnchorClasses = cx(style.btn, props.optClass, props.size, collapseClass)

  let buttonAnchor

  const handleClick = e => {
    if (props.disabled) {
      e.preventDefault()
    }
  }

  if (props.internal) {
    buttonAnchor = <Link to={props.path} className={btnAnchorClasses} size={props.size} disabled={props.disabled} onClick={handleClick}>{props.children}</Link>
  } else {
    buttonAnchor = <a href={props.path} className={btnAnchorClasses} target={props.target} disabled={props.disabled} onClick={handleClick}>{props.children}</a>
  }
  return buttonAnchor
}

ButtonAnchor.propTypes = {
  /**
   * Optional styles to add to the button.
   */
  optClass: PropTypes.string,
  /**
   * The size of button.
   */
  size: PropTypes.string,
  /**
   * Whether the button is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * A path to pass to the anchor tag.
   */
  path: PropTypes.string,
  /**
   * Whether the link it to an internal page, or external (default)
   */
  internal: PropTypes.bool,
  /**
   * Whether to display only an icon on small screens
   */
  collapse: PropTypes.bool
}

export default ButtonAnchor
