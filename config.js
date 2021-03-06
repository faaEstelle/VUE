'use strict'
import { resolve } from 'path'

const LogsPath = resolve((global.__dirname ? global.__dirname : __dirname), '../logs')

let config = {
  LogConfig: {//声明日志配置
    appenders: {
      out: {type: 'console'},
      info: {type: 'dateFile', filename: LogsPath, pattern: '/info/yyyyMMdd.log', alwaysIncludePattern: true},
      warn: {type: 'dateFile', filename: LogsPath, pattern: '/warn/yyyyMMdd.log', alwaysIncludePattern: true},
      error: {type: 'dateFile', filename: LogsPath, pattern: '/error/yyyyMMdd.log', alwaysIncludePattern: true},
      trace: {type: 'dateFile', filename: LogsPath, pattern: '/trace/yyyyMMdd.log', alwaysIncludePattern: true},
      debug: {type: 'dateFile', filename: LogsPath, pattern: '/debug/yyyyMMdd.log', alwaysIncludePattern: true},
      default: {type: 'dateFile', filename: LogsPath, pattern: '/default/yyyyMMdd.log', alwaysIncludePattern: true},
    },
    categories: {
      default: {appenders: ['out', 'default'], level: 'info'},
      logTrace: {appenders: ['trace'], level: 'trace'},
      logInfo: {appenders: ['info'], level: 'info'},
      logWarn: {appenders: ['warn'], level: 'warn'},
      logErr: {appenders: ['error'], level: 'error'},
      logDebug: {appenders: ['debug'], level: 'debug'}
    },
    replaceConsole: false,
  },
}

export default config
