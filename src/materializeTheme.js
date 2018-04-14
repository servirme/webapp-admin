import { createMuiTheme } from 'material-ui/styles'
import purple from 'material-ui/colors/purple'
import green from 'material-ui/colors/green'

// https://material-ui-next.com/customization/themes/
const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
})

export default theme
