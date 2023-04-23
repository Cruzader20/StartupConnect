import 'react-native-gesture-handler'
import React, {useState,useEffect} from "react"; //usestate for rendering different user on swipe..
import {Text, Image, View, StyleSheet, ImageBackground,Pressable, useWindowDimensions, Alert} from "react-native"
import Card from "../components/startupcard";
//import users from "../../assets/data/users"; // taking users detail from the user.js file
import Animated, {useSharedValue, useAnimatedStyle, withSpring, useAnimatedGestureHandler,useDerivedValue,interpolate,runOnJS} from 'react-native-reanimated';
//run on js help code to run on javascript thread...
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import LIKE from "../../assets/images/thumbg.png"
import nope from "../../assets/images/thumbs.png"
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { DataStore, Auth } from 'aws-amplify';
import { User,Match} from '../models';
import MatchesScreen from 'C:/Users/91775/StartupAwesome/src/screens/MatchesScreen.js'

const Rotation = 60;
const Swipespeed = 700;
const HomeScreen = () => {

const [users, setusers]  = useState([])
const [only, setonly]  = useState([])
const [currentuser, setcurrentuser] = useState(null)
const [authenticateduser, setauthenticateduser] = useState(null)
const [matches, setMatches] = useState([]);
const [percent, setpercent] = useState('');
let i = 1;
let similar;

useEffect(() =>{
  const fetchMatches = async () =>  {
    setMatches(await DataStore.query(Match))
    //console.warn(result);
  };
  fetchMatches();
}
)
//console.log(matches[1].user2ID)

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
  console.log(dbUsers[0])
  setauthenticateduser(dbUsers[0])
  //console.log(authenticateduser.name)

  }
  getCurrentUser();
}, []);





   const fetchusers  = async () => {
      //console.log(textCosineSimilarity("V","V"))
      const only = await DataStore.query(User)

      filteredUsers = []
      for (let i = 0; i < only.length; i++) {
        console.log(only[i].idea)
        sim = textCosineSimilarity(only[i].idea,authenticateduser.idea)
        var per = authenticateduser.similarity
        var preci = parseFloat(per)
        if(sim>per/100 && !(only[i].name==authenticateduser.name))
        {
          filteredUsers.push(only[i])
        }

      }
      function wordCountMap(str){
        let words = str.split(' ');
        let wordCount = {};
        words.forEach((w)=>{
            wordCount[w] = (wordCount[w] || 0) +1;
       
        });
       return wordCount;
       }
       
       function addWordsToDictionary(wordCountmap, dict){
        for(let key in wordCountmap){
            dict[key] = true;
        }
       }
       
       
       function wordMapToVector(map,dict){
        let wordCountVector = [];
        for (let term in dict){
            wordCountVector.push(map[term] || 0);
        }
        return wordCountVector;
       }
       
       function dotProduct(vecA, vecB){
        let product = 0;
        for(let i=0;i<vecA.length;i++){
            product += vecA[i] * vecB[i];
        }
        return product;
       }
       
       function magnitude(vec){
        let sum = 0;
        for (let i = 0;i<vec.length;i++){
            sum += vec[i] * vec[i];
        }
        return Math.sqrt(sum);
       }
       
       function cosineSimilarity(vecA,vecB){
        return dotProduct(vecA,vecB)/ (magnitude(vecA) * magnitude(vecB));
       }
       function textCosineSimilarity(txtA,txtB){
        let wordCountA = wordCountMap(txtA);
        let wordCountB = wordCountMap(txtB);
        let dict = {};
        addWordsToDictionary(wordCountA,dict);
        addWordsToDictionary(wordCountB,dict);
        let vectorA = wordMapToVector(wordCountA,dict);
        let vectorB = wordMapToVector(wordCountB,dict);
        return cosineSimilarity(vectorA, vectorB);
        
       }   
    console.log("filter",filteredUsers);
      
    console.log("new",only);
      //console.log(onlyuser[0])
     setusers(filteredUsers)
   };
  



//console.log(users[1])
//console.log(users[0].id)
//console.log(setusers)
//u.name.eq(authenticateduser.name)
const onSwipeLeft = () =>{
  console.log("left:",authenticateduser)
  if(!currentuser || !authenticateduser)
  {
    return
  }
  console.warn("swipe left", currentuser.name)
  

};
//console.log("left1:",authenticateduser.name)

//let similar1 = textCosineSimilarity("V", "V")
// setnextindex(nextindex+1)
// nextprofile = users[nextindex]
//console.log(currentprofile.name)
// setnextindex(nextindex+1)
// nextprofile = users[nextindex]
//console.log(nextprofile.name)
//console.log("similar",similar1);



const onSwipeRight = async () =>{

  if(!currentuser || !authenticateduser)
  {
    return
  }
  // console.log(Match.user1ID)
   
   const myMatches = await DataStore.query(Match, (match) => 
     match.user1ID.eq(authenticateduser.id) && match.user2ID.eq(currentuser.id));
  console.log("myMatches.lenght",myMatches.length)
  console.log(myMatches)
  if (myMatches.length>0)
  {
    Alert.alert("You already swipped right");
  
    //return
  }
  
 
  const theyMatches = await DataStore.query(Match, (match) => 
    match.user1ID.eq(currentuser.id) && match.user2ID.eq(authenticateduser.id)
  );
  console.log(theyMatches)
  console.log(theyMatches.length)
  console.log("myMatches.lenght",myMatches.length)
  if (theyMatches.length > 0 && myMatches.length==0) {
    Alert.alert('Yay this is the match');
    const theyMatch = theyMatches[0];
    DataStore.save(
      Match.copyOf(theyMatch, updated => (updated.isMatch = true)),
    );
    DataStore.save(new Match({
      user1ID: authenticateduser.id,
      user2ID: currentuser.id,
      isMatch:true,
      image: currentuser.image,
      Email: currentuser.Email,
  
     }))
    return;
  }
  if (myMatches.length==0){
   DataStore.save(new Match({
    user1ID: authenticateduser.id,
    user2ID: currentuser.id,
    isMatch:false,
    image: currentuser.image,
    Email: currentuser.Email,

   }))
  }
  console.warn("swipe right", authenticateduser.name)
  

};

  const [currentindex, setcurrentindex] = useState(0);
  const [nextindex, setnextindex] = useState(currentindex+1)
  const currentprofile = users[currentindex]
  // const id = currentprofile.id
  // console.log(id)
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
  //console.log("swipe right", authenticateduser.name)
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

    onEnd: event =>  {
      if(Math.abs(event.velocityX)<Swipespeed)
      {
        translateX.value = withSpring(0);
        return;
      }
      
      translateX.value = withSpring(event.velocityX >0 ?hiddenTranslateX : -hiddenTranslateX,
        runOnJS(setcurrentindex)(currentindex+1));
      
       //helps to run on javascript thread...
       const onSwipe = event.velocityX > 0 ? onSwipeRight : onSwipeLeft;
       onSwipe && runOnJS(onSwipe)();
    },
  });
  
  useEffect(() => {
    translateX.value = 0; //translate value need to be changed after one profile is swipped...
    setnextindex(currentindex+1);
  }, [currentindex,translateX])
  let id;
  useEffect(() => {
    setcurrentuser(currentprofile)    
  //  id = currentuser.id
  //   console.log(id)
  
  }, [currentprofile,setcurrentuser])

  //console.log(id)
  
  
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
      {currentprofile ? (
    <PanGestureHandler onGestureEvent = {gestureHander}>
     
    <Animated.View style = {[styles.animatedcard, cardstyle]}> 
    <Animated.Image source={LIKE} style = {[styles.likes, {left:10}, likestyle]} resizeMode = "contain" ></Animated.Image>
    <Animated.Image source={nope} style = {[styles.likes, {right:10}, nopestyle]} resizeMode = "contain"></Animated.Image>
   <Card user = {currentprofile}></Card>
   
   </Animated.View>
   </PanGestureHandler>
   ):(
    <View>
      <Text>No users found</Text>
    </View>
   )}
   </View>
   <View style = {styles.bottom}>
   <Pressable onPress={() => fetchusers()} >
   <FontAwesome name="undo" size={34} color="red" />
   </Pressable>
    
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