$(function(){

  // 页面初始化
  // 加载顶级分类数据 完成左侧栏
  // 根据左侧栏的第一个分类查询右侧的品牌分类
  // 根据查询到的渲染

  new App();


  // 点击根据顶级分类 渲染右侧内容
  // 选中当前点击的分类
  // 根据当前点击的分类查询品牌分类数据 进行渲染



});

var App=function(){
  this.$left=$('.lt_cateleft');
  this.$right=$('.lt_cateright');
  this.init();
}

App.prototype.init=function(){
  var that=this;
  // 页面初始化
  this.renderLeft(function(id){
    that.renderRight(id);
  });
  

  that.bindEvent();
}

App.prototype.bindEvent=function(){
  var that=this;
  // mui 封装了tap
  this.$left.on('tap','li a',function(){
    that.$left.find('li').removeClass('now');
    $(this).parent().addClass('now');
    // 获取当前点击的分类id 
    // that.renderRight($(this)[0].dataset.id);
    // 小知识点  传一个参获取 两个设置
    that.renderRight($(this).data('id'));

  })
}

App.prototype.renderLeft=function(callback){
  var that=this;
  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    data:'',
    dataType:'json',
    success:function(data){
      var html=template('leftpl',data);
      that.$left.html(html);
      // 一级分类第一条数据id
      var id=data.rows[0].id;
      callback && callback(id);
    }
  });
};

App.prototype.renderRight=function(id){
  var that=this;
  $.ajax({
    url:'/category/querySecondCategory',
    type:'get',
    data:{
      id:id,
    },
    dataType:'json',
    success:function(data){
      var html=template('rightpl',data);
      that.$right.html(html);
    }
  });
}














