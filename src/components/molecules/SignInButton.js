import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import {
  withOAuth,
  withAuthenticator,
  AmplifyTheme,
} from 'aws-amplify-react-native';

import Amplify, {API} from 'aws-amplify';
import awsmobile from '../../aws-export';
import {Button} from 'react-native-elements'
import {Colors, Typography, Strings, Spacing} from '../../styles'

const {WHITE, BLACK, LIGHT_GREY} = Colors
const {SIZE_7, SIZE_10, SIZE_20, SIZE_40, SIZE_200} = Spacing
const {FONT_REGULAR, FONT_SIZE} = Typography


Amplify.configure({
  Auth: {
    region: awsmobile['aws_project_region'],
    userPoolId: awsmobile['aws_user_pools_id'],
    userPoolWebClientId: awsmobile['aws_user_pools_web_client_id'],
    identityPoolId: awsmobile['aws_cognito_identity_pool_id'],
    authenticationFlowType: 'CUSTOM_AUTH',
    oauth: {
      domain: 'classroomx.auth.ap-south-1.amazoncognito.com',
      scope: [
        'phone',
        'email',
        'profile',
        'openid',
        'aws.cognito.signin.user.admin',
      ],
      redirectSignIn: 'classroomx://oauth',
      redirectSignOut: 'classroomx://signout',
      responseType: 'code',
      options: {
        AdvancedSecurityDataCollectionFlag: true,
      },
    },
  },
});

const SocialIcon = withOAuth(({oAuthUser, authState, oAuthError}) => {
  if (authState === 'loading' || authState === 'verifyContact') {
    return <ActivityIndicator color={'#000000'} />;
  }
  
  const loginWithProvider = (provider) => Auth.federatedSignIn({provider: provider}).then((credentials) => {
      console.log({credentials})
  })

  const {buttonContainerStyle, buttonTitleStyle} = styles

  return (
    <>
      <View style={{width: '100%'}}>
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <Button
                onPress={() => loginWithProvider('SignInWithApple')}
                containerStyle={buttonContainerStyle}
                buttonStyle={{backgroundColor: BLACK}}
                title={'Sign in with Apple'}
                titleStyle={buttonTitleStyle}
                icon={{type: 'font-awesome', name: 'apple', color: WHITE, size: SIZE_20}}
            />
        </View>
      </View>
    </>
  );
});

class App extends React.Component {
  render() {
    return (
      <View>
        <Text>Success</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
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

export default withAuthenticator(App, false, [<SocialIcon />]);
