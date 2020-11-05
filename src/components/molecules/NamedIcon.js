import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Spacing} from '../../styles'
import {Icon} from 'react-native-elements'
import { Label } from '../atoms'

const {SIZE_5} = Spacing

export const NamedIcon = props => {

    const {
        label,
        iconProps,
        containerStyle: _containerStyle,
        onPress
    } = props

    const {containerStyle} = styles
    return(
        <TouchableOpacity onPress={onPress} >
            <View style={[containerStyle, _containerStyle]} >
                <Label label={label} />
                <Icon  
                    {...iconProps}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZE_5
    }
})