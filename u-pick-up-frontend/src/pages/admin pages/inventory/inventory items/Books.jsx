import React, { useState, useEffect } from 'react';
import './Books.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


const Books = () => {

  const [bookData, setBookData] = useState([]);
  useEffect(() => {
      fetchData();
  }, [])

  const fetchData = async () => {
      try {
          const result = await axios("https://u-pick-up-y7qnw.ondigitalocean.app/api/books");
          console.log(result.data.results);
          setBookData(result.data.results)
      } catch (err) {
          console.log("somthing Wrong");
      }
  }

  const handleDelete=async(id)=>{
      console.log(id);
      await axios.delete("https://u-pick-up-y7qnw.ondigitalocean.app/api/booksdelete"+id);
      const newBookData=bookData.filter((item)=>{
          return(
              item.id !==id
          )
      })
      setBookData(newBookData);
  }

  return (
    <div className='books-page'>
      <div className="books-container">
        <table>
          <thead>
            <tr>
              <th> ID </th>
              <th> Subject name </th>
              <th> Year Level </th>
              <th> Course </th>
              <th> Available </th>
              <th> Quantity </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody className='books'>
            {
              bookData.map((book, i) => {
                return (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{book.subject_name} </td>
                        <td>{book.year_level} </td>
                        <td>{book.course} </td>
                        <td>{book.available} </td>
                        <td>{book.quantity} </td>
                        <td>
                            {/* <NavLink to={`/view/${book.id}`} className="btn btn-success mx-2">View</NavLink>
                            <NavLink to={`/edit/${book.id}`} className="btn btn-info mx-2">Edit</NavLink>
                            <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button> */}
                        </td>
                    </tr>
                )
            })
            }
          {/* <tr>
              <td> ITE 393 </td>
              <td> Applications Development and Emerging Technologies </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr>
            <tr>
              <td> ITE 400 </td>
              <td> System Integration Architecture </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr>
            <tr>
              <td> ITE 308 </td>
              <td> Web System and Technologies </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr>
            <tr>
              <td> ITE 380 </td>
              <td> Human Computer Interaction 2 </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Books
