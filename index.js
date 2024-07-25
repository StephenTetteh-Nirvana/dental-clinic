import { onAuthStateChanged,signOut } from "firebase/auth";
import { auth } from "./firebase";

const authBtn = document.querySelector(".auth-btn")
const signOutBtn = document.querySelector(".signOut-btn")
const textSection = document.querySelector(".text-box")

document.addEventListener("DOMContentLoaded",function(){
    onAuthStateChanged(auth,(user)=>{
        if(user){
            signOutBtn.classList.remove("authChecker")
        }else{
            authBtn.classList.remove("authChecker")
        }
    })
})

const logOut = async() => {
    signOut(auth)
    .then(()=>{
     window.location.href = "/Login/login.html"
    })
    .catch((error)=>{
       console.log(error)
    })
}

signOutBtn.addEventListener("click",(e)=>{
    logOut()
})

textSection.addEventListener("click",(e)=>{
   if(e.target.classList.contains("buttonnow")){
     const user = auth.currentUser;
     if(!user){
        window.location.href = "Login/login.html"
     }else{
        window.location.href = "Booking/booking.html"
     }
   }
})
