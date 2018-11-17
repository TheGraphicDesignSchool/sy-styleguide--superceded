import classNames from 'classnames/bind'

const OptClass = (context, internal, optClass, className) => {
  const cx = classNames.bind(context)

  optClass = typeof optClass === 'string' ? optClass.split(' ') : optClass
  internal = typeof internal === 'string' ? internal.split(' ') : internal

  let arr = [internal]

  if (optClass !== undefined) {
    arr.push(optClass)
  }

  if (className !== undefined) {
    arr.push(className)
  }

  return cx(arr)
}

export const mapOptClass = (optClass, styles) => {
  if (!optClass) return styles.default
  const definedStyles = Object.keys(styles)

  if (definedStyles.includes(optClass)) return styles[optClass]

  let renderedStyles = styles.default

  definedStyles
    .filter(a => optClass.includes(a))
    .reverse()
    .forEach(item => {
      renderedStyles = { ...renderedStyles, ...styles[item] }
    })

  return renderedStyles
}

export default OptClass
