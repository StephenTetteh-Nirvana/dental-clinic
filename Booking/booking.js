import { collection,addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import Swal from "sweetalert2";

const form = document.querySelector(".booking-form")
const loader = document.querySelector(".loader-box")
const submitBtn = document.querySelector(".buttonnow")
const cancelBtn = document.querySelector(".cancel-booking")
const closePopUp = document.querySelector(".closePopUp")
const popup = document.querySelector(".popup")
const selectMinuteElement = document.getElementById("minutes");
const selectHourElement = document.getElementById("hours")
const timeFormat = document.getElementById("time-format")

closePopUp.addEventListener("click",()=>{
    popup.classList.remove("active")
    setTimeout(()=>{
        window.location.href = "../index.html"
    },1000)
})

//Programmatically generate minutes//

for (let i = 0; i <= 59; i++) {
    const option = document.createElement("option");
    option.value = i.toString().padStart(2, '0');
    option.textContent = i.toString().padStart(2, '0');
    selectMinuteElement.appendChild(option);
}

//Programmatically generate hours//

for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i.toString().padStart(2);
    option.textContent = i.toString().padStart(2);
    selectHourElement.appendChild(option);
}

const submitBooking = async() => {
    try{
        submitBtn.style.cursor = "not-allowed"
        cancelBtn.style.cursor = "not-allowed"
        loader.style.display = "block"
           const docRef = collection(db,"Future Appointments")
           await addDoc(docRef,{
            name:form.fullname.value,
            time:`${selectHourElement.value}:${selectMinuteElement.value} ${timeFormat.value}`,
            email:form.email.value,
            date:form.booking_date.value,
            contact:form.contact.value
           })
           const PatientsCol = collection(db,"Patients")
           await addDoc(PatientsCol,{
            name:form.fullname.value,
            age:form.age.value,
            email:form.email.value,
            date:form.booking_date.value,
            contact:form.contact.value,
           })
        form.reset()
        popup.classList.add("active")
    }catch(error){
        Swal.fire({
            icon: "error",
            title: "Check Your Internet Connection",
        })
    }finally{
        loader.style.display = "none"
        submitBtn.style.cursor = "pointer"
        cancelBtn.style.cursor = "pointer"
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });

    submitBooking();
});