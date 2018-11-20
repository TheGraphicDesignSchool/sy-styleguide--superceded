import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Link } from 'react-router-dom'
import InlineStylePrefixer from '../internal/InlineStylePrefixer'
import optclass from '../internal/OptClass'
import Icon from '../Icon/index'
import style from './style.scss'

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    /**
     * The array of routes to generate the Breadcrumbs.
     */
    routes: PropTypes.array.isRequired,
    /**
     * Optional padding to add to the left and right side of the breadcrumb
    */
    padding: PropTypes.number,
    /**
     * Optional background color for overflow gradient on small screens
     * Defaults to white
    */
    gradientColor: PropTypes.string,
    /**
     * Optional CSS class to be used for local styles
     */
    optClass: PropTypes.string,
    /**
     * Whether the breadcrumbs are clickable or not
     */
    clickable: PropTypes.bool
  }

  static defaultProps = {
    clickable: false
  }

  state = {
    routes: Immutable.fromJS(this.props.routes)
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      routes: Immutable.fromJS(nextProps.routes)
    })
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (!Immutable.is(nextState.routes, this.state.routes)) return true

    return false
  }

  getGradientStyles = () => {
    let backgroundColor = this.props.gradientColor || '#fff'

    let styles = {
      background: `linear-gradient(90deg, rgba(255, 255, 255, 000.1), ${backgroundColor})`
    }

    return InlineStylePrefixer(styles)
  }

  getContainerStyles = () => {
    let styles = {
      marginLeft: this.props.padding || '0px',
      paddingRight: this.props.padding || '0px'
    }

    return InlineStylePrefixer(styles)
  }

  getPath = index => {
    let parts = []

    for (let i = 0; i <= index; i++) {
      if (this.state.routes.getIn([i, 'path']) !== '/') {
        parts.push(this.state.routes.getIn([i, 'path']))
      }
    }

    return `/${parts.join('/')}`
  }

  breadcrumbNode = (title, index, firstItem) => {
    const lastItem = title === this.state.routes.filter(route => typeof route.get('title') !== 'undefined').last().get('title')

    const node = (
      <em key={index}>
        {!firstItem && <Icon name='md-chevron-right' className={style['md-chevron-right']} width='16' height='16' color='#879098' />}
        <span>{title}</span>
      </em>
    )

    return this.props.clickable && !lastItem ? <Link to={this.getPath(index)} key={index}>{node}</Link> : node
  }

  getTags = () => {
    let firstItem = true

    return this.state.routes.map((item, index) => {
      const title = item.get('title')

      if (title === undefined) return

      const breadcrumbNode = this.breadcrumbNode(title, index, firstItem)
      firstItem = false

      return breadcrumbNode
    })
  }

  render() {
    const breadcrumbClasses = optclass(style, ['breadcrumbs-outer'], this.props.optClass)

    const gradientColor = {
      color: this.props.gradientColor || 'white'
    }

    return (
      <div className={breadcrumbClasses}>
        <div className={style['overflow-gradient']} style={this.getGradientStyles()} />
        <div className={style['breadcrumbs-container']} style={this.getContainerStyles()}>
          <div className={style.breadcrumb}>{this.getTags()}</div>
        </div>
      </div>
    )
  }
}

export default Breadcrumb
