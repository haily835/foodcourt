import Box from '@material-ui/core/Box'
import { makeStyle, styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

export const VoButton = styled(Button)({
  background: 'white',
  border: 1,
  borderRadius: 3,
  color: 'black',
  height: 48,
  padding: '0 30px',

})

export const VoBox = styled(Box)({
  background: 'lightblue',
  //paddingRight: 20,
})

export const NavButton = styled(Button)({
  color: 'white',
  fontSize: 14,
  border:1,
  borderRadius: 3,
  borderColor:'white',
})