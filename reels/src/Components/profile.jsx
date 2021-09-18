import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { authContext } from "../AuthProvider";
import { auth, firestore, storage } from "../firebase";
import "./profile.css";

// const CurrLoggedInUser = auth.currentUser;
// console.log(CurrLoggedInUser);

let Profile = ()=>{
    
    let user = useContext(authContext);
    console.log(user);
    // console.log(user.uid);
    let history = useHistory();

    let [userKipostskiArr,setArr] = useState([]);
    
    useEffect(()=>{
        (async ()=>{
                let docSnapshot = await firestore.collection("users").doc(user.uid).get();
                let postarr = docSnapshot.data().posts;
                setArr(postarr);
                // console.log(postarr);
                // console.log(postarr.length);
    
        })()

    },[]);
    

        // console.log(postarr.length);
    // displayName: "Amit Kumar"
    // email: "amitkumar654521@gmail.com"
    // photoURL: "https://lh3.googleusercontent.com/a/AATXAJxXINJuutuiRIC892Frr-9HqYcsvxYKj98d5U5z=s96-c"
    // uid: "D23uYqSGe7ePQAs5QskrszB5vGf1"

    
    // let allPosts = firestore.collection("posts");
    // console.log(allPosts);
    // let totPostsbyUser = 0;

    // let f = async ()=>{
    //     let querySnapshot = await firestore.collection("posts").get();
    //     for(let i=0; i<querySnapshot.docs.length; i++){
    //         let document = querySnapshot.docs[i].data();
    //         // console.log(document);
    //         if(document.name===user.displayName){
    //             totPostsbyUser++;
    //         }
    //     }
    // }
    // f();

    return (
        <div className="displayInfo">
              <div className="Info">
                  <h1>{user.displayName}</h1>
                  <p>
                      <h5>No of Posts : {userKipostskiArr.length}</h5>
                  </p>
              </div>

              <button onClick={()=>{ history.push("/"); }} className="GoBack">Back</button>
        </div>
    );
}

export default Profile;