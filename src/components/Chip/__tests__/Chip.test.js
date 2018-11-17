import React from 'react'
import Chip from '../Chip'

describe('Chip', () => {
  it('should render with the primary color', () => {
    const chip = shallow(<Chip color='primary' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the primary-1 color', () => {
    const chip = shallow(<Chip color='primary-1' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the primary-2 color', () => {
    const chip = shallow(<Chip color='primary-2' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the primary-3 color', () => {
    const chip = shallow(<Chip color='primary-3' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the primary-4 color', () => {
    const chip = shallow(<Chip color='primary-4' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the primary-5 color', () => {
    const chip = shallow(<Chip color='primary-5' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the primary-darker color', () => {
    const chip = shallow(<Chip color='primary-darker' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the primary-6 color', () => {
    const chip = shallow(<Chip color='primary-6' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the neutral-1 color', () => {
    const chip = shallow(<Chip color='neutral-1' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the neutral-2 color', () => {
    const chip = shallow(<Chip color='neutral-2' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the neutral-3 color', () => {
    const chip = shallow(<Chip color='neutral-3' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the neutral-4 color', () => {
    const chip = shallow(<Chip color='neutral-4' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the danger color', () => {
    const chip = shallow(<Chip color='danger' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the success color', () => {
    const chip = shallow(<Chip color='success' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the warning color', () => {
    const chip = shallow(<Chip color='warning' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with the info color', () => {
    const chip = shallow(<Chip color='info' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with a className', () => {
    const chip = shallow(<Chip className='classy-class' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with text', () => {
    const chip = shallow(<Chip text='text' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with a larger size', () => {
    const chip = shallow(<Chip size='larger' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with a smaller size', () => {
    const chip = shallow(<Chip size='smaller' />)
    expect(chip).toMatchSnapshot()
  })

  it('should render with a style object', () => {
    const chip = shallow(<Chip size='smaller' style={{marginRight: '4px'}} />)
    expect(chip).toMatchSnapshot()
  })
})
