/* eslint-disable no-underscore-dangle */
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Post from '../Post/Post';
import './posts.css';

const Posts = ({ posts }) => (
    <div className="post_sec">
        <div className="posts">
            {posts.map((p) => (
                <Post key={p._id} post={p} />
            ))}
        </div>
    </div>
);
export default Posts;
