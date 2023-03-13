import 'react-native-gesture-handler'
import React, {useState,useEffect} from "react"; //usestate for rendering different user on swipe..
import {Text, Image, View, StyleSheet, ImageBackground,Pressable, useWindowDimensions} from "react-native"
import Card from "../components/startupcard";
import users from "../../assets/data/users"; // taking users detail from the user.js file
import Animated, {useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler,useDerivedValue,interpolate,runOnJS} from 'react-native-reanimated';
//run on js help code to run on javascript thread...
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import LIKE from "../../assets/images/thumbg.png"
import nope from "../../assets/images/thumbs.png"
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Rotation = 60;
const Swipespeed = 700;
const HomeScreen = () => {

const onSwipeLeft = (user) =>{
  console.warn("swipe left", user.name)
};

const onSwipeRight = (user) =>{
  console.warn("swipe right", user.name)
};

  const [currentindex, setcurrentindex] = useState(0);
  const [nextindex, setnextindex] = useState(currentindex+1)
  const currentprofile = users[currentindex]
  const nextprofile = users[nextindex]
  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = screenWidth*2 //screen width twice pahuch jaye to hide it...
  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(
    () =>
    interpolate(translateX.value, [0,hiddenTranslateX],[0,Rotation])+'deg',
  );
  const cardstyle = useAnimatedStyle(() =>({
    transform:[
      {
        translateX: translateX.value
      },
      {
        rotate:rotate.value
      }
    ],
  }));

  const nextcardstyle = useAnimatedStyle(() =>({
    transform:[
      {
        scale: interpolate(
          translateX.value, [-hiddenTranslateX,0,hiddenTranslateX],[1,0.85,1]
        ),
      },
      
    ],
    
  }));

  const likestyle = useAnimatedStyle(() =>({
    opacity: interpolate(
      translateX.value, [0,hiddenTranslateX/8],[0,1]
    ),
  }));

  const nopestyle = useAnimatedStyle(() =>({
    opacity: interpolate(
      translateX.value, [-hiddenTranslateX/8,0],[1,0]
    ),
  }));

  const gestureHander = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value //starting gesture from where it is left..
      
    },
    onActive: (event, context) => {
      translateX.value=  context.startX +  event.translationX;
      
    },

    onEnd: event =>{
      if(Math.abs(event.velocityX)<Swipespeed)
      {
        translateX.value = withSpring(0);
        return;
      }
      translateX.value = withSpring(event.velocityX >0 ?hiddenTranslateX : -hiddenTranslateX,
        runOnJS(setcurrentindex)(currentindex+1));
       //helps to run on javascript thread...
       const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft;
       onSwipe && runOnJS(onSwipe)(currentprofile);
    },
  });
  
  useEffect(() => {
    translateX.value = 0; //translate value need to be changed after one profile is swipped...
    setnextindex(currentindex+1);
  }, [currentindex,translateX])
  
  return(
  


   
    <GestureHandlerRootView style={styles.pagecontainer}>
      <View style = {styles.pageinnercontainer}>
      {nextprofile && (// solving the null expection if no image left...
      <View style = {styles.nextcardContainer}>
      <Animated.View style = {[styles.animatedcard, nextcardstyle]}>
        <Card user = {nextprofile}></Card>
        </Animated.View>
      </View>
      )}
      {currentprofile && (
    <PanGestureHandler onGestureEvent = {gestureHander}>
     
    <Animated.View style = {[styles.animatedcard, cardstyle]}> 
    <Animated.Image source={LIKE} style = {[styles.likes, {left:10}, likestyle]} resizeMode = "contain" ></Animated.Image>
    <Animated.Image source={nope} style = {[styles.likes, {right:10}, nopestyle]} resizeMode = "contain"></Animated.Image>
   <Card user = {currentprofile}></Card>
   
   </Animated.View>
   </PanGestureHandler>
   )}
   </View>
   <View style = {styles.bottom}>
   <FontAwesome name="undo" size={34} color="#4287f5" />
    <FontAwesome name="angellist" size={34} color="#4287f5" />
    <FontAwesome name="briefcase" size={34} color="#4287f5" />
     <FontAwesome name="flash" size={34} color="#4287f5" />
   </View>

   </GestureHandlerRootView>
   
   // Pressable for changing shared value to random value...
   
  
     
  )
}

const styles = StyleSheet.create({
  pagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    //flex: 1,
    width:'100%',
    height:'80%',
    //backgroundColor: 'blue'
  },
  pageinnercontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height:"95%",
    
    //backgroundColor: '#ccffff',
    borderRadius:10
  },
  animatedcard: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'95%',
    height: '95%',
    color: 'blue',
    
    
  },
  nextcardContainer: {
    ...StyleSheet.absoluteFillObject, //help in keeping it's position back to the first card..
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  likes: {
    width: 100,
    height:100,
    position: 'absolute',
    top:10,
    //elevation:1,
    zIndex:1,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',//to all the icons apart
    width: '95%',
    borderRadius:10,
    //backgroundColor: '#ccffff'
 },
 
}

);

export default HomeScreen;