import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import { Icon } from 'react-native-elements'

import {Typography, Spacing, Colors, Styles} from '../../styles'

const {LIGHT_GREY, DARK_GREY} = Colors
const {SIZE_5, SIZE_10, SIZE_1, SIZE_80, SIZE_20, SIZE_30, SIZE_200, SIZE_25, SIZE_150} = Spacing
const {FONT_REGULAR, FONT_BOLD} = Typography
const { 
    dimensions: {width}
} = Styles

function getCardData(type) {
    const {waveStyle, textDescriptionStyle, linkStyle, linkTitleStyle} = styles
    switch(type) {
        case 1: return <Image 
                            resizeMode={'contain'}
                            style={waveStyle}
                            source={require('../../assets/images/audio_waves.png')} 
                        />
        case 2: return <Text style={textDescriptionStyle}>Really good read on why decentralization has the potential to have outsize impacts on the web2.0 larger intenet infrastructure that we have come to rely and depend on. This is an excellent article by Chris Cox, ex CPO Facebook</Text>
        case 3: return <View>
                            <Image 
                                resizeMode={'cover'}
                                style={[waveStyle, {height: SIZE_150}]}
                                source={require('../../assets/images/demo_img.png')} 
                            />
                            <Text style={linkTitleStyle} >Why Decentralization Matters</Text>
                            <Text style={linkStyle} >onezero.medium.com</Text>
                        </View>
    }
}

const ChatCard = props => {
    const {data} = props

    const {containerStyle, innerContainerStyle, topContainerStyle, locationTextStyle, waveStyle} = styles
    return(
        <View style={containerStyle} >
            <View style={topContainerStyle} >
                <Image source={require('../../assets/images/location.png')} />
                <Text style={locationTextStyle} >San Francisco, CA</Text>
            </View>
            <View style={[innerContainerStyle, data == 1? {paddingBottom: 30} : {}]} >
                {getCardData(data)}
            </View>
            <Image 
                source={require('../../assets/images/options.png')} 
                style={{position: 'absolute', bottom: data == 3 ? 18 : 12, right: 10}}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    containerStyle: {
        padding: SIZE_10
    },
    topContainerStyle: {
        borderTopLeftRadius: SIZE_5,
        borderTopRightRadius: SIZE_5,
        backgroundColor: LIGHT_GREY,
        width: SIZE_200,
        flexDirection: 'row',
        padding: SIZE_5,
        paddingStart: SIZE_10
    },
    innerContainerStyle: {
        borderRadius: SIZE_10,
        backgroundColor: LIGHT_GREY,
        borderTopLeftRadius: 0,
        marginTop: SIZE_1
    },
    locationTextStyle: {
        ...FONT_REGULAR,
        marginStart: SIZE_10,
    },
    waveStyle: {
        backgroundColor: DARK_GREY, 
        width: width - SIZE_30, 
        borderTopRightRadius: SIZE_10,
        padding: SIZE_10,
        height: SIZE_80
    },
    textDescriptionStyle: {
        ...FONT_REGULAR,
        padding: SIZE_10,
        lineHeight: SIZE_20,
    },
    linkTitleStyle: {
        ...FONT_BOLD,
        paddingStart: SIZE_10,
        paddingTop: SIZE_5
    },
    linkStyle: {
        ...FONT_REGULAR,
        paddingStart: SIZE_10,
        paddingBottom: SIZE_5
    }
})

export {ChatCard}