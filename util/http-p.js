import {
  config
} from '../config.js';

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效，请前往www.7yue.pro申请',
  3000: '期刊不存在'
}

class HTTP {

  request({url, data = {}, method = 'GET'}) {
    return new Promise((resole, reject) => {
      this._request(url, resole, reject, data, method);
    })
  }

  _request(url, resole, reject, data = {}, method = 'GET') {

    wx.request({
      url: config.api_basw_url + url,
      method: method,
      data: data,
      header: {
        'context-type': 'application/json',
        'appkey': config.appkey
      },
      //success回调
      success: (res) => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resole(res.data);
        } else {
          reject()
          const error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      //fail回调
      fail: (err) => {
        reject()
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
}

export {
  HTTP
}