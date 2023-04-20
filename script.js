// import { greet, message } from "./insideScript.js";

// const greet_scaler = greet("Scaler");

// console.log(greet_scaler); // Hello, Scaler
// console.log(message); // How you doing?


// let role;
// function getRole(value) {
//     console.log(value);
//     role=value;
//     console.log(role);
//   }

// function signUp()
// {
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;
//     let confirmPassword = document.getElementById("confirmPassword").value;
//     console.log(role);
//     if(role=="admin")
//     {
//         if (password === confirmPassword) {
//             localStorage.setItem("adminEmail", email);
//             localStorage.setItem("adminPassword", password);
//             localStorage.setItem("role", role);
//            // alert("Your mail has been registered...");
//           } else {
//             //alert("Password and Confirm Password didn't match...");
//           }
//     }
//     else
//     {
//         if (password === confirmPassword) {
//             localStorage.setItem("userEmail", email);
//             localStorage.setItem("userPassword", password);
            
//            // alert("Your mail has been registered...");
//           } else {
//             //alert("Password and Confirm Password didn't match...");
//           }
//     }
//     window.location.replace("signIn.html");
// }  
// let roleResult;
// function validate(email, password)
// {
//     let localStorageAdminEmail = localStorage.getItem("adminEmail");
//     //console.log(localStorageAdminEmail);
//     let localStorageAdminPassword = localStorage.getItem("adminPassword");
//     let localStorageUserEmail = localStorage.getItem("userEmail");
//     let localStorageUserPassword = localStorage.getItem("userPassword");

//     if(email==localStorageAdminEmail && password==localStorageAdminPassword)
//     {
//         roleResult="admin";
//     }
//     else if(email==localStorageUserEmail && password==localStorageUserPassword)
//     {
//         roleResult="user";
//     }
//     else{
//         alert("Enter the correct email and password");
//     }
// }

// function signIn() {
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;
//     console.log(password);
//     validate(email,password);

//     //console.log(message);

//     if(roleResult=="admin")
//     {   localStorage.setItem("role", roleResult);
//         window.location.replace("indexInside.html");
        
//     }
//     else{
//         localStorage.setItem("role", roleResult);
//         window.location.replace("indexInside.html");
        
//     }

//     // let localStorageEmail = localStorage.getItem("email");
//     // console.log(localStorageEmail);
//     // let localStoragePassword = localStorage.getItem("password");
  
//     // if (email === localStorageEmail && password === localStoragePassword) {
//     //   alert("You have successfully logged In...");
//     // } else {
//     //   alert("Email and  Password didn't match...");
//     // }
//   }