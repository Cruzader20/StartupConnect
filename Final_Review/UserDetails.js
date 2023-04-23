import { View, Text, TextInput, StyleSheet,SafeAreaView ,Button,Alert} from 'react-native'
import React, { useState, useEffect} from 'react'
import {Picker} from '@react-native-picker/picker';
import { color } from 'react-native-reanimated';
import {User} from '../models'
import {DataStore,Auth} from 'aws-amplify'
import '@azure/core-asynciterator-polyfill'
import axios from 'axios'


const UserDetails = () => {
   const [user, setUser] = useState(null) 
  
    const [name, setname] = useState('')
    const [bio, setbio] = useState('')
    const [idea, setidea] = useState('')
    const [image, setimage] = useState()
    const [gender, setgender] = useState();
    const [interest, setinterest] = useState('');
    const [percent, setpercent] = useState('');
    const [email, setemail] = useState('');

    
    
    
    useEffect(() => {
        const getCurrentUser = async () => {
        const user = await Auth.currentAuthenticatedUser(); //we are taking current user from the auth module
        //It's an array carrying all the database user....
        const dbUsers = await DataStore.query(User, (u) => u.sub.eq(user.attributes.sub)); 
        if(dbUsers.length <0)
        {
            console.warn("hello")
            return;
        }
        
        const dbUser = dbUsers[0];
        setUser(dbUser)
        //console.warn(dbUsers);
        setname(dbUser.name)
        setbio(dbUser.bio)
        setidea(dbUser.idea)
        setinterest(dbUser.interest)
        setimage(dbUser.image)
        setemail(dbUser.Email)
        setpercent(dbUser.similarity)

        }
        getCurrentUser();
    }, []);



    const isValid = () => {
        //console.log("valid")
        return name || bio || gender || idea
    }
    const check = () => {

        // let qs = require('qs')
        // let axios = require('axios')

        // const options = {
        // method: 'POST',
        // url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        // data: qs.stringify({
        // q : 'Hello World!',
        // source : 'en',
        // target : 'it',
        // }),
        // headers: {
        // 'content-type': 'application/x-www-form-urlencoded',
        // 'accept-encoding': 'application/gzip',
        // 'x-rapidapi-key': '{{YOUR_API_KEY}}',
        // 'x-rapidapi-host': 'google-translate1.p.rapidapi.com'
        // }
        // };

        // axios.request(options).then(function (response) {
        // console.log(response.data.data['translations'][0]['translatedText']);
        // }).catch(function (error) {
        // console.error(error);
        // });

        

        //const axios = require("axios");
        //return "iddd"
        const options1 = {
        method: 'POST',
        url: 'https://lecto-translation.p.rapidapi.com/v1/detect/text',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'e6cc92a6f8mshaa755a1bd7cb7a4p1c2b18jsn6580ef3a740e',
            'X-RapidAPI-Host': 'lecto-translation.p.rapidapi.com'
        },
        data: {"texts":[idea]}
        };
        let res;
        axios.request(options1).then(function (response) {
            console.log(response.data);
            console.log(response.data["detected_languages"][0])
            res = response.data["detected_languages"][0]
            console.log(typeof response.data["detected_languages"][0])
            console.log("heloo")
            console.log("res",res)
            if(res == 'hi'){
                const options = {
                    method: 'POST',
                    url: 'https://lingvanex-translate.p.rapidapi.com/translate',
                    headers: {
                      'content-type': 'application/json',
                      'X-RapidAPI-Key': 'e6cc92a6f8mshaa755a1bd7cb7a4p1c2b18jsn6580ef3a740e',
                      'X-RapidAPI-Host': 'lingvanex-translate.p.rapidapi.com'
                    },
                   
                    data: {"from":"hi","to":"en_GB","data":idea,"platform":"api"}
                    
                  };
                  
                  axios.request(options).then(function (response) {
        
                      console.log(response.data);
                      console.log(response.data["result"])
                      console.log(typeof response.data["result"])
                      setidea(response.data["result"]);
                      console.log(response.data)
                      console.log("iii",idea)
                  }).catch(function (error) {
                      console.error(error);
                  });
                }        
        }).catch(function (error) {
            console.error(error);
        });
        //let id  = response.data["detected_languages"][0]
        // console.log("res",res)
        // //console.log(id)
        // if(res == 'hi'){
        // const options = {
        //     method: 'POST',
        //     url: 'https://lingvanex-translate.p.rapidapi.com/translate',
        //     headers: {
        //       'content-type': 'application/json',
        //       'X-RapidAPI-Key': 'e6cc92a6f8mshaa755a1bd7cb7a4p1c2b18jsn6580ef3a740e',
        //       'X-RapidAPI-Host': 'lingvanex-translate.p.rapidapi.com'
        //     },
           
        //     data: {"from":"hi","to":"en_GB","data":idea,"platform":"api"}
            
        //   };
          
        //   axios.request(options).then(function (response) {

        //       console.log(response.data);
        //       console.log(response.data["result"])
        //       console.log(typeof response.data["result"])
        //       setidea(response.data["result"]);
        //       console.log(response.data)
        //       console.log("iii",idea)
        //   }).catch(function (error) {
        //       console.error(error);
        //   });
          
        //}    
}   
    const save = async () => {
        
        if(!isValid())
        {
            console.warn('Not valid')
            return;
        }
        if (user)
        {  
            
           // console.log("save",idea_)
            //console.log('idea_',check(idea))

            //console.log("ide", idea_)
            const updateduser = User.copyOf(user, updated => {
                updated.name = name;
                updated.bio = bio;
                updated.idea = idea;
                //updated.image = image;
                updated.interest = interest;
                updated.Email = email,
                updated.similarity = percent
              });
            await DataStore.save(updateduser);
        }
        else{
            //check(idea)
            
            //console.log("ide", idea_)
            const authuser = await Auth.currentAuthenticatedUser();
            //console.log(user)
            //console.warn(authuser.attributes.sub)
                const newUser = new User({
                    sub: authuser.attributes.sub,
                    name:name,
                    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg',
                    bio:bio,
                    idea:idea,
                    interest:interest,
                    similarity:percent,
                    Email:email
                });
              await DataStore.save(newUser)
        }
    Alert.alert("User Entered successfully");
    }
  
  return (
    <SafeAreaView style =  {styles.root}>
    <View>
      <TextInput style = {styles.info}
      placeholder = "Name..."
      value = {name}
      onChangeText = {setname}
      ></TextInput>
      <TextInput style = {styles.info}
      placeholder = "Enter your mail"
      value = {email}
      onChangeText = {setemail}></TextInput>
      <Text style = {styles.text_gender}>Choose your gender</Text>
      <Picker style = {styles.gender}
        label = "gender"
        selectedValue={gender}
        onValueChange={(itemValue, itemIndex) =>
        setgender(itemValue)
         }>
        <Picker.Item label="Male" value="MALE" />
         <Picker.Item label="Female" value="FEMALE" />
         <Picker.Item label="Others" value="Others" />
        </Picker>

      <TextInput style = {styles.info}
      placeholder = "Enter your bio"
      multiline
      numberOfLines={5}
      value = {bio}
      onChangeText = {setbio}
      ></TextInput>
      <TextInput style = {styles.info}
      placeholder = "Interest."
      value = {interest}
      onChangeText = {setinterest}
      ></TextInput>
      <TextInput style = {styles.info}
      placeholder = "Explain your idea in abstract"
      multiline
      numberOfLines={5}
      value = {idea}
      onChangeText = {setidea}
      ></TextInput>
      <TextInput style = {styles.info}
      placeholder = "How much similarity you want..."
      value = {percent}
      onChangeText = {setpercent}
      ></TextInput>
      <View style = {styles.button}>
      <Button title = 'Confirm' onPress = {check} color={"#233538"}></Button>
      </View>
      <View style = {styles.button}>
      <Button title = 'Save' onPress = {save} color={"#233538"}></Button>
      </View>
    </View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    root:{
        width:"100%",
        height: "85%",
        padding: 5,
    },
    text_gender: {
       margin:5,
       fontSize:15,
       color:"#669999",
       fontWeight:'bold'
       
    },
    gender:{
        margin:10
    },
    info:
    {
        fontSize:15,
        margin: 5,
        color: "blue",
        fontWeight:'bold'
    },
    button:
    {
        margin:1,
        //flex: 0.3,
    color: 'black',
    // borderWidth: 5,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    }
}
)
export default UserDetails
