import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const Config = {
    apiKey: "AIzaSyAEOlAjeOTUOPyYoIpm7PprIrZ6Au_A0Do",
    authDomain: "boersenanalysten-25ee4.firebaseapp.com",
    projectId: "boersenanalysten-25ee4",
    storageBucket: "boersenanalysten-25ee4.appspot.com",
    messagingSenderId: "1046126412300",
    appId: "1:1046126412300:web:5218c0fb3fbdc6a95a2429",
    measurementId: "G-N8VZEYGQD1"
}

class Firebase {
    constructor() {
        firebase.initializeApp(Config);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    ///////////////////////////////////
    //      Benutzer Handling
    ///////////////////////////////////

    // register user
    async register(email, password, username) {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            firebase.firestore().collection('users').doc(user.user.uid).set({
                uid: user.user.uid,
                username: username,
                email: email,
                location: "",
                portfolioLink: "",
                userDescription: "",
                shareCounter: 0,
                answerCounter: 0,
                articleCounter: 0,
                portfolioArticleCounter: 0,
                createdAt: new Date(),
            })
            .catch(error => {
                console.log(error);
            });
        })
        .catch(error => {
            console.log(error);
        });
        return user;
    }

    // log in user
    async login(email, password) {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
            console.log(error);
        });
        return user;
    }

    // log out user
    async logout() {
        const logout = await firebase.auth().signOut().catch(error => {
           console.log(error); 
        });
        return logout;
    }

    // Aktueller Benutzer Status
    async getUserState() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }

    ///////////////////////////////////
    //      Beiträge Handling
    ///////////////////////////////////

    async createArticle(title, articleText, tags) {
        const newArticle = await firebase.firestore().collection('articles').doc();
        const newArticleRef = await newArticle.get();
        await firebase.firestore().collection('articles').doc(newArticleRef.id).set({
            title: title,
            articleText: articleText,
            tags: tags,
            views: 0,
            voting: 0,
            answerCounter: 0,
            createdAt: new Date(),
            id: newArticleRef.id,
        })
        return newArticle;
    }
}

export default new Firebase();