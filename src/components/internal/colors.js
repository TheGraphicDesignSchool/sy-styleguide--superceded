const secondaryColors = {
  // Secondary Colors
  green: '#26B894',
  orange: '#F29C1E',
  red: '#E54C3B',
  aqua: '#62CAF3'
}

export const colors = {
  // Base Colors
  white: '#fff',
  black: '#000',

  // Neutral Colors
  neutral1: '#ECF0F0',
  neutral2: '#F7F7F9',
  neutral3: '#DEE0E3',
  neutral4: '#9198A0',

  // Primary Colors
  primary1: '#3C97D3',
  primary2: '#3178B7',
  primary3: '#1B252F',
  primary4: '#243140',
  primary4_5: '#233040',
  primary5: '#2D3E50',
  primary6: '#4F6A92',

  ...secondaryColors,

  // Contextual References
  danger: secondaryColors.red,
  warning: secondaryColors.orange,
  success: secondaryColors.green,
  info: secondaryColors.aqua,

  // Text Colors
  // 'base-text': primary-3 + 40%,
  navyText: '#233040',
  skyText: '#C8F0FF'

}

export default colors
