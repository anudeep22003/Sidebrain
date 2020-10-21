import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, Image, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import {Spacing, Typography, Colors, Strings} from '../styles'
import { SearchBar, ButtonGroup } from 'react-native-elements';

import {ChatCard} from '../components'
import { Icon } from 'react-native-elements';

const {FONT_SIZE, FONT_REGULAR} = Typography
const {SIZE_1, SIZE_2, SIZE_5, SIZE_10, SIZE_55, SIZE_20, SIZE_30} = Spacing
const { LIGHT_GREY, WHITE, BLACK, DARK_GREY } = Colors
const {SEARCH} = Strings

class Chat extends Component {

  constructor() {
    super();
    this.state = {
        data: [1, 2, 3],
        selectedIndex: 1,
        showSearch: false
    };
  }

  renderItem = ({item}) => {
      return <ChatCard data={item} />
  }

  renderFooter = () => {
      const {chatFooterContainerStyle, textInputStyle, soundIconStyle} = styles
      return(
          <View style={chatFooterContainerStyle} >
              <View style={{flex: 1}} >
                <Image source={require('../assets/images/camera.png')} />
              </View>
              <View style={{flex: 1}} >
                <Image source={require('../assets/images/app_store.png')} />
              </View>
              <View style={{flex: 4}} >
                  <TextInput 
                    style={textInputStyle}
                  />
                  <View style={soundIconStyle} >
                    <Image source={require('../assets/images/dictation.png')} />
                  </View>
              </View>
          </View>
      )
  }

  renderHeader = () => {
    const buttons = ['Links', 'All', 'Text']
    const {selectedIndex} = this.state
    const {searchInputContainerStyle, buttonGroupContainerStyle, selectedButtonStyle} = styles
    return (
      <View>
        <SearchBar 
          lightTheme
          containerStyle={{backgroundColor: WHITE, borderWidth: 0}}
          inputContainerStyle={searchInputContainerStyle}
          placeholder={SEARCH}
          inputStyle={{fontSize: FONT_SIZE.FONT_SIZE_18}}
        />
        <ButtonGroup
          onPress={(selectedIndex) => this.setState({selectedIndex})}
          selectedIndex={selectedIndex}
          buttons={buttons}
          selectedButtonStyle={selectedButtonStyle}
          selectedTextStyle={{...FONT_REGULAR, color: BLACK}}
          innerBorderStyle={{width: 0}}
          containerStyle={buttonGroupContainerStyle}
          textStyle={FONT_REGULAR}
        />
        <View style={{height: 1, backgroundColor: DARK_GREY}}  />
      </View>
      
    )
  }

  renderSearchIcon = () => {
    const {showSearch} = this.state
    return (
      <TouchableWithoutFeedback onPress={() => this.setState({showSearch: !showSearch})}  >
        <View style={{position: 'absolute', right: 15, top: 5}} >
          <Image 
            source={!showSearch ? require('../assets/images/search.png') : require('../assets/images/cross.png')} 
          />
        </View>
      </TouchableWithoutFeedback>
      
    )
  }

  render() {
    const {data, showSearch} = this.state
    return(
        <KeyboardAvoidingView 
          style={{flex: 1}} 
          behavior={'height'}
        >
            {showSearch ? this.renderHeader() : false}
            <FlatList
                contentContainerStyle={{padding: SIZE_5}}
                data={data}
                renderItem={this.renderItem}
                inverted
            />
            {!showSearch ? this.renderFooter() : false}
            {this.renderSearchIcon()}
        </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    chatFooterContainerStyle: {
        flexDirection: 'row',
        padding: SIZE_10,
        height: SIZE_55,
        alignItems: 'center'
    },
    textInputStyle: {
        borderRadius: SIZE_20,
        borderWidth: SIZE_1,
        flex: 1,
        borderColor: LIGHT_GREY
    },
    soundIconStyle: {
        position: 'absolute',
        right: 2,
        top: 4
    },
    searchInputContainerStyle: {
      height: SIZE_30, 
      borderRadius: SIZE_10, 
      backgroundColor: LIGHT_GREY, 
      marginRight: SIZE_30
    },
    buttonGroupContainerStyle: {
      borderWidth: 0, 
      backgroundColor: LIGHT_GREY, 
      height: SIZE_30, 
      borderRadius: SIZE_5
    },
    selectedButtonStyle: {
      backgroundColor: WHITE, 
      margin: SIZE_2, 
      borderRadius: SIZE_5
    }
})

export {Chat};
