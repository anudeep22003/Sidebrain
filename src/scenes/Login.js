import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Colors, Typography, Strings, Spacing} from '../styles'
import {FbLoginButton, GoogleLoginButton} from '../components'
import {Webservices} from '../services'
import Utils from '../Utils'
import DropDownService from '../DropDownService'

const {FONT_BOLD, FONT_REGULAR, FONT_SEMIBOLD,FONT_SIZE} = Typography
const {BLACK, WHITE} = Colors
const {SIZE_7, SIZE_10, SIZE_20, SIZE_40, SIZE_200} = Spacing
const {
  WELCOME_TO_SIDEBRIAN, 
  SIDEBRIAN, 
  ADD_CONTENT_ON_GO, 
  OB1_DESC, 
  FACEBOOK, 
  GOOGLE,
  ERROR,
  ERROR_MESSAGE
} = Strings

class Login extends Component {

  constructor() {
    super();
    this.state = {};
  }

  onOauthCallback = async (data, loginType) => {
      const {navigation} = this.props
      const {name, email} = loginType == FACEBOOK ? data : data.user
      try {
        const {data: response} = await Webservices.signInUser({name, email})
        console.log({response});
        const {status, data, message} = await Utils.processResponse(response)
        if(!status) DropDownService.alert('error', ERROR, message)
        else Utils.navigateByClearingStack("Main", navigation)
  
      } catch (err) {
        console.log({err});
        DropDownService.alert('error', ERROR, ERROR_MESSAGE)
      }
  }
  
  render() {
    const {headerStyle, onboardingTextStyle, onboardingDescTextStyle} = styles
    return (
      <View style={{flex: 1, paddingTop: SIZE_20, backgroundColor: WHITE, justifyContent: 'center'}}>
        <View>
          <Text style={headerStyle} >{WELCOME_TO_SIDEBRIAN}</Text>
          <Text style={headerStyle} >{SIDEBRIAN}</Text>

          <Image
            source={require('../assets/images/ob1.png')}
          />

          <Text style={onboardingTextStyle} >{ADD_CONTENT_ON_GO}</Text>
          <Text style={onboardingDescTextStyle} >{OB1_DESC}</Text>

          <View style={{marginTop: SIZE_20}} />

          <FbLoginButton 
            userDetailsCallback={(data) => this.onOauthCallback(data, FACEBOOK)}
          />
          <GoogleLoginButton 
            userDetailsCallback={(data) => this.onOauthCallback(data, GOOGLE)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    ...FONT_BOLD,
    fontSize: FONT_SIZE.FONT_SIZE_30,
    textAlign: 'center'
  },
  onboardingTextStyle: {
    ...FONT_BOLD,
    fontSize: FONT_SIZE.FONT_SIZE_22,
    textAlign: 'center',
    marginTop: -SIZE_20
  },
  onboardingDescTextStyle: {
    ...FONT_REGULAR,
    fontSize: FONT_SIZE.FONT_SIZE_16,
    textAlign: 'center',
    marginTop: SIZE_10,
    marginStart: SIZE_20,
    marginEnd: SIZE_20
  }
})

export {Login};
