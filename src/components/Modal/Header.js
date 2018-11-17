import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import style from './header-styles.scss'

const Header = props => {
  const closeIcon = props.closeIcon || (<Icon name='md-close' width='15' height='15' onClick={props.handleClose} />)

  return (
    <div className={style['header-wrapper']}>
      <div className={style['header-content']}>
        {props.children}
      </div>
      <div className={style['modal-close']}>
        {closeIcon}
      </div>
    </div>
  )
}

Header.propTypes = {
  closeIcon: PropTypes.element,
  handleClose: PropTypes.func
}

export default Header
