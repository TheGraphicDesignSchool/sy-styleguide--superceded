import colors from '../../styles/common/colors.css'
import { zLayers } from '../../styles/common/functions.css'

const styles = ({
  showing,
  position = 'bottom',
  parent = { width: 0, height: 0 },
  width = '300px'
}) => {
  const caretOffset = '-10px'
  const caretCenter = 'calc(50% - 10px)'
  const popoverOffset = `${Math.ceil(
    position === 'left' || position === 'right'
      ? parent.width
      : parent.height
  ) + 20}px`
  const popoverTransform =
    position === 'left' || position === 'right'
      ? `translateY(calc(-50% + ${parent.height / 2}px))`
      : `translateX(calc(-50% + ${parent.width / 2}px))`
  const caretPos = {
    left: { right: caretOffset, bottom: caretCenter },
    right: { left: caretOffset, bottom: caretCenter },
    top: { left: caretCenter, bottom: caretOffset },
    bottom: { left: caretCenter, top: caretOffset }
  }
  const popoverPos = {
    left: { right: popoverOffset, transform: popoverTransform },
    right: { left: popoverOffset, transform: popoverTransform },
    top: { bottom: popoverOffset, transform: popoverTransform },
    bottom: { top: popoverOffset, transform: popoverTransform }
  }

  return {
    display: 'inline-flex',
    position: 'relative',
    '> .popoverInner': {
      backgroundColor: colors.white,
      borderRadius: '3px',
      boxShadow: '0 8px 24px 0 rgba(27,37,47,0.16)',
      width,
      boxSizing: 'border-box',
      padding: '16px',
      position: 'absolute',
      ...popoverPos[position],
      transition: 'opacity .25s ease',
      visibility: showing ? 'visible' : 'hidden',
      opacity: showing ? 1 : 0,
      zIndex: zLayers.popover,

      '&:before': {
        backgroundColor: colors.white,
        borderRadius: '3px',
        content: '" "',
        height: '20px',
        position: 'absolute',
        transform: 'rotate(45deg)',
        width: '20px',
        ...caretPos[position]
      }
    },
    '.popoverContent': {
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      zIndex: 1,

      // Center the text on the popover-content buttons,
      // since we can't easily apply the `fill` class to each one
      // eg: buttons are implemented in a child component
      'button em': {
        display: 'block'
      }
    }
  }
}

export default styles
