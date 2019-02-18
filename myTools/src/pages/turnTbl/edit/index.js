import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon,AtFloatLayout,AtTextarea,AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { onSetBasicInfo } from '../../../states/actions'
import * as CommonFnc from "../../../utils/commonFnc";

import './index.scss'

//数据流管理Redux
@connect(({ common }) => ({
  common
}), (dispatch) => ({
  onSetBasicInfo (param) {
    dispatch(onSetBasicInfo(param))
  }
}))

class EditItem extends Taro.Component {

  config = {
    navigationBarTitleText: '自定义模板'
  };
  constructor() {
    super(...arguments);
    this.state = {
      isEditModal:false,
      itemValue:'',
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  //打开浮动弹层
  openNewModalFloat = () =>{
    this.setState({
      isEditModal:true
    })
  };
  //关闭浮动弹层
  closeNewModalFloat = ()=>{
    this.setState({
      isEditModal:false
    })
  };
  //输入框change事件
  handleChange =(e) => {
    this.setState({
      itemValue: e.target.value
    })
  };
  //确定事件
  btnOkClick = () =>{
    let _item = CommonFnc.stringToArr(this.state.itemValue);
    console.log(_item);
    let basicInfo = {
      _item:_item,
      _first:true
    };
    this.props.onSetBasicInfo(basicInfo);//将信息存入redux
    Taro.setStorageSync('basicInfo', basicInfo);//将信息存入缓存中
    Taro.navigateBack({
      delta:1
    });
  };

  render () {
    const {isEditModal} = this.state;
    /*创建新模板*/
    const NewModal = (
      <View onClick={this.openNewModalFloat.bind(this)} className='edit-item mt20'>
        <AtIcon value='edit' size='28' color='#000'></AtIcon>
        <Text className='pl20'>创建新的模板</Text>
      </View>
    );
    /*创建新模板浮动弹层*/
    const NewModalFloat = (
      <View>
        <AtFloatLayout isOpened={isEditModal} title='编辑模板' onClose={this.closeNewModalFloat}>
          <AtTextarea
            value={this.state.itemValue}
            onChange={this.handleChange.bind(this)}
            placeholder='输入模板选项用逗号隔开...e.g(爱,不爱)'
          />
          <View className='mt40'>
            <AtButton onClick={this.btnOkClick.bind(this)} type='primary'>确定</AtButton>
          </View>
        </AtFloatLayout>
      </View>
    );

    return (
      <View className='index '>
        <View className='title'>
          <Text className='pl10'>自定义</Text>
        </View>
        {/*创建新模板*/}
        {NewModal}
        {/*创建新模板浮动弹层*/}
        {NewModalFloat}
        <View className='title mt40'>
          <Text className='pl10'>模板</Text>
        </View>
      </View>
    )
  }
}
export default EditItem

