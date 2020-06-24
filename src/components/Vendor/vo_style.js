import Box from '@material-ui/core/Box'
import { makeStyle, styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export const VoButton = styled(Button)({
  background: 'white',
  border: 1,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'black',
  height: 48,
  padding: '0 30px',

})

export const VoBox = styled(Box)({
  background: 'lightblue',
})