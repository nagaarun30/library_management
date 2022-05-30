import React,{useEffect,useState} from 'react'

function Libgetbooks() {
    const [count, setCount] = useState(50);
    const [initial, setInitial] = useState(0);
    const [nextvisibe, setNextvisible] = useState('visible');
    const [prevvisible, setPrevvisible] = useState('hidden');
    const [searchedbooks, setSearchedBooks] = useState([]); 

    const handleSearch = (event) =>{
      let value = event.target.value.toLowerCase();
      let results = [];
      results = books.filter(book => book.Title.toLowerCase().includes(value) || book.Author.toLowerCase().includes(value) || book.Subject.toLowerCase().includes(value) || book.Pdate.toLowerCase().includes(value));
      setSearchedBooks(results);
  }
  
  async function getbooks(){
    const response = await fetch("http://localhost:8080/library_management/getbooks?page="+initial);
     const data = await response.json();
     return data;
  }

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

    async function reservebook(book){
        const response = await fetch("http://localhost:8080/library_management/reservebook?userid=" + sessionStorage.getItem("luid") +"&bookid=" + book.Id +"&user=Librarian");
        const data = await response.json();
        
        if(data.Status === "Success")
        {
            alert("Book Is Reserved...");
        }
        else if(data.Status === "already"){
            alert("Book is already reserved");
        }
    }

       async function addbookstocart(book){
           //console.log(book);
                const response = await fetch("http://localhost:8080/library_management/checkout?userid=" + sessionStorage.getItem("luid") +"&bookid=" + book.Id + "&date=" + date() + "&user=Librarian");

                const data = await response.json();
                    //console.log(data);
                    if(data.Status === "Success"){ 
                        let newbooks = searchedbooks.map(b => {
                            if(b.Id === book.Id){
                                b.quantity = b.quantity - 1;
                            }                            
                            return b;
                        }
                        );
                        setSearchedBooks(newbooks);

                        
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
        const [books, setBooks] = useState([]);
          useEffect(() => {
            getbooks().then(data => {
                setBooks(data);
                setSearchedBooks(data);                      
            }
            );
          }, [initial, count]);


if(sessionStorage.getItem("loggedin") === "true"){
  return (
    <div>
        <h1>Get Books</h1>
        <div className='container_Delete'>
            <div className="container_Search_delete"> 
            <form className='Search_form_delete'>
            <input className='input_Search_delete' type="text" id='key' name="search" placeholder="Type to Search" onChange={(event) =>handleSearch(event)} />
            </form>
            </div>
            <table className="styled-table">
                <thead className='thead'>
                <tr>
                    <th>Id</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Subject</th>
                    <th>Publication Date</th>
                    <th>Quantity</th>
                    <th>GetBook</th>
                </tr>
                </thead>
                <tbody>
                {searchedbooks.map(book => (
                    <tr key={book.Id}>
                    <td>{book.Id}</td>
                    <td>{book.Title}</td>
                    <td>{book.Author}</td>
                    <td>{book.Subject}</td>
                    <td>{book.Pdate}</td>
                    <td>{book.quantity}</td>
                    <td>
                        {
                            book.quantity == 0 ?
                            (
                                <button className='delete_button'
                                onClick={() => {
                                    reservebook(book);
                                }
                                }>Reserve Book</button>
                            ) : (
                                <button className='delete_button'
                                onClick={() => {
                                    addbookstocart(book);
                                }
                                }>Get Book</button>
                            )
                        }

                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="container_Pagination">
    <div className="pagination">
    <button className='prev_button' onClick={handlePrev} style={{visibility:prevvisible}}>Previous</button>
    <button className='next_button' onClick={handleNext} style={{visibility:nextvisibe}}>Next</button>
    </div>  
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
    </div>
  )
}
else{
    return (
        <div>
            <h1>Please Login To Get Books</h1>
            <button className='tablinks_Home' onClick={() => {
                window.location.href = "#/login";
            }}>Login</button>
        </div>
    )
}
}

export default Libgetbooks