import Taro from '@tarojs/taro';
import {Canvas, View} from "@tarojs/components"
import { connect } from '@tarojs/redux'
import { onSetBasicInfo } from '../../states/actions'
import utils from './js/utils.js'
import Animation from './js/animation.js'
import Pointer from './js/pointer.js'
import Wheel from './js/wheel.js'
import './index.scss'
import * as CommonFnc from "../../utils/commonFnc";

//数据流管理Redux
@connect(({ common }) => ({
  common
}), (dispatch) => ({
  onSetBasicInfo (param) {
    dispatch(onSetBasicInfo(param))
  }
}))

class TurnWheel extends Taro.Component {

  constructor() {
    super(...arguments);
    //屏幕的尺寸
    const screenSize = CommonFnc.getScreenSize();
    this.state = {
      comp:this.props.comp, //父页面传来的参数
      slicePrizes:null,
      screenSize:screenSize,
      canvasSize :  `width:${screenSize.width}px;height:${screenSize.width}px`,//屏幕的尺寸
      touch: { x: 0, y: 0, isPressed: false },
      prize:'???',
    };
  }
  componentWillMount () {
    let _item = this.props.common.basicInfo._item;
    console.log(_item);
    this.setState({
      slicePrizes:_item
    })
  }
  componentDidMount () {
    this.initCanvas();
  }
  componentDidShow () {
    if(this.props.common.basicInfo._first){
      let basicInfo = {
        _item:this.props.common.basicInfo._item,
        _first:false
      };
      this.props.onSetBasicInfo(basicInfo);//将信息存入redux
      Taro.setStorageSync('basicInfo', basicInfo);//将信息存入缓存中
      Taro.redirectTo({
        url: '/pages/turnTbl/index'
      })
    }

  }
  initCanvas = ()=>{
    let that = this;
    let fps = 60;
    let slicePrizes = this.state.slicePrizes || this.props.comp.item;
    let w = this.state.screenSize.width;
    let h = this.state.screenSize.width;
    let context = Taro.createCanvasContext('canvas',this);
    let wheel = new Wheel(w / 2, h / 2, w / 2 - 50, slicePrizes);
    let point = new Pointer(w / 2, h / 2, 30, wheel);
    let animation = new Animation(wheel, { w: w, h: h });

    wheel.prizeWidth = 30;
    wheel.prizeHeight = 30;

    // 启用事件
    point.inputEvent = true;
    point.onInputDown = run;

    // 更新动画
    let update = () => {
      // 清空
      context.clearRect(0, 0, w, h);
      // 画转盘
      wheel.draw(context);
      // 画指针
      point.draw(context);

      // 更新数据
      animation.draw(context);
      // 更新数据
      animation.update();

      // 获取手指点击
      let touch = that.state.touch;
      if (point.inputEvent && touch.isPressed && point.onInputDown) {
        // 如果点击到了指针
        if (point.contains(touch)) {
          // 调用点击回调方法
          point.onInputDown();
        }
      }
      // 绘图
      context.draw()
    };
    setInterval(update, 1000 / fps, 1000 / fps);

    // 开始转
    function run() {
      // 避免重复调用
      if (animation.isRun) return;
      // 当动画完成时
      animation.onComplete = function (prize) {
        Taro.showToast({
          title: prize,
          duration: 3000,
          mask: true,
        });
        that.setState({
          prize: prize
        })
      };

      // 开始转
      animation.run();

      // 模拟后台返回数据
      setTimeout(() => {
        // 随机一个奖品
        var prizeIndex = utils.getRandom(slicePrizes.length - 1);
        // 计算奖品角度
        animation.stopTo(prizeIndex);
      }, 3000);
    }
  };


  canvasTouchStart = (event)=> {
    let touch = event.changedTouches[0];
    touch.isPressed = true;
    this.setState({
      touch: touch
    })
  };

  canvasTouchEnd = (event) => {
    let touch = event.changedTouches[0];
    touch.isPressed = false;
    this.setState({
      touch: touch
    })
  };

  render() {
    const { canvasSize, comp, prize } = this.state;
    if(!comp)return;
    return (
      <View className='index'>
        {/*轮盘*/}
        <View className='wheel-outside'>
          <Canvas style={canvasSize}
                  canvasId='canvas'
                  disableScroll={true}
                  onTouchStart={this.canvasTouchStart.bind(this)}
                  onTouchEnd={this.canvasTouchEnd.bind(this)}
          />
        </View>
        {/*抽奖结果显示*/}
        <View className='text-center'>
          <Text className='resultText'>{prize}</Text>
        </View>
      </View>
    )
  }
}
export default TurnWheel
