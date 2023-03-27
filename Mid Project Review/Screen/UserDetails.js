import { View, Text, TextInput, StyleSheet,SafeAreaView ,Button,Alert} from 'react-native'
import React, { useState, useEffect} from 'react'
import {Picker} from '@react-native-picker/picker';
import { color } from 'react-native-reanimated';
import {User} from '../models'
import {DataStore,Auth} from 'aws-amplify'
import '@azure/core-asynciterator-polyfill'



const UserDetails = () => {
   const [user, setUser] = useState(null) 
  
    const [name, setname] = useState('')
    const [bio, setbio] = useState('')
    const [idea, setidea] = useState('')
    const [image, setimage] = useState()
    const [gender, setgender] = useState();
    const [interest, setinterest] = useState('');

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
        console.warn(dbUsers);
        setname(dbUser.name)
        setbio(dbUser.bio)
        setidea(dbUser.idea)
        setinterest(dbUser.interest)
        setimage(dbUser.image)

        }
        getCurrentUser();
    }, []);



    const isValid = () => {
        return name || bio || gender || idea
    }
    
    const save = async () => {
        if(!isValid())
        {
            console.warn('Not valid')
            return;
        }
        if (user)
        {
            const updateduser = User.copyOf(user, updated => {
                updated.name = name;
                updated.bio = bio;
                updated.idea = idea;
                //updated.image = image;
                updated.interest = interest;
              });
            await DataStore.save(updateduser);
        }
        else{
            const authuser = await Auth.currentAuthenticatedUser();
            //console.log(user)
            console.warn(authuser.attributes.sub)
                const newUser = new User({
                    sub: authuser.attributes.sub,
                    name:name,
                    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg',
                    bio:bio,
                    idea:idea,
                    interest:interest,
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
      <Button title = 'Save' onPress = {save}></Button>

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
    text_gender: {
       margin:20,
       fontSize:20,
       color:"#669999"
    },
    gender:{
        margin:10
    },
    info:
    {
        fontSize:20 
    }
}
)
export default UserDetails
