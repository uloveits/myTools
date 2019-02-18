import {BASIC_INFO} from "../constants";

//保存基本的信息
export const onSetBasicInfo = (param) => {
  console.log('setBasicInfo',param);
  return {
    type: BASIC_INFO,
    payload: param
  }
};


