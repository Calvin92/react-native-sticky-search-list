import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ListView,
  Dimensions,
  PanResponder,
} from 'react-native';
import _ from 'lodash'

const data = [
  {A: [1, 2, 3]},
  {B: [1, 2, 3]},
  {C: [1, 2, 3]},
  {D: [1, 2, 3]},
  {E: [1, 2, 3]},
  {F: [1, 2, 3]},
  {G: [1, 2, 3]},
  {H: [1, 2, 3]},
  {I: [1, 2, 3]},
  {J: [1, 2, 3]},
  {K: [1, 2, 3]},
  {L: [1, 2, 3]},
  {M: [1, 2, 3]},
  {N: [1, 2, 3]},
  {O: [1, 2, 3]},
  {P: [1, 2, 3]},
  {Q: [1, 2, 3]},
  {R: [1, 2, 3]},
  {S: [1, 2, 3]},
]

export default class StickySearchList extends Component {

  constructor(props) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
      onPanResponderMove: this.onPanResponderMove.bind(this),
    })
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  onShouldSetPanResponder (e, gesture) {
    return true
  }

  onPanResponderMove (e, gesture) {
    const py = e.nativeEvent.pageY - 50
    const px = e.nativeEvent.locationX

    const index = Math.floor(py / 30)
    if (px > 0 & px < 20) {
      if (index < data.length) {
        this.listView.scrollTo({y: this[`offsetYFor${_.keys(data[index])[0]}`], animated: false})
      }
    }
  }

  _renderRow (data, sectionID, rowID, highlightRow) {
    return (
      <View style={{ paddingBottom: 80 }} onLayout={this._onCellLayout.bind(this, rowID)}>
        <Text>{_.keys(data)[0]}</Text>
        <View>
          <Text>
            佛山风景发啦发就看到了份
            快乐的撒娇分开了多久啊看了份就是
            打开房间啊但是看了积分卡收费集散地间发生的
          </Text>
        </View>
      </View>
    )
  }

  _onCellLayout (index, event) {
    // console.log(index)
    this[`offsetYFor${_.keys(data[index])[0]}`] = event.nativeEvent.layout.y
    // console.log(this[`offsetYFor${_.keys(data[index])[0]}`])
    // console.log(event.nativeEvent.layout.y)
    // console.log(_.keys(data[index])[0])
  }

  _handleSwitch (index) {
    this.listView.scrollTo({y: this[`offsetYFor${_.keys(data[index])[0]}`], animated: true})
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          ref={ lv => this.listView = lv}
          dataSource={this.dataSource.cloneWithRows(data)}
          renderRow={this._renderRow.bind(this)}
         />
        <View
          {...this.panResponder.panHandlers}
          style={{ width: 20, position: 'absolute', top: 50, right: 10, borderRadius: 5, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          {
            data.map((item, index) => (
              <TouchableOpacity onPress={this._handleSwitch.bind(this, index)} key={index} style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18 }}>{_.keys(item)[0]}</Text>
              </TouchableOpacity>)
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});