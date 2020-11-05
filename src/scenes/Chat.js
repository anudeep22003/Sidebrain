import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Image, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Platform} from 'react-native';
import {Spacing, Typography, Colors, Strings} from '../styles'
import { SearchBar, ButtonGroup } from 'react-native-elements';
import { MenuProvider } from 'react-native-popup-menu';
import {ChatCard} from '../components'
import VideoRecorder from 'react-native-beautiful-video-recorder';
import UUIDGenerator from 'react-native-uuid-generator';
import Geolocation from 'react-native-geolocation-service';

const {FONT_SIZE, FONT_REGULAR} = Typography
const {SIZE_1, SIZE_2, SIZE_5, SIZE_10, SIZE_50, SIZE_55, SIZE_20, SIZE_30} = Spacing
const { LIGHT_GREY, WHITE, BLACK, DARK_GREY } = Colors
const { SEARCH, LINK, TEXT, AUDIO, IMAGE, VIDEO } = Strings

const mSampleData = [
  {id: '110ebc93-465c-4449-b4cf-967215efc5f5', type: VIDEO, data: {uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', coords: 'Patna, Bihar'}},
  {id: 'd212fbde-56be-4d90-b7f3-2cf70a2c497c', type: LINK, data: {uri: 'http://codebuckets.in/', coords: 'Patna, Bihar'}},
  {id: '2e164721-76c8-44e8-af29-14994f13e0db', type: TEXT, data: {uri: 'Really good read on why decentralization has the potential to have outsize impacts on the web2.0 larger intenet infrastructure that we have come to rely and depend on. This is an excellent article by Chris Cox, ex CPO Facebook', coords: 'San Francisco, CA'}},
  {id: 'b209e87a-a744-4f0b-99e1-b000b95478e8', type: AUDIO, data: {uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', coords: 'Mumbai, Maharashtra'}},
  {id: '7f1b25be-7d2f-4d6c-9690-067f6aed5c9e', type: IMAGE, data: {uri: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png', coords: 'Srinagar, J&K'}},
]
const mUrlRegex = new RegExp(
  "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
 ,"g"
);

class Chat extends Component {

  constructor() {
    super();
    this.state = {
        data: mSampleData,
        selectedIndex: 1,
        showSearch: false,
        text: '',
        uuid: '',
        selectedIdToEdit: ''
    };
  }

  componentDidMount() {
    this.generateUUID()
    this.getLocationPermissions()
  }

  async getLocationPermissions() {
    if(Platform.OS == 'ios') {
      const data = await Geolocation.requestAuthorization("whenInUse")
      console.log({data});
    }
  }

  getCoordinates = async () => {
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log({position});
          resolve(position)
        },
        (error) => {
          console.log({error});
          reject(error)
        },
        {  }
    );
    })
  }

  renderItem = ({item, index}) => {
      return <ChatCard data={item} onEdit={this.onTextOrLinkEdited} />
  }

  generateUUID = () => {
    UUIDGenerator.getRandomUUID((uuid) => {
        this.setState({uuid})
    });
  }


  onDataAdded = async () => {
    const {data, text, uuid, selectedIdToEdit} = this.state
    await this.getCoordinates()
    if(text.length == 0) return
    const mUrls = text.match(mUrlRegex)
    const mData = {
      data: {uri: text, coords: 'San Francisco, CA'},
      type: mUrls ? LINK : TEXT,
      id: uuid
    }
    if(selectedIdToEdit.length == 0) data.unshift(mData)
    else {
      const mIndex = data.findIndex((v) => v.id === selectedIdToEdit)
      data[mIndex] = mData
    }
    this.setState({data, text: ''}, this.generateUUID)
  }

  cameraStart = () => {
    this.videoRecorder.open({ maxLength: 30 },(data) => {
      console.log('captured data', data);
    });
  }

  onTextOrLinkEdited = (id, content) => {
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
