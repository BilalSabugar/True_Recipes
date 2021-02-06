import React, {useState} from 'react';
import { StyleSheet , Alert ,BackHandler,View,Image} from 'react-native';
import { createAppContainer ,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import NetInfo from '@react-native-community/netinfo';
import HomeScreen from './HomeScreen';
import Startup from './screens/Startup';
import LoginScreen from './screens/LoginScreen';
import Signup from './screens/Signup';
import Catagory from './AllScreen/Catagory/Catagory';
import Menu from './Menu';
import ImageLoad from 'react-native-image-placeholder';

import Snackbar from 'react-native-snackbar-component';


import Desert from './AllScreen/Desert/Desert';
import Dite from './AllScreen/Diet/Dite';
import Non_Veg from './AllScreen/NoN-Veg/Non-Veg';
import Pure_Veg from './AllScreen/Pure_Veg/Pure_Veg';
import Snacks from './AllScreen/Snacks/Snacks';

import ForgetPassword from './screens/ForgetPassword'

import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';


export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      snackIsVisible:false,
      textMessage:'',
      distance:'',
      isReady:false
    }
  }
  

  componentDidMount(){
    SplashScreen.preventAutoHideAsync();
    NetInfo.addEventListener(state => {
      if(state.isConnected==false){
        this.setState({snackIsVisible:true})
        this.setState({textMessage:'You are not connected to internet'})

  }else if(state.isConnected==true){
    this.setState({snackIsVisible:true})
    this.setState({textMessage:'You are connected'})
  }
    })
  }

  render(){

    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            source={require('./assets/splash.gif')}
            onLoad={this._cacheResourcesAsync}
          />
        </View>
      );
    }


    return (
<View style={{flex:1}}>

  <AppContainer/>



  <Snackbar
          visible={this.state.snackIsVisible}
          //SnackBar visibility control
          textMessage={this.state.textMessage}
          //Text on SnackBar
          actionHandler={() => {
            //function called while clicking on action Text
            //After handling click making nackBar invisible
            this.setState({snackIsVisible:false});
          }}
          actionText="OK"
          //action Text to print on SnackBar
          autoHidingTime={10000}
        />
        
</View>

        

        

    );

  }

  _cacheSplashResourcesAsync = async () => {
    const gif = require('./assets/splash.gif');
    return Asset.fromModule(gif).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hideAsync();
  setTimeout(() => {
    this.setState({ isReady: true });
  }, 2500);
  };
}

const stackNavigator = createStackNavigator({
Startup:{screen: Startup},
Login:{screen: LoginScreen},
Signup: {screen: Signup},
HomeScreen: {screen: HomeScreen},
Catagory: {screen: Catagory},
Menu: {screen: Menu},
Desert: {screen: Desert},
Diet: {screen: Dite},
Non_Veg: {screen: Non_Veg},
Pure_Veg: {screen: Pure_Veg},
Snacks: {screen: Snacks},
ForgetPassword:{screen:ForgetPassword}

},{
  initialRouteName:'Startup',
  headerMode:'none'
})



const AppContainer =  createAppContainer(stackNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});