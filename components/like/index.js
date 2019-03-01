// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: Number,
    readOnly:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {

      if(this.properties.readOnly){
        return;
      }

      let like = this.properties.like;
      let count = this.properties.count;

      count = like ? count - 1 : count + 1;

      this.setData({
        count: count,
        //改变布尔
        like: !like
      })

      //自定义触摸事件bindlike 发出喜欢和不喜欢行为
      let behavior = this.properties.like ? "like" : "cancel";
      this.triggerEvent('like', {
        behavior: behavior
      }, {});
    },
  }
})