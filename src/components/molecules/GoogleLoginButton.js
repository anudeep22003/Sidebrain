import React, { Component }from 'react';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {Strings} from '../../styles';
import {SocialIcon} from 'react-native-elements';

const {SIGNIN_WITH_GOOGLE} = Strings;


class GoogleLoginButton extends Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    GoogleSignin.configure();
  }

  signIn = async () => {
    const {userDetailsCallback} = this.props
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      userDetailsCallback(userInfo);
    } catch (error) {
        console.log({error});
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  render() {
    return(
        <SocialIcon 
            title={SIGNIN_WITH_GOOGLE} 
            button 
            type={'google'} 
            onPress={this.signIn} 
        />
    )
  }

}

export {GoogleLoginButton};
