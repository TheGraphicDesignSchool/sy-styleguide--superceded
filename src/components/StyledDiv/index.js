import styled from 'styled-components'
import { object } from 'prop-types'

export const StyledDiv = styled.div`${props => props.css}`

StyledDiv.defaultProps = {
  css: {}
}

StyledDiv.propTypes = {
  css: object
}

export default StyledDiv
