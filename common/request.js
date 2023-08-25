// export default class Request {
//   config = {
//     baseUrl: '',
//     header: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//     method: 'GET',
//     dataType: 'json',
//     responseType: 'text',
//     success () {
//     },
//     fail () {
//     },
//     complete () {
//     }
//   }
//
//   static posUrl (url) { /* 判断url是否为绝对路径 */
//     return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
//   }
//
//   interceptor = {
//     request (f) {
//       if (f) {
//         Request.requestBeforeFun = f
//       }
//     },
//     response (f) {
//       if (f) {
//         Request.requestComFun = f
//       }
//     }
//   }
//
//   static requestBeforeFun (config) {
//     return config
//   }
//
//   static requestComFun (response) {
//     return response
//   }
//
//   setConfig (f) {
//     this.config = f(this.config)
//   }
//
//   request (options = {}) {
//     options.baseUrl = options.baseUrl || this.config.baseUrl
//     options.dataType = options.dataType || this.config.dataType
//     options.url = Request.posUrl(options.url) ? options.url : (options.baseUrl + options.url)
//     options.data = options.data || {}
//     options.header = options.header || this.config.header
//     options.method = options.method || this.config.method
//     return new Promise((resolve, reject) => {
//       let next = true
//       let _config = null
//       options.complete = (response) => {
//         let statusCode = response.statusCode
//         response.config = _config
//         response = Request.requestComFun(response)
//         if (statusCode === 200) { // 成功
//           resolve(response)
//         } else {
//           reject(response)
//         }
//       }
//       let cancel = (t = 'handle cancel') => {
//         let err = {
//           errMsg: t,
//           config: afC
//         }
//         reject(err)
//         next = false
//       }
//       let afC = { ...this.config, ...options }
//       _config = { ...afC, ...Request.requestBeforeFun(afC, cancel) }
//       if (!next) return
//       uni.request(_config)
//     })
//   }
//
//   get (url, data, options = {}) {
//     options.url = url
//     options.data = data
//     options.method = 'GET'
//     return this.request(options)
//   }
//
//   post (url, data, options = {}) {
//     options.url = url
//     options.data = data
//     options.method = 'POST'
//     return this.request(options)
//   }
// }
import {values} from "@/unpackage/dist/dev/app-plus/app-service";

export default {
  config: {
    // baseURL: ' http://192.168.2.63:8000',
    baseURL: 'http://0.0.0.0:8000',
    getToken() {
      let token = uni.getStorageSync('TOKEN');
      // if (!token) {
      //   return uni.switchTab({
      //     url: '/pages/login/login'
      //   })
      // }
      return token
    },
    // 请求拦截器
    beforeRequest(options = {}) {
      return new Promise((resolve, reject) => {
        options.url = this.baseURL + options.url;
        options.method = options.method || 'GET';
        options.header = {
          "Authorization": "JWT " + this.getToken(),
          'Content-Type': 'application/json;charset=UTF-8'
        }
        if (options.method === 'get' && options.params) {
          let url = options.url + '?';
          for (const propName of Object.keys(options.params)){
            const value = options.params[propName]
            var part = encodeURIComponent(propName) + '=';
            if (value != null && typeof (value) != "undefined"){
              if (typeof value === "object") {
                for (const key of Object.keys(value)){
                  const params = propName + "[" + key + "]";
                  var subPart = encodeURIComponent(params) + "=";
                  url += subPart + encodeURIComponent(value[key]) + "&";
                }
              }else {
                url += part + encodeURIComponent(value) + "&";
              }
            }
          }
          url = url.slice(0, -1);
          options.params = {};
          options.url = url;
        }
        resolve(options)
      })
    },
    // 响应拦截器
    handleResponse(data) {
      return new Promise((resolve, reject) => {
        uni.showLoading({
          title: '数据加载中'
        })
        const [err, res] = data;
        if (res.data.code === 4000) {
          uni.showToast({
            icon: 'none',
            title: '请先登录',
            duration: 2000
          });
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/center/login'
            })
          }, 2000)

          return reject('请先登录')
        }
        if (res && res.data.code !== 2000) {
          let msg = res.data.msg || '请求错误';
          uni.showToast({
            icon: 'none',
            title: msg
          })
          return reject(msg)
        }
        if (err) {
          uni.showToast({
            icon: 'none',
            title: '请求错误'
          })
          return reject(err)
        }
        uni.hideLoading();
        return resolve(res.data)
      })
    },
  },
  request(options = {}) {
    return this.config.beforeRequest(options).then(opt => {
      return uni.request(opt)
    }).then(res => this.config.handleResponse(res))
  }
}
