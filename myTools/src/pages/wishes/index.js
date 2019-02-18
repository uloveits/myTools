import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { onSetBasicInfo } from '../../states/actions'

import './index.scss'
import * as CommonFnc from "../../utils/commonFnc";
import temp1 from '../../public/imgs/wishes-panel.png'

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
    navigationBarTitleText: '小小祝福',
  };
  constructor() {
    super(...arguments);
    //屏幕的尺寸
    const screenSize = CommonFnc.getScreenSize();
    this.state = {
      screenSizeStyle: `width:${screenSize.width}px;height:${screenSize.height}px`,
      toName:null,//TA的称呼
    }

  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  //跳转
  goView = (url, params={}, options={})=>{
    CommonFnc.gotoPage(url, params, options)
  };

  render () {
    const {screenSizeStyle} = this.state;
    /*对Ta的称呼*/
    const toNameInput = (
      <View className='at-row at-row__justify--center pt40'>
        <View className='at-col-10'>
          <AtInput
            name='toName'
            type='text'
            placeholder='怎么称呼TA(不超过10个字)'
            value={this.state.toName}
            onChange={this.handleChange.bind(this)}
          />
        </View>
      </View>
    );
    /*模板选择*/
    const template = (
      <View>
        <View className='text-center mt40'>
          <Text className='title'>背景选择</Text>
        </View>
        <View className='at-row at-row--wrap mt20'>
          <View className='at-col-4'>
            <View className='pd20'>
              <Image className='wd100' src={temp1} mode='widthFix' />
            </View>
          </View>
          <View className='at-col-4'>
            <View className='pd20'>
              <Image className='wd100' src={temp1} mode='widthFix' />
            </View>
          </View>
          <View className='at-col-4'>
            <View className='pd20'>
              <Image className='wd100' src={temp1} mode='widthFix' />
            </View>
          </View>
          <View className='at-col-4'>
            <View className='pd20'>
              <Image className='wd100' src={temp1} mode='widthFix' />
            </View>
          </View>
        </View>

      </View>
    )
    /*稍句祝福*/
    const btn = (
      <View className='at-row at-row__justify--center pt40'>
        <View className='at-col-10'>
          <AtButton onClick={this.goView.bind(this,'/pages/wishes/edit/index')} type='primary'>稍句祝福</AtButton>
        </View>
      </View>
    );
    return (
      <View className='index ' style={screenSizeStyle}>
        {/*对Ta的称呼*/}
        {toNameInput}
        {/*模板选择*/}
        {template}
        {/*稍句祝福*/}
        {btn}
      </View>
    )
  }
}
export default Wishes

