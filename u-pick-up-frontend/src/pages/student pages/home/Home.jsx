import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHeart } from '@fortawesome/free-solid-svg-icons';
import { BeatLoader } from 'react-spinners';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

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
      setLoading(false); // Set loading state to false after posts are fetched
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };


  const getTimeDifference = (date) => {
    const currentTime = new Date();
    const postTime = new Date(date);
    const difference = currentTime - postTime;
    const minutes = Math.floor(difference / 60000); 
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  // const handleLike = async (postId) => {
  //   try {
  //     const postIndex = posts.findIndex(post => post.id === postId);
  //     if (postIndex !== -1 && !posts[postIndex].likedByUser) {
  //       await axios.post(`https://u-pick-up-y7qnw.ondigitalocean.app/api/posts/${postId}/like`);
        
  //       const updatedPosts = [...posts];
  //       updatedPosts[postIndex].likes_count++;
  //       updatedPosts[postIndex].likedByUser = true;
  //       setPosts(updatedPosts);
  //     }
  //   } catch (error) {
  //     console.error('Error liking post:', error);
  //   }
  // };
  // deploy

  const handleLike = async (postId) => {
    try {
        const Id = localStorage.getItem("studentId");
        const response = await axios.post(`https://u-pick-up-y7qnw.ondigitalocean.app/api/posts/${postId}/like`, { Id });
        console.log(response.data)
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes_count: post.likes_count + 1,
                    likedByUser: true
                };
            }
            return post;
        });

        setPosts(updatedPosts);
    } catch (error) {
        console.error('Error liking post:', error);
    }
};

  
  return (
    <div className='home'> 
      <div className="home-container">
        <div className="post-wrapper">
          {loading ? ( // Show spinner while loading
            <div className="spinner">
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
                    <button className={`heart-buttons ${post.likedByUser ? 'heart-pulse' : ''}`} onClick={() => handleLike(post.id)}>
                      <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                    </button>
                    <span className="heart-count">{post.likes_count}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
