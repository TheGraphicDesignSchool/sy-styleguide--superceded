import React from 'react'
import ButtonGroup from '../components/ButtonGroup'

export default () => {
    
    const options = [
        {
          value: 'option_1',
          label: 'Option 1'
        }, {
          value: 'option_2',
          label: 'Option 2'
        }, {
          value: 'option_3',
          label: 'Option 3'
        }, {
          value: 'option_4',
          label: 'Option 4'
        }, {
          value: 'option_5',
          label: 'Option 5'
        }
      ]
      
      return <ButtonGroup name="default-button-group" options={options} />
}