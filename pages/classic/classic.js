import {
  ClassicModel
} from '../../models/classic.js'

import {
  LikeModel
} from '../../models/like.js'

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getLatest((res) => {
      // this._getLikeStatus(res.id,res.type);
      this.setData({
        // ...res
        classic: res,
        //独立显示like组件数据
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },

  onLike: function(event) {
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onNext: function(event) {
    this._updateClassic('next');
  },

  onPrevious: function(event) {
    this._updateClassic('previous');
  },

  _updateClassic: function(nextOrPrevious) {
    const index = this.data.classic.index;
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  //独立显示like组件数据
  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    });
  }
})