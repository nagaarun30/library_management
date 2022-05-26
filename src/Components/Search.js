import React from 'react'

function Search() {
  return (
    <div className="container_Search">
    <h3>BOOKS IN DATABASE</h3>
    <br></br>
    <form className='Search_form'>
    <input className='input_Search' type="text" id='key' name="search" placeholder="Type to Search" onChange={(event) =>handleSearch(event)} />
    </form>
    </div>
  )
}

export default Search