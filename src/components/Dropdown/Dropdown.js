import React from 'react'
import PropTypes from 'prop-types'
import enhanceWithClickOutside from 'react-click-outside'
import Button from '../../components/Button/Button'
import StyledDiv from '../StyledDiv/index'
import styles from './styles.css'

export class Dropdown extends React.Component {
  constructor(props) {
    super(props)

    if (props.optClass && process.env.NODE_ENV !== 'production') {
      console.warn('Dropdown: Use of optClass will be deprecated as of react-ions 6.0.0, please use `className` instead')
    }
  }

  static defaultProps = {
    isOpened: false
  }

  static propTypes = {
    /**
     * A callback function to be called when dropdown isOpen state changes.
     */
    changeCallback: PropTypes.func,
    /**
     * Whether the dropdown is visible.
     */
    isOpened: PropTypes.bool,
    /**
     * The alignment of the dropdown with respect to the trigger.
     */
    alignment: PropTypes.oneOf(['left', 'right']),
    /**
     * Optional styles to add to the button. (DEPRECATED in react-ions 6.0.0, please use className instead)
     */
    optClass: PropTypes.string,
    /**
     * An element to pass as a target (number, string, node).
     */
    trigger: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.node
    ]),
    /**
     * Optional array of items used in a dropdown list
     */
    listItems: PropTypes.array,
    /**
     * Optional class to add to the popover.
     */
    className: PropTypes.string,
    /**
     * Whether the dropdown is disabled.
     */
    disabled: PropTypes.bool
  }

  static defaultProps = {
    alignment: 'left',
    isOpened: false
  }

  state = {
    isOpened: this.props.isOpened,
    clickedItem: null
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.isOpened !== this.state.isOpened) {
      this.setState({ isOpened: !!nextProps.isOpened })
    }
  }

  componentDidMount = () => {
    this.getTriggerRect()
  }

  toggleDropdown = e => {
    e.preventDefault()

    if (this.props.disabled) return

    this.setState({ isOpened: !this.state.isOpened }, () => {
      if (typeof this.props.changeCallback === 'function') {
        this.props.changeCallback(this.state.isOpened)
      }
    })
  }

  handleClickOutside = () => {
    if (!this.state.isOpened) return

    this.setState({ isOpened: false, confirmationOverlayOpen: false, clickedItem: null }, () => {
      if (typeof this.props.changeCallback === 'function') {
        this.props.changeCallback(this.state.isOpened)
      }
    })
  }

  listItemCallback = item => {
    this.setState({ isOpened: false, confirmationOverlayOpen: false, clickedItem: null })

    if (typeof item.callback === 'function') {
      item.callback(item.name)
    }
  }

  handleConfirmation = (confirm, e) => {
    // Since the dropdown is contained within the trigger, stop the click event
    // from propagating up (which causes toggleDropdown to be called unnecessarily)
    e.stopPropagation()

    if (confirm) {
      this.listItemCallback(this.state.clickedItem)
    } else {
      this.setState({ confirmationOverlayOpen: false, clickedItem: null })
    }
  }

  handleItemClick = (item, e) => {
    // Since the dropdown is contained within the trigger, stop the click event
    // from propagating up (which causes toggleDropdown to be called unnecessarily)
    e.stopPropagation()

    if (item.callbackConfirmation) {
      this.setState({ confirmationOverlayOpen: true, clickedItem: item })
    } else {
      this.listItemCallback(item)
    }
  }

  handleDropdownClick = e => {
    e.stopPropagation()
  }

  getTriggerRect = () => {
    this._triggerRect = this._trigger && this._trigger.getBoundingClientRect()
  }

  getTriggerNode = () => {
    return React.isValidElement(this.props.trigger) ? React.cloneElement(this.props.trigger, { disabled: this.props.disabled }) : this.props.trigger
  }

  render = () => {
    const listItems = this.props.listItems
    const listItemNodes = listItems instanceof Array
      ? listItems.map((item, index) =>
          <li key={index} onClick={this.handleItemClick.bind(this, item)}>{item.name}</li>
        )
      : []

    return (
      <StyledDiv
        css={styles({ ...this.props, isOpened: this.state.isOpened, triggerRect: this._triggerRect })}
        className={[this.props.optClass, this.props.className].join(' ').trim()}>

        <span ref={c => this._trigger = c} className='trigger' onClick={this.toggleDropdown}>
          {this.getTriggerNode()}
        </span>

        <div className='dropdown-wrapper' onClick={this.handleDropdownClick.bind(this)}>
          {
            listItemNodes.length > 0 && !this.state.confirmationOverlayOpen
            ? <ul className='list-wrapper'>
                {listItemNodes}
              </ul>
            : this.props.children
          }
          {
            this.state.confirmationOverlayOpen &&
              <div className='overlay'>
                <span>Are you sure?</span>
                <div className='button-wrapper'>
                  <Button onClick={this.handleConfirmation.bind(this, false)} optClass='danger-alt'>Cancel</Button>
                  <Button onClick={this.handleConfirmation.bind(this, true)}>Yes</Button>
                </div>
              </div>
          }
        </div>
      </StyledDiv>
    )
  }
}

export default enhanceWithClickOutside(Dropdown)
