import React, {Component} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {IS_LOGIN, USER_NAME, USER_EMAIL, X_CUSTOM_HEADER} from '../Constants';
import {Colors, Strings, Typography, Spacing} from '../styles'
import Utils from '../Utils';

const {BLACK, WHITE} = Colors
const {SIDEBRIAN} = Strings
const {FONT_BOLD} = Typography
const {SIZE_25} = Spacing

export default class AuthLoadingScreen extends Component {
    
  async componentDidMount() {
    await this._checkLoginStatus();
  }

  async _checkLoginStatus() {
    const isLogin = await AsyncStorage.getItem(IS_LOGIN);
    if(isLogin == 'true') {
      const mToken = await AsyncStorage.getItem(X_CUSTOM_HEADER);
      const userName = await AsyncStorage.getItem(USER_NAME);
      const userEmail = await AsyncStorage.getItem(USER_EMAIL);
      global[X_CUSTOM_HEADER] = mToken;
      global[USER_NAME] = userName;    
      global[USER_EMAIL] = userEmail
      Utils.navigateByClearingStack('Main', this.props.navigation)
    } else Utils.navigateByClearingStack('Login', this.props.navigation)
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: WHITE, justifyContent: 'center'}}>
        <Text
          textBreakStrategy={'simple'} 
          style={{
            color: BLACK,
            textAlign: 'center',
            fontSize: SIZE_25,
            ...FONT_BOLD
          }}>
          {SIDEBRIAN}
        </Text>
      </View>
    );
  }
}
