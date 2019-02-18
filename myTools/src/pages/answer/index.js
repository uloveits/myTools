import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { onSetBasicInfo } from '../../states/actions'

import './index.scss'
import {ANSWER} from '../../app.constant'
import * as CommonFnc from "../../utils/commonFnc";
import bgImg from '../../public/imgs/border.png'

//数据流管理Redux
@connect(({ common }) => ({
  common
}), (dispatch) => ({
  onSetBasicInfo (param) {
    dispatch(onSetBasicInfo(param))
  }
}))

class AnswerBook extends Taro.Component {

  config = {
    navigationBarTitleText: '答案之书',
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
      title: '我的人生解答之书',
      path: `/pages/answer/index`
    }
  }

  //按钮点击事件
  searchAnswer = ()=>{
    const answerArr = ANSWER;
    let max = answerArr.length;
    //随机出心中的答案
    let answer = Math.floor(Math.random() * max);
    console.log(ANSWER[answer])
    //跳转
    Taro.navigateTo({
      url:'/pages/answer/view/index?idx=' + answer
    })
  };
  render () {
    const {screenSizeStyle} = this.state;
    /*背景图片*/
    const bg = (
      <View className='wishes-bg'>
        <Image className='wd100' src={bgImg} mode='widthFix'></Image>
      </View>
    );
    /*标题*/
    const title = (
      <View className='title'>
        <View>
          <Text>《答案之书》</Text>
        </View>
        <View className='des'>
          <Text>使用说明</Text>
        </View>
      </View>
    );
    /*内容*/
    const content = (
      <View className='content'>
        <View>
          <Text>1. 把手机放在桌上，闭上眼睛。</Text>
        </View>
        <View className='mt20'>
          <Text>2. 用5至10秒的时间集中思考你的问题。例如：“TA喜欢我吗？”或“我需要换个工作吗？”</Text>
        </View>
        <View className='mt20'>
          <Text>3. 在想象或说出你问题的同时（每次只能有一个问题），一个手指放在下面按钮的上方。</Text>
        </View>
        <View className='mt20'>
          <Text>4. 在你感觉时间正确的时候，按下按钮，你要寻找的答案就在那里。</Text>
        </View>
        <View className='mt20'>
          <Text>5. 遇到任何问题，你都可以打开它</Text>
        </View>
      </View>
    );
    /*底部按钮*/
    const btn = (
      <View className='searchAnswerBtn'>
        <View className='at-row at-row__justify--center'>
          <View className='at-col-10'>
            <AtButton onClick={this.searchAnswer.bind(this)} type='primary'>寻找你的答案</AtButton>
          </View>
        </View>
      </View>
    );
    return (
      <View className='index ' style={screenSizeStyle}>
        {/*背景图片*/}
        {bg}
        {/*标题*/}
        {title}
        {/*内容*/}
        {content}
        {/*底部按钮*/}
        {btn}
      </View>
    )
  }
}
export default AnswerBook

