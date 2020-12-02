import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Image, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Platform} from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import { MenuProvider } from 'react-native-popup-menu';
import VideoRecorder from 'react-native-beautiful-video-recorder';
import UUIDGenerator from 'react-native-uuid-generator';
import Geolocation from 'react-native-geolocation-service';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

import DropDownService from '../DropDownService'
import {ChatCard} from '../components'
import {Spacing, Typography, Colors, Strings} from '../styles'
import {Webservices} from '../services'
import Utils from '../Utils'

const {FONT_SIZE, FONT_REGULAR} = Typography
const {SIZE_1, SIZE_2, SIZE_5, SIZE_10, SIZE_50, SIZE_55, SIZE_20, SIZE_30} = Spacing
const { LIGHT_GREY, WHITE, BLACK, DARK_GREY } = Colors
const { 
  SEARCH, 
  LINK, 
  TEXT, 
  AUDIO, 
  IMAGE, 
  VIDEO,
  ERROR,
  ERROR_MESSAGE
} = Strings


const mUrlRegex = new RegExp(
  "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
 ,"g"
);

class Chat extends Component {

  constructor() {
    super();
    this.state = {
        data: [],
        selectedIndex: 1,
        showSearch: false,
        text: '',
        uuid: '',
        selectedIdToEdit: '',
        searchText: '',
        mFilterData: []
    };
  }

  componentDidMount() {
    this.generateUUID()
    this.getLocationPermissions()
    this.getUserSidebrain()
    this.receiveSharedFiles()
  }

  componentWillUnmount() {
    ReceiveSharingIntent.clearReceivedFiles();
  }
  
 
  receiveSharedFiles = () => {
    ReceiveSharingIntent.getReceivedFiles(files => {
      const {filePath, text, weblink} = files[0]
      const [type, uri] = text ? [TEXT, text] : weblink ? [LINK, weblink] : [IMAGE, filePath]
      console.log({type, uri});
      ReceiveSharingIntent.clearReceivedFiles();
      this.onDataAdded(type, uri)
    }, 
    (error) =>{
      DropDownService.alert('error', ERROR, ERROR_MESSAGE)
    });
  }

  getUserSidebrain = async () => {
    try {
      const {data: response} = await Webservices.getUserSidebrain()
      const {status, message, data} = await Utils.processResponse(response)
      if(!status) DropDownService.alert('error', ERROR, message)
      else this.setState({data, mFilterData: data})
    } catch(err) {
      DropDownService.alert('error', ERROR, ERROR_MESSAGE)
    }
  }

  async getLocationPermissions() {
    if(Platform.OS == 'ios') {
      const data = await Geolocation.requestAuthorization("whenInUse")
    }
  }

  getCoordinates = async () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
          (position) => {
            resolve(position)
          },
          (error) => {
            console.log({error});
            reject(error)
          },
          { enableHighAccuracy: true }
      );
    })
  }

  onDelete = (id) => {
    const {data} = this.state
    const mIndex = data.findIndex((v) => v.id === id)
    data.splice(mIndex, 1)
    this.setState({data})
    this.deleteSidebrain(id)
  }

  renderItem = ({item, index}) => {
      return <ChatCard data={item} onEdit={this.onEdit} onDelete={this.onDelete} />
  }

  generateUUID = () => {
    UUIDGenerator.getRandomUUID((uuid) => {
        this.setState({uuid})
    });
  }

  onDataAdded = async (mType, mUri) => {
    const {data, text, uuid, selectedIdToEdit} = this.state
    const {coords: {latitude, longitude}} = await this.getCoordinates()
    if(!mUri && text.length == 0) return

    const mUrls = text ? text.match(mUrlRegex) : null
    const sidebrainType = mType ? mType : mUrls ? LINK : TEXT
    const mData = {
      data: {uri: mUri ? mUri : text, coords: `${latitude} , ${longitude}`},
      type: sidebrainType,
      id: uuid
    }
    if(selectedIdToEdit.length == 0) {
      data.unshift(mData)
      this.saveSidebrain(mData)
    }
    else {
      const mIndex = data.findIndex((v) => v.id === selectedIdToEdit)
      data[mIndex] = mData
      this.editSidebrain()
    }
    this.setState({data, text: ''}, this.generateUUID)
  }

  editSidebrain = async () => {
    const {selectedIdToEdit, text} = this.state
    try {
      const {data: response} = await Webservices.editUserSidebrain({id: selectedIdToEdit, uri: text})
      const {status, message, data} = await Utils.processResponse(response)
      if(!status) DropDownService.alert('error', ERROR, message)
      this.setState({selectedIdToEdit: ''})
    } catch(err) {
      DropDownService.alert('error', ERROR, ERROR_MESSAGE)
    }
  }

  deleteSidebrain = async (id) => {
    try {
      const {data: response} = await Webservices.deleteUserSidebrain({id})
      const {status, message, data} = await Utils.processResponse(response)
      if(!status) DropDownService.alert('error', ERROR, message)
    } catch(err) {
      DropDownService.alert('error', ERROR, ERROR_MESSAGE)
    }
  }

  saveSidebrain = async ({type: sidebrainType, data: {uri, coords}}) => {
    try {
      const mCheckIfMultipartRequired = sidebrainType == VIDEO || sidebrainType == IMAGE || sidebrainType == AUDIO
      const response = await Webservices.uploadSidebrain({mCheckIfMultipartRequired, sidebrainType, coords, uri}) 
      const {status, message, data} = await Utils.processResponse(response)
      if(!status) DropDownService.alert('error', ERROR, message)
      
    } catch(err) {
      console.log({err});
    }
  }

  cameraStart = () => {
    this.videoRecorder.open({ maxLength: 30 }, ({uri}) => {
      this.onDataAdded(VIDEO, uri)
    });
  }

  onPictureClick = ({uri}) => {
    this.onDataAdded(IMAGE, uri)
  }

  onEdit = (id, content) => {
    this.setState({selectedIdToEdit: id, text: content})
  }

  renderFooter = () => {
      const {text} = this.state
      const {chatFooterContainerStyle, textInputStyle, soundIconStyle} = styles
      return(
          <View style={chatFooterContainerStyle} >
              <View style={{flex: 1}} >
                <TouchableWithoutFeedback onPress={() => this.cameraStart()} >
                  <Image source={require('../assets/images/camera.png')} />
                </TouchableWithoutFeedback>
              </View>
              <View style={{flex: 1}} >
                <Image source={require('../assets/images/app_store.png')} />
              </View>
              <View style={{flex: 4}} >
                  <TextInput 
                    value={text}
                    onChangeText={(text) => this.setState({text})}
                    onSubmitEditing={() => this.onDataAdded()}
                    style={textInputStyle}
                  />
                  <View style={soundIconStyle} >
                    <Image source={require('../assets/images/dictation.png')} />
                  </View>
              </View>
          </View>
      )
  }


  onSearch = (text, selectedIndex) => {
    const {mFilterData} = this.state
    const mTempData = []

    mFilterData.map((v) => {
      const {data: {uri}, type} = v
      if((uri && uri.includes(text)) && (selectedIndex != 1 ? (selectedIndex == 0 && type == LINK) || (selectedIndex == 2 && type == TEXT) : true)) mTempData.push(v)
    })

    this.setState({data: mTempData, selectedIndex, searchText: text})
  }


  renderHeader = () => {
    const buttons = ['Links', 'All', 'Text']
    const {selectedIndex, searchText} = this.state
    const {searchInputContainerStyle, buttonGroupContainerStyle, selectedButtonStyle} = styles
    return (
      <View>
        <SearchBar 
          value={searchText}
          onChangeText={(text) => this.onSearch(text, selectedIndex)}
          lightTheme
          containerStyle={{backgroundColor: WHITE, borderWidth: 0}}
          inputContainerStyle={searchInputContainerStyle}
          placeholder={SEARCH}
          inputStyle={{fontSize: FONT_SIZE.FONT_SIZE_18}}
        />
        <ButtonGroup
          onPress={(selectedIndex) => this.onSearch(searchText, selectedIndex)}
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
    const {showSearch, mFilterData} = this.state
    return (
      <TouchableWithoutFeedback onPress={() => this.setState({showSearch: !showSearch, data: mFilterData, selectedIndex: 1})}  >
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
          behavior={'padding'}
          keyboardVerticalOffset={SIZE_50}
        >
            {showSearch ? this.renderHeader() : false}
              <MenuProvider>
              <FlatList
                  contentContainerStyle={{padding: SIZE_5}}
                  data={data}
                  renderItem={this.renderItem}
                  inverted
                  keyExtractor={(item, index) => item.id}
              />
           </MenuProvider>
            {!showSearch ? this.renderFooter() : false}
            {this.renderSearchIcon()}
            <VideoRecorder 
              ref={(ref) => { this.videoRecorder = ref; }} 
              buttonCloseStyle={{position: 'absolute', top: 40, right: 20}}
              onPictureClick={this.onPictureClick}
            />
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
        borderColor: WHITE,
        backgroundColor: WHITE,
        paddingEnd: SIZE_20
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
