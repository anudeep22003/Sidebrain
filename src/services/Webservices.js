import axios from 'axios';
import {Platform} from 'react-native'
import {
    LOCAL_BASE_URL,
    PRODUCTION_BASE_URL,
    SIGNIN,
    USER_SIDEBRAIN,
    UPLOAD_USER_SIDEBRAIN,
    EDIT_SIDEBRAIN,
    DELETE_SIDEBRAIN
} from './Url';

import Utils from '../Utils';
import RNFetchBlob from 'rn-fetch-blob'
// import axiosRetry from 'axios-retry';

const mAxiosOptions = {
  baseURL: LOCAL_BASE_URL,
  headers: {"Access-Control-Allow-Origin": "*"}
}
const mInstance = axios.create(mAxiosOptions);


class Webservices {

  static signInUser(data) {      
    return mInstance.post(SIGNIN, data)
  }

  static getUserSidebrain(data) {        
    return mInstance.post(USER_SIDEBRAIN, Utils.getPostParamters(data))
  }

  static editUserSidebrain(data) {   
    return mInstance.post(EDIT_SIDEBRAIN, Utils.getPostParamters(data))
  }

  static deleteUserSidebrain(data) {        
    return mInstance.post(DELETE_SIDEBRAIN, Utils.getPostParamters(data))
  }

  static async uploadSidebrain(data) {
    const {mCheckIfMultipartRequired, sidebrainType, coords, uri} = data
    const filename = mCheckIfMultipartRequired ? uri.substring(uri.lastIndexOf('/') + 1) : ''
    const realPath = mCheckIfMultipartRequired ? Platform.OS === 'ios' ? uri.replace('file://', '') : uri : ''

    return new Promise(async (resolve, reject) => {
      try {
        const {data: mData} = await RNFetchBlob.fetch('POST', `${mAxiosOptions.baseURL}${UPLOAD_USER_SIDEBRAIN}`, {
          'Content-Type' : mCheckIfMultipartRequired ? 'multipart/form-data' : 'application/json',
        }, [
          mCheckIfMultipartRequired ? {name: 'uri', filename, data: RNFetchBlob.wrap(realPath)} : {name: 'uri', data: uri},
          {name: 'type', data: sidebrainType},
          {name: 'coords', data: coords},
          {name: 'token', data: Utils.getUserToken()},
        ])   
        resolve(JSON.parse(mData))
      } catch(err) {
        reject(err)
      }
    })
  }


}

export {Webservices}