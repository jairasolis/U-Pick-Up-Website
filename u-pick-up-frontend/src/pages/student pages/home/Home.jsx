import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHeart } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
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

  const handleLike = async (postId) => {
    try {
      const postIndex = posts.findIndex(post => post.id === postId);
      if (postIndex !== -1 && !posts[postIndex].likedByUser) {
        await axios.post(`https://u-pick-up-y7qnw.ondigitalocean.app/api/posts/${postId}/like`);
        
        const updatedPosts = [...posts];
        updatedPosts[postIndex].likes++;
        updatedPosts[postIndex].likedByUser = true;
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  
  return (
    <div className='home'> 
      <div className="home-container">
        <div className="filter">
          <FontAwesomeIcon icon={faFilter} style={{color:'#D9D9D9', margin: '5px 2px '}}/>
          <h4> Filter </h4>
        </div>
        <div className="post-wrapper">
          {posts.map(post => (
            <div key={post.id} className="posts"> 
              <div className="post-content">
                <p className='mins'>
                  <img src="adminprofile.png" alt="" className="admin-profile" />
                  {getTimeDifference(post.created_at)}
                </p>
                <p>{post.post_content}</p>
                <div className="reactions">
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
}

export default Home;
