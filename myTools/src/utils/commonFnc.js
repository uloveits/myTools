import Taro from '@tarojs/taro'

//去跳转
function gotoPage(url, params={}, options={}) {
  console.log('----gotoPage----start');
  let method = options.method || 'navigateTo';
  if (url && typeof url === 'string') {

    let extend = '';
    for (let key in params) {
      extend += '&'+key+'='+params[key];
    }
    if (extend.length) {
      url += '?'+extend.substr(1, extend.length-1)
    }
    Taro[method]({url})
  }
}
//取得屏幕的尺寸
function getScreenSize() {
  let res = Taro.getSystemInfoSync();
  let _Size = {
    width:res.windowWidth,
    height:res.windowHeight
  }
  return _Size;
}
//字符串转数组
function stringToArr(str) {
  if(str) {
    let arr = [];
    arr = str.split('，');
    if(arr.length === 1) {
      arr = str.split(',');
    }
    let _arr = [];
    for(let i= 0; i< arr.length; i++) {
      let _value = arr[i];
      _arr.push(_value);
    }
    return  _arr;
  }else {
    return '';
  }
}
//数组转字符串
function arrToString(arr) {
  let _str = '';
  for(let i= 0; i< arr.length;i++) {
    if(i == arr.length - 1){
      _str += arr[i]
    }else {
      _str += arr[i] + ','
    }
  }
  return _str;
}

export {
  gotoPage,
  getScreenSize,
  stringToArr,
  arrToString
}
