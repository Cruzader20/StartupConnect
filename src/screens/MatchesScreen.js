import { View, Text,StyleSheet, SafeAreaView,Image } from 'react-native'
import React from 'react'
import users from '../../assets/data/users'


const MatchesScreen = () => {
  return (
    <SafeAreaView style =  {styles.root}>
       <View style =  {styles.container}>
      <Text style = {styles.partner}>New Partners</Text>
      <View style = {styles.users}>
      {users.map(user => (
        <View style = {styles.user} key={user.id}>
          <Image source={{uri:user.image}} style = {styles.image}></Image>
         </View>
    ))}
      </View>
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

    user:{
      width: 100,
      height:100,
      margin:20,  
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius:50,
    },
    partner: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'green'
        
    },
    users:{
        flexDirection: 'row',
        flexWrap: "wrap",
    },
})



export default MatchesScreen