import React from 'react'
import PropTypes from 'prop-types'
import optclass from '../internal/OptClass'
import style from './style.scss'

const Chip = props => {
  const isActionable = props.clickCallback ? 'is-actionable' : null
  const chipClasses = optclass(style, ['chip-wrapper', props.color, props.size, props.optClass, props.className, isActionable])

  return (
    <span className={chipClasses} style={props.style}>
      <span onClick={props.clickCallback}>{props.text}</span>
    </span>
  )
}

Chip.propTypes = {
  /**
   * The background color of the chip (see Foundations > Colors for more info).
   */
  color: PropTypes.oneOf([
    'primary',
    'primary-1',
    'primary-2',
    'primary-3',
    'primary-4',
    'primary-5',
    'primary-darker',
    'primary-6',
    'neutral-1',
    'neutral-2',
    'neutral-3',
    'neutral-4',
    'danger',
    'success',
    'warning',
    'info'
  ]),
  /**
   * Optional click callback.
   */
  clickCallback: PropTypes.func,
  /**
   * Optional styles to add to the chip.
   */
  optClass: PropTypes.string,
  /**
   * Optional size of the chip.
   */
  size: PropTypes.oneOf(['larger', 'smaller']),
  /**
   * Optional style object to be added for additional CSS.
   */
  style: PropTypes.object,
  /**
   * Text to display inside the chip.
   */
  text: PropTypes.string
}

Chip.defaultProps = {
  color: 'primary'
}

export default Chip
