import React,{useState,useEffect} from 'react'
import UserBooks from './UserBooks';

function Deleteuser() {
    const [count, setCount] = useState(50);
    const [initial, setInitial] = useState(0);
    const [nextvisibe, setNextvisible] = useState('visible');
    const [prevvisible, setPrevvisible] = useState('hidden');
    const [users, setUsers] = useState([

        {   
            Id: '',
            Name: '',
            Email: '',
        }

    ]);
    const [searchedusers, setSearchedusers] = useState([]);

    const handleSearch = (event) =>{

        let value = event.target.value.toLowerCase();
        let results = [];
        results = users.filter(user => user.Name.toLowerCase().includes(value) || user.Email.toLowerCase().includes(value));
        setSearchedusers(results);
    }

    async function getusers(){
        const response = await fetch("http://localhost:8080/library_management/getusers?page="+initial);
        const data = await response.json();
        // console.log(data);
        return data;
    }

    const handleNext = () =>{
        setInitial(initial+50);
        setCount(count+50);
        if(users.length < 50){
          setNextvisible('hidden');
        }
        else{
          setNextvisible('visible');
        }
        setPrevvisible('visible');
      }
    
      const handlePrev = () =>{
        
        setInitial(initial-50);
        setCount(count-50);
        if(initial === 50){
          setPrevvisible('hidden');
        }
        
        setNextvisible('visible');
      }  

    useEffect(() => {
        getusers().then(data => {
            setUsers(data);
            setSearchedusers(data);
        }
        );
    }, [initial, count]);

if(sessionStorage.getItem("loggedin") === "true"){
  return (
        <div>

        <h1>Delete User</h1>
    <div className="container_Search_delete">
      <form className='Search_form_delete'>
      <input className='input_Search_delete' type="text" id='key' name="search" placeholder="Type to Search" onChange={(event) =>handleSearch(event)} />
      </form>
      </div>
        <table className="styled-table">
            <thead className='thead'>
                <tr>
                    <th>USER ID</th>
                    <th>USER NAME</th>
                    <th>EMAIL</th>
                    <th>Show Books</th>
                    <th>Delete User</th>
                </tr>
            </thead>
            <tbody>
                {searchedusers.map(user => (
                    <tr key={user.Id}>
                        <td>{user.Id}</td>
                        <td>{user.Name}</td>
                        <td>{user.Email}</td>
                        {/* TRAVERSE USER BOOK ARRAY */}
                        <td>
                            {/* CREATE A BUTTON TO DISPLAY USER BOOKS */}
                            <button className='delete_button' onClick={
                                () => {
                                    users.map(user1 => (
                                        user1.Id === user.Id ?
                                        (
                                            document.getElementById("user_books_"+user1.Id).style.display == "block" ?
                                            document.getElementById("user_books_"+user1.Id).style.display = "none" :
                                            document.getElementById("user_books_"+user1.Id).style.display = "block" 

                                        )
                                        :
                                        (
                                            document.getElementById("user_books_"+user1.Id).style.display = "none"
                                        )
                                    ))


                                }
                            }>
                                SHOW BOOKS
                            </button>
                        </td>
                        <td>
                            <button
                                className='delete_button'
                                onClick={() => {
                                    const answer = window.confirm("Are you sure you want to Delete This User?");
                                    if(answer){
                                        fetch("http://localhost:8080/library_management/deleteuser?id="+user.Id)
                                        .then((response) => response.json())
                                        .then((data1) => {
                                            if(data1.Status === "Success")
                                            {
                                                window.location.reload();
                                                alert("User Deleted Successfully");
                                            }
                                            else{
                                                alert("User Delete Failed");
                                            }    
                                        }
                                        );
                                    }
                                }
                            }
                            >
                                Delete
                            </button>
                        </td>                    
                    </tr>        
                ))}
            </tbody>
            
            </table>
 
            {users.map(user => (
                        <div key={user.Id} id={"user_books_"+user.Id} style={{"display": "none"}}>
                        <UserBooks key={user.Id} userId={user.Id} userName={user.Name} />
                        </div>
                        ))}
            <div className="pagination">
            <button className='prev_button' onClick={handlePrev} style={{visibility:prevvisible}}>Previous</button>
            <button className='next_button' onClick={handleNext} style={{visibility:nextvisibe}}>Next</button>
            </div> 
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
            <h1>Please Login To Delete User</h1>
            <button className='tablinks_Home' onClick={() => {
                window.location.href = "#/login";
            }}>Login</button>
        </div>
    )
}
}


export default Deleteuser