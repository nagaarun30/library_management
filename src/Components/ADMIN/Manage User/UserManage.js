import React,{useState,useEffect} from 'react'
import AddBooks from '../Manage Books/AddBooks';
import UserBooks from './UserBooks';

function UserManage() {
    let confirm = 0;

    let [ediuser, setEdiuser] = useState([]);
    let [prevuser, setPrevuser] = useState([]);
    const [savebtn, setSavebtn] = useState('none');
    const [id, setId] = useState('');
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

    const [editingRow, setEditingRow] = useState(null);

    async function editRow(user,prevuser){
        console.log(user);
        console.log(prevuser);
        if(user[1] === prevuser.Name && user[2] === prevuser.Email && user[3] == prevuser.FullName && user[4] === prevuser.Education){
          confirm = 0;
        }
        else{
        const id = user[0];
        const uname = user[1];
        const email = user[2];
        const fname = user[3];
        const education = user[4];
        const response = await fetch("http://localhost:8080/library_management/editusers?id="+id+"&uname="+uname+"&fname="+fname+"&email="+email+"&education="+education+"&user=Member");
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

    async function getusers(){
        const response = await fetch("http://localhost:8080/library_management/getusers");
        const data = await response.json();
        // console.log(data);
        return data;
    }

    useEffect(() => {
        getusers().then(data => {
            setUsers(data);
            setSearchedusers(data);
        }
        );
    }, []);

  return (
    // TODO CREATE USER MANAGE PAGE
    <div>
        <h1>Manage User</h1>
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
                    <th>Full Name</th>
                    <th>EDUCATION</th>
                    <th>REVOKE MEMBERSHIP</th>
                    <th>EDIT MEMBERSHIP</th>
                </tr>
            </thead>
            <tbody>
                {searchedusers.map(user => (
                    <tr key={user.Id}>
                        <td>{user.Id}</td>
                        <td>
                            {editingRow === user.Id ? (
                            <input type="text" defaultValue={user.Name} id='name' />
                            ) : (
                            <span>{user.Name}</span>
                            )}
                        </td>
                        <td>{
                            
                                editingRow === user.Id ? (
                                <input type="text" defaultValue={user.Email} id='email' />
                                ) : (
                                <span>{user.Email}</span>
                                )
                            }</td>

                        <td>{
                            
                            editingRow === user.Id ? (
                            <input type="text" defaultValue={user.FullName} id='fname' />
                            ) : (
                            <span>{user.FullName}</span>
                            )
                        }</td>
                                                <td>{
                            
                            editingRow === user.Id ? (
                            <input type="text" defaultValue={user.Education} id='education' />
                            ) : (
                            <span>{user.Education}</span>
                            )
                        }</td>


                        <td>
                            <button
                                className='delete_button'
                                onClick={() => {
                                     const answer = window.confirm("Are you sure you want to revoke membership?");
                                    if(answer){
                                        fetch("http://localhost:8080/library_management/revokeMembership?id="+user.Id)
                                        .then((response) => response.json())
                                        .then((data1) => {
                                            if(data1.Status === "Success")
                                            {
                                                window.location.reload();
                                                alert("MEMBERSHIP REVOKED");
                                            }
                                            else{
                                                alert("MEMBERSHIP NOT REVOKED")
                                            }    
                                        }
                                        );
                                    }
                                }
                            }
                            >
                                Revoke Membership
                            </button>
                        </td>

                        <td>
                      {editingRow === user.Id ? (
                          <>
                          
                          <button className='delete_button'
                            onClick={() => {
                                setEditingRow(null);
                                setSavebtn('none');
                            }
                        }
                            >Cancel</button>
                            <button className='delete_button'
                            onClick={() => {editRow(
                              ediuser = [id,document.getElementById('name').value,document.getElementById('email').value,document.getElementById('fname').value,document.getElementById('education').value],
                              prevuser = user                              
                              ); setEditingRow(null);}}

                            >Save</button>
                            
                    </>) : (
                            <button className='delete_button'
                                onClick={() => {
                                    setEditingRow(user.Id);
                                    setSavebtn('block');
                                    setId(user.Id);
                                }
                            }
                            >Edit</button>
                        )}  
                    </td>
                    </tr>
                ))}
            </tbody>
            </table>
            {/* CREATE A TABLE TO DISPLAY USER BOOKS */}
            
            {/* HOME BUTTON */}
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

export default UserManage