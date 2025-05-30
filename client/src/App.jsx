import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   fetch("/api/v1/users/register", {  //proxy is set in vite.config.js to redirect /api requests to the backend server
  //     method: "POST", // Use POST for sending data
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       username: "testuser",
  //       password: "testpassword",
  //       fullName: "Test User",
  //       email: "test@gmail.com"
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log("data",data))
  //   .catch(error => console.error("Error:", error));
  // },[])

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const username = document.getElementById("username_input").value;
  //   const password = document.getElementById("password_input").value;
  //   const fullName = document.getElementById("fullName_input").value;
  //   const email = document.getElementById("email_input").value;

  //   fetch("/api/v1/users/register", {  //proxy is set in vite.config.js to redirect /api requests to the backend server
  //     method: "POST", // Use POST for sending data
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       username,
  //       password,
  //       fullName,
  //       email
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log("data",data))
  //   .catch(error => console.error("Error:", error));

  // }
    
  return (
    <>
    This is the App component
    </>

  )
}

export default App
