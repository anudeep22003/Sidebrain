import {Dimensions} from 'react-native'
const {width} = Dimensions.get('window')
import Utils from '../Utils'

export const Spacing = {
    SIZE_1: Utils.scaleSize(1),
    SIZE_2: Utils.scaleSize(2),
    SIZE_3: Utils.scaleSize(3),
    SIZE_5: Utils.scaleSize(5),
    SIZE_7: Utils.scaleSize(7),
    SIZE_10: Utils.scaleSize(10),
    SIZE_15: Utils.scaleSize(15),
    SIZE_20: Utils.scaleSize(20),
    SIZE_25: Utils.scaleSize(25),
    SIZE_30: Utils.scaleSize(30),
    SIZE_35: Utils.scaleSize(35),
    SIZE_40: Utils.scaleSize(40),
    SIZE_50: Utils.scaleSize(50),
    SIZE_55: Utils.scaleSize(55),
    SIZE_60: Utils.scaleSize(60),
    SIZE_80: Utils.scaleSize(80),
    SIZE_100: Utils.scaleSize(100),
    SIZE_150: Utils.scaleSize(150),
    SIZE_200: Utils.scaleSize(200),
    SIZE_300: Utils.scaleSize(300),

    ORDER_HEADER_WIDTH: '100%',
    HEADER_HEIGHT: Utils.scaleSize(60),
    SWIPE_WIDTH: Utils.scaleSize(75),
    ORDER_ROW_HEIGHT: Utils.scaleSize(52),

    TEXT_INPUT_WIDTH: '50%',
    TAB_HEIGHT: Utils.scaleSize(40),

    LOGIN_BORDER_RADIUS: Utils.scaleSize(60),

    SEARCH_ICON_PADDING: Utils.scaleSize(10)
};
