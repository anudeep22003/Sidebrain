import { createStackNavigator } from 'react-navigation-stack';
import {Login, Profile, Chat} from '../scenes'
import AuthNavigation from './AuthNavigation'
import MainNavigation from './MainNavigation'
import {createAppContainer} from 'react-navigation'


const mStackNavigation = createStackNavigator({
    Auth: AuthNavigation,
    Login,
    Main: MainNavigation
}, {
    headerMode: 'none'
})


export default createAppContainer(mStackNavigation)
