  
import Vue from "vue"

import firebase from "firebase/app"
import "firebase/firebase-auth"

import * as firebaseui from "firebaseui"

const firebaseConfig = {
    apiKey: "AIzaSyC7pZTDnWwIb5NuwEJQn8WPpLoj9yj4exE",
    authDomain: "blog-647a0.firebaseapp.com",
    databaseURL: "https://blog-647a0.firebaseio.com",
    projectId: "blog-647a0",
    storageBucket: "blog-647a0.appspot.com",
    messagingSenderId: "684135893329",
    appId: "1:684135893329:web:da74738903f43d1f59eb70",  
    VUE_APP_API: "http://localhost.3000"
}

firebase.initializeApp(firebaseConfig)
const ui = new firebaseui.auth.AuthUI(firebase.auth())

Vue.prototype.$firebase = firebase
Vue.prototype.$firebaseui = ui