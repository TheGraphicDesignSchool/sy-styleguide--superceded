import React from 'react'
import PropTypes from 'prop-types'
import optclass from './OptClass'
import Button from '../../components/Button/index'
import colors from './colors'

const ConfirmationOverlay = ({ prompt, handleConfirmation }) => {
  const getTextStyle = () => {
    return {
      fontSize: '14px',
      fontWeight: '600',
      color: colors.primary4,
      margin: '0 0 24px',
      display: 'block'
    }
  }

  const getButtonWrapperStyle = () => {
    return {
      display: 'flex',
      justifyContent: 'flex-end',
      marginRight: '-12px'
    }
  }

  return (
    <div>
      <span style={getTextStyle()}>{prompt || 'Are you sure?'}</span>
      <div style={getButtonWrapperStyle()}>
        <Button onClick={handleConfirmation.bind(this, false)} optClass='danger-alt'>Cancel</Button>
        <Button onClick={handleConfirmation.bind(this, true)}>Yes</Button>
      </div>
    </div>
  )
}

ConfirmationOverlay.propTypes = {
  prompt: PropTypes.string,
  handleConfirmation: PropTypes.func.isRequired
}

export default ConfirmationOverlay
