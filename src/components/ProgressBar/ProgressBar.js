import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ProgressBarLabel from './ProgressBarLabel'
import style from './style.scss'

/**
 * The ProgressBar fills from 0% to 100% to show the progress of a task.
 */
const ProgressBar = props => {
  let percentage = props.value > props.denominator ? 100 : (props.value / props.denominator) * 100
  let progressStyles = classNames(style['progress-bar'], style[props.optClass])

  return (
    <div className={progressStyles}>
      { props.label ? <ProgressBarLabel text={ props.label } showPercentage={ props.showPercentage } percentage={ percentage } /> : null }
      <div className={style.outer}>
        <div className={style.inner} style={ {left: (percentage - 100) + '%'} }></div>
      </div>
    </div>
  )
}

ProgressBar.defaultProps = {
  optClass: 'danger',
  denominator: 100,
  value: 0,
  showPercentage: false
}

ProgressBar.propTypes = {
  /**
   * The value of progress.
   */
  value: PropTypes.number.isRequired,
  /**
   * The max value of progress.
   */
  denominator: PropTypes.number.isRequired,
  /**
   * Text shown above the progress bar.
   */
  label: PropTypes.string,
  /**
   * Show or hide the percentage with the progress bar.
   */
  showPercentage: PropTypes.bool,
  /**
   * Optional styles to add to the progress bar component.
   */
  optClass: PropTypes.string
}

export default ProgressBar
