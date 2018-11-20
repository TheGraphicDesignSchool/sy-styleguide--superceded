import React from 'react'
import PropTypes from 'prop-types'

import Badge from '../Badge/index'
import Toggle from '../Toggle/index'
import classNames from 'classnames/bind'
import style from './style.scss'

class SortableItemPreview extends React.Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    hideOrderNumber: PropTypes.bool
  }

  render = () => {
    const cx = classNames.bind(style)
    const { count, hideOrderNumber, item } = this.props
    const previewClasses = cx(style['sortable-item'], style.preview, !item.active && 'inactive', (item.index !== count - 1) && 'bottom-border')
    const badgeOpacity = count > 1 ? 1 - ((0.6 / (count - 1)) * item.index) : 1

    return (
      <div className={previewClasses}>
        {
          !hideOrderNumber &&
          <div style={{ opacity: badgeOpacity }}><Badge text={item.index + 1} theme='sky' optClass={style['sortable-item-badge']} /></div>
        }
        <span>{item.text}</span>
        <div className={style.actions}>
          <Toggle value={item.active} optClass={style.toggle} />
          <div className={style.handle}><span></span><span></span><span></span><span></span></div>
        </div>
      </div>
    )
  }
}

export default SortableItemPreview
