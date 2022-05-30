import React from 'react';
import '../css/Login.css';
function Login() {

    function handleSubmit(event) {
       event.preventDefault();    
       const data = new FormData(event.target);
       fetch("http://localhost:8080/library_management/authentication?uname="+data.get("username")+"&pwd="+data.get("password"))
       .then((response) => response.json())
         .then((data1) => {
              if(data1.Status === "SUCCESS"){
                 sessionStorage.setItem("loggedin", true);
                 sessionStorage.setItem("luname", data1.luname);
                 sessionStorage.setItem("luid", data1.id);
                 window.location.href = "#/home";
              }
              else{
                 alert("Invalid username or password");
              }
            });

    }
    
    return (
    <>
<div className="container">
		<div className="img">
			<img src="https://img.freepik.com/free-vector/people-library-flat-vector-illustration_74855-6607.jpg?t=st=1653369178~exp=1653369778~hmac=d4ac6b45fbd0c7c3e845960d2608a9611da56a8d4f0e2fcee7ff023b9bd4bac9&w=996"/>
		</div>
		<div className="login-content">
			<form onSubmit={handleSubmit}>
				<h2 className="title">Librarian Login</h2>
           		<div className="input-div one">
           		   <div className="i">
           		   		<i className="fas fa-user"></i>
           		   </div>
           		   <div className="div">
           		   		<input name='username' type="text" className="input" placeholder='username'/>
           		   </div>
           		</div>
           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	<input name='password' type="password" className="input" placeholder='Password'/>
            	   </div>
            	</div>
            	<button type="submit" className="btn" value="Login">Login</button>
               <a href="/">Switch User...</a>

            </form>
        </div>
    </div>
      </>
    )
  }

export default Login