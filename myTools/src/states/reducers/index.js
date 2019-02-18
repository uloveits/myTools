import Taro from '@tarojs/taro'
import { combineReducers } from 'redux'
import {BASIC_INFO} from "../constants";
// 定义初始状态
const INITIAL_STATE = {
  basicInfo: Taro.getStorageSync('basicInfo'),
};

function common (state=INITIAL_STATE, action) {
  switch (action.type) {
    case BASIC_INFO:
      console.log('-***BASIC_INFO***-',action);
      return {
        ...state,
        basicInfo: action.payload
      };
    default:
      return state
  }
}

export default combineReducers({
  common
})
