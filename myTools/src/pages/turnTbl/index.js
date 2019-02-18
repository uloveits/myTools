import Taro from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import TurnWheel from '../../comps/TurnWheel'
import './index.scss'
import * as CommonFnc from "../../utils/commonFnc";
import { onSetBasicInfo } from '../../states/actions'

//数据流管理Redux
@connect(({ common }) => ({
  common
}), (dispatch) => ({
  onSetBasicInfo (param) {
    dispatch(onSetBasicInfo(param))
  }
}))

class TurnTbl extends Taro.Component {

  config = {
    navigationBarTitleText: '幸运大转盘'
  };
  constructor() {
    super(...arguments);
    this.state = {
      comp:{
        item:['按','加','号','自','定','义','转','盘']
      }
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
    const {comp} = this.state;
    //自定义添加
    return (
      <View className='index'>
        <View className='text-right pd20'>
          <AtIcon onClick={this.goView.bind(this,'/pages/turnTbl/edit/index')} value='add' size='28' color='#000'></AtIcon>
        </View>
        <TurnWheel comp={comp} />
      </View>
    )
  }
}
export default TurnTbl;

