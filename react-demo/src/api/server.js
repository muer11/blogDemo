import axios from 'axios';
import {
    Router,
    browserHistory
} from 'react-router';
import { message } from 'antd'; 

//取消请求
let CancelToken = axios.CancelToken
axios.create({
    timeout: 15000, // 请求超时时间
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

//开始请求设置，发起拦截处理
axios.interceptors.request.use(config => {
    // console.log("config:");
    // console.log(config);

    //得到参数中的requestname字段，用于决定下次发起请求，取消相应的  相同字段的请求
    //post和get请求方式的不同，使用三木运算处理
    // let requestName = config.method === 'post' ? config.data.requestName : config.params.requestName
    //判断，如果这里拿到上一次的requestName，就取消上一次的请求
    // if (requestName) {
    //     if (axios[requestName] && axios[requestName].cancel) {
    //         axios[requestName].cancel()
    //     }
    //     config.cancelToken = new CancelToken(c => {
    //         axios[requestName] = {}
    //         axios[requestName].cancel = c
    //     })
    // }
    return config
}, error => {
    return Promise.reject(error)
})

// respone拦截器
axios.interceptors.response.use(
    response => {
        const res = response.data;
        // console.log(res);
        //这里根据后台返回来设置
        if (res.success) {
            console.log(res);
            console.log("res.success:" + res.success);
            // return "1111";
            return res;
        } else {
            console.log("error:" + (res.code == 102));
            if (res.code == 102) {
                //无接口访问权限
                // browserHistory.push('/');
                // this.props.history.push('/path')
                // this.context.router.push({
                //     pathname: "/"
                // })
            }
            message.warning(res.msg);
            return Promise.reject(res.msg);
        }
    }
    // ,
    // error => {
    //     console.log("error:"+error);
    //     return Promise.reject(error)
    // }
)

export default axios
