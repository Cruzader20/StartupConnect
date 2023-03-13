import React from "react";
import {Text, Image, View, StyleSheet, ImageBackground} from "react-native"


const Card = (props) => {//it store the data which send from the component which is using this component...
    const {name, image, bio} = props.user//defining properties of the object props...
    return(
        <View style = {styles.card}>
        <ImageBackground source = {{uri:image}} style = {styles.image}>
       <View style = {styles.cardInner}>
        <Text style = {styles.name}>{name}</Text>
        <Text style = {styles.bio}>{bio}</Text>
        </View>
        </ImageBackground>
        </View> 
    ) 
}
const styles = StyleSheet.create({
    
  
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      overflow: 'hidden', // basically hide the overflow so that we can see the rounded corner...
      justifyContent: 'flex-end',
      
    },
  
    card: {
      width: '100%',
      height: '100%',
      //backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
  },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
  
      elevation: 12,
  
    },
    
    cardInner: {
       padding: 10
    },
  
    name: 
    {
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold',
    },
  
    bio:
    {
      fontSize: 18,
      color: 'white',
      lineHeight: 25
    },
  }
  
  );
  
  
export default Card;