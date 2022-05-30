import React,{useEffect,useState} from 'react'

function LibAcc() {
    let confirm = 0;

    const [cartbooks, setCartbooks] = useState([
        {
            Id: '',
            Title: '',
            Author: '',
            Subject: '',
            pdate: '',
            issuedate: '',
        }
    ]);

    const [users, setUsers] = useState([
        {
            Id: '',
            Name: '',
            Email: '',
            FullName: '',
            Education: '',
        }
    ]);
    const [edit, setEdit] = useState(false);

    const [reservedbooks, setReservedbooks] = useState([
        {
            Id: '',
            Title: '',
            Author: '',
            Subject: '',
            pdate: '',
            issuedate: '',
        }
    ]);

    const [issuedate1, setIssuedate1] = useState([]);

    async function getcartbooks(){
        const response = await fetch("http://localhost:8080/library_management/getcartbooks?uid="+sessionStorage.getItem('luid')+"&user=Librarian");
            const data = await response.json();
            if(data.Status === "null"){
                return null;
            }
            else{
            return data;
            }
    }


    async function userinfo(){
        const response = await fetch("http://localhost:8080/library_management/userinfo?uid="+sessionStorage.getItem('luid')+"&user=Librarian");
            const data = await response.json();
            if(data.Status === "null"){
                return null;
            }
            else{
            return data;
            }
    }

    async function updateuser(user,prevuser){
        
        if(user[0] === prevuser.uname && user[1] === prevuser.fname && user[2] === prevuser.email && user[3] === prevuser.education){
            confirm = 0;
          }
          else{
          const id = sessionStorage.getItem('luid');
          const uname = user[0];
          const fname = user[1];
          const email = user[2];
          const education = user[3];
          const response = await fetch("http://localhost:8080/library_management/editusers?id="+id+"&uname="+uname+"&fname="+fname+"&email="+email+"&education="+education+"&user=Librarian");
        //   console.log("http://localhost:8080/library_management/editusers?id="+id+"&uname="+uname+"&fname="+fname+"&email="+email+"&education="+education+"&user=Librarian");
        
        const data = await response.json();
          


          if(data.Status === 'Success'){
            confirm = 1;
          }
          else
          {
            confirm = -1;
          }
          }
          if(confirm === 1){
            window.location.reload();
            alert("User Updated Successfully");
            
          }
          else if(confirm === -1){
            alert("User Update Failed");
          }  
          else{
            alert("User Already Exists");
          }     
    }

    async function addbookstocart(book){
        //console.log(book);
             const response = await fetch("http://localhost:8080/library_management/checkout?userid=" + sessionStorage.getItem("luid") +"&bookid=" + book.Id + "&date=" + date()+"&user=Librarian");
             const data = await response.json();
                 //console.log(data);
                 if(data.Status === "Success"){ 
                     let newbooks = cartbooks.map(b => {
                         if(b.Id === book.Id){
                             b.quantity = b.quantity - 1;
                         }                            
                         return b;
                     }
                     );
                     setCartbooks(newbooks);                     
                     alert("Book added to cart");                                           
                 }
                 else if(data.Status === "More"){
                     alert("You can't Check out more than 5 books");
                 }
                 else if(data.Status === "already"){
                     alert("Book already added to cart");
                 }
                 else if(data.Status === "Out"){
                     alert("Book Out Of Stock");
                 }
                 else{
                     alert("Something went wrong");
                 }
         }
             
 function date()
 {
     var today = new Date();
     var dd = String(today.getDate()).padStart(2, '0');
     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = today.getFullYear();
     today = yyyy + '-' + mm + '-' + dd;
     return today;
 }




    async function getreservedbooks(){
        const response = await fetch("http://localhost:8080/library_management/getreservedbooks?uid="+sessionStorage.getItem('luid')+"&user=Librarian");
            const data = await response.json();
            if(data.Status === "null"){
                return null;
            }
            else{
            return data;
            }
    }

    async function removebookfromcart(book){
        const response = await fetch("http://localhost:8080/library_management/removebookfromcart?userid=" + sessionStorage.getItem("luid") +"&bookid=" + book.Id +"&user=Librarian");
        const data = await response.json();
        //console.log(data1)
        if(data.Status === "Success"){
            alert("Book removed from cart");
            setCartbooks(cartbooks.filter(cartbook => cartbook.Id !== book.Id));
        }
        else{
            alert("Book not in cart");
        }
        return data;
    }  
   
    function date()
    {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    
    useEffect(() => {
        getcartbooks().then(data => {

            if(data === null){
                setCartbooks([]);
            }
            else{
            setCartbooks(data);
            //console.log(data);
            }     
       }
        );
    }, []);

    useEffect(() => {
        getreservedbooks().then(data => {

            if(data === null){
                setReservedbooks([]);
            }
            else{
            setReservedbooks(data);
            //console.log(data);
            }
         }
        );
    }, []);

    useEffect(() => {
        userinfo().then(data => {
            
            if(data === null){
                setUsers([]);
            }
            else{
            setUsers(data);
            //console.log(data);
            }
            }
        );
    }, []);

if(sessionStorage.getItem("loggedin") === "true"){
  return (
    <div>
        <h1>Account</h1>
        {/* TODO PROFILE PAGE */}
        <p>Profile Page</p>

        <div className="main">
        <h2>IDENTITY</h2>
        <div className="card">
            <div className="card-body">
                
                
                <table>
                    <tbody>
                    <tr>
                            <td>Id</td>
                            <td>:</td>
                            <td>{sessionStorage.getItem("luid")}</td>
                        </tr>
                    <tr>
                            <td>Username</td>
                            <td>:</td>
                            {
                                edit ? <td><input id='uname' type="text" defaultValue={users.uname}/></td> : <td>{users.uname}</td>
                            }
                            
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            {
                                edit ? <td><input id='fname' type="text" defaultValue={users.fname}/></td> : <td>{users.fname}</td>
                            }
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>:</td>
                            {
                                edit ? <td><input id='email' type="email" defaultValue={users.email}/></td> : <td>{users.email}</td>
                            }
                        </tr>
                        <tr>
                            <td>Education</td>
                            <td>:</td>
                            {
                                edit ? <td><input id='education' type="text" defaultValue={users.education}/></td> : <td>{users.education}</td>
                            }
                        </tr>
                    </tbody>
                </table>
                {
                edit ? <button onClick={() => {
                    setEdit(false);
                    updateuser([document.getElementById("uname").value,document.getElementById("fname").value,document.getElementById("email").value,document.getElementById("education").value],users);
                }
                } className="abtn edit1">Update</button> : <button onClick={() => {
                    setEdit(true);
                }
                } className="abtn edit1">Edit</button>
                }
                
            </div>
            
        </div>
    </div>

        
        <h1>BOOKS IN HAND</h1>        
            <div>
                <table className="styled-table">
                <thead className='thead'>
                <tr>
                    <th>Id</th>
                    <th>Book Title</th>
                    {/* <th>Author</th>
                    <th>Subject</th>
                    <th>Publication Date</th> */}
                    <th>Issue Date</th>
                    <th>Return Date</th>
                    <th>Pay Fine</th>
                    <th>Return</th>
                </tr>
                </thead>
                <tbody>
                {cartbooks.map(book => (
                    <tr key={book.Id}>
                    <td>{book.Id}</td>
                    <td>{book.Title}</td>
                    {/* <td>{book.Author}</td>
                    <td>{book.Subject}</td>
                    <td>{book.Pdate}</td> */}
                    <td>{book.issue_date}</td>
                    <td>{book.return_date}</td> 
                    <td>
                        {/* TODO BUTTON TO PAY FINE IF DATE MORE THAN 10 DAYS */}
                        {
                            (new Date(book.issue_date).getTime() + (1000 * 60 * 60 * 24 * 11)) < new Date().getTime()
                            ?
                            <button onClick={() => {
                                let fine = 10 * ((new Date().getTime() - (new Date(book.issue_date).getTime() + (1000 * 60 * 60 * 24 * 11))) / (1000 * 60 * 60 * 24));
                                let confirm = window.confirm("Pay fine of " + fine.toPrecision(2) + " Rs?");
                                if(confirm){
                                alert("Fine paid");
                                removebookfromcart(book);
                                }
                        }
                        }>Pay Fine</button>
                        :
                        <button disabled>Pay Fine</button>
                        }
                    </td>                
                    <td>
                    {
                            (new Date(book.issue_date).getTime() + (1000 * 60 * 60 * 24 * 11)) < new Date().getTime()
                            ?
                            <button onClick={() => {
                                let fine = 10 * ((new Date().getTime() - (new Date(book.issue_date).getTime() + (1000 * 60 * 60 * 24 * 11))) / (1000 * 60 * 60 * 24));
                                let confirm = window.confirm("Pay fine of " + fine.toPrecision(2) + " Rs?");
                                if(confirm){
                                alert("Fine paid");
                                removebookfromcart(book);
                                }
                        }
                        } disabled>Pay Fine</button>
                       :
                        <button 
                        onClick={() => {
                            removebookfromcart(book);
                        }
                        }>Return</button>
                        }
                    </td>
                    </tr>
                ))
                
                }
                </tbody>
            </table>
        </div>   
                <h1> RESERVED BOOKS </h1>
            <div>
                <table className="styled-table">
                <thead className='thead'>
                <tr>
                    <th>Id</th>
                    <th>Book Title</th>
                    {/* <th>Author</th>
                    <th>Subject</th>
                    <th>Publication Date</th> */}
                    <th>Quantity</th>
                    <th>GET BOOK</th>
                </tr>
                </thead>
                <tbody>
                {reservedbooks.map(book => (
                    <tr key={book.Id}>
                    <td>{book.Id}</td>
                    <td>{book.Title}</td>
                    {/* <td>{book.Author}</td>
                    <td>{book.Subject}</td>
                    <td>{book.Pdate}</td> */}
                    <td>{book.Quantity}</td>
                    <td>
                        {
                            book.Quantity > 0
                            ?
                            <button className='delete_button'
                                onClick={() => {
                                    addbookstocart(book);
                                }
                                }>Get Book</button>
                            :
                            <button className='delete_button' disabled>Get Book</button>
                        }
                    
                    </td>              
                    </tr>
                ))
                
                }
                </tbody>
            </table>
        </div>        


        {/* TODO LOGOUT BUTTON */}
        <div className="container_Home">
                    <div className="tabs_Home">
                        <button className="tablinks_Home abtn" onClick={() => {
                            sessionStorage.removeItem("uid");
                                   sessionStorage.removeItem("uname");
                                   sessionStorage.removeItem("email");
                                   window.location.href = "#/login";
                        }
                        }>LOGOUT</button>
                        <button className="tablinks_Home abtn" onClick={() => {
                            window.location.href = "#/home";
                        }
                        }>Home</button>
                    </div>
                </div>


        
    </div>
  )
}
else{
    return (
        <div>
            <h1>Please Login To See Account</h1>
            <button className='tablinks_Home' onClick={() => {
                window.location.href = "#/login";
            }}>Login</button>
        </div>
    )
}
}

export default LibAcc