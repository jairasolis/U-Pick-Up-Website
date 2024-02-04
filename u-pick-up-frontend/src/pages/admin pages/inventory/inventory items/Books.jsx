import React from 'react'
import './Books.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

const Books = () => {
  return (
    <div className='books-page'>
      <div className="books-container">
        <table>
          <thead>
            <tr>
              <th> Subject code </th>
              <th> Subject name </th>
              <th> Available </th>
              <th> Quantity </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody className='books'>
          <tr>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Books
