import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableOpacity,
  PanResponder,
} from 'react-native'
import _ from 'lodash'

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

    const { data, searchBarWidth = 20 } = this.props
    if (px > 0 & px < searchBarWidth) {
      if (index < data.length) {
        this.listView.scrollTo({y: this[`offsetYFor${_.keys(data[index])[0]}`], animated: false})
      }
    }
  }

  _renderRow (data, sectionID, rowID, highlightRow) {
    return (
      <View onLayout={this._onCellLayout.bind(this, rowID)}>
        {this.props.renderRow(data, sectionID, rowID, highlightRow)}
      </View>
    )
  }

  _onCellLayout (index, event) {
    const { data } = this.props
    this[`offsetYFor${_.keys(data[index])[0]}`] = event.nativeEvent.layout.y
  }

  _handleSwitch (index) {
    const { data } = this.props
    this.listView.scrollTo({y: this[`offsetYFor${_.keys(data[index])[0]}`], animated: false})
  }

  render () {
    const {
      data,
      searchBarBackgroundColor,
      searchBarWidth,
      searchBarTextStyle,
    } = this.props
    return (
      <View style={styles.container}>
        <ListView
          ref={ lv => this.listView = lv}
          dataSource={this.dataSource.cloneWithRows(data)}
          renderRow={this._renderRow.bind(this)}
         />
        <View
          {...this.panResponder.panHandlers}
          style={[
            styles.searchBar,
            searchBarBackgroundColor ? { backgroundColor: searchBarBackgroundColor } : {},
            searchBarWidth ? { width: searchBarWidth } : {}
          ]}
        >
          {
            data.map((item, index) => (
              <TouchableOpacity onPress={this._handleSwitch.bind(this, index)} key={index} style={styles.searchBarItem}>
                <Text style={[{ fontSize: 18 }, searchBarTextStyle]}>{_.keys(item)[0]}</Text>
              </TouchableOpacity>)
            )
          }
        </View>
      </View>
    )
  }
}

StickySearchList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  searchBarBackgroundColor: PropTypes.string,
  searchBarWidth: PropTypes.number,
  searchBarTextStyle: PropTypes.object,
  renderRow: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  searchBar: {
    width: 20,
    position: 'absolute',
    top: 50,
    right: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  searchBarItem: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})