import config from "./config";

export default {
  config: {
    // baseURL: ' http://192.168.2.71:8000',
    baseURL: config.server,  // hbiuld x
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
          "Authorization": "Bearer " + this.getToken(),
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
        const [err, res] = data;
        if (res.data.code === 200) {
          return resolve(res.data)
        }
        if (res && res.data.code === 401) {
          return
        }
        if (err) {
          uni.showToast({
            icon: 'none',
            title: 'Yêu cầu lỗi'
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
