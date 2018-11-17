import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import style from './style.scss'

const Radio = props => {
  const {
    label,
    optClass,
    description,
    width,
    ...other
  } = props

  const cx = classNames.bind(style)
  const disabledClass = props.disabled ? style['radio-disabled'] : null
  const radioClass = cx(style['radio-component'], optClass, disabledClass)
  const labelWrapperClass = props.description ? style['label-group'] : null

  const handleChange = event => {
    event.persist()
    if (typeof props.changeCallback === 'function') {
      props.changeCallback(event, props.value)
    }
  }

  const getLabel = () => {
    if (props.label && props.description) {
      return <div className={style['label-wrapper']}>
        <label>
          <span className={style['label-title']}>{label}</span>
          <span className={style['label-description']}>{description}</span>
        </label>
      </div>
    }

    if (props.label) {
      return <label>{label}</label>
    }

    return null
  }

  return (
    <div className={radioClass} style={{minWidth: props.width}}>
      <input type="radio" onChange={handleChange} value={props.value} name={props.name} disabled={props.disabled} checked={props.checked}></input>
      <div className={labelWrapperClass}>
        <div className={style['radio-input']}></div>
        {getLabel()}
      </div>
    </div>
  )
}

Radio.defaultProps = {
  checked: false,
  disabled: false
}

Radio.propTypes = {
  /**
   * True if the option is checked.
   */
  checked: PropTypes.bool,
  /**
   * Whether the option is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Text shown next to the radio input element.
   */
  label: PropTypes.string,
  /**
   * Value of the option.
   */
  value: PropTypes.string,
  /**
   * Optional styles to add to the radio component.
   */
  optClass: PropTypes.string,
  /**
   * Name specified in the RadioGroup component.
   */
  name: PropTypes.string,
  /**
   * A callback function (from RadioGroup) to be called when the option is changed.
   */
  changeCallback: PropTypes.func,
  /**
   * An optional string that appears below the label
   */
  description: PropTypes.string,
  /**
   * An optional string that inlines a style tag with `width='<STRING>'`
   */
  width: PropTypes.string
}

export default Radio
