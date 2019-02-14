import App from './src/App'
import { registerRootComponent } from 'expo'
import React from 'react'
import * as Expo from 'expo'

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
          return this.state.loaded ? <App /> : null
      }

}


export default registerRootComponent(FontProvider)