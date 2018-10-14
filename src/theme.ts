export interface LogLevelTheme {
  highlight: string
  primary: string
  secondary: string
}

const theme: { [key: string]: LogLevelTheme } = {
  debug: {
    highlight: 'yellow',
    primary: 'gray',
    secondary: 'magenta'
  },
  error: {
    highlight: 'yellow',
    primary: 'redBright',
    secondary: 'magenta'
  },
  info: {
    highlight: 'yellow',
    primary: 'green',
    secondary: 'magenta'
  },
  verbose: {
    highlight: 'yellow',
    primary: 'cyan',
    secondary: 'magenta'
  },
  warn: {
    highlight: 'yellow',
    primary: 'red',
    secondary: 'magenta'
  }
}

export default theme
