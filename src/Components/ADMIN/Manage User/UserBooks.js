import React,{useState, useEffect} from 'react'

function UserBooks(props) {

    var fine = 0;

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

    async function getcartbooks(){
        const response = await fetch("http://localhost:8080/library_management/getcartbooks?uid="+props.userId+"&user=Member");
            const data = await response.json();
            if(data.Status === "null"){
                return null;
            }
            else{
            return data;
            }
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

  return (
    <div>
        <h1>User Books</h1>
        <h1>User Name: {props.userName}</h1>
        <table className="styled-table">
                <thead className='thead'>
                <tr>
                    <th>Book Id</th>
                    <th>Book Title</th>
                    {/* <th>Author</th>
                    <th>Subject</th>
                    <th>Publication Date</th> */}
                    <th>Issue Date</th>
                    <th>Return Date</th>
                    <th>Fine</th>
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
                        {/* TODO DISPLAY FINE IF DATE MORE THAN 10 DAYS */}
                        {
                            
                            (
                            fine = 0,
                            (new Date(book.issue_date).getTime() + (1000 * 60 * 60 * 24 * 11)) < new Date().getTime()
                            ?
                            fine = 10 * ((new Date().getTime() - (new Date(book.issue_date).getTime() + (1000 * 60 * 60 * 24 * 11))) / (1000 * 60 * 60 * 24)).toPrecision(2) + " Rs"
                            :
                            fine = fine
                            )
                        }

                    </td>
                    </tr>
                ))
                
                }
                </tbody>
            </table>

    </div>
  )
}

export default UserBooks