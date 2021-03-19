import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './Firebase.Config';
import { ThemContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import './LogIn.css';


const LogIn = () => {
 
const [loggedUser, setLoggedUser] = useContext(ThemContext);

   if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig);
   }
 const history = useHistory();
 const location = useLocation();
 const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
           firebase.auth()
           .signInWithPopup(provider)
           .then((result) => {
          
           const {displayName, email} = result.user;
           const signInUser = {name: displayName, email}
           var credential = result.credential;
           var token = credential.accessToken;
           var user = result.user;
           setLoggedUser(signInUser);
           history.replace(from);
          
           console.log(user);
           console.log(signInUser);
      
     })
     .catch((error) => {
      
       var errorCode = error.code;
       var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      
     });
}

const { register, handleSubmit, watch, errors } = useForm();

    return (
        <div className="login-part">
    <section>
    <form>
        {/* <label htmlFor="">Pick From</label> */}
        <input name="example" ref={register} placeholder="Please Enter Your Name"/> <br/>
        {/* <label htmlFor="">Pick To</label> */}
        <input name="exampleRequired" ref={register({ required: true })} placeholder="Please Enter Your Email"/>
        {errors.exampleRequired && <span>This field is required</span>} <br/>
        
    </form>

   <button onClick={handleGoogleSignIn}>Sign in</button>
    </section>
        
             
        </div>
    );
};

export default LogIn;