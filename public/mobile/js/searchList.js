$(function () {
  //1. 区域滚动
  /*  mui('.mui-scroll-wrapper').scroll({
     indicators: false
   }); */
  /* 2.页面初始化的时候 下拉渲染列表
  获取地址栏搜索数据 设置到搜索框
  去后台获取数据
  在获取的过程中 显示下拉刷新的效果
  当数据获取成功 终止下拉刷新 渲染当前页面 */

  /* 3.当用户去上拉加载操作的时候 追加列表内容到当前页面 
  实现上拉效果
  触发上拉下载之后 去获取数据
  渲染内容
  追加到当前的列表中
  结束上拉加载效果
  */

  /* 4.点击搜索 重新根据当前关键字 进行搜索
  绑定搜索点击事件
  点击的时候去搜索关键字
  下拉刷新 获取数据+渲染+替换
  */

  /* 5.排序
  样式的切换
  默认都是未选中 箭头向下
  点击未选中的时候  选中即可  其他排序重置
  点击以选中的时候  操作箭头
  
  排序
  根据类型price 1升2降 num 1升2降
  重新获取数据渲染列表
  注意：只能发一种排序方式给后台
  */
  new App();
});


var App = function () {
  // 待渲染的列表
  this.$list = $('.lt_product');
  // 获取地址栏中参数数据
  this.key = lt.getParamsByUrl().key;

  this.$paramInput = $('.lt_search input');
  this.$paramButton = $('.lt_search a');
  // 排序元素
  this.$order = $('.lt_order');

  this.page = 1;


  this.init();

};
// 初始化
App.prototype.init = function () {
  var _this = this;
  // 设置搜索框的数据和地址栏的一样
  _this.$paramInput.val(_this.key);
  // 初始化下拉效果
  mui.init({
    pullRefresh: {
      container: '.mui-scroll-wrapper',
      indicators: false,
      down: {
        auto: true,
        callback: function () {
          // 刷新永远是第一页
          _this.page = 1;
          var that = this;
          _this.render(function (data) {
            // 渲染页面
            _this.$list.html(template('list', data));
            // 结束下拉刷新
            that.endPulldownToRefresh();
            // 重置上拉效果
            that.refresh(true);
          })
        }
      },
      up: {
        callback: function () {
          _this.page++;
          var that = this;
          _this.render(function (data) {
            // 渲染页面
            _this.$list.append(template('list', data));
            // 如果没有数据  结束上拉加载效果同时 提示用户 true 页面显示：没有更多数据了
            // 默认传递的是false
            console.log(data)
            that.endPullupToRefresh(data.data.length === 0);
          })
        }
      }
    }
  })
  _this.bindEvent();
};
// 渲染列表
App.prototype.render = function (callback) {
  var _this = this;
  $.ajax({
    url: '/product/queryProduct',
    type: 'get',
    dataType: 'json',
    data: $.extend({
      proName: _this.key,
      page: _this.page,
      pageSize: 4
    },_this.orderParam),
    success: function (data) {
      callback && callback(data);
    }
  })
};
// 绑定事件
App.prototype.bindEvent = function () {
  var _this = this;
  // 输入新的关键字  重新获取数据渲染页面
  _this.$paramButton.on('tap', function () {
    var key = $.trim(_this.$paramInput.val());
    if (!key) {
      mui.toast('请输入关键字');
      return;
    }
    // 把新输入的关键字赋值给地址栏的传参
    _this.key = key;
    // 主动触发下拉刷新 渲染列表
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  });

  // 排序
  _this.$order.on('tap', 'a', function () {
    var $current = $(this);
    // 判断是否选中
    if ($current.hasClass('now')) {
      // 已选中
      var $span = $current.find('span');
      // 判断是否是选中状态
      if ($span.hasClass('fa-angle-down')) {
        $span.addClass('fa-angle-up').removeClass('fa-angle-down');
      } else {
        $span.removeClass('fa-angle-up').addClass('fa-angle-down');
      }
    } else {
      // 未选中
      // 去掉所有的样式
      var $all = _this.$order.find('a');
      $all.removeClass('now');
      $all.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
      // 给自己加上now
      $current.addClass('now');
    }
    // 定义发送给后台的数据
    var orderType = $current.data('type');
    var orderValue= $current.find('span').hasClass('fa-angle-down')?2:1;
    // 发送一种排序的值给后台
    _this.orderParam={};
    _this.orderParam[orderType]=orderValue;
    // 主动触发下拉刷新 渲染列表
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })
}