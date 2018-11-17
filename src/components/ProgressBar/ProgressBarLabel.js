import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const ProgressBarLabel = props => {
  return (
    <label className={style.label}>{ props.text }
      { props.showPercentage ? <span className={style.percentage}>({ props.percentage }%)</span> : null }
    </label>
  )
}

ProgressBarLabel.propTypes = {
  text: PropTypes.string,
  percentage: PropTypes.number,
  showPercentage: PropTypes.bool
}

export default ProgressBarLabel
