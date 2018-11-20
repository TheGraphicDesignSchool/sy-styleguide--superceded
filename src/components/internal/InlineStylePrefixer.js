import {createPrefixer} from 'inline-style-prefixer'

const InlineStylePrefixer = styles => {

  const prefixer = createPrefixer()
  const prefixedStyles = prefixer.prefix(styles)

  return prefixedStyles
}

export default InlineStylePrefixer
