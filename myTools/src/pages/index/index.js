import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import * as CommonFnc from "../../utils/commonFnc";
import turntable from '../../public/imgs/turntable.png'
import fu from '../../public/imgs/fu.png'
import book from '../../public/imgs/book.png'
import eggImg from '../../public/imgs/egg.png'
import './index.scss'

export default class Index extends Taro.Component {

  config = {
    navigationBarTitleText: '首页'
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
    /*幸运大转盘*/
    const turnTable = (
      <View className='pd10' onClick={this.goView.bind(this,'/pages/turnTbl/index')}>
        <View className='at-row toolTitle'>
          <View className='at-col-4 text-center'>
            <View className='pd10'>
              <Image className='img-left' src={turntable}></Image>
            </View>
          </View>
          <View className='at-col-8'>
            <View className='pd10'>
              <Text className='font-right'>幸运大转盘</Text>
            </View>
          </View>
        </View>
      </View>
    )
    /*小小祝福*/
    const wishes = (
      <View className='pd10' onClick={this.goView.bind(this,'/pages/wishes/index')}>
        <View className='at-row toolTitle'>
          <View className='at-col-4 text-center'>
            <View className='pd10'>
              <Image className='img-left' src={fu}></Image>
            </View>
          </View>
          <View className='at-col-8'>
            <View className='pd10'>
              <Text className='font-right'>小小祝福</Text>
            </View>
          </View>
        </View>
      </View>
    )
    /*答案之书*/
    const answer = (
      <View className='pd10' onClick={this.goView.bind(this,'/pages/answer/index')}>
        <View className='at-row toolTitle'>
          <View className='at-col-4 text-center'>
            <View className='pd10'>
              <Image className='img-left' src={book}></Image>
            </View>
          </View>
          <View className='at-col-8'>
            <View className='pd10'>
              <Text className='font-right'>答案之书</Text>
            </View>
          </View>
        </View>
      </View>
    );
    /*砸金蛋*/
    const egg = (
      <View className='pd10' onClick={this.goView.bind(this,'/pages/egg/index')}>
        <View className='at-row toolTitle'>
          <View className='at-col-4 text-center'>
            <View className='pd10'>
              <Image className='img-left' src={eggImg}></Image>
            </View>
          </View>
          <View className='at-col-8'>
            <View className='pd10'>
              <Text className='font-right'>砸蛋大抽奖</Text>
            </View>
          </View>
        </View>
      </View>
    )
    return (
      <View className='index'>
        <View className='content'>
          <View className='at-row at-row--wrap'>
            <View className='at-col-6'>
              {/*幸运大转盘*/}
              {turnTable}
            </View>
            <View className='at-col-6'>
              {/*小小祝福*/}
              {wishes}
            </View>
            <View className='at-col-6'>
              {/*答案之书*/}
              {answer}
            </View>
            <View className='at-col-6'>
              {/*砸金蛋*/}
              {egg}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

