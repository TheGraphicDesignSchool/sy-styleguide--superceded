import React from 'react'
import PropTypes from 'prop-types'
import SortableItemPreview from './SortableItemPreview'
import { DragLayer } from 'react-dnd'
import style from './style.scss'

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props

  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    }
  }

  let { x, y } = currentOffset

  const transform = `translate(0px, ${y - props.dimensions.top - 10}px)`

  return {
    width: props.dimensions.width + 'px',
    transform: transform,
    WebkitTransform: transform
  }
}

class CustomDragLayer extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired,
    hideOrderNumber: PropTypes.bool
  }

  renderItem = (type, item, count, hideOrderNumber) => {
    return (
      <SortableItemPreview item={item} count={count} hideOrderNumber={hideOrderNumber} />
    )
  }

  render = () => {
    const { item, itemType, isDragging } = this.props

    if (!isDragging) {
      return null
    }

    return (
      <div className={style['drag-layer']}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item, this.props.count, this.props.hideOrderNumber)}
        </div>
      </div>
    )
  }
}

export default DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))(CustomDragLayer)
