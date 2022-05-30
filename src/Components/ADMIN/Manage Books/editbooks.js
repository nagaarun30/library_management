import React,{ useState, useEffect } from 'react'

import '../../css/delete.css'

function Editbooks() {
  const [count, setCount] = useState(50);
  const [initial, setInitial] = useState(0);
  const [nextvisibe, setNextvisible] = useState('visible');
  const [prevvisible, setPrevvisible] = useState('hidden');
  const [editingRow, setEditingRow] = useState(null);
  const [savebtn, setSavebtn] = useState('none');
  const [searchedbooks, setSearchedBooks] = useState([]);
  let [edibook, setEdibook] = useState([]);
  let [prevbook, setPrevbook] = useState([]);
  let confirm = 0;
  const [id, setId] = useState('');



  const handleSearch = (event) =>{
    // setInitial(0);
    // setCount(10);
    // setNextvisible('block');
    // setPrevvisible('none');
    let value = event.target.value.toLowerCase();
    let results = [];
    results = books.filter(book => book.Title.toLowerCase().includes(value) || book.Author.toLowerCase().includes(value) || book.Subject.toLowerCase().includes(value) || book.Pdate.toLowerCase().includes(value));
    setSearchedBooks(results);
}



      async function getbooks(){
        const response = await fetch("http://localhost:8080/library_management/getbooks?page="+initial);
        const data = await response.json();
        // console.log(data);
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
        
        async function editRow(book,prevbook){
          console.log(book);
          console.log(prevbook);
          if(book[1] === prevbook.Title && book[2] === prevbook.Author && book[3] === prevbook.Subject && book[4] === prevbook.Pdate && book[5] === prevbook.quantity){
            confirm = 0;
          }
          else{
          const id = book[0];
          const title = book[1];
          const author = book[2];
          const subject = book[3];
          const pdate = book[4];
          const quantity = book[5];
          const response = await fetch("http://localhost:8080/library_management/editbooks?id="+id+"&title="+title+"&author="+author+"&subject="+subject+"&pdate="+pdate+"&quantity="+quantity);
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
            alert("Book Updated Successfully");
            
          }
          else if(confirm === -1){
            alert("Book Update Failed");
          }  
          else{
            alert("Book Already Exists");
          }     
        }

if(sessionStorage.getItem("loggedin") === "true"){
  return (
    
    
      <>
      <div className="container_Search_delete">
        <h1>EDIT BOOKS</h1>
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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {searchedbooks.map(book => (
                <tr key={book.Id}>
                  <td>  
                        <span>{book.Id}</span>
                    </td>
                  <td>
                    {editingRow === book.Id ? (
                        <input type="text" defaultValue={book.Title} id='title' />
                    ) : (
                        <span>{book.Title}</span>
                    )}
                   </td>
                  <td>
                    {editingRow === book.Id ? (
                        <input type="text" defaultValue={book.Author} id='author' />
                    ) : (
                        <span>{book.Author}</span>
                    )}
                  </td>
                  <td>
                    {editingRow === book.Id ? (
                        <input type="text" defaultValue={book.Subject} id='subject' />
                    ) : (
                        <span>{book.Subject}</span>
                    )}
                  </td>
                  <td>
                    {editingRow === book.Id ? (
                        <input type="date" defaultValue={book.Pdate} id="pdate" />
                    ) : (
                        <span>{book.Pdate}</span>
                    )}
                  </td>
                  <td>
                    {editingRow === book.Id ? (
                        <input type="number" defaultValue={book.quantity} id='quantity' />
                    ) : (
                        <span>{book.quantity}</span>
                    )}
                   </td>
                  <td>
                      {editingRow === book.Id ? (
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
                              edibook = [id,document.getElementById('title').value,document.getElementById('author').value,document.getElementById('subject').value,document.getElementById('pdate').value,document.getElementById('quantity').value],
                              prevbook = book                              
                              ); setEditingRow(null);}}

                            >Save</button>
                            
                    </>) : (
                            <button className='delete_button'
                                onClick={() => {
                                    setEditingRow(book.Id);
                                    setSavebtn('block');
                                    setId(book.Id);
                                }
                            }
                            >Edit</button>
                        )}  
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
        <h1>Please Login To Edit Books</h1>
        <button className='tablinks_Home' onClick={() => {
            window.location.href = "#/login";
        }}>Login</button>
    </div>
)
}
}
export default Editbooks