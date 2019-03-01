import {
  config
} from '../config.js';

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {
  
  request(params) {

    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_basw_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'context-type': 'application/json',
        'appkey': config.appkey
      },
      //success回调
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          params.success && params.success(res.data);
        } else {
          let error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      //fail回调
      fail: (err) => {
        this._show_error(1);
      }
    })
  };

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }

  // _show_error(error_code) {
  //   if (!error_code) {
  //     error_code = 1;
  //   }
  //   wx.showToast({
  //     title: tips[erro_code],
  //     icon: 'none',
  //     duration: 2000
  //   })
  // }
}

export {
  HTTP
}