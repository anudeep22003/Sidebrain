import Utils from '../Utils'

const FONT_FAMILY_REGULAR = 'SFProDisplay-Regular';
const FONT_FAMILY_BOLD = 'SFProDisplay-Bold';
const FONT_FAMILY_SEMIBOLD = 'SFProDisplay-Semibold';
const FONT_FAMILY_MEDIUM = 'SFProDisplay-Medium';

const FONT_WEIGHT_REGULAR = '400';
const FONT_WEIGHT_BOLD = '700';
const FONT_WEIGHT_SEMIBOLD = '600';
const FONT_WEIGHT_MEDIUM = '500';


export const Typography = {
    FONT_SIZE: {
        FONT_SIZE_30: Utils.scaleFont(30),
        FONT_SIZE_28: Utils.scaleFont(28),
        FONT_SIZE_26: Utils.scaleFont(26),
        FONT_SIZE_24: Utils.scaleFont(24),
        FONT_SIZE_22: Utils.scaleFont(22),
        FONT_SIZE_20: Utils.scaleFont(20),
        FONT_SIZE_18: Utils.scaleFont(18),
        FONT_SIZE_16: Utils.scaleFont(16),
        FONT_SIZE_14: Utils.scaleFont(14),
    },
    FONT_REGULAR: {
        fontFamily: FONT_FAMILY_REGULAR,
        //fontWeight: FONT_WEIGHT_REGULAR
    },
    FONT_BOLD: {
        fontFamily: FONT_FAMILY_BOLD,
        //fontWeight: FONT_WEIGHT_BOLD
    },
    FONT_SEMIBOLD: {
        fontFamily: FONT_FAMILY_SEMIBOLD,
        //fontWeight: FONT_WEIGHT_SEMIBOLD
    },
    FONT_MEDIUM: {
        fontFamily: FONT_FAMILY_MEDIUM,
        //fontWeight: FONT_WEIGHT_MEDIUM
    }

}