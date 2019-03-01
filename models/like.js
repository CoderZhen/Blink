import {
  HTTP
} from '../util/http.js';

class LikeModel extends HTTP {
  //更新点赞数据
  like(behavior, artID, category) {
    let url = behavior == 'like' ? '/like' : '/like/cancel';
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  };

  //独立获取点赞数据
  getClassicLikeStatus(artID, category, sCallback) {
    this.request({
      url: `classic/${category}/${artID}/favor`,
      success: sCallback
    })
  }
}

export {
  LikeModel
}