import React, { useState, useEffect } from 'react';
import './Uniforms.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


const Uniforms = () => {

  const [uniformData, setUniformData] = useState([]);
  useEffect(() => {
      fetchData();
  }, [])

  const fetchData = async () => {
      try {
          const result = await axios("https://u-pick-up-y7qnw.ondigitalocean.app/api/uniforms");
          console.log(result.data.results);
          setUniformData(result.data.results)
      } catch (err) {
          console.log("somthing Wrong");
      }
  }

  const handleDelete=async(id)=>{
      console.log(id);
      await axios.delete("https://u-pick-up-y7qnw.ondigitalocean.app/api/uniform-delete"+id);
      const newUniformData=uniformData.filter((item)=>{
          return(
              item.id !==id
          )
      })
      setUniformData(newUniformData);
  }

  return (
    <div className='uniforms-page'>
      <div className="uniforms-container">
        <table>
          <thead>
            <tr>
              <th> ID </th>
              <th> Uniform Type </th>
              <th> Year Level </th>
              <th> Course </th>
              <th> Available </th>
              <th> Quantity </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody className='uniforms'>
            {
              uniformData.map((uniform, i) => {
                return (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{uniform.uniform_type} </td>
                        <td>{uniform.year_level} </td>
                        <td>{uniform.course} </td>
                        <td>{uniform.available} </td>
                        <td>{uniform.quantity} </td>
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

export default Uniforms
