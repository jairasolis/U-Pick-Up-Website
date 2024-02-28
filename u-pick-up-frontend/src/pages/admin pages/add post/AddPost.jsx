import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
  import Swal from 'sweetalert2';


const AddPost = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/posts');
      const postsWithLikes = response.data.map(post => ({
        ...post,
        likes: post.likes || 0,
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

  const handleEdit = async (postId, newContent) => {
    try {
      await axios.put(`https://u-pick-up-y7qnw.ondigitalocean.app/api/posts/${postId}`, { post_content: newContent });
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, post_content: newContent } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating post:', error);
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
  
  const handleLike = async (postId) => {
    try {
      const response = await axios.get(`https://u-pick-up-y7qnw.ondigitalocean.app/api/posts/${postId}/likes`);
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, likes: response.data.totalLikes } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error fetching total likes count:', error);
    }
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
          {posts.map(post => (
            <div key={post.id} className="posts"> 
              <div className="post-content">
                <p className='mins'>
                  <img src="../images/phinma_logo.png" alt="" className="admin-profile" />
                  {getTimeDifference(post.created_at)}
                </p>
                <p>{post.post_content}</p>
                <div className="reactions">
                  <button className="edit-button" onClick={() => handleEdit(post.id, prompt("Enter new content:"))}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(post.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button className="heart-button" onClick={() => handleLike(post.id)}>
                    <FontAwesomeIcon icon={faHeart} /> {post.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddPost;
