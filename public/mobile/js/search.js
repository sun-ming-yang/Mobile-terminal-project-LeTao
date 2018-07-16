$(function () {
  // 根据存储的历史记录  渲染列表
  // 点击搜索按钮追加历史 跳转页面
  // 点击删除 删除对应的1条 渲染列表
  // 点击清空 删除所有的 渲染列表

  new App();
});

var App = function () {
  this.$history = $('.lt_history');
  this.$search = $('.lt_search');
  // 自己去约定 localStorage 的key 对应的数据格式 json
  this.KEY = 'letaoHistoryHeima47';
  this.list = JSON.parse(localStorage.getItem(this.KEY) || '[]');
  this.init();

}


App.prototype.init = function () {
  this.render();
  this.bindEvent();
}

// 绑定事件
App.prototype.bindEvent = function () {

  var that = this;
  this.$search.on('tap', 'a', function () {
    var value = $.trim(that.$search.find('input').val());
    if (!value) {

      mui.toast('输入关键字');
      return;
    }
    that.pushHistory(value);
    // HTML页面
    location.href="searchList.html?key=" +value;
    // that.render();
    that.$search.find('input').val('');
  });

  // 删除单个
  that.$history.on('tap','li span',function(){
    that.delHistory($(this).data('index'));
    
  }).on('tap','.tit a',function(){

    that.clearHistory();
  })
 
}

App.prototype.render = function () {
  // 模板内可以直接使用数组 默认的变量名称是$data
  this.$history.html(template('list', this.list));
  
}


App.prototype.pushHistory = function (value) {

  var issame = false;
  var index = null;
  this.list.forEach(function (item, i) {
    if (item == value) {
      issame = true;
      index = i;
    }
  });

  if (issame) {
    // 有相同项
    this.list.splice(index, 1);
    this.list.unshift(value);
  } else {
    // 判断是否十个
    if (this.list.length >= 10) {
      this.list.pop();
      this.list.unshift(value);
    } else {
      this.list.unshift(value);
    }
  }

  var str = JSON.stringify(this.list);
  localStorage.setItem(this.KEY, str);
}


App.prototype.delHistory = function (index) {
  this.list.splice(index,1);

  var str = JSON.stringify(this.list);
  localStorage.setItem(this.KEY, str);

  this.render();
}


App.prototype.clearHistory = function () {
  this.list=[];
  var str = JSON.stringify(this.list);
  localStorage.setItem(this.KEY, str);

  this.render();
}