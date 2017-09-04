import axios from 'axios'

export default function(url='',data={},params={},headers={},method='post'){
    console.log(localStorage.token)
    let token=localStorage.token,baseURL=''
    if(token==undefined||token==''){
        baseURL='http://easy-mock.com/mock/5988219ea1d30433d857e30a/yunke'
        // baseURL='http://192.168.2.200:8080'
    }else{
        baseURL='http://easy-mock.com/mock/5988219ea1d30433d857e30a/yunke'
        // baseURL='http://192.168.2.200:8080'
        data.user_token=token;
    }
    // data.user_token='eyJpdiI6IlA3NGtvVU9cL01Wd09xQ1NXTjFEV0xBPT0iLCJ2YWx1ZSI6Im1XNmtcL1ZIZUg4N0FnYkF3ZUdYZGgzRDNaMytBS2taKzI2dlNqZ1JaZnZaUXFkcTNGcEJGYk1Gc2ROam9HeEJzNE1xQXBDc0V4TWRxY1BoMmFBZ1E2QT09IiwibWFjIjoiNTAxMzU2YzVkN2YwZWQ3YjNjMTc3YTBmODhiOTFmM2IzZDU5ZGNhMjJiMmJmYzg5MjI1ZjhiYjdlNTA2ZTAxOCJ9'
    
    return axios({
        url:url,
        baseURL:baseURL,
        responseType:'json',
        data:data,
        params:params,
        headers: headers,
        method:method,  
        withCredentials:false
    })
}