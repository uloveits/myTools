import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { onSetBasicInfo } from '../../states/actions'

import './index.scss'
import * as CommonFnc from "../../utils/commonFnc";
import headerImg from '../../public/imgs/egg-header.png'
import bgImg from '../../public/imgs/egg-bg.png'
import egg0Img from '../../public/imgs/egg0.png'
import egg1Img from '../../public/imgs/egg1.png'
import egg2Img from '../../public/imgs/egg2.png'
import egg3Img from '../../public/imgs/egg3.png'
import egg4Img from '../../public/imgs/egg4.png'

//数据流管理Redux
@connect(({ common }) => ({
  common
}), (dispatch) => ({
  onSetBasicInfo (param) {
    dispatch(onSetBasicInfo(param))
  }
}))

class Egg extends Taro.Component {

  config = {
    navigationBarTitleText: '砸蛋大抽奖',
  };
  constructor() {
    super(...arguments);
    //屏幕的尺寸
    const screenSize = CommonFnc.getScreenSize();
    this.state = {
      screenSizeStyle: `width:${screenSize.width}px;height:${screenSize.height}px`,
      isRun:false,
      eggImg:[egg0Img,egg0Img,egg0Img,egg0Img,egg0Img,egg0Img,egg0Img,egg0Img],
      opt:{
        prizeItemList:[
          {name:"未中奖"}, {name:"奖品1"}, {name:"奖品2"}, {name:"奖品3"}, {name:"奖品4"}, {name:"奖品5"}, {name:"奖品6"},
        ],
        animationCount:3,//动画次数
        eggCount:6,//奖励个数
        preResult:false,//上次是否中奖
        programIndex:0//砸蛋逻辑
      },
      prize:null
    }
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  //砸开金蛋点击事件
  openEgg = (index) => {
    console.log('砸的第几个蛋');
    console.log(index);
    let opt = this.state.opt;
    //等待上一次砸蛋结束
    if(this.state.isRun) return
    this.setState({
      isRun:true
    })
    let timer = null;
    let num = 0;
    let prizeIndex; //奖品编号
    let count = opt.animationCount; //动画次数

    //砸蛋动画
    timer = setInterval(() => {
      if (num < 4) {
        let _eggImg = this.state.eggImg;
        switch (num) {
          case 0:
            _eggImg[index] = egg0Img;
            this.setState({
              eggImg:_eggImg
            });
            break;
          case 1:
            _eggImg[index] = egg1Img;
            this.setState({
              eggImg:_eggImg
            });
            break;
          case 2:
            _eggImg[index] = egg2Img;
            this.setState({
              eggImg:_eggImg
            });
            break;
          case 3:
            _eggImg[index] = egg3Img;
            this.setState({
              eggImg:_eggImg
            });
            break;
        }
      } else {
        num = 0;
        count--;
      }

      if (count == 0) {
        //业务逻辑处理
        clearInterval(timer); //停止动画
        let _eggImg = this.state.eggImg;
        _eggImg[index] = egg4Img;
        this.setState({
          eggImg:_eggImg
        });
        prizeIndex = Math.floor(Math.random() * opt.eggCount);
        console.log(opt.prizeItemList[prizeIndex]);
        this.setState({
          prize:opt.prizeItemList[prizeIndex].name
        })
      }
      num++;
    }, 200);
    //一次砸蛋结束,将flag置为false
    this.setState({
      isRun:false
    });
  };

  render () {
    const {screenSizeStyle,eggImg,prize} = this.state;
    /*头部图片*/
    const header = (
      <View className='header'>
        <Image className='wd100' mode='widthFix' src={headerImg} />
      </View>
    );
    /*金蛋的背景图片*/
    const egg_bg = (
      <View className='eggBg'>
        <Image className='wd100 ht100' src={bgImg} />
      </View>
    );
    const numbers = [...Array(8).keys()];
    /*金蛋选项*/
    const egg = (
      <View className='egg'>
        <View className='at-row at-row--wrap'>
          {
            numbers.map((index)=>(
              <View className='at-col-3' key={index}>
                <View className='pd20' onClick={this.openEgg.bind(this,index)} >
                  <Image className='wd100' mode='widthFix' src={eggImg[index]} />
                </View>
              </View>
            ))
          }
        </View>
      </View>
    );
    /*中奖信息*/
    const prizeContent = (
      <View className='prizeContent text-center mt20'>
        <Text>恭喜您！获得了{prize}</Text>
      </View>
    )
    return (
      <View className='index ' style={screenSizeStyle}>
        {/*头部图片*/}
        {header}
        {/*金蛋的背景图片*/}
        {egg_bg}
        {/*金蛋选项*/}
        {egg}
        {/*中奖信息*/}
        { prize !== null ? prizeContent : ''}
      </View>
    )
  }
}
export default Egg

