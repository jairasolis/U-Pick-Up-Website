import React, { useState } from 'react';
import './AddPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const AddPost = () => {
  const [inputValue, setInputValue] = useState('');
  const [posts, setPosts] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePostSubmit = () => {
    if (inputValue.trim() !== '') {
      const newPost = {
        id: Date.now(),
        content: inputValue,
        likes: 0, // Initial likes count
        likedByUser: false // Whether the current user has liked the post
      };
      setPosts([...posts, newPost]);
      setInputValue('');
    }
  };

  const handleLike = (postId) => {
    // Check if the current user has already liked the post
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1 && !posts[postIndex].likedByUser) {
      // Update the likes count and set likedByUser to true
      const updatedPosts = [...posts];
      updatedPosts[postIndex].likes++;
      updatedPosts[postIndex].likedByUser = true;
      setPosts(updatedPosts);
      // Send a request to the backend to save the like
    }
  };
  const handleEdit = (postId, newContent) => {
    // Check if the new content is not empty
    if (newContent.trim() !== '') {
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, content: newContent } : post
      );
      setPosts(updatedPosts);
    } else {
      // Alert the user if the input is empty
      alert('Please enter something to edit the post.');
    }
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
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
                  <img src="adminprofile.png" alt="" className="admin-profile" />
                  {new Date().toLocaleString()}
                </p>
                <p>{post.content}</p>
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
