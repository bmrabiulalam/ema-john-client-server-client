
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig); // Initialize Firebase
    }
    else {
        firebase.app() // if already initialized
    }
}

const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        sessionStorage.setItem('token', idToken);
      }).catch(function(error) {
        // Handle error
      });
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;

            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
                message: "Logged In!"
            }

            setUserToken();

            return signedInUser;
        })
        .catch(err => {
            console.log(err.message);
        })
}

export const handleFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth()
        .signInWithPopup(fbProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;

            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
                message: "Logged In!"
            }

            return signedInUser;
        })
        .catch(err => {
            console.log(err.message);
        })
}

export const handleTwitterSignIn = () => {
    const ttProvider = new firebase.auth.TwitterAuthProvider();

    return firebase.auth()
        .signInWithPopup(ttProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;

            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
                message: "Logged In!"
            }

            return signedInUser;
        })
        .catch(err => {
            console.log(err.message);
        })
}

export const handleGithubSignIn = () => {
    const ghProvider = new firebase.auth.GithubAuthProvider();

    return firebase.auth()
        .signInWithPopup(ghProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;

            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
                message: "Logged In!"
            }

            return signedInUser;
        })
        .catch(err => {
            console.log(err.message);
        })
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                success: false
            }

            return signedOutUser;
        })
        .catch(err => {
            console.log(err.message);
        })
}

export const createUserWithEmailAndPassword = (user) => {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            return setAuthMessageAndSuccess(user, "Account Created Successfully!", true, true);
        })
        .catch((error) => {
            var errorMessage = error.message;
            return setAuthMessageAndSuccess(user, errorMessage, false, false);
        });
}

export const signInUserWithEmailAndPassword = (user) => {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
            // Signed in
            // var user = userCredential.user;
            return setAuthMessageAndSuccess(user, "Logged In!", true, true);
        })
        .catch((error) => {
            var errorMessage = error.message;
            return setAuthMessageAndSuccess(user, errorMessage, false, false);
        });
}

export const updateUserInfo = (userWithNewInfo) => {
    var user = firebase.auth().currentUser;

    return user.updateProfile({
        displayName: userWithNewInfo.name,
        // photoURL: userWithNewInfo.photoURL
    }).then(res => {
        // Update successful.
        return setAuthMessageAndSuccess(userWithNewInfo, "Profile Updated Successfully!", true, true);
    }).catch(error => {
        // An error happened.
        var errorMessage = error.message;
        return setAuthMessageAndSuccess(userWithNewInfo, errorMessage, false, false);
    });
}

const setAuthMessageAndSuccess = (user, msg = '', isSignedIn = false, success = false) => {
    const newUser = { ...user };
    newUser.message = msg;
    newUser.isSignedIn = isSignedIn;
    newUser.success = success;
    return newUser;
}
