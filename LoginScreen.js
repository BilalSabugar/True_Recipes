import React from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView,ScrollView} from 'react-native';
import * as firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageLoad from 'react-native-image-placeholder';

export default class LoginScreen extends React.Component {

    constructor(){
        super();
        this.state={
          emailId : '',
          password: '',
          homeScreenImage: '',
        }
      }
    
      login=async(email,password)=>{
        if (email && password){
          try{
            const response = await firebase.auth().signInWithEmailAndPassword(email,password)
            if(response){
              await AsyncStorage.setItem('isLoggedIn', "true")
              this.props.navigation.replace('HomeScreen')
            }
          }
          catch(error){
             
            switch (error.code) {
              case 'auth/user-not-found':
                Alert.alert("user dosen't exists")
                break
              case 'auth/invalid-email':
                Alert.alert('incorrect format email Try using ')
                break
              case 'auth/wrong-password':
                  Alert.alert('Invalid Password')
                  break
            }
          }
        }
        else{
            Alert.alert('enter email and password');
        }
      }

  render(){
      return(
        <ScrollView style={{flex:1}}>
        <KeyboardAvoidingView style = {{alignItems:'center',marginTop:20,flex:1}}>
                  

        <View>
          <ImageLoad
            source={require("../assets/top.png")}
            style={{width:200, height: 170,marginTop:25}}/>
          
        </View>
        <View style={{flex:1,width:'100%',marginTop:30}}>
        <TextInput
          style={styles.loginBoxE}
          placeholder="Enter Email"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBoxP}
          secureTextEntry = {true}
          placeholder="Enter Password"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
        </View>
        <View>

          <TouchableOpacity style={styles.LoginButton}
          onPress={()=>{this.login(this.state.emailId ,this.state.password)}}>
            <Text style={{textAlign:'center',color:'white'}}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotButton}
          onPress={()=>{this.props.navigation.navigate('ForgetPassword')}}>
            <Text style={{textAlign:'center',color:'white'}}>Forgot Password</Text>
          </TouchableOpacity>



        </View>
      </KeyboardAvoidingView>
      </ScrollView>

      )
  }
}


const styles = StyleSheet.create({
  
  loginBoxE: {
    marginTop:25,
    marginBottom: 20,
    paddingBottom: 15,
    borderColor: "#ccc",
    textAlignVertical:'center',
    top:-30,
    textAlign: 'center',
    height:48,
    borderRadius:20,
    marginHorizontal:16,
    elevation:10,
    backgroundColor:'#f8f8ff'
  },  
  loginBoxP: {
    marginTop:5,
    marginBottom: 10,
    paddingBottom: 10,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    textAlignVertical:'center',
    top:-30,
    textAlign: 'center',
    height:48,
    borderRadius:20,
    marginHorizontal:16,
    elevation:10,
    backgroundColor:'#f8f8ff'
  },
  LoginButton:{
    marginVertical: 10,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    textAlignVertical:'center',
    textAlign: 'center',
    height:48,
    borderRadius:20,
    marginHorizontal:16,
    elevation:10,
    backgroundColor:'#57b847',
    width:150,
    justifyContent:'center',
    alignItems:'center'
  },
  forgotButton:{
    marginVertical: 10,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    textAlignVertical:'center',
    textAlign: 'center',
    height:48,
    borderRadius:20,
    marginHorizontal:16,
    elevation:10,
    width:150,
    justifyContent:'center',
    alignItems:'center'
  },
})