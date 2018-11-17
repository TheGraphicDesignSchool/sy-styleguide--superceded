// Minima of each width category
const viewportWidthTiny = 375
const viewportWidthSmall = 768
const viewportWidthMedium = 992
const viewportWidthLarge = 1200
const viewportWidthXLarge = 1680
const viewportHeightSmall = 600

// Maxima of each width category
const viewportWidthExtraSmallMax = viewportWidthSmall - 1
const viewportWidthSmallMax = viewportWidthMedium - 1
const viewportWidthMediumMax = viewportWidthLarge - 1
const viewportWidthLargeMax = viewportWidthXLarge - 1
const viewportHeightSmallMax = viewportHeightSmall - 1

// Strings usable directly after '@media'
export const mediaSmallMinus = `@media(max-width: ${viewportWidthSmallMax}px)`
export const mediaSmallPlus = `@media(min-width: ${viewportWidthSmall}px)`
export const mediaMediumPlus = `@media(min-width: ${viewportWidthMedium}px)`
export const mediaMediumMinus = `@media(max-width: ${viewportWidthMediumMax}px)`
export const mediaLargePlus = `@media(min-width: ${viewportWidthLarge}px)`
export const mediaLargeMinus = `@media(max-width: ${viewportWidthLargeMax}px)`

export const mediaTiny = `@media(max-width: ${viewportWidthTiny}px)`
export const mediaExtraSmall = `@media(max-width: ${viewportWidthExtraSmallMax}px)`
export const mediaSmall = `@media(${mediaSmallPlus} and ${mediaSmallMinus}`
export const mediaMedium = `@media(${mediaMediumPlus} and ${mediaMediumMinus}`
export const mediaLarge = `@media(${mediaLargePlus} and ${mediaLargeMinus}`
export const mediaXLarge = `@media(min-width: ${viewportWidthXLarge}px)`

export const mediaHeightSmall = `@media(max-height: ${viewportHeightSmallMax}px)`
