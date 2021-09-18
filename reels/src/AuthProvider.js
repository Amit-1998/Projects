import { createContext,useEffect, useState } from "react";
import { auth } from "./firebase";
// let authContext = createContext();
import { firestore } from "./firebase";


export const authContext = createContext();

let AuthProvider = (props)=>{ // isko props milenge
     
    // make states
    let [user, setUser] = useState(null); // initially user ki state null hogi
    let [loading, setLoading] = useState(true);

    useEffect(()=>{
        let unsub = auth.onAuthStateChanged( async (user)=>{
              if(user){
                  let { displayName, email, uid, photoURL} = user;

                  let docRef = firestore.collection("users").doc(uid); //google vaale user ki uid se fake object bnaya

                  let documentSnapshot = await docRef.get();
                  if(!documentSnapshot.exists){
                      // actual mein data set kar dijiye uske document mein jaake
                      docRef.set( {displayName, email, photoURL, posts: []} )
                    //  "user" collection mein jo pehle fake document the  ab usko actual mein save kar dia using set property of docRef
                    
                    
                  }

                  setUser( { displayName, email, uid, photoURL, posts: []} );
              }
              else{
                  setUser(null);
              }

              setLoading(false);
        });

        // cleanUp function return karenge, jo ki tabhi chalega jab hamara ye comp unMount ho jayega kuki hamare paas dusra useEffect nhi hai
        return ()=>{
             unsub();
        };

    },[]);

    return ( //yha par vo top comp is AuthProvider (w.r.t) propsdrilling)
        <authContext.Provider value={user}>
            { !loading && props.children }
        </authContext.Provider>
    );
};

export default AuthProvider;