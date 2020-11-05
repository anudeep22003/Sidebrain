import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Colors, Typography, Strings, Spacing} from '../styles'
import {SignInButton} from '../components'
import {Button} from '../components'

const {FONT_BOLD, FONT_REGULAR, FONT_SEMIBOLD,FONT_SIZE} = Typography
const {BLACK, WHITE} = Colors
const {SIZE_7, SIZE_10, SIZE_20, SIZE_40, SIZE_200} = Spacing
const {WELCOME_TO_SIDEBRIAN, SIDEBRIAN, ADD_CONTENT_ON_GO, OB1_DESC, SIGN_IN_WITH_APPLE} = Strings

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  render() {
    const {headerStyle, onboardingTextStyle, onboardingDescTextStyle} = styles
    return (
      <View style={{flex: 1, paddingTop: SIZE_20, backgroundColor: WHITE}}>
        <Text style={headerStyle} >{WELCOME_TO_SIDEBRIAN}</Text>
        <Text style={headerStyle} >{SIDEBRIAN}</Text>

        <Image
          source={require('../assets/images/ob1.png')}
        />

        <Text style={onboardingTextStyle} >{ADD_CONTENT_ON_GO}</Text>
        <Text style={onboardingDescTextStyle} >{OB1_DESC}</Text>

        <Button
          containerStyle={{marginTop: SIZE_40, width: 200}} 
          onPress={() => this.props.navigation.navigate('Chat')}
          title={SIGN_IN_WITH_APPLE}
          icon={{type: 'font-awesome', name: 'apple', color: WHITE, size: SIZE_20, iconStyle: {marginEnd: SIZE_10}}}
        />
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
