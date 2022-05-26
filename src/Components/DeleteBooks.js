import React,{ useState, useEffect } from 'react'

import './css/delete.css'

function DeleteBooks() {
  const [count, setCount] = useState(10);
  const [initial, setInitial] = useState(0);
  const [nextvisibe, setNextvisible] = useState('block');
  const [prevvisible, setPrevvisible] = useState('none');
  const [searchedbooks, setSearchedBooks] = useState([]);

  const handleSearch = (event) =>{
    setInitial(0);
    setCount(10);
    setNextvisible('block');
    setPrevvisible('none');
    let value = event.target.value.toLowerCase();
    let results = [];
    results = books.filter(book => book.Title.toLowerCase().includes(value) || book.Author.toLowerCase().includes(value) || book.Subject.toLowerCase().includes(value) || book.Pdate.toLowerCase().includes(value));
    setSearchedBooks(results);
}


    async function getbooks(){
        const response = await fetch("http://localhost:8080/library_management/getbooks");
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
        }, []);


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
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {searchedbooks.slice(initial,count).map(book => (
                <tr key={book.Id}>
                  <td>{book.Id}</td>
                  <td>{book.Title}</td>
                  <td>{book.Author}</td>
                  <td>{book.Subject}</td>
                  <td>{book.Pdate}</td>
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
    <div className='inner'><button style={{"display": prevvisible} } className="button_Pagination" id='Previous' onClick={
        () => {
        setInitial(initial-10);
        setCount(count-10);
        //console.log(initial);
        if(initial-10===0){
            setPrevvisible('none');
        }
        setNextvisible('block');
        }
    }>Previous</button></div>
   <div className='inner'> <button style={{"display": nextvisibe} } className="button_Pagination" id='Next' onClick={() =>{
        //console.log(count);
        if(count > searchedbooks.length-10){
            setNextvisible('none');
        }
        setPrevvisible('block');

         setInitial(initial+10);
         setCount(count+10);
         //console.log(count);

        }
    }>Next</button></div>
    </div>
    <br></br>
    <a href='#/home' className='abtn'> HOME </a>
    </>
  )
}

export default DeleteBooks