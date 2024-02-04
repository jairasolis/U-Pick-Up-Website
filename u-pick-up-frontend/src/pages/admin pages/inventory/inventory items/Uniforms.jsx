import React from 'react'
import './Uniforms.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'


const Uniforms = () => {
  return (
    <div className='uniforms-page'>
      <div className="uniforms-container">
        <table>
          <thead>
            <tr>
              <th> Uniform </th>
              <th> Available </th>
              <th> Quantity </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody className='uniforms'>
            <tr>
              <td> Corporate Uniform </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr>
            <tr>
              <td> RSO Uniform </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr>
            <tr>
              <td> University Uniform </td>
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

export default Uniforms
