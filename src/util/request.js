

import axios from 'axios';
import IView from 'iview'
import qs from 'qs';


// 系统全局请求对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // timeout: 5000,
  responseType: 'json',
  validateStatus(status) {
    return status === 200
  }
})
service.interceptors.request.use(
    config => {
      let _config = config
      let token = localStorage.getItem("token")
      if(token) {
        _config.headers['Authorization'] = token
      }
      return _config
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
)
service.interceptors.response.use((config) => {
  return config.data
}, (error) => {
  console.log(error)
  if (error.response) {
    // const errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.msg
    const {status, data} = error.response
    if (status == 400) {
      // window.top.location = '/login';
      IView.Message.error(data || '参数错误')
    }
    if (status == 401 || status == 403) {
      // window.top.location = '/login';
      IView.Message.error(data || '暂无权限')
      localStorage.removeItem("token")
      window.location.reload()
    }
    if (status == 404) {
      IView.Message.error(data|| '访问地址不存在')
    }
    if (status == 500) {
      IView.Message.error(data || '后台异常')
    }
  }
  return Promise.reject(error)
})
let ajax = {
  get: function (url, param) {
    let params = {}
    if (param) {
      params.params = param;
    }
    return service.get(url, params);
  },
  post: function (url, data) {
    return service.post(url, data, {
      transformRequest: [(data) => {
        return qs.stringify(data)
      }]
    });
  },
  postJson: function (url, paramJson) {
    return service.post(
        url, paramJson
    )
  },
  put: function (url, data) {
    return service.put(
        url, data, {
          transformRequest: [(data) => {
            return qs.stringify(data)
          }]
        }
    )
  },
  putJson: function (url, paramJson) {
    return service.put(
        url,
        paramJson
    )
  },

}


export default ajax;