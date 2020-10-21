import { createStackNavigator } from 'react-navigation-stack';
import {Login, Profile, Chat} from '../scenes'
import {createAppContainer} from 'react-navigation'


const MainStackNavigation = createStackNavigator({
    Login,
    Profile,
    Chat
}, {
    headerMode: 'none'
})


export default createAppContainer(MainStackNavigation)
