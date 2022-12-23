import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDs6Rgpy-duLvtEtUapjZ2MhdeTgk0EbWU",
    authDomain: "muscle-confusion-auth.firebaseapp.com",
    projectId: "muscle-confusion-auth",
    storageBucket: "muscle-confusion-auth.appspot.com",
    messagingSenderId: "293665757280",
    appId: "1:293665757280:web:d8362590daa2a8e78dcb05",
    measurementId: "G-F3PGJPNND4"
  };

    initializeApp(firebaseConfig)

  //initialize firebase auth
  const auth = getAuth()
  
  //export the auth object
  export {  auth }