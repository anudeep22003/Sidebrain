import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, Typography, Strings, Spacing} from '../styles'
import {Button} from 'react-native-elements'


const {FONT_BOLD, FONT_REGULAR, FONT_SEMIBOLD,FONT_SIZE} = Typography
const {BLACK, WHITE} = Colors
const {SIZE_7, SIZE_10, SIZE_20, SIZE_40, SIZE_200} = Spacing
const {WELCOME_TO_SIDEBRIAN, SIDEBRIAN, ADD_CONTENT_ON_GO, OB1_DESC} = Strings

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  
  render() {
    const {headerStyle, onboardingTextStyle, onboardingDescTextStyle, buttonContainerStyle, buttonTitleStyle} = styles
    return (
      <View style={{flex: 1, marginTop: SIZE_20}}>
        <Text style={headerStyle} >{WELCOME_TO_SIDEBRIAN}</Text>
        <Text style={headerStyle} >{SIDEBRIAN}</Text>

        <Image
          source={require('../assets/images/ob1.png')}
        />

        <Text style={onboardingTextStyle} >{ADD_CONTENT_ON_GO}</Text>
        <Text style={onboardingDescTextStyle} >{OB1_DESC}</Text>

        <Button
          onPress={() => this.props.navigation.navigate('Profile')}
          containerStyle={buttonContainerStyle}
          buttonStyle={{backgroundColor: BLACK}}
          title={'Sign in with Apple'}
          titleStyle={buttonTitleStyle}
          icon={{type: 'font-awesome', name: 'apple', color: WHITE, size: SIZE_20}}
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
  },
  buttonContainerStyle: {
    marginTop: SIZE_40,
    width: SIZE_200,
    alignSelf: 'center',
    borderRadius: SIZE_7
  },
  buttonTitleStyle: {
    ...FONT_REGULAR,
    fontSize: FONT_SIZE.FONT_SIZE_18,
    marginStart: SIZE_10
  }
})

export {Login};
