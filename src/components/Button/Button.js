import React from 'react'
import Loader from 'react-loader'
import style from './style.scss'

import optclass, { mapOptClass } from '../internal/OptClass'
import colors from '../internal/colors'

const log = console.log

const Button = props => {
    const collapseClass = props.collapse ? 'collapse' : null
    const loaderClasses = props.loading ? 'loading' : null
    const btnClasses = optclass(style, [style.btn, props.size, loaderClasses, collapseClass], props.optClass, props.className)

    log(btnClasses)

    const styles = mapOptClass(props.optClass, {
        secondary: {
            color: colors.primary4
        },
        warning: {
            color: colors.white
        },
        inverted: {
            color: colors.primary1
        },
        danger: {
            color: colors.white
        },
        'danger-alt': {
            color: colors.danger
        },
        success: {
            color: colors.white
        },
        flat: {
            color: colors.neutral4
        },
        info: {
            color: colors.white
        },
        plain: {
            color: colors.primary4
        },
        'plain-light': {
            color: '#7b96b5'
        },
        default: {
            color: colors.white
        }
    })

    const spinnerOptions = {
        lines: 10,
        length: 4,
        width: 3,
        radius: 5,
        color: props.loaderColor || styles.color
    }

    return (
        <button
            type={props.type}
            style={props.style}
            className={btnClasses}
            disabled={props.disabled || props.loading}
            aria-disabled={props.disabled || props.loading}
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onMouseDown={props.onMouseDown}
            onMouseOut={props.onMouseOut}
            onMouseOver={props.onMouseOver}
            onMouseUp={props.onMouseUp}>
            { props.loading && <Loader loaded={false} options={spinnerOptions} /> }
            <em>{props.children}</em>
        </button>
    )
}

export default Button
