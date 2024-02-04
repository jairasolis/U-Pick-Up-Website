import React from 'react'
import './Modules.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'


const Modules = () => {
  return (
    <div className='modules-page'>
      <div className="modules-container">
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
          <tbody className='modules'>
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
            <tr>
              <td> GEN 013 </td>
              <td> People and Earth's Ecosystems </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr>
            <tr>
              <td> PED 033 </td>
              <td> PATHFIT 4 </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr>
            <tr>
              <td> SSP 006 </td>
              <td> Student Success Program 2 </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr>
            <tr>
              <td> GEN 009 </td>
              <td> The Entrepreneurial Mind </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr>
            <tr>
              <td> GEN 004	 </td>
              <td> Readings in Philippine History </td>
              <td> 100 </td>
              <td> 100 </td>
              <td> <FontAwesomeIcon icon={ faPenToSquare } className='action-icon'/> <FontAwesomeIcon icon={ faTrash } className='del-icon'/>  </td>
            </tr>
            <tr>
              <td> GEN 003 </td>
              <td> Science, Technology and Society </td>
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

export default Modules
