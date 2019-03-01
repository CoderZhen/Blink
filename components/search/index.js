import { KeywordModel } from '../../models/keyword.js';
import { BookModel } from '../../models/book.js';
import { paginationBev } from '../behaviors/pagination.js';

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArray: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false
  },

  attached() {
    // const historyWords = keywordModel.getHistory();
    // const hotWords = keywordModel.getHot();
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot()
      .then(res => {
        this.setData({
          hotWords: res.hot
        })
      })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadMore() {
      if (!this.data.q) {
        return;
      }
      console.log(this.data.loading);

      if (this.isLocked()) {
        return;
      }

      if (this.hasMore()) {
        // this.data.loading = true;
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books);
            // this.data.loading = false;
            this.unLocked();
          }, () => {
            this.unLocked();
          })
      }
    },



    onCancel(event) {
      this.triggerEvent('cancel', {}, {});
      this.initialize();
    },

    onDelete(event) {
      this._closeResult();
      this.initialize();
    },

    //搜索
    onConfirm(event) {
      this._showResult();
      this._showLoadingCenter();
      // this.initialize();
      const q = event.detail.value || event.detail.text;
      this.setData({
        q
      })
      //书籍搜索api 里面有data请求体
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books);
          this.setTotal(res.total);

          keywordModel.addToHistory(q);
          this._hideLoadingCenter();
        })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true,
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    },

  }
})
