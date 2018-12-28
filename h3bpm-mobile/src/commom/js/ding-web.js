import axios from 'axios'
import logger from './logger'
import { authCode, isObject } from './shared'

/**
 * [jsApiOAuth js-api 权限校验]
 * @param  {[type]} Config    [axios 配置对象]
 * @param  {[type]} jsApiList [需要权限校验的api列表]
 * @return {[type]}           [Promise]
 */
export function jsApiOAuth(Config, jsApiList) {
  if (process.env.NODE_ENV !== 'production') {
    if (!isObject(Config)) {
      logger.error('必须传入 axios 配置对象')
      return
    }
  }
  let params = Config.params || {}
  const href = params.href
  dd.error(function(error) {
    logger.error('dd js api OAuth error' + JSON.stringify(error))
  })
  if (process.env.NODE_ENV !== 'production') {
    if (!href) {
      logger.warn('参数 href 不能为空格')
    }
    if (href !== location.href) {
      logger.warn('传入的 href 参数 与 location.href 不相等')
    }
  }
  params.href = encodeURIComponent(href)
  Config.params = params
  return new Promise(function(resolve, reject) {
    axios(Config).then(function(response) {
      const data = response.data
      if (process.env.NODE_ENV !== 'production') {
        const checks = ['agentId', 'corpId', 'timeStamp', 'nonceStr', 'signature']
        const responseKey = Object.keys(data)
        checks.map(function(v) {
          const checkResult = responseKey.filter(function(k) { return v === k })
          if (checkResult.length === 0) {
            logger.warn('jsApiOAuth Response ' + v + ' 不能返回空')
          }
        })
      }
      if (data.errcode === 0) {
        const config = {
          agentId: data.agentId || '',
          corpId: data.corpId || '',
          timeStamp: data.timeStamp || '',
          nonceStr: data.nonceStr || '',
          signature: data.signature || '',
          jsApiList: jsApiList || []
        }
        dd.config(config)
      }
      resolve(response)
    }).catch(function(error) {
      reject({
        errcode: 100,
        errmsg: 'js api auth request bad',
        error: error
      })
      // alert('sign request error' + JSON.stringify(error));
    })
  })
}

export default {
  jsApiOAuth
}
