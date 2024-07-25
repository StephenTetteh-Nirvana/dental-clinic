import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../firebase"
import Swal from 'sweetalert2';


const form = document.querySelector(".form");
const loader = document.querySelector(".loader-box")
const password = document.querySelector("#password")

function signIn(){
    loader.style.display = "block";
    signInWithEmailAndPassword(auth,form.email.value,form.password.value)
    try{
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successfully",
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(()=>{
            window.location.href = "/index.html"
          },1500)
    }
    catch(error){
        if (error.code === 'auth/invalid-email') {
            Swal.fire({
            icon: "error",
            title: "Invalid Email",
            });
            } else if (error.code === 'auth/wrong-password') {
                Swal.fire({
            icon: "error",
            title: "Incorrect Password",
            });
            } else if (error.code === 'auth/missing-password') {
                Swal.fire({
            icon: "error",
            title: "Please Enter Your Password",
            });
            } else if (error.code === 'auth/user-not-found') {
                Swal.fire({
            icon: "error",
            title: "There is no user with account",
            });
            }
            else if (error.code === 'auth/user-disabled') {
                Swal.fire({
            icon: "error",
            title: "User disabled",
            });
            }
            else if (error.code === "auth/invalid-login-credentials") {
                Swal.fire({
            icon: "error",
            title: "Wrong Credentials",
            });
            } else {
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

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    signIn()
})

form.addEventListener("click",(event)=>{
     if(event.target.classList.contains("eye")){
         const checker = password.type === 'password' ? password.type = "text" : password.type = "password"
         console.log(checker)
     }
})