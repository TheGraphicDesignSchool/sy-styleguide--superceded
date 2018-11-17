import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import classNames from 'classnames/bind'

class Tab extends React.Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
  }

  static propTypes = {
    /**
     * Whether the tab is active. Set by the tab wrapper component.
     */
    active: PropTypes.bool,
    /**
     * Whether the tab is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * The tab count.
     */
    count: PropTypes.number,
    /**
     * Optional styles to add to the tab header.
     */
    optClass: PropTypes.string,
    /**
     * Optional styles to add to the tab content.
     */
    optTabContentClass: PropTypes.string,
    /**
     * The tab title.
     */
    title: PropTypes.string.isRequired,
    /**
     * Optional title prefix renders in front of the title.
     */
    titlePrefix: PropTypes.node,
    /**
    * Optional title suffix renders after the title
    */
    titleSuffix: PropTypes.node
  }

  formatCount = () => {
    // Add thousands separator (',')
    return this.props.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  handleClick = event => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event, this)
    }
  }

  render() {
    const cx = classNames.bind(style)
    const tabActiveClass = (this.props.active) ? 'active' : null
    const tabDisabledClass = (this.props.disabled) ? 'disabled' : null
    const tabClasses = cx(style.tab, this.props.optClass, tabActiveClass, tabDisabledClass)

    return (
      <div className={tabClasses} onClick={this.handleClick} aria-selected={this.props.active}>
        {this.props.titlePrefix}
        {this.props.title} {this.props.count
          ? <span className={style.count}>({this.formatCount()})</span>
          : null}
        {this.props.titleSuffix}
      </div>
    )
  }
}

export default Tab
