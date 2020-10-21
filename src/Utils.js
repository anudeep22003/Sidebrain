import {PixelRatio} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { X_CUSTOM_HEADER, IS_LOGIN, USER_NAME, USER_EMAIL, USER_ID, REF } from './Constants';
import {StackActions, NavigationActions} from 'react-navigation'


class Utils {

    static getCurrentTimeStamp() {
      let currentTime = new Date();
      let currentOffset = currentTime.getTimezoneOffset();
      let ISTOffset = 330;   // IST offset UTC +5:30 
      let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
      return ISTTime;
    }
  
    static areAnyFieldsEmpty(fields) {
      if(typeof fields === 'object') fields = Object.values(fields)
      for (let i = 0; i< fields.length; i++) {
        if(fields[i].length == 0)
          return true
      }
  
      return false
    }

    static getPostParamters(data = {}) {
      let mHeader = {};
      mHeader[X_CUSTOM_HEADER] = global[X_CUSTOM_HEADER]
      mHeader[USER_ID] = global[USER_ID]
      return {...mHeader, ...data}
    }

    static numberRange(start, end) {
      return new Array(end - start).fill().map((d, i) => i + start);
    }

    static async processResponse(response) {      
        const {code: status, msg: message, token, data} = response
        if(token){          
          const {name, email, user_id} = data
          global[X_CUSTOM_HEADER] = token
          global[USER_NAME] = name
          global[USER_EMAIL] = email
          global[USER_ID] = user_id
          global[REF] = `${REF}/${user_id}`
          await AsyncStorage.setItem(X_CUSTOM_HEADER, token)
          await AsyncStorage.setItem(IS_LOGIN, "true")
          await AsyncStorage.setItem(USER_NAME, name)
          await AsyncStorage.setItem(USER_EMAIL, email)
          await AsyncStorage.setItem(USER_ID, user_id)
        } 

        if(status == '0')
            return {status: false, message}

        return {status: true, data}
    }

    // static sendNotification(title, body) {
    //   const channel = new firebase.notifications.Android.Channel(
    //     'default_channel',
    //     'Default channel',
    //     firebase.notifications.Android.Importance.Max,
    //   ).setDescription('General notifications');
    //   firebase.notifications().android.createChannel(channel);
  
    //   const mNotification = new firebase.notifications.Notification()
    //     .setNotificationId('notificationId')
    //     .setTitle(title)
    //     .setBody(body);
  
    //   mNotification.android
    //     .setChannelId('default_channel')
    //     .android.setSmallIcon('ic_launcher')
    //     .android.setAutoCancel(true);
  
    //   firebase.notifications().displayNotification(mNotification);
    // }

    static scaleFont(size) {
      return (size - 2)
    }

    static scaleSize(size) {
      return size//PixelRatio.getPixelSizeForLayoutSize(size)
    }

    static getFormattedDate(year, month, day) {
      month = month + 1;
      return `${year}-${month.toString().length == 1 ? `0${month}` : month }-${day.toString().length == 1 ? `0${day}` : day}`;
    }

    static navigateByClearingStack(route, navigation) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: route})],
      });
      navigation.dispatch(resetAction);
    }
  
  }
  
  export default Utils;
  