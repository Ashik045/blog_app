/* eslint-disable no-underscore-dangle */
import React from 'react';
import loader from '../../Image/Spinner-1s-71px.png';
import Post from '../Post/Post';
import './posts.css';

const Posts = ({ posts, loading }) => {
    if (loading) {
        return <img src={loader} alt="loading.." className="loader_imgg" />;
    }

    return (
        <div className="post_sec">
            <div className="posts">
                {posts?.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
};

export default Posts;
