import React,{ useState, useEffect } from 'react'

import '../../css/delete.css'

function DeleteBooks() {
  const [count, setCount] = useState(50);
  const [initial, setInitial] = useState(0);
  const [nextvisibe, setNextvisible] = useState('visible');
  const [prevvisible, setPrevvisible] = useState('hidden');
  const [searchedbooks, setSearchedBooks] = useState([]);

  const handleSearch = (event) =>{
    let value = event.target.value.toLowerCase();
    let results = [];
    results = books.filter(book => book.Title.toLowerCase().includes(value) || book.Author.toLowerCase().includes(value) || book.Subject.toLowerCase().includes(value) || book.Pdate.toLowerCase().includes(value) || book.quantity.toLowerCase().includes(value));
    setSearchedBooks(results);
}

async function getbooks(){
        const response = await fetch("http://localhost:8080/library_management/getbooks?page="+initial);
         const data = await response.json();
         return data;
      }

      const [books, setBooks] = useState([]);
        useEffect(() => {
          getbooks().then(data => {
            setBooks(data);
            setSearchedBooks(data);
          }
          );
        }, [initial, count]);



        const handleNext = () =>{
          setInitial(initial+50);
          setCount(count+50);
          if(books.length < 50){
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

if(sessionStorage.getItem("loggedin") === "true"){
  return (    
      <>
      <br></br>
      <br></br>
      <h1>MANAGE BOOKS</h1>
      <div className="container_Search_delete">
        
      <form className='Search_form_delete'>
      <input className='input_Search_delete' type="text" id='key' name="search" placeholder="Type to Search" onChange={(event) =>handleSearch(event)} />
      </form>
      </div>
    <div className='container_Delete'>

        <table className="styled-table">
            <thead className='thead'>
              <tr>
                <th>Id</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Subject</th>
                <th>Publication Date</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
              searchedbooks.map(book => (
                <tr key={book.Id}>
                  <td>{book.Id}</td>
                  <td>{book.Title}</td>
                  <td>{book.Author}</td>
                  <td>{book.Subject}</td>
                  <td>{book.Pdate}</td>
                  <td>{book.quantity}</td>
                  <td>
                      <button className='delete_button' onClick={
                            () => {
                                const answer = window.confirm("Are you sure you want to delete this book?");
                                if(answer){
                                fetch("http://localhost:8080/library_management/deleteBook?id="+book.Id)
                                .then((response) => response.json())
                                .then((data1) => {
                                    console.log(data1);
                                    if (data1.Status === "Success") {
                                        alert("Book deleted successfully");
                                        window.location.reload();                            
                                    }
                                    else {
                                      alert("Book not deleted");
                                    }                                   
                                }
                                );
                              }
                            }
                        }>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
                

    </div>
    <div className="container_Pagination">
    <div className="pagination">
    <button className='prev_button' onClick={handlePrev} style={{visibility:prevvisible}}>Previous</button>
    <button className='next_button' onClick={handleNext} style={{visibility:nextvisibe}}>Next</button>
    </div>  
    </div>
    <br></br>
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
    </>
  )
}
else{
  return (
    <div>
        <h1>Please Login To Delete Books</h1>
        <button className='tablinks_Home' onClick={() => {
            window.location.href = "#/login";
        }}>Login</button>
    </div>
)
}
}

export default DeleteBooks