import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "../firebase"
import { doc,setDoc } from "firebase/firestore"
import Swal from "sweetalert2"

const registerForm = document.querySelector(".registerForm")
const loader = document.querySelector(".loader-box")
const password = document.querySelector("#password")


  async function registerUser(){
        try{
            loader.style.display = "block";
            await createUserWithEmailAndPassword(auth,registerForm.email.value,registerForm.password.value)
            registerForm.reset()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Account created successfully",
                showConfirmButton: false,
                timer: 1500
                });
                setTimeout(()=>{
                window.location.href = "/index.html"
                },1500)   
        }catch(error){
            console.log(error)
           if(error.code === "auth/invalid-email"){
               Swal.fire({
                   icon: "error",
                   title: "Email is Incorrect",
                 });
           }else if (error.code === 'auth/wrong-password') {
               Swal.fire({
           icon: "error",
           title: "Please check your password",
           });
           } else if (error.code === 'auth/user-not-found') {
               Swal.fire({
           icon: "error",
           title: "No User Was Found",
           });
           } else if (error.code === 'auth/email-already-in-use') {
               Swal.fire({
           icon: "error",
           title: "Email Already Exists",
           });
           }
           else if (error.code === 'auth/weak-password') {
               Swal.fire({
           icon: "error",
           title: "Password should be 6 characters or more",
           });
           }
           else {
             (error.code==='auth/network-request-failed')
             Swal.fire({
               icon: "error",
               title: "Check Your Internet Connection",
               });
           }
        }finally{
            loader.style.display = "none"
        }
    }

registerForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    registerUser()
})

registerForm.addEventListener("click",(event)=>{
    if(event.target.classList.contains("eye")){
        const checker = password.type === 'password' ? password.type = "text" : password.type = "password"
        console.log(checker)
    }
})





