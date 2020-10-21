import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import {Spacing, Typography, Strings, Colors} from '../styles'

import {Button} from 'react-native-elements'


const {SIZE_7, SIZE_20, SIZE_10, SIZE_5, SIZE_1, SIZE_40} = Spacing
const {FONT_BOLD, FONT_REGULAR, FONT_SEMIBOLD,FONT_SIZE} = Typography
const {NAME, ADDRESS, EMAIL, SAVE} = Strings
const {LIGHT_GREY, BLACK, DARK_GREY, WHITE} = Colors


class Profile extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {avatarContainerStyle, nameStyle, labelStyle, textInputStyle, buttonContainerStyle, editButtonStyle, editContainerStyle} = styles;
    return(
        <View style={{flex: 1, padding: SIZE_20}} >

            <View>

                <Image
                    style={avatarContainerStyle}
                    source={require('../assets/images/profile.png')}
                    resizeMode={'center'}
                />

                <View style={editContainerStyle} >
                    <Text style={editButtonStyle} >Edit</Text>
                </View>

            </View>
         
            <Text style={nameStyle}>Anudeep Yegireddi</Text>

            <View style={{marginBottom: SIZE_20}}  />

            <View style={{marginTop: SIZE_20}} />

            <Text style={labelStyle} >{NAME}</Text>
            <TextInput
                style={textInputStyle}
            />
            <Text style={labelStyle} >{ADDRESS}</Text>
            <TextInput
                style={textInputStyle}
            />
            <Text style={labelStyle} >{EMAIL}</Text>
            <TextInput
                style={textInputStyle}
            />

            <Button
                onPress={() => this.props.navigation.navigate('Chat')}
                containerStyle={buttonContainerStyle}
                buttonStyle={{backgroundColor: BLACK}}
                title={SAVE}
                titleStyle={FONT_BOLD}
                />

        </View>
    )
  }
}


const styles = StyleSheet.create({
    avatarContainerStyle: {
        alignSelf: 'center', 
        marginTop: SIZE_20,
        borderRadius: 50,
        height: 100,
        width: 100,
        borderColor: DARK_GREY,
        borderWidth: SIZE_1,
    },
    nameStyle: {
        ...FONT_BOLD,
        textAlign: 'center',
        fontSize: FONT_SIZE.FONT_SIZE_24,
        marginTop: SIZE_10
    },
    labelStyle: {
        ...FONT_SEMIBOLD,
        fontSize: FONT_SIZE.FONT_SIZE_20,
    },
    textInputStyle: {
        borderRadius: SIZE_5,
        borderWidth: SIZE_1,
        borderColor: LIGHT_GREY,
        height: SIZE_40,
        marginTop: SIZE_5,
        marginBottom: SIZE_20,
    },
    buttonContainerStyle: {
        marginTop: SIZE_40,
        width: 200,
        alignSelf: 'center',
        borderRadius: SIZE_7
    },
    editButtonStyle: {
        textAlign: 'center',
        width: 40,
        backgroundColor: DARK_GREY,
        alignSelf: 'center',
        borderRadius: 20,
        fontSize: FONT_SIZE.FONT_SIZE_14,
        color: WHITE,
    },
    editContainerStyle: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: SIZE_10,
    }
})


export {Profile};
