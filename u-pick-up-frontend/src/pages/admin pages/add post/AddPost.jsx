import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
import { Spinner } from 'react-bootstrap';


const AddPost = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);
  const [editContent, setEditContent] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/posts');
      console.log(response.data)
      const postsWithLikes = response.data.map(post => ({
        ...post,
        likes_count: post.likes_count || 0,
      }));
      setPosts(postsWithLikes.reverse());
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  
  const getTimeDifference = (date) => {
    const currentTime = new Date();
    const postTime = new Date(date);
    const difference = currentTime - postTime;
    const minutes = Math.floor(difference / 60000); 
    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else {
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePostSubmit = async () => {
    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('https://u-pick-up-y7qnw.ondigitalocean.app/api/posts', { post_content: inputValue });
        setPosts([response.data, ...posts]); 
        setInputValue('');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const handleEditClick = (postId, content) => {
    setEditPostId(postId);
    setEditContent(content);
    setShowEditModal(true);
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
    setEditContent('');
    setEditPostId(null);
  };

  const handleEditSave = async () => {
    if (window.confirm('Are you sure you want to save changes?')) {
      try {
        await axios.put(`https://u-pick-up-y7qnw.ondigitalocean.app/api/posts/${editPostId}`, { post_content: editContent });
        const updatedPosts = posts.map(post =>
          post.id === editPostId ? { ...post, post_content: editContent } : post
        );
        setPosts(updatedPosts);
        setShowEditModal(false);
        setEditContent('');
        setEditPostId(null);
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };

  const handleDelete = async (postId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://u-pick-up-y7qnw.ondigitalocean.app/api/posts/${postId}`);
          const updatedPosts = posts.filter(post => post.id !== postId);
          setPosts(updatedPosts);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your post has been deleted.',
            icon: 'success'
          });
        } catch (error) {
          console.error('Error deleting post:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong while deleting the post.',
            icon: 'error'
          });
        }
      }
    });
  };
  

  return (
    <div className='add-post'>
      <div className="add-post-container">
        <div className="addP-header">
          <textarea
            className='post-form'
            placeholder='Write something..'
            value={inputValue}
            onChange={handleInputChange}
            required
          ></textarea>
          <button className="add-button" onClick={handlePostSubmit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
        <div className="post-wrapper">
          {posts.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
              {/* <Spinner animation="border" role="status"  variant="success">
                <span className="sr-only">Loading...</span>
              </Spinner> */}
              <BeatLoader color="#3B5534" size={15} />
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="posts"> 
                <div className="post-content">
                  <p className='mins'>
                    <img src="../images/phinma_logo.png" alt="" className="admin-profile" />
                    {getTimeDifference(post.created_at)}
                  </p>
                  <p>{post.post_content}</p>
                  <div className="reactions">
                  <button className="edit-button" onClick={() => handleEditClick(post.id, post.post_content)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(post.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button className="heart-button">
                      <FontAwesomeIcon icon={faHeart} /> {post.likes_count}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showEditModal && (
        <div className="edit-modal">
          <textarea
            className='post-form'
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            required
          ></textarea>
          <div className="edit-modal-buttons">
            <button className="edit-modal-cancel" onClick={handleEditCancel}>Cancel</button>
            <button className="edit-modal-save" onClick={handleEditSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
