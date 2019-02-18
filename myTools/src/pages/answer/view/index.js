import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { onSetBasicInfo } from '../../../states/actions'

import './index.scss'
import {ANSWER} from '../../../app.constant'
import * as CommonFnc from "../../../utils/commonFnc";

//数据流管理Redux
@connect(({ common }) => ({
  common
}), (dispatch) => ({
  onSetBasicInfo (param) {
    dispatch(onSetBasicInfo(param))
  }
}))

class Answer extends Taro.Component {

  config = {
    navigationBarTitleText: '答案',
  };
  constructor() {
    super(...arguments);
    //屏幕的尺寸
    const screenSize = CommonFnc.getScreenSize();
    console.info(this.$router.params);

    this.state = {
      screenSizeStyle: `width:${screenSize.width}px;height:${screenSize.height}px`,
      answer:ANSWER[parseInt(this.$router.params.idx)]
    }

  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {screenSizeStyle,answer} = this.state;

    return (
      <View className='index' style={screenSizeStyle}>
        <View className='answer'>
          <View className='answer-border'>
            <View className='content'>
              <View><Text className='china'>{answer.china}</Text></View>
              <View className='mt40'> <Text className='english'>{answer.english}</Text></View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default Answer

