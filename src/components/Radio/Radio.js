import React from 'react'
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

export default Radio
