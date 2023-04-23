import { View, Text,StyleSheet, SafeAreaView,Image,Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import users from '../../assets/data/users'
import {DataStore, Auth} from 'aws-amplify';
import { Match, User } from '../models';


const MatchesScreen = () => {

  const [matches, setMatches] = useState([]);
  const [authenticateduser, setauthenticateduser] = useState(null)
  const [users, setusers]  = useState([])
  const [currentindex, setcurrentindex] = useState(0);

  useEffect(() =>{
  const getCurrentUser = async () => {
    const user = await Auth.currentAuthenticatedUser(); //we are taking current user from the auth module
    //It's an array carrying all the database user....
    const dbUsers = await DataStore.query(User, (u) => u.sub.eq(user.attributes.sub)); 
    if(dbUsers.length <0)
    {
        console.warn("hello")
        return;
    }
    
    setauthenticateduser(dbUsers[0])
    
  }; 

  getCurrentUser();
},[])
  //useEffect(() => getCurrentUser(), [])


  

    
    // const fetchMatches = async () =>  {
    //   if(authenticateduser){
    //    const result = await DataStore.query(Match, (match) => match.isMatch.eq(true))
    //    console.log("auth:",authenticateduser)
    //   //console.log("result",result[0]);
    //   setMatches(result);
    // }
    // };
       
  
    const fetchMatches = async () =>  {
        //console.log(authenticateduser)
        
        if(authenticateduser){  
         const result = await DataStore.query(Match, (match) => match.and(match => [
          match.isMatch.eq(true),
          match.user1ID.eq(authenticateduser.id)
        ]))
        //  console.log("auth:",authenticateduser)
        //console.log("result",result[0]);
        setMatches(result);
        console.log(matches)
        
      }
    }
  



  //useEffect(() => fetchMatches(), [])



  return (
    <SafeAreaView style =  {styles.root}>
       <View style =  {styles.container}>
       <Button title = 'Check New Partners' onPress = {fetchMatches} color={"purple"}></Button>  
      
      <View style = {styles.users}>
      {matches.map(match => (
        <View style = {styles.user} key={match.user2ID}>
          <Image source = {{uri: match.image}} style = {styles.image}></Image>
          <Text style = {{color:"blue", fontWeight:"bold", textAlign:'center',fontSize:24}}>{match.Email}</Text>
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