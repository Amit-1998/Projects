import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../AuthProvider";
import { auth, storage, firestore } from "../firebase";
import { useHistory } from "react-router";

import "./home.css";
import VideoCard from "./videoCard";

let Home = () => {

    let user = useContext(authContext);
    let [posts, setPosts] = useState([]);
    
    let history = useHistory();

    // useEffect(() => {
        
    //     let unsub = firestore.collection("posts").onSnapshot((querySnapshot) => {
    //         let docArr = querySnapshot.docs;

    //         let arr = [];

    //         for (let i = 0; i < docArr.length; i++) {
    //             arr.push({ id: docArr[i].id, ...docArr[i].data(), }); // id isliye dalvayi taki niche posts collections par map maar paye to vha par props mein dena hai
    //         }
    //         setPosts(arr);
    //     });

    //     return () => {
    //         unsub();
    //     }

    // }, [])

    useEffect( () => {
        
        
        // let docRef = firestore.collection("users").doc(user.uid);
        // let docSnapshot = await docRef.get();
        // let actualUserDoc = docSnapshot.data();
        // // let postarr = actualUserDoc.posts;

        let unsub = firestore.collection("posts").onSnapshot((querySnapshot) => {
            let docArr = querySnapshot.docs;

            let arr = [];
            let postarr = [];

            for (let i = 0; i < docArr.length; i++) {
                arr.push({ id: docArr[i].id, ...docArr[i].data(), }); // id isliye dalvayi taki niche posts collections par map maar paye to vha par props mein dena hai
                postarr.push(docArr[i].id);
            }
            
            firestore.collection("users").doc(user.uid).update({posts: postarr});
            setPosts(arr);
        });

        return () => {
            unsub();
        }

    }, [])


    return (
        <>
            {user ? "" : <Redirect to="./login" />}

            <div className="video-container">
                    <div className="Profile-navbar">
                            <div onClick={()=>{ history.push("/profile"); }} className="profile-icon">Profile</div>
                            <p>My Posts</p>
                    </div>

                    <div className="video-Element">
                        {
                            posts.map((el) => { return <VideoCard key={el.id} data={el} /> })
                        }
                    </div>
            </div>

            <button className="home-logout-btn" onClick={() => { auth.signOut(); }}>Logout</button>
            <input type="file" onClick={(e) => { e.currentTarget.value = null }} onChange={(e) => {
                //   console.log(e.currentTarget.files); gives files object
                let videoObj = e.currentTarget.files[0];
                let { name, size, type } = videoObj;

                size = size / 1000000; // in mb
                if (size > 40) {
                    alert("File Size exceeds 40mb");
                    return;
                }


                type = type.split("/")[0]
                if (type !== "video") {
                    alert("Please upload a video file");
                    return;
                }

                let uploadTask = storage.ref(`posts/${user.uid}/${Date.now() + "-" + name}`).put(videoObj); // gives us an event
                // uploadTask.on("state_changed", null, null, () => {
                //     uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                //         // console.log(url);
                //         // firestore.collection("posts").add({ name: user.displayName, likes: [], comments: [], url }); // add karna bhi ek promisified kaam hota hai
                        
                //         let f = async()=>{
                //               let docRef = await firestore.collection("posts").add({ name: user.displayName, likes: [], comments: [], url }); // add karna bhi ek promisified kaam hota hai
                //               console.log(docRef);
                //               let doc = await docRef.get();
                //               let postkiId = doc.id;
                //               let userDoc = await firestore.collection("users").doc(user.uid).get();
                //               let postsArr = userDoc.data().posts;
                //               postsArr.push(postkiId);
                //               await firestore.collection("users").doc(user.uid).update({posts: postsArr});

                //         }
                //         f();
                //     })
                // })

                uploadTask.on("state_changed", null, null, async () => {
                    let url = await uploadTask.snapshot.ref.getDownloadURL();
                    // console.log(url);
                    let docRef = await firestore.collection("posts").add({ name: user.displayName, likes: [], comments: [], url });
                    // console.log(docRef);
                    let postKiId = docRef.id;
                    // console.log(postKiId);
                    let userDoc = await firestore.collection("users").doc(user.uid).get();
                    console.log(userDoc);
                    console.log(userDoc.data());
                    // let postsArr = userDoc.data().posts;
                    // console.log(postsArr);

                })



            }} />
        </>
    );
}

export default Home;