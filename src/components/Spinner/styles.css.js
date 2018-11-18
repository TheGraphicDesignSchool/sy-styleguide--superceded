import { keyframes } from 'styled-components'
import colors from '../../styles/common/colors.css'
import { zLayers } from '../../styles/common/functions.css'

const dotsRotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const dotsBounce = keyframes`
  0%, 100% {
    transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
  }
`

const bounceDelay = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`

const ring = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const sharedSpinnerSettings = {
  alignItems: 'center',
  bottom: 0,
  justifyContent: 'center',
  left: 0,
  right: 0,
  top: 0
}

const loadingStyles = loading => loading ? { display: 'flex' } : {}
const hiddenStyles = hidden => hidden ? { display: 'none' } : {}
const positionStyles = position => {
  if (position === 'inline') return { display: 'inline-flex' }
  if (position === 'fixed') {
    return {
      ...sharedSpinnerSettings,
      position: 'fixed',
      zIndex: zLayers['spinner-fixed']
    }
  }
  if (position === 'absolute') {
    return {
        ...sharedSpinnerSettings,
        position: 'absolute',
        zIndex: zLayers['spinner-absolute']
      }
  }
}

const styles = ({ backgroundColor, color, hidden, loading, position, size }) => {
  return {
    backgroundColor: backgroundColor || colors.white,
    display: 'none',

    ...loadingStyles(loading),
    ...positionStyles(position),
    ...hiddenStyles(!loading),

    '.spinner-dots': {
      animation: `${dotsRotate} 2.0s infinite linear`,
      height: `${size || 40}px`,
      position: 'relative',
      width: `${size || 40}px`,

      '.dot1, .dot2': {
        animation: `${dotsBounce} 2.0s infinite ease-in-out`,
        backgroundColor: color || colors.primary_1,
        borderRadius: '100%',
        display: 'inline-block',
        height: '60%',
        position: 'absolute',
        top: 0,
        width: '60%'
      },
      '.dot2': {
        animationDelay: '-1.0s',
        backgroundColor: color || colors.danger,
        bottom: 0,
        top: 'auto'
      }
    },

    '.spinner-bounce': {
      '.bounce1, .bounce2, .bounce3': {
        animation: `${bounceDelay} 1.4s infinite ease-in-out both`,
        backgroundColor: color || colors.neutral_4,
        borderRadius: '100%',
        display: 'inline-block',
        height: `${size || 12}px`,
        marginRight: '3px',
        width: `${size || 12}px`
      },
      '.bounce1': {
        animationDelay: '-0.32s'
      },
      '.bounce2': {
        animationDelay: '-0.16s'
      },
      '.bounce3': {
        marginRight: 0
      }
    },

    '.spinner-circular': {
      display: 'flex'
    },
    '.ring': {
      display: 'inline-block',
      position: 'relative',
      width: `${size || 16}px`,
      height: `${size || 16}px`,
      '> span': {
        boxSizing: 'border-box',
        display: 'block',
        position: 'absolute',
        width: `${size || 16}px`,
        height: `${size || 16}px`,
        margin: 0,
        border: `${size ? size/8 : 2}px solid ${color || colors.neutral_4}`,
        borderRadius: '50%',
        borderColor: `${color || colors.neutral_4} transparent transparent transparent`,
        animation: `${ring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
        '&:nth-child(1)': {
          animationDelay: '-0.45s'
        },
        '&:nth-child(2)': {
          animationDelay: '-0.3s'
        },
        '&:nth-child(3)': {
          animationDelay: '-0.15s'
        }
      }
    }
  }
}

export default styles
