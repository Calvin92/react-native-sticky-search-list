## Introduction
Like `All Contacts` in the iPhone contacts appliction, you can use `react-native` to implement a `All Contacts`-like list with this module. You can index by first letter ([A...Z]) split up sections.

类似于在`iPhone`上的`通讯录`的联系人列表，你能使用`react-native`实现一个类似的列表。通过[A...Z]等索引到相应的区块。

## Usage
First, install this module：
```
npm install react-native-sticky-search-list --save
```

and then：
```
import StickySearchList from 'react-native-sticky-search-list'
```

### Props
**data**

dataSource like below:
```
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
```

**searchBarWidth**

`number`  The width of searchBar

**renderRow**

`function`  the renderRow function for `ListView`

**searchBarTextStyle**

`object` the style of search-bar text

**searchBarBackgroundColor**

`string` the background color of search-bar

## Example
```
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import _ from 'lodash'
import StickySearchList from 'react-native-sticky-search-list'

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

export default class AotuDemo2 extends Component {
   _renderRow (data, sectionID, rowID, highlightRow) {
    return (
      <View style={{ paddingBottom: 80 }}>
        <Text style={{ fontSize: 22 }}>{_.keys(data)[0]}</Text>
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

  render () {
    return (
      <View style={styles.container}>
        <StickySearchList data={data} renderRow={this._renderRow} />
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
});

AppRegistry.registerComponent('AotuDemo2', () => AotuDemo2);

```

## Screen Shot
![](https://github.com/Calvin92/react-native-sticky-search-list/blob/master/screenshot.png)