import React from 'react'
import Spinner from '../Spinner'

describe('Spinner dots', () => {
  it('displays a spinner-dots class', () => {
    const spinner = shallow(<Spinner type='spinner-dots' />)
    expect(spinner).toMatchSnapshot()
  })
})

describe('Spinner bounce', () => {
  it('displays a spinner-bounce class', () => {
    const spinner = shallow(<Spinner type='spinner-bounce' />)
    expect(spinner).toMatchSnapshot()
  })
})

describe('Spinner circular', () => {
  it('displays a spinner-circular class', () => {
    const spinner = shallow(<Spinner type='spinner-circular' />)
    expect(spinner).toMatchSnapshot()
  })
})

describe('Spinner with loading true', () => {
  it('has a loading class', () => {
    const spinner = shallow(<Spinner loading={true} type='spinner-bounce' />)
    expect(spinner).toMatchSnapshot()
  })
})

describe('Spinner with fixed position', () => {
  it('has a loading class', () => {
    const spinner = shallow(<Spinner loading={true} type='spinner-bounce' position='fixed' />)
    expect(spinner).toMatchSnapshot()
  })
})

describe('Spinner with inline position', () => {
  it('has a loading class', () => {
    const spinner = shallow(<Spinner loading={true} type='spinner-bounce' position='inline' />)
    expect(spinner).toMatchSnapshot()
  })
})

describe('Spinner', () => {
  it('has an className', () => {
    const spinner = shallow(<Spinner loading={true} type='spinner-bounce' className='testing' />)
    expect(spinner).toMatchSnapshot()
  })
})

describe('Spinner', () => {
  it('has custom background color', () => {
    const spinner = shallow(<Spinner loading={true} type='spinner-bounce' color='#3C97D3' />)
    expect(spinner).toMatchSnapshot()
  })
})

describe('Spinner', () => {
  it('displays an is-hidden class', () => {
    const spinner = shallow(<Spinner loading={false} type='spinner-bounce' />)
    expect(spinner).toMatchSnapshot()
  })
})

describe('Spinner', () => {
  jest.useFakeTimers()

  it('calls a setTimeout when delay is passed', () => {
    const spinner = shallow(<Spinner loading={true} delay={1000} type='spinner-bounce' />)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
})
