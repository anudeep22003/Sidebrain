import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Dimensions,
  StyleSheet,
  UIManager,
  Platform
} from 'react-native';
import {Colors, Typography} from './styles';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownService from './DropDownService'
import Navigation from './navigations'

const {WHITE, BLACK} = Colors;
const {width, height} = Dimensions.get('window');
const {FONT_SEMIBOLD} = Typography

class App extends Component {

  componentDidMount() {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }

  showSpinner = () => {
    const {spinnerContainerStyle} = styles
    return (
      <View style={spinnerContainerStyle}>
        <Spinner isVisible={true} type={'Wave'} color={ORANGE} size={50} />
      </View>
    );
  };
  

  render() {
    console.disableYellowBox = true;
    // const {loadingStatus, statusColor} = this.props.state;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
        {/* <StatusBar backgroundColor={statusColor} barStyle="light-content" /> */}
        <DropdownAlert 
          ref={ref => DropDownService.setDropDownAlert(ref)} 
          tapToCloseEnabled
          titleStyle={{...FONT_SEMIBOLD, color: WHITE}}
          messageStyle={{...FONT_SEMIBOLD, color: WHITE}}
          inactiveStatusBarBackgroundColor={BLACK}
        />
        <Navigation />
        {/* {loadingStatus ? this.showSpinner() : false} */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  spinnerContainerStyle: {
    position: 'absolute',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const mapStateToProps = state => {
//   return {state: state.reducer};
// };

export default App;
