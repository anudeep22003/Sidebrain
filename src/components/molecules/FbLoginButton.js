import React from 'react';
import { LoginManager, GraphRequest, GraphRequestManager } from "react-native-fbsdk";

import {Strings, Colors, Spacing} from '../../styles'
import { SocialIcon } from 'react-native-elements'

const {SIGNIN_WITH_FACEBOOK} = Strings
let mProps;

const getDataOfCurrentUser = () => { 
    const {
        userDetailsCallback
    } = mProps;
    const infoRequest = new GraphRequest(
        '/me?fields=name,email,picture.type(large)',
    null,
    (error, result) => {
        if(error) {
            return
        }
        userDetailsCallback(result)
    }
    );
    new GraphRequestManager().addRequest(infoRequest).start();
}

const FbLoginManager = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            getDataOfCurrentUser()
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        }
    );
}

const FbLoginButton = props => {
    mProps = props;

    return (
        <SocialIcon
            onPress={FbLoginManager}
            title={SIGNIN_WITH_FACEBOOK}
            button
            type={'facebook'}
        />
    )
}

export {FbLoginButton}