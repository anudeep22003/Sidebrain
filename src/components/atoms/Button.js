import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as _Button} from 'react-native-elements';
import {Colors, Spacing, Typography} from '../../styles';

const {BLACK} = Colors;
const {SIZE_7, SIZE_40, SIZE_200} = Spacing
const {FONT_REGULAR, FONT_SIZE} = Typography

export const Button = props => {
  const {
    onPress,
    containerStyle: _containerStyle,
    titleStyle: _titleStyle,
  } = props;

  const {containerStyle, titleStyle} = styles

  return (
    <_Button
      {...props}
      onPress={onPress}
      containerStyle={[containerStyle, _containerStyle]}
      buttonStyle={{backgroundColor: BLACK}}
      titleStyle={[titleStyle, _titleStyle]}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: SIZE_200,
    alignSelf: 'center',
    borderRadius: SIZE_7,
  },
  titleStyle: {
    ...FONT_REGULAR,
    fontSize: FONT_SIZE.FONT_SIZE_18,
  },
});
