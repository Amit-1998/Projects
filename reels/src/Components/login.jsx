import { useContext, useEffect } from "react";
import {auth, signInWithGoogle} from "../firebase";
import { authContext } from "../AuthProvider";
import { Redirect } from "react-router-dom";

import "./login.css";

let Login = ()=>{
    
    let user = useContext(authContext); // jo ahamne createContext se bnaya the vo useContext mein paas kra  
    console.log(user);

    // useEffect(()=>{
    //     auth.onAuthStateChanged( (user)=>{
    //           console.log(user);
    //     });
    // },[]);

    return(
        <>
            {user ? <Redirect to="/" /> : ""}
            <button onClick={()=>{ signInWithGoogle(); }} class="btn btn-primary m-4">Login with Google</button>
    
            
        </>
    );
}
export default Login;