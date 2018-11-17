import React from 'react'
import PropTypes from 'prop-types'
import optclass from '../internal/OptClass'
import Icon from '../Icon/index'
import Input from '../Input/index'
import TagList from '../internal/TagList'
import style from './style.scss'

class InputList extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    /**
     * The values of the options to be selected.
     */
    value: PropTypes.array,
    /**
     * A callback function to be called when an option is selected.
     */
    changeCallback: PropTypes.func,
    /**
     * Optional CSS class(es) to be used for local styles (string or array of strings)
     */
    optClass: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ])
  }

  generateOptionsList = o => {
    let options = o.map(v => {
      return {
        display: v,
        value: v
      }
    })

    return options
  }

  buildStatefromProps = value => {
    if (value instanceof Array && value.length > 0) {
      return {
        value: value,
        options: this.generateOptionsList(value)
      }
    }

    return { value: [], options: [] }
  }

  state = this.buildStatefromProps(this.props.value)

  componentWillReceiveProps = nextProps => {
    if (nextProps.value === this.state.value) {
      return
    }

    this.setState(this.buildStatefromProps(nextProps.value))
  }

  callback = () => {
    if (this.props.changeCallback) {
      this.props.changeCallback({
        target: {
          name: this.props.name,
          value: this.state.value
        }
      })
    }
  }

  onRemove = index => {
    let arr = this.state.value

    arr.splice(index, 1)
    this.setState({
      value: arr,
      options: this.generateOptionsList(arr)
    }, this.callback)
  }

  clearInput = () => {
    this.setState({currentValue: ''})
  }

  updateList = v => {
    let stateValue = this.state.value

    stateValue.push(v)
    const options = this.generateOptionsList(stateValue)

    this.setState({value: stateValue, options: options}, () => {
      this.callback()
      this.clearInput()
    })
  }

  handleKeyPress = event => {
    if (event.charCode === 13 && event.target.value) {
      this.updateList(event.target.value)
    }
  }

  handleKeyUp = event => {
    this.setState({currentValue: event.target.value})
  }

  handleClick = () => {
    if (this.state.currentValue) {
      this.updateList(this.state.currentValue)
    }

    this._input.focus()
  }

  render() {
    const inputListClasses = optclass(style, 'input-list-wrapper', this.props.optClass)

    return (
      <div className={inputListClasses}>
        <Input
          placeholder={this.props.placeholder}
          value={this.state.currentValue}
          onKeyUp={this.handleKeyUp}
          onKeyPress={this.handleKeyPress}
          ref={c => this._input = c}
        />
        <Icon name='plus' className={style['input-list-add-item']} width='14' height='14' fill='#9198A0' onClick={this.handleClick} />
        <TagList tags={this.state.options} displayProp='display' onRemove={this.onRemove} />
      </div>
    )
  }
}

export default InputList
