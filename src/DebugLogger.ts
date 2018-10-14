import { ag } from 'airgram'
import Logger, { LogLevelConfig } from 'airgram/base/Logger'
import chalk from 'chalk'
import * as createLogger from 'debug'
import { injectable } from 'inversify'
import * as moment from 'moment'
import THEME, { LogLevelTheme } from './theme'

const writeLog = createLogger('airgram')

@injectable()
export default class DebugLogger extends Logger implements ag.Logger {
  public static TIME_FORMAT: string | false = 'HH:mm:ss.SSS'

  public static formatLevel (str: string, theme: LogLevelTheme): string {
    return `${this.format(str, chalk.inverse[theme.primary])}${' '.repeat(7 - str.length)}`
  }

  public static formatTime (str: string, theme: LogLevelTheme): string {
    return this.format(str, theme.primary)
  }

  public static formatNamespace (str: string, theme: LogLevelTheme): string {
    return this.format(str, theme.primary)
  }

  public static formatCallable (str: string, theme: LogLevelTheme): string {
    return this.format(str, theme.secondary)
  }

  public static formatQuoted (str: string, theme: LogLevelTheme): string {
    return this.format(str, theme.highlight)
  }

  private static format (str: string, formatter: string | ((str: string) => string)): string {
    const formatFn = typeof formatter === 'function' ? formatter : chalk[formatter]
    return formatFn(str)
  }

  protected formatMessage (message: string, { name }: LogLevelConfig) {
    const theme = THEME[name]
    const parts: string[] = [
      DebugLogger.formatLevel(name, theme)
    ]

    if (DebugLogger.TIME_FORMAT !== false && DebugLogger.TIME_FORMAT) {
      parts.push(DebugLogger.formatTime(moment().format(DebugLogger.TIME_FORMAT), theme))
    }

    parts.push(
      this.namespace.map((str: string) => `[${DebugLogger.formatNamespace(str, theme)}]`).join('')
    )

    // Extra namespace [SomeClass]
    message.replace(/^([\w\s[\]]\s*)?\[([\w]+)]/g, (all, prev, match) => {
      return `${prev || ''}[${DebugLogger.formatNamespace(match, theme)}]`
    })
    // Callable: someFunction()
    message.replace(/([.\w]+)\(\)/g, (all, match) => {
      return `${DebugLogger.formatCallable(match, theme)}()`
    })
    // Quoted: "someText"
    message.replace(/\s"([.:\w\d]+)"/, (all, match) => {
      return `"${DebugLogger.formatQuoted(match, theme)}"`
    })
    parts.push(message)

    return parts.join('')
  }

  protected log (level: LogLevelConfig, message: any) {
    writeLog(this.formatMessage(message, level))
  }
}
