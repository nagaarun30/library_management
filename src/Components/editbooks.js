import React,{ useState, useEffect } from 'react'

import './css/delete.css'

function Editbooks() {
  const [count, setCount] = useState(10);
  const [initial, setInitial] = useState(0);
  const [nextvisibe, setNextvisible] = useState('block');
  const [prevvisible, setPrevvisible] = useState('none');
  const [editingRow, setEditingRow] = useState(null);
  const [savebtn, setSavebtn] = useState('none');
  const [searchedbooks, setSearchedBooks] = useState([]);
  let [edibook, setEdibook] = useState([]);
  let [prevbook, setPrevbook] = useState([]);
  let confirm = 0;
  const [id, setId] = useState('');
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
        
        async function editRow(book,prevbook){
          if(book[1] === prevbook.Title && book[2] === prevbook.Author && book[3] === prevbook.Subject && book[4] === prevbook.Pdate){
            confirm = 0;
          }
          else{
          const id = book[0];
          const title = book[1];
          const author = book[2];
          const subject = book[3];
          const pdate = book[4];
          const response = await fetch("http://localhost:8080/library_management/editbooks?id="+id+"&title="+title+"&author="+author+"&subject="+subject+"&pdate="+pdate);
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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {searchedbooks.slice(initial,count).map(book => (
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
                              edibook = [id,document.getElementById('title').value,document.getElementById('author').value,document.getElementById('subject').value,document.getElementById('pdate').value],
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

export default Editbooks