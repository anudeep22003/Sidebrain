/**
 * @flow
 */

import React, {Component} from 'react';
import {SafeAreaView} from 'react-native'
import AppContainer from './AppContainer';
import reducers from './reducers';
import {createStore} from 'redux';
import {Colors} from './styles';
import {Provider} from 'react-redux';


const {WHITE} = Colors;

class App extends Component {
  render() {
    
    console.disableYellowBox = true;
    // const store = createStore(reducers);
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: WHITE}}>
        {/* <Provider store={store}> */}
          <AppContainer />
        {/* </Provider> */}
      </SafeAreaView>
    );
  }
}

export default App