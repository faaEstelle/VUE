/**
 * Created by admin on 2017/3/27.
 */
import { resolve, delimiter, dirname, } from 'path'
import { existsSync, readFile, writeFile } from 'fs'
import LogHelper from './LogHelper'

// import Common from './Common'

let java,//声明java 对象和静态类
  JavaClass = {}//声明java包

/**
 * 初始化Java
 */
function Init () {
  try {
    java.classpath.push(resolve(__dirname, '../Java/Pyramid.jar'))//引用jar包
    LogHelper.writeInfo('Java Init')
  } catch (err) {
    LogHelper.writeErr(err)
  }
}

/**
 *@param {String} Class 类名
 * 等待Java程序初始化
 */
function InitClass (Class) {
  return new Promise((resolve, reject) => {
    java.newInstance('file.' + Class, (err, NewClass) => {//实例化Java类
      if (err) {//实例化错误
        LogHelper.writeErr(err)
        reject(err)
      } else {
        JavaClass[Class] = NewClass
        resolve(true)
      }
    })
  })
}

/**
 * 检测Jre环境是否存在
 */
function CheckedJre () {
  LogHelper.writeInfo('Checking Jre')
  let dll, dylib, so, soFiles, binary, home = __dirname,
    jvmPathx86 = resolve(__dirname, '../jre/bin/client/jvm.dll'),
    jvmPathx64 = resolve(__dirname, '../jre/bin/server/jvm.dll')
  dll = existsSync(jvmPathx86) ? jvmPathx86 : jvmPathx64

  binary = dll || dylib || so

  let jvm_dll_path = resolve(__dirname, '../node_modules/java/build/jvm_dll_path.json')
  let jvmPath = binary ? JSON.stringify(delimiter + dirname(resolve(home, binary))) : '""'
  if (existsSync(jvm_dll_path)) {
    readFile(jvm_dll_path, (err, text) => {
      if (err) LogHelper.writeErr(err)
      if (text.toString() === jvmPath) {
        ImportJava()
      } else {
        WriteJvmPath()
      }
    })
  } else {
    WriteJvmPath()
  }

  /**
   * 写入Jvm路径
   */
  function WriteJvmPath () {
    LogHelper.writeInfo('WriteJvmPath')
    writeFile(jvm_dll_path, jvmPath, (err) => {
      if (!err) {ImportJava()} else {
        LogHelper.writeErr(err)
      }
    })
  }

  /**
   * 导入java
   */
  function ImportJava () {
    LogHelper.writeInfo('ImportJava')
    import('java').then((module) => {
      java = module
      Init()
    }).catch((err) => {
      LogHelper.writeErr(err)
    })
  }

}

/**
 * 等待类实例化并统一执行
 * @param ClassName 类名
 * @param FuncName 方法名
 * @param Args 参数
 */
async function WaitingFuncAndDo (ClassName, FuncName, Args) {
  return new Promise(async (resolve, reject) => {
    if (!JavaClass[ClassName]) if (!await InitClass(ClassName)) throw new Error(`类:${ClassName} 实例化失败`)
    Args[Args.length] = (err, Msg) => {
      if (err) {//调用失败
        LogHelper.writeErr(err)
        resolve({State: false, Msg: 'Call Method:' + FuncName + ' Error'})
      } else {//调用成功
        let Res
        try {
          Res = JSON.parse(Msg)//解析消息体
        } catch (err) {
          LogHelper.writeErr(err)
          resolve({State: false, Msg: '无法解析数据:' + Msg})
        }
        if (Res.State) {//成功消息
          resolve({State: true, Msg: Res.Msg, Data: Res.Data})
        } else {//错误消息
          resolve({State: false, Msg: Res.Msg})
        }
      }
    }
    JavaClass[ClassName][FuncName](...Args)
  })
}

class FileTool {
  constructor () {}

  /**
   * 加载文件到内存
   * @param {String} Path 文件路径
   * @return {Promise.<*>}
   */
  async ReadFile (Path) {
    return await WaitingFuncAndDo('FileTool', 'readFile', [Path])
  }

  /**
   * 获取文件中所有表名
   * @return {Promise.<*>}
   */
  async GetSheet () {
    return await WaitingFuncAndDo('FileTool', 'getSheet', [])
  }

  /**
   * 获取表中的第一行数据
   * @param {String} Sheet 表名
   * @return {Promise.<*>}
   */
  async GetHeard (Sheet) {
    return await WaitingFuncAndDo('FileTool', 'getHeard', [Sheet])
  }

  /**
   * 设置表数据
   * @param {String} Sheet 表名
   * @return {Promise.<*>}
   */
  async SetSheet (Sheet) {
    return await WaitingFuncAndDo('FileTool', 'setSheet', [Sheet])
  }

  /**
   * 设置数据
   * @param {Number} Id Id所在列
   * @param {Number} FId 父级Id所在列
   * @param {Number} Name 备注所在列
   * @return {Promise.<*>}
   */
  async SetModel (Id, FId, Name) {
    return await WaitingFuncAndDo('FileTool', 'setModel', [Id, FId, Name])
  }

  /**
   * 获取当前表的所有数据列表
   * @return {Promise.<*>}
   */
  async GetList () {
    return await WaitingFuncAndDo('FileTool', 'getList', [])
  }

  /**
   * 根据Id获取当前Id的树形
   * @return {Promise.<*>}
   */
  async GetTree (Id) {
    return await WaitingFuncAndDo('FileTool', 'getTree', [Id])
  }

  /**
   * 获取单挑数据的全部信息
   * @param {String} Id 选择的Id
   * @return {Promise.<*>}
   */
  async GetData (Id) {
    return await WaitingFuncAndDo('FileTool', 'getData', [Id])
  }

  /**
   * 获取所有定级Id
   * @return {Promise.<*>}
   */
  async GetTopList () {
    return await WaitingFuncAndDo('FileTool', 'getTopList', [])
  }
}

export default class Java {
  constructor () {
    CheckedJre()
    this.FileTool = new FileTool()
  }
}