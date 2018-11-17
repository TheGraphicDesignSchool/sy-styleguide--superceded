import React from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import SortableItem from './SortableItem'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import CustomDragLayer from './CustomDragLayer'
import style from './style.scss'

export class SortableList extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    /**
     * Items to display in the list.
     */
    items: PropTypes.array.isRequired,
    /**
     * Name of the SortableList.
     */
    name: PropTypes.string,
    /**
     * A callback function to be called when the order of the items changes or when an item is toggled.
     */
    changeCallback: PropTypes.func,
    /**
     * Whether the order numbers are hidden.
     */
    hideOrderNumbers: PropTypes.bool,
    /**
     * A callback function to be called when dragging starts.
     */
    onDragStart: PropTypes.func,
    /**
     * A callback function to be called when dragging stops.
     */
    onDragStop: PropTypes.func,
    /**
     * Optional styles to add to the SortableList component.
     */
    optClass: PropTypes.string
  }

  state = {
    items: this.props.items,
    dragging: false,
    width: 0,
    left: 0
  }

  handleResize = () => {
    if (this._sortableList) {
      this.setState({
        width: this._sortableList.getBoundingClientRect().width,
        top: this._sortableList.getBoundingClientRect().top
      })
    }
  }

  componentDidMount = () => {
    this.handleResize()

    // Add event listener
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount = () => {
    // Remove event listener
    window.removeEventListener('resize', this.handleResize)
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ items: nextProps.items })
  }

  moveSortableItem = (dragIndex, hoverIndex) => {
    const { items } = this.state
    const dragSortableItem = items[dragIndex]

    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragSortableItem]
        ]
      }
    }), function () {
      if (this.props.changeCallback) {
        this.props.changeCallback({
          target: {
            name: this.props.name,
            value: this.state.items
          }
        })
      }
    })
  }

  toggleSortableItem = index => {
    let items = this.state.items

    items[index].active = !items[index].active

    this.setState(update(this.state, {
      items: { $set: items }
    }), function () {
      if (this.props.changeCallback) {
        this.props.changeCallback({
          target: {
            name: this.props.name,
            value: this.state.items
          }
        })
      }
    })
  }

  onDragStart = () => {
    this.setState({ dragging: true }, function () {
      if (this.props.onDragStart) {
        this.props.onDragStart()
      }
    })
  }

  onDragStop = () => {
    this.setState({ dragging: false }, function () {
      if (this.props.onDragStop) {
        this.props.onDragStop()
      }
    })
  }

  render = () => {
    const { items } = this.state
    const { hideOrderNumbers } = this.props

    return (
      <div className={style['sortable-list-container']} ref={c => this._sortableList = c}>
        <div className={style['sortable-list']}>
          {items.map((item, i) => {
            return (
              <SortableItem
                key={item.value}
                index={i}
                value={item.value}
                text={item.text}
                active={item.active}
                moveSortableItem={this.moveSortableItem}
                toggleSortableItem={this.toggleSortableItem}
                getDimensions={this.handleResize}
                onDragStart={this.onDragStart}
                onDragStop={this.onDragStop}
                count={items.length}
                hideOrderNumber={hideOrderNumbers}
              />
            )
          })}
        </div>
        {
          this.state.dragging &&
          <CustomDragLayer
            dimensions={{ width: this.state.width, top: this.state.top }}
            count={this.state.items.length}
            hideOrderNumber={hideOrderNumbers}
          />
        }
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(SortableList)
