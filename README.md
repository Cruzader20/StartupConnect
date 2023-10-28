# CSE508: Information Retrieval:  StartupConnect


# ===> PROBLEM STATEMENT

India has seen massive growth in the number of startups in the last six years, with numbers expected to grow much higher. However, as the number of startups keeps increasing, it is essential to know that a very handful of startups become successful to some extent, and most of them fade away. Through this project, we aim to connect entrepreneurs with other entrepreneurs with similar ideas and entrepreneurs with investors who are also willing to invest into startups with similar ideas.


# ===> TECHNOLOGY

1. JavaScript

2. AWS

3. React

4. Rapid API

5. Dynamo DB

6. SQL 

7. Node JS


# ===> ALGORITHM : Cosine Similarity


# ===> Steps to install the App:

1. Download Expo Go from Google’s Play Store

2. Sign In/Sign Up in Expo Go

3. Paste the following link in the Enter URL Manually section - https://expo.dev/@cruzader12/StartupAwesome?serviceType=classic&distribution=expo-go 

4. we can see the registration page: 
  New user can create an account by providing their email address as the username, creating the password and entering their phone number. The user will get verification email post registration. User has to then verfiy himself/herself.
  
5. Users already having account can simply sign in using their registered email id and password

6. New user can enter their details and create their profile.

7. Once logged in, user will be directed to the homepage that displays the user name and brief one-line description.

8. If the startup idea of a user matches with any other user, he/she can use the chat feature and connect to that other user to share his concerns, and then can start working together


# ===> CODE STRUCTURE:

1. startupcard: Acts as a template for User UI and maintains a consistancy accross the application
2. models: Respresents database schema. 
3. screens: It is the frontend of our application

  a. HomeScreen.js: It is the first screen to be displayed after user SIgnin. Here the user can see profiles of other users having similar ideas. It consists of 4 buttons to navigate to other components of our application. 
  
  b. MatchesScreen.js: Once the user is matched with the potential target on the basis of similarity. The list of matched users will be displayed here. The user can then see the email IDs of those users. It is then upto the user to discuss further with other person over email.
  
  c. ProfileScreen.js: Here user can signout of the application
  
  d. UserdetailsSCreen.js: Here user can see personal details such as name, email, gender, idea and interest, etc. Here the user can also modify his idea and interest as well as per requirement. The user can also enter idea in hindi as well

# ===> CONCLUSION:

We have dveloped an application with the help of Information Retrieval concepts such as Cosine Similarity. In the process of developing the application we also compared it with other processes such as Euclidean  distance, BLEU score, ROUGE Score, and levenshtein distance. After comparison we found Cosine similarity to be working best and hence encorporated it into the project. With help of Java Script and React we developed a pleasing UI with which user can interact. The data is stored on Dynamo DB. For Data Storge and fetching we have used AWS amplify API. The results provided to the user are ranked based on the similairty obtained which provides the user with highest match first. To increase reach to local indian audiance we have used Hindi as one of the language for users. The application developed is user friendly, robust and encouraging to young entrepreneurs.


# ===> Future Scope:

1. More Languages can be added.

2. Enabling an inhouse chat option for all the usrs.

3. To host meets with matched users via appication.


# ===> CONTRIBUTERS

1. Vimal Kirti Singh (MT22089)

2. Shubham Dattatray Patil (MT22125)

3. Sravani Reddy (MT22098)

4. Tangudu RohitKumar (MT22060)

5. Ankita Mahato (MT22013)

6. Mohit Kumar Rathod (MT22041)


