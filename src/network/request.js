import axios from 'axios'

export function request(config)
{
    const net = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/w6',
      timeout: 5000
    })
    //请求拦截
    net.interceptors.request.use(config=>{
      return config;
    },err=>{})
    //响应拦截
    net.interceptors.response.use(config=>{
      return config.data;
    },err=>{})

  return net(config);
}
