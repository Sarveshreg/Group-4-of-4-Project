import React, { useState } from 'react'


function Login() {

  let[email,setEmail]=useState("");
  let[password,setPassword]=useState("");
  let[credentialError, setCredentialError]=useState(false);
  let[serverError, setServerError]=useState(false);


  async function handleSubmit(e){

    e.preventDefault();
    setCredentialError(false);setServerError(false);
    console.log("button clicked!");

    //check to see if email and password meets all the parameters
    let emailPattern=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if((!emailPattern.test(email)) || (password.length<4)){
      console.log("invalid email or password");
      setPassword("");
      setCredentialError(true);
      return null;
    }

    //make a call to the backend to login the user and get a token. Set the token in redux state
    try {
      let response= await fetch ("http://localhost:3000/api/user/login",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:email,
          password: password
        })
      })
      let result= await response.json();
      console.log("result",result);
    } catch (error) {
      console.error("error:",error);
      setServerError(true);setPassword("");   //reset the password field
    }
  }


  return (

    <div>
      <form>
        <label >Email: <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='email' value={email} /></label>
        <label > Password: <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} /></label>
        <button onClick={(e)=>handleSubmit(e)}>Submit</button>
        {credentialError && <p>Invalid email or password entered!</p>}
        {serverError && <p>Unable to connect to the server!</p>}
      </form>
    </div>

  )
}

export default Login