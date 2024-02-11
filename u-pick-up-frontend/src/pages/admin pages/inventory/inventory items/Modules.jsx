import React, { useState, useEffect } from 'react';
import './Modules.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


const Modules = () => {

  const [modulesData, setModulesData] = useState([]);
  useEffect(() => {
      fetchData();
  }, [])

  const fetchData = async () => {
      try {
          const result = await axios("https://u-pick-up-y7qnw.ondigitalocean.app/api/modules");
          console.log(result.data.results);
          setModulesData(result.data.results)
      } catch (err) {
          console.log("somthing Wrong");
      }
  }

  const handleDelete=async(id)=>{
      console.log(id);
      await axios.delete("https://u-pick-up-y7qnw.ondigitalocean.app/api/booksdelete"+id);
      const newModulesData=bookData.filter((item)=>{
          return(
              item.id !==id
          )
      })
      setModulesData(newModulesData);
  }

  return (
    <div className='modules-page'>
      <div className="modules-container">
        <table>
          <thead>
            <tr>
              <th> ID </th>
              <th> Subject code </th>
              <th> Subject name </th>
              <th> Year Level </th>
              <th> Course </th>
              <th> Available </th>
              <th> Quantity </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody className='modules'>
            {
              modulesData.map((modules, i) => {
                return (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{modules.subject_code} </td>
                        <td>{modules.subject_name} </td>
                        <td>{modules.year_level} </td>
                        <td>{modules.course} </td>
                        <td>{modules.available} </td>
                        <td>{modules.quantity} </td>
                        <td>
                            {/* <NavLink to={`/view/${book.id}`} className="btn btn-success mx-2">View</NavLink>
                            <NavLink to={`/edit/${book.id}`} className="btn btn-info mx-2">Edit</NavLink>
                            <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button> */}
                        </td>
                    </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Modules
