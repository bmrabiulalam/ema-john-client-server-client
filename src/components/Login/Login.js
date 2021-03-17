import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import {
  initializeLoginFramework,
  handleGoogleSignIn,
  handleFacebookSignIn,
  handleTwitterSignIn,
  handleGithubSignIn,
  handleSignOut,
  createUserWithEmailAndPassword,
  signInUserWithEmailAndPassword,
  updateUserInfo
} from './loginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    message: '',
    success: false
  })

  initializeLoginFramework();

  const glSignIn = () => {
    handleGoogleSignIn()
      .then(modifiedUser => {
        setUserAndRedirect(modifiedUser, true);
      })
  }

  const fbSignIn = () => {
    handleFacebookSignIn()
      .then(modifiedUser => {
        setUserAndRedirect(modifiedUser, true);
      })
  }

  const ttSignIn = () => {
    handleTwitterSignIn()
      .then(modifiedUser => {
        setUserAndRedirect(modifiedUser, true);
      })
  }

  const ghSignIn = () => {
    handleGithubSignIn()
      .then(modifiedUser => {
        setUserAndRedirect(modifiedUser, true);
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(modifiedUser => {
        setUserAndRedirect(modifiedUser, false);
      })
  }

  const setUserAndRedirect = (modifiedUser, redirect) => {
    setUser(modifiedUser);
    setLoggedInUser(modifiedUser);
    redirect && history.replace(from);
  }

  const updateProfileInfo = (newName) => {
    const newUserInfo = {...user};
    newUserInfo.name = newName;
    
    updateUserInfo(newUserInfo)
      .then(modifiedUser => {
        setUserAndRedirect(modifiedUser, false);
      })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user)
      .then(modifiedUser => {
        setUserAndRedirect(modifiedUser, true);
        setUpdateProfile(true);
      })
    }
    if (!newUser && user.email && user.password) {
      signInUserWithEmailAndPassword(user)
      .then(modifiedUser => {
        setUserAndRedirect(modifiedUser, true);
        setUpdateProfile(true);
      })
    }
  }

  const handleBlur = (e) => {
    let isInputValid;
    if (e.target.name === 'name') {
      isInputValid = true;
    }
    if (e.target.name === 'email') {
      isInputValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const ifPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isInputValid = ifPasswordValid && passwordHasNumber;
    }
    if (isInputValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn
          ? <div>
            <button onClick={signOut}>Sign Out</button>
            <p>Welcome, {user.name}</p>
            <p>Your Email: {user.email}</p>
            <img src={user.photo} width='20%' alt="" />
          </div>
          : <div>
            <button onClick={glSignIn}>Google Sign In</button>
            <br />
            <button onClick={fbSignIn}>Facebook Sign In</button>
            <br />
            <button onClick={ttSignIn}>Twitter Sign In</button>
            <br />
            <button onClick={ghSignIn}>Github Sign In</button>
          </div>
      }

      <h1>Our Custom Authentication</h1>
      <input type="checkbox" onClick={() => setNewUser(!newUser)} name="newUser" />
      <label htmlFor="newUser">Sign UP</label>
      {
        updateProfile &&
        <>
          {/* set some real dynamic data from a profile update form */}
          <input type="button" onClick={() => updateProfileInfo('John Doe')} name="updateProfileInfo" />
          <label htmlFor="updateProfileInfo">Update Profile</label>
        // </>
      }
      <form onSubmit={handleSubmit}>
        {
          newUser &&
          <>
            <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name" required />
            <br />
          </>
        }
        <input type="email" onBlur={handleBlur} name="email" placeholder="Email" required />
        <br />
        <input type="password" onBlur={handleBlur} name="password" placeholder="Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={user.success ? { color: 'green' } : { color: 'tomato' }}>{user.message}</p>
    </div>
  );
}

export default Login;
