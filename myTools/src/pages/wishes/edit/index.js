import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { onSetBasicInfo } from '../../../states/actions'

import './index.scss'
import * as CommonFnc from "../../../utils/commonFnc";
import wishes from '../../../public/imgs/wishes-panel.png'

//数据流管理Redux
@connect(({ common }) => ({
  common
}), (dispatch) => ({
  onSetBasicInfo (param) {
    dispatch(onSetBasicInfo(param))
  }
}))

class Wishes extends Taro.Component {

  config = {
    navigationBarTitleText: '祝福语',
    navigationBarBackgroundColor: '#e7404d',
  };
  constructor() {
    super(...arguments);
    //屏幕的尺寸
    const screenSize = CommonFnc.getScreenSize();
    this.state = {
      screenSizeStyle: `width:${screenSize.width}px;height:${screenSize.height}px`,
    }

  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  //分享
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '祝福~',
      path: `/pages/wishes/edit/index`
    }
  }


  render () {
    const {screenSizeStyle} = this.state;
    /*背景图片*/
    const bg = (
      <View className='wishes-bg'>
        <Image className='wd100' src={wishes} mode='widthFix'></Image>
      </View>
    );
    /*头像*/
    const avatar = (
      <View className='avatar'>
        <AtAvatar circle size='large' image='https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIdmxUuslFdVy4z0E3pgNrgr2BjCRekg7VpRYtY7GrbXKHOv77x4WA838ET8MQF1icwyJlpC3aYb8g/132'></AtAvatar>
      </View>
    );
    /*祝福的正文*/
    const content = (
      <View className='content'>
        <View className='toUser'>
          <Text>祝：</Text>
        </View>
        <View className='bestWishes'>
          和气生财财富多，多多财富谢领导，导引咱们谋幸福，福贴门上贺新年，年年有余送祝愿，愿您新年快乐！
        </View>
        <View className='fromUser'>
          <Text>一根网线丶</Text>
        </View>
        <View className='date'>
          <Text>2019年2月14日</Text>
        </View>
      </View>
    );
    return (
      <View className='index ' style={screenSizeStyle}>
        {/*背景图片*/}
        {bg}
        {/*头像*/}
        {avatar}
        {/*祝福的正文*/}
        {content}
      </View>
    )
  }
}
export default Wishes

