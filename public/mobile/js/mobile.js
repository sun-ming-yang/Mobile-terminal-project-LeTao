// 项目中公用方法

/* 1.获取地址栏传参
参数 {key:value}
location.search  获取到地址栏参数 ?后的
没有传参数的时候 返回空对象
去掉问号
在判断没有传参数的时候 返回空对象
正常数据

 */

if (!window.lt) {
  window.lt = {};
}

lt.getParamsByUrl = function () {
  var obj = {};

  // ?key=3&name=xm
  var search = location.search;

  if (!search) {
    return obj;
  }
  // key=3&name=xm
  search=search.replace(/^\?/,'');
  if (!search) {
    return obj;
  }
  // [key=3] [name=xm]
  var paramsArr=search.split('&');
  paramsArr.forEach(function(item,i){
    var itemArr=item.split('=');
    // [key,3] [name,xm]
    // decodeURIComponent()函数 对编码的URL进行解码
    obj[itemArr[0]]=decodeURIComponent(itemArr[1]);
  })
  return obj;
}