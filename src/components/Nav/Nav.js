import React from 'react'
import PropTypes from 'prop-types'
import Node from './Node'
import style from './style.scss'
import classNames from 'classnames/bind'

const Nav = props => {
  const cx = classNames.bind(style)
  const navClasses = cx(style.nav, props.optClass)

  const nodes = props.data.map((item, index) =>
    <Node node={item} children={item.nav} key={index} />
  )

  return (
    <div role='nav' className={navClasses}>
      <ul>
       {nodes}
      </ul>
    </div>
  )
}

Nav.propTypes = {
  /**
   * List of navigation items (see code sample)
   */
  data: PropTypes.array.isRequired,
  /**
   * An optional class name to pass along to the nav component.
   */
  optClass: PropTypes.string
}

export default Nav
