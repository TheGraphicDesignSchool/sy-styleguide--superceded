import React from 'react'
import Avatar from '../Avatar'

let wrapper, inst

const data = {
  src: 'https://ambassador-api.s3.amazonaws.com/uploads/avatars/1088_2016_05_04_12_16_49.jpg',
  alt: 'Cat',
  size: '100',
  letterBackgroundColor: '#8b0000',
  letters: 'cf',
  fadeIn: true,
  optClass: 'test'
}

describe('Image-based Avatar', () => {
  it('should shallow render with image-related props', () => {
    const avatar = shallow(<Avatar
      src={data.src}
      alt={data.alt}
      size={data.size}
      fadeIn={data.fadeIn}
      optClass={data.optClass}
    />)
    expect(avatar).toMatchSnapshot()
  })
})


describe('Letter-based avatar', () => {
  it('should shallow render with letter-related properties', () => {
    const avatar = shallow(<Avatar
      letterBackgroundColor={data.letterBackgroundColor}
      letters={data.letters}
      size={data.size}
      fadeIn={data.fadeIn}
      optClass={data.optClass}
    />)
    expect(avatar).toMatchSnapshot()
  })
})

describe('sCU', () => {
  it('should only update under certain circumstances', () => {
    wrapper = shallow(<Avatar size='100' src='test' letters='aa' />)
  
    inst = wrapper.instance()
    let nextProps = {
      size: '100',
      src: 'test',
      letters: 'aa',
      fadeIn: true
    }
  
    let nextState = {
      loaded: false
    }
  
    expect(inst.shouldComponentUpdate(nextProps, nextState)).toBe(false)
    nextProps.size = '90'
    expect(inst.shouldComponentUpdate(nextProps, nextState)).toBe(true)
    nextProps.size = '100'
    expect(inst.shouldComponentUpdate(nextProps, nextState)).toBe(false)
    nextProps.letters = 'ab'
    expect(inst.shouldComponentUpdate(nextProps, nextState)).toBe(true)
    nextProps.letters = 'aa'
    expect(inst.shouldComponentUpdate(nextProps, nextState)).toBe(false)
    nextProps.src = 'test2'
    expect(inst.shouldComponentUpdate(nextProps, nextState)).toBe(true)
    nextProps.src = 'test'
    expect(inst.shouldComponentUpdate(nextProps, nextState)).toBe(false)
    nextState.loaded = true
    expect(inst.shouldComponentUpdate(nextProps, nextState)).toBe(true)
    nextProps.fadeIn = false
    expect(inst.shouldComponentUpdate(nextProps, nextState)).toBe(true)
  })  
})

describe('Background color based on letters logic', () => {
  it('should return a proper background color based on the first character of the letter', () => {
    const colorCases = [
        {character: undefined, color: '#F93943'},
        {character: 'k', color: '#F93943'},
        {character: 'u', color: '#F93943'},
        {character: 'b', color: '#796DE8'},
        {character: 'l', color: '#796DE8'},
        {character: 'v', color: '#796DE8'},
        {character: 'c', color: '#6E3FAF'},
        {character: 'm', color: '#6E3FAF'},
        {character: 'w', color: '#6E3FAF'},
        {character: 'd', color: '#28D397'},
        {character: 'n', color: '#28D397'},
        {character: 'x', color: '#28D397'},
        {character: 'e', color: '#ED7C5A'},
        {character: 'o', color: '#ED7C5A'},
        {character: 'y', color: '#ED7C5A'},
        {character: 'f', color: '#F93983'},
        {character: 'p', color: '#F93983'},
        {character: 'z', color: '#F93983'},
        {character: 'g', color: '#F9B339'},
        {character: 'q', color: '#F9B339'},
        {character: 'h', color: '#6BE2F9'},
        {character: 'r', color: '#6BE2F9'},
        {character: 'i', color: '#AAE667'},
        {character: 's', color: '#AAE667'},
        {character: 'j', color: '#ED7BE9'},
        {character: 't', color: '#ED7BE9'},
        {character: 'K', color: '#F93943'},
        {character: 'U', color: '#F93943'},
        {character: 'B', color: '#796DE8'},
        {character: 'L', color: '#796DE8'},
        {character: 'V', color: '#796DE8'},
        {character: 'C', color: '#6E3FAF'},
        {character: 'M', color: '#6E3FAF'},
        {character: 'W', color: '#6E3FAF'},
        {character: 'D', color: '#28D397'},
        {character: 'N', color: '#28D397'},
        {character: 'X', color: '#28D397'},
        {character: 'E', color: '#ED7C5A'},
        {character: 'O', color: '#ED7C5A'},
        {character: 'Y', color: '#ED7C5A'},
        {character: 'F', color: '#F93983'},
        {character: 'P', color: '#F93983'},
        {character: 'Z', color: '#F93983'},
        {character: 'G', color: '#F9B339'},
        {character: 'Q', color: '#F9B339'},
        {character: 'H', color: '#6BE2F9'},
        {character: 'R', color: '#6BE2F9'},
        {character: 'I', color: '#AAE667'},
        {character: 'S', color: '#AAE667'},
        {character: 'J', color: '#ED7BE9'},
        {character: 'T', color: '#ED7BE9'},
        {character: '0', color: '#F93943'},
        {character: '1', color: '#F93943'},
        {character: '2', color: '#F93943'},
        {character: '3', color: '#F93943'},
        {character: '4', color: '#F93943'},
        {character: '5', color: '#F93943'},
        {character: '6', color: '#F93943'},
        {character: '7', color: '#F93943'},
        {character: '8', color: '#F93943'},
        {character: '9', color: '#F93943'}
    ]

    wrapper = shallow(<Avatar letters='ab' />)

    inst = wrapper.instance()
    expect(inst.getBackgroundColor()).toBe('#F93943')

    for (let i = colorCases.length - 1; i >= 0; i--) {
      wrapper.setProps({ letters: colorCases[i].character})
      wrapper.update()
      expect(inst.getBackgroundColor()).toBe(colorCases[i].color)
    }
  })

  describe('transparent background color', () => {
    it('should set the background color to transparent when there are no letters', () => {
      wrapper = shallow(<Avatar src='test' />)
  
      inst = wrapper.instance()
      expect(inst.getBackgroundColor()).toBe('transparent')
    })
  })

  describe('style object for text', () => {
    it('should return a style object for the text', () => {
      wrapper = shallow(<Avatar size='100' />)
  
      inst = wrapper.instance()
      const style = inst.getTextStyle()
  
      expect(style.fontSize).toBe('60px')
    })
  })

  describe('style object for wrapper', () => {
    it('should return a style object for the wrapper', () => {
      wrapper = shallow(<Avatar size='100' letterBackgroundColor='#ffffff' />)
  
      inst = wrapper.instance()
      const style = inst.getWrapperStyle()
  
      expect(style.width).toBe('100px')
      expect(style.height).toBe('100px')
      expect(style.backgroundColor).toBe('#ffffff')
    })
  })

  describe('fallback avatar with no more than two letters', () => {
    it('should shallow render a fallback avatar with no more than two letters', () => {
      wrapper = shallow(<Avatar letters='cfffff' />)
  
      expect(wrapper.find('span').first().text()).toBe('cf')
    })
  })

  describe('fallback avatar', () => {
    it('should shallow render a fallback avatar', () => {
      wrapper = shallow(<Avatar letters='cf' />)
  
      expect(wrapper.find('img').length).toBe(0)
      expect(wrapper.find('div').length).toBe(2)
      expect(wrapper.find('span').length).toBe(1)
      expect(wrapper.find('span').first().text()).toBe('cf')
      expect(wrapper.state().loaded).toBe.true
    })
  })
})
