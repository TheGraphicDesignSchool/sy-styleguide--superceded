import React from 'react'
import PropTypes from 'prop-types'
import Input from '../Input/Input'
import colorLuminance from '../internal/ColorLuminance'
import { SketchPicker } from 'react-color'
import enhanceWithClickOutside from 'react-click-outside'
import throttle from 'lodash/throttle'
import style from './style.scss'
import classNames from 'classnames/bind'

/**
 * The ColorPicker component.
 */
export class ColorPicker extends React.Component {
  constructor(props) {
    super(props)

    this.throttle = throttle((fn, data) => {
      fn(data)
    }, 200)
  }

  state = {
    displayColorPicker: false,
    color: ''
  }

  static defaultProps = {
    value: ''
  }

  static propTypes = {
    /**
     * Hex color value.
     */
    value: PropTypes.string,
    /**
     * A callback function to be called when the color changes.
     */
    changeCallback: PropTypes.func,
    /**
     * An optional CSS class to be used for local styles
     */
    optClass: PropTypes.string
  }

  componentWillMount = () => {
    if (typeof this.props.value !== 'undefined') {
      this.setState({color: this.props.value})
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.value !== this.props.value) {
      this.setState({ color: nextProps.value })
    }
  }

  handleClick = event => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClickOutside() {
    this.setState({ displayColorPicker: false })
  }

  handlePickerChange = color => {
    let newColor = color.hex

    this.setState({ color: newColor }, function () {
      if (typeof this.props.changeCallback === 'function') {
        this.throttle(this.props.changeCallback, {
          target: {
            name: this.props.name,
            value: newColor
          }
        })
      }
    })
  }

  handleInputChange = event => {
    let newColor = ''

    if (event.target.value && !event.target.value.startsWith('#')) {
      newColor = '#'
    }

    newColor += event.target.value

    this.setState({ color: newColor }, function () {
      if (typeof this.props.changeCallback === 'function') {
        this.props.changeCallback({
          target: {
            name: this.props.name,
            value: newColor
          }
        })
      }
    })
  }

  render() {
    const cx = classNames.bind(style)
    const componentClass = cx(style['colorpicker-component'], this.props.optClass)
    const colorPreviewClass = cx(style['color-preview'], (this.state.color ? '' : 'empty'))

    return (
      <div className={componentClass}>
        <Input
          value={this.state.color.toUpperCase()}
          placeholder='Click to choose a color'
          onClick={this.handleClick}
          changeCallback={this.handleInputChange}
        />
        <div
          className={colorPreviewClass}
          style={{backgroundColor: this.state.color, border: '1px solid ' + colorLuminance(this.state.color || '#ffffff', -0.20)}}
          onClick={this.handleClick}>
        </div>
        { this.state.displayColorPicker
          ? <div className={style['sketch-container']} ref={c => this._sketchContainer = c}>
            <SketchPicker color={ this.state.color } onChange={this.handlePickerChange} presetColors={[]} />
          </div>
          : null
        }
      </div>
    )
  }
}

export default enhanceWithClickOutside(ColorPicker)
