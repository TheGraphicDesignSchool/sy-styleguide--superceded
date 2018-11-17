import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import classNames from 'classnames/bind'
import Badge from '../Badge/index'
import Toggle from '../Toggle/index'
import flow from 'lodash/flow'
import style from './style.scss'

const sortableItemSource = {
  beginDrag(props) {
    props.onDragStart()
    if (props.getDimensions) {
      props.getDimensions()
    }

    return {
      value: props.value,
      text: props.text,
      active: props.active,
      index: props.index
    }
  },
  endDrag(props) {
    props.onDragStop()
  }
}

const sortableItemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = (clientOffset ? clientOffset.y : 0) - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveSortableItem(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

class SortableItem extends React.Component {

  static propTypes = {
    /**
     * Binds to react-dnd connectDragSource method.
     */
    connectDragSource: PropTypes.func,
    /**
     * Binds to react-dnd connectDropTarget method.
     */
    connectDropTarget: PropTypes.func,
    /**
     * Binds to react-dnd connectDragPreview method.
     */
    connectDragPreview: PropTypes.func,
    /**
     * Index of the item in the list.
     */
    index: PropTypes.number,
    /**
     * Whether the item is being dragged.
     */
    isDragging: PropTypes.bool,
    /**
     * The value of the item.
     */
    value: PropTypes.any,
    /**
     * The text to display inside the item.
     */
    text: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]),
    /**
     * Whether the item is active.
     */
    active: PropTypes.bool,
    /**
     * A callback that gets triggered when the item is moved.
     */
    moveSortableItem: PropTypes.func,
    /**
     * A callback that gets triggered when the item is toggled.
     */
    toggleSortableItem: PropTypes.func,
    /**
     * The total number of items in the list.
     */
    count: PropTypes.number,
    /**
     * Whether the order number is hidden.
     */
    hideOrderNumber: PropTypes.bool
  }

  static defaultProps = {
    active: false
  }

  state = {
    count: this.props.count
  }

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    })
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.count !== this.state.count) {
      this.setState({ count: nextProps.count })
    }
  }

  toggleSortableItem = () => {
    this.props.toggleSortableItem(this.props.index)
  }

  render = () => {
    const cx = classNames.bind(style)
    const { text, index, active, isDragging, connectDragSource, connectDropTarget, canDrop, hideOrderNumber } = this.props
    const opacity = isDragging ? 0 : 1
    const badgeOpacity = this.state.count > 1 ? 1 - ((0.6 / (this.state.count - 1)) * index) : 1
    const sortableItemClasses = cx(style['sortable-item'], canDrop ? 'dragging' : '', !active ? 'inactive' : '')

    return connectDropTarget(
      <div style={{ opacity }} className={sortableItemClasses}>
        {
          !hideOrderNumber &&
          <div style={{ opacity: badgeOpacity }}><Badge text={index + 1} theme='sky' optClass={style['sortable-item-badge']} /></div>
        }
        <span>{text}</span>
        <div className={style.actions}>
          <Toggle value={active} optClass={style.toggle} changeCallback={this.toggleSortableItem} />
          {connectDragSource(<div className={style.handle}><span></span><span></span><span></span><span></span></div>)}
        </div>
      </div>
    )
  }
}

export default flow(
  DragSource('item', sortableItemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })),
  DropTarget('item', sortableItemTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop()
  }))
)(SortableItem)
