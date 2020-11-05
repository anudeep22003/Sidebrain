import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Typography} from '../../styles'

const {FONT_SIZE, FONT_REGULAR} = Typography

export const Label = props => {
    const {
        label,
        labelStyle: _labelStyle,
        containerStyle: _containerStyle
    } = props

    const {labelStyle} = styles

    return(
        <View style={_containerStyle} >
            <Text style={[labelStyle, _labelStyle]} >
                {label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    labelStyle: {
        ...FONT_REGULAR,
        fontSize: FONT_SIZE.FONT_SIZE_18
    }
})