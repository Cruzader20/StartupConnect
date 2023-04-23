import { View, Text,StyleSheet, SafeAreaView,Image, Pressable ,Button} from 'react-native'
import React from 'react'
import users from '../../assets/data/users'
import {Auth} from 'aws-amplify'




const ProfileScreen = () => {
  return (
    <SafeAreaView style =  {styles.root}>
       <View style =  {styles.container}>

       
       <Button title = 'Sign out' onPress = {() => Auth.signOut() } color={"purple"}></Button>
      
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    root:{
        width:"100%",
        height: "85%",
        padding: 10,
    },

    container:{
        
        padding: 10,
    },

    
   
})



export default ProfileScreen