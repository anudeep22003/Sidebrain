import { createStackNavigator } from 'react-navigation-stack';
import {Profile, Chat} from '../scenes'


const mMainStackNavigation = createStackNavigator({
    Chat
}, {
    headerMode: 'none'
})


export default mMainStackNavigation
