import React from 'react'
import PropTypes from 'prop-types'
import optclass from '../internal/OptClass'
import Icon from '../Icon/index'
import style from './style.scss'

class PanelHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    /**
     * A title to be passed into the header
     */
    title: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]),
    /**
     * An icon to be passed to the left of the header
     */
    contextIcon: PropTypes.string,
    /**
     * The size of the context icon
     */
    contextIconSize: PropTypes.string,
    /**
     * A node that can be passed to the left of the header
     */
    contextNode: PropTypes.node,
    /**
     * An object of properties that define an icon: name, size, fill
     */
    toggleIcon: PropTypes.object,
    /**
     * Optional CSS class(es) to be used for local styles (string or array of strings)
     */
    optClass: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ])
  }

  handleClick = event => {
    if (this.props.onPanelClick) {
      this.props.onPanelClick(event, this)
    }
  }

  render() {
    const iconProps = this.props.toggleIcon
    const title = typeof this.props.title === 'string' ? <h4>{this.props.title}</h4> : this.props.title
    const panelHeaderClasses = optclass(style, ['panel-header'], this.props.optClass)

    return (
      <div className={panelHeaderClasses} onClick={this.handleClick}>
        {
          !this.props.children
          ? <div>
              <div className={style['title-group']}>
                {this.props.contextNode ? <div className={style['context-node']}>{this.props.contextNode}</div> : null}
                {this.props.contextIcon
                  ? <div className={style['context-icon']}>
                      <Icon
                        name={this.props.contextIcon}
                        height={this.props.contextIconSize}
                        width={this.props.contextIconSize} />
                    </div>
                  : null}
                {title}
              </div>
              <div className={style['toggle-icon']}>
                {this.props.toggleIcon
                ? <Icon name={iconProps.name} height={iconProps.size} width={iconProps.size} />
                : <Icon name='md-keyboard-up' height='16' width='16' />
                }
              </div>
            </div>
          : this.props.children
        }
      </div>
    )
  }
}

export default PanelHeader
