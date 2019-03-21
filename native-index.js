import App from './src/App'
import { registerRootComponent } from 'expo'
import React from 'react'
import * as Expo from 'expo'
import { Provider } from './src/library'

class FontProvider extends React.Component {

    state = {
        loaded: false
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
          'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
        });
        this.setState({ loaded: true });
      }


      render(){
          return this.state.loaded ? <Provider><App /></Provider> : null
      }

}


export default registerRootComponent(FontProvider)