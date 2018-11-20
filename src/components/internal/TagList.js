import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import style from './style.scss'

class TagList extends React.Component {

  static defaultProps = {
    tags: []
  }

  static propTypes = {
    /**
     * Tags to display.
     */
    tags: PropTypes.array.isRequired,
    /**
     * Which field in the tag will be displayed.
     */
    displayProp: PropTypes.string.isRequired,
    /**
     * A callback function to be called when a tag is removed.
     */
    onRemove: PropTypes.func.isRequired
  }

  removeTag = index => {
    this.props.onRemove(index)
  }

  renderTags = () => {
    return this.props.tags.map((tag, index) =>
      <li key={index}><span className={style['text']}>{tag[this.props.displayProp]}</span><Icon name='md-remove' fill='#9198A0' onClick={this.removeTag.bind(this, index)} width='12' height='12'/></li>
    )
  }

  render() {
    return (
      <ul className={style.taglist}>
        {this.renderTags()}
      </ul>
    )
  }
}

export default TagList
