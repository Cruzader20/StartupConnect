import { View, Text, StyleSheet, SafeAreaView,Pressable } from 'react-native'
import React, {useState} from 'react'
import HomeScreen from './src/screens/HomeScreen'
import MatchesScreen from './src/screens/MatchesScreen'
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Amplify} from 'aws-amplify'
import config from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import ProfileScreen from './src/screens/ProfileScreen';

Amplify.configure(config)

const App = () => {

  const [activescreen, setactivescreen] = useState('Home')
  const color = "green"
  return (
    
    <SafeAreaView style = {{flex:1,backgroundColor: "#ccffff"}}>
    <View style = {styles.pagecontainer}>
     <View style = {styles.upper}>
    <View>
     <Pressable onPress={() => setactivescreen('Home')}>
    <Fontisto name="gitlab" size={34} color={activescreen == 'Home' ? color:"#4287f5"  } />
    </Pressable> 
    </View>  
    <View>
    <Fontisto name="linux" size={34} color={"#4287f5"} />
    </View>  
    <View>
    <Pressable onPress={() => setactivescreen('Chat')}> 
    <Fontisto name="messenger" size={34} color={activescreen == 'Chat' ? color:"#4287f5"} />
    </Pressable>
    </View>  
    <View>
    <Pressable onPress={() => setactivescreen('Profile')} >
    <FontAwesome name="user" size={34} color={activescreen == 'Profile' ? color:"#4287f5"} />
    </Pressable>
    </View>  
    </View> 
      {activescreen=='Home'&& <HomeScreen></HomeScreen>}
      {activescreen=='Chat'&& <MatchesScreen></MatchesScreen>}
      {activescreen=='Profile'&& <ProfileScreen></ProfileScreen>}
    </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  pagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
 upper: {
    flexDirection: 'row',
    justifyContent: 'space-around',//to all the icons apart
    width: '95%',
    
    borderRadius: 10,
 },
})

export default withAuthenticator(App) //wrapping the application in Aws Amplify Authentication