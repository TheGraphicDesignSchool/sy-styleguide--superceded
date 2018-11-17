import React from 'react'
import { array, object, string } from 'prop-types'
import optclass from '../internal/OptClass'
import style from './style.scss'

const ValidatedField = WrappedComponent => {
  return class extends React.Component {
    static propTypes = {
      error: string
    }

    render = () => {
      const wrapperErrorClass = this.props.error ? 'has-error' : ''
      const validatedFieldClass = optclass(style, ['validated-field', wrapperErrorClass])

      return (
        <div className={validatedFieldClass}>
          <WrappedComponent {...this.props} />
          {this.props.error &&
            <span className={style['has-error__message']}>
              {this.props.error}
            </span>
          }
        </div>
      )
    }
  }
}

export default ValidatedField
