// 拦截器管理器

// 此处Onfulfilled/Onrejected定义相当于Record原理(types文件中的demo PlainObject)

  // V可能是AxiosRequestConfig | Promise<AxiosRequestConfig>  也可能是AxiosResponse
  export default class AxiosInterceptorManager{
     interceptors = [];
    use(onFulfilled, onRejected){
      this.interceptors.push({
        onFulfilled,
        onRejected
      })
      return this.interceptors.length - 1; // 返回拦截器索引 用于eject弹出(删除拦截器)
    }
    eject(id) {
      if(this.interceptors[id]) {
        this.interceptors[id] = null;
      }
    }
  }