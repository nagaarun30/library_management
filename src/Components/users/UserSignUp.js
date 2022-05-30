import React from 'react'

function UserSignUp() {

    function handleSubmit(event) {

        event.preventDefault();
        const answer = window.confirm("Are you sure you want to SignUp?");
        if(answer){
        const data = new FormData(event.target);
        if(data.get("Education") === ""){
            data.set("Education", "Nill");
        }
        fetch("http://localhost:8080/library_management/usersignup?username=" + data.get("userName") + "&email=" + data.get("email") + "&fullname=" + data.get("FullName") + "&education=" + data.get("Education") + "&password=" + data.get("password"))
          .then((response) => response.json())
            .then((data1) => {
              console.log(data1);
              if (data1.Status === "Success") {
                alert("User added successfully");
                sessionStorage.setItem("loggedin", true);
                  sessionStorage.setItem("uname", data1.uname);
                  sessionStorage.setItem("uid", data1.uid);
                  sessionStorage.setItem("email", data1.email);
                  if(sessionStorage.getItem("loggedin") === "true"){
                  window.location.href = "#/userhome";
                  }
              }
              else if(data1.Status === "EmailExists"){
                alert("Email already exists");
                }
              else {
                alert("User not added");
              }
            }
            );
          }
      }

  return (
    <div className="container">
		<div className="img">
			<img src="https://img.freepik.com/free-vector/people-library-flat-vector-illustration_74855-6607.jpg?t=st=1653369178~exp=1653369778~hmac=d4ac6b45fbd0c7c3e845960d2608a9611da56a8d4f0e2fcee7ff023b9bd4bac9&w=996"/>
		</div>
		<div className="login-content">
		<form onSubmit={handleSubmit}>
          <div className="input-div one">
          <div className="i">
                 </div>
            <div>
              <input type="text" name='userName' className="input" placeholder="UserName" required/>
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
            </div>
            <div>
              <input type="email" name='email' className="input" placeholder="Email" required/>
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
          </div>
            <div>
              <input type="text" name='FullName' className="input" placeholder="Full Name" required/>
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
          </div>
            <div>
              <input type="text" name='Education' className="input" placeholder="Education"/>
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
            </div>
            <div>
              <input type="password" name='password' className="input" placeholder="Password" required/>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" value="Add">SignUp</button>
          <br></br>
        	<a href='#/userlogin' className='abtn'> Login </a>
        </form>
        </div>
    </div>
  )
}

export default UserSignUp