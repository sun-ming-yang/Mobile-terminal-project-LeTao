$(function(){
    // 初始化轮播图自动播放
    // mui 全局对象 和 $ 一个意思
    mui('.mui-slider').slider({
      interval:3000
    });

    // 初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
      indicators: false
    });

    


});