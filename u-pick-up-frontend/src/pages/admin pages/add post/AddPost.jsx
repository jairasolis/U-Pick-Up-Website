import React from 'react'
import './AddPost.css'

const AddPost = () => {
  return (
    <div className='add-post'>
      <div className="add-post-container">
        <div className="addP-header">
            <textarea className='post-form' placeholder='write something.. ' required></textarea>
        </div>
        <div className="post-wrapper">
          <div className="posts"> 
            <div className="post-content">
              <h4> CITE </h4>
              <p className='mins'> 30 minutes ago </p>
              <p> Announcement! You can now claim your modules at.. </p>
            </div>
          </div>
          <div className="posts"> 
            <div className="post-content">
              <h4> CITE </h4>
              <p className='mins'> 30 minutes ago </p>
              <p> Announcement! You can now claim your cite uniforms at.. </p>
            </div>
          </div>
          <div className="posts"> 
            <div className="post-content">
              <h4> CITE </h4>
              <p className='mins'> 30 minutes ago </p>
              <p> Announcement! You can now claim your pins at.. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost
