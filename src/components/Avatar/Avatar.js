import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import classNames from 'classnames/bind'

class Avatar extends React.Component {

  state = {
    // If image src was passed in, it is not yet loaded
    // Else, if letters were passed in, set loaded to true
    loaded: !this.props.src
  }

  static propTypes = {
    /**
     * Optional source of the image to load.
     */
    src: PropTypes.string,
    /**
     * Optional letters to display in lieu of an image.
     */
    letters: PropTypes.string,
    /**
     * Optional background for the letters.
     */
    letterBackgroundColor: PropTypes.string,
    /**
     * Optional alt text for the image
     */
    alt: PropTypes.string,
    /**
     * Optional size to constrain the image (only supports square images)
     */
    size: PropTypes.string,
    /**
     * Optional CSS class to pass to the badge.
     */
    optClass: PropTypes.string,
    /**
     * Option to turn the opacity fade off (defaults to true)
     */
    fadeIn: PropTypes.bool
  }

  static defaultProps = {
    fadeIn: true
  }

  /* If fadeIn is set to false,
   * or if it's a letter-based avatar,
   * set loaded to true, so it won't fade in */
  state = {
    loaded: !!(!this.props.fadeIn || !this.props.src)
  }

  /* If the source changes, and fadeIn
   * is set, fade in the new avatar */
  componentWillReceiveProps = nextProps => {
    if (nextProps.src !== this.props.src && this.props.fadeIn) {
      this.setState({ loaded: false })
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextProps.letters !== this.props.letters ||
      nextProps.src !== this.props.src ||
      nextProps.size !== this.props.size ||
      nextProps.fadeIn !== this.props.fadeIn ||
      nextState.loaded !== this.state.loaded
    )
  }

  getWrapperStyle = () => {
    return {
      backgroundColor: this.props.letterBackgroundColor || this.getBackgroundColor(),
      width: this.props.size + 'px',
      height: this.props.size + 'px'
    }
  }

  getBackgroundColor = () => {
    // If no letters passed in, but a src exists
    if (!this.props.letters && this.props.src) return 'transparent'

    // If no letters passed in, return a default color
    if (!this.props.letters) return '#F93943'

    switch (this.props.letters.charAt(0).toLowerCase()) {
      case 'a':
      case 'k':
      case 'u':
        return '#F93943'
      case 'b':
      case 'l':
      case 'v':
        return '#796DE8'
      case 'c':
      case 'm':
      case 'w':
        return '#6E3FAF'
      case 'd':
      case 'n':
      case 'x':
        return '#28D397'
      case 'e':
      case 'o':
      case 'y':
        return '#ED7C5A'
      case 'f':
      case 'p':
      case 'z':
        return '#F93983'
      case 'g':
      case 'q':
        return '#F9B339'
      case 'h':
      case 'r':
        return '#6BE2F9'
      case 'i':
      case 's':
        return '#AAE667'
      case 'j':
      case 't':
        return '#ED7BE9'
      default:
        return '#F93943'
    }
  }

  getTextStyle = () => {
    return {
      fontSize: (+this.props.size) * 0.6 + 'px'
    }
  }

  handleLoad = () => {
    this.setState({ loaded: true })
  }

  loadAvatar = () => {
    if (this.props.src) {
      return <img src={this.props.src} onLoad={this.handleLoad} alt={this.props.alt} height={this.props.size} />
    } else if (this.props.letters) {
      return (
        <div style={this.getWrapperStyle()}>
          <span style={this.getTextStyle()}>{this.props.letters.length <= 2 ? this.props.letters : this.props.letters.substr(0, 2)}</span>
        </div>
      )
    }
  }

  render() {
    const cx = classNames.bind(style)
    const avatarClasses = cx(style['avatar-wrapper'], (this.state.loaded ? 'loaded' : null), this.props.optClass, this.props.className)

    return (
      <div className={avatarClasses} style={this.props.size ? this.getWrapperStyle() : null}>
        {this.loadAvatar()}
      </div>
    )
  }
}

export default Avatar
