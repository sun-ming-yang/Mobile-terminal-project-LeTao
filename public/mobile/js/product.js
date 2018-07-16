$(function(){
  // mui('.mui-scroll-wrapper').scroll({
  //   indicators:false
  // });
 
  new App();

});

var App=function(){
  this.$scroll=$('.mui-scroll');
  this.init();
};

App.prototype.init=function(){
  var _this=this;
  mui.init({
    pullRefresh:{
      indicators:false,
      container:'.mui-scroll-wrapper',
      down:{
        auto:true,
        callback:function(){
          var that=this;
          _this.render(function(){
            that.endPulldownToRefresh();
          })
        }
      }
    }
  });
};
App.prototype.render=function(callback){
  var _this=this;
  $.ajax({
    url:'/product/queryProductDetail',
    type:'get',
    dataType:'json',
    data:{
      id:lt.getParamsByUrl().productId
    },
    success:function(data){
      _this.$scroll.html(template('detail',data));
      // 初始化轮播图
      mui('.mui-slider').slider();
      callback&&callback();
    }
  })
};









































































