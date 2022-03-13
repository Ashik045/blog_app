/* eslint-disable no-underscore-dangle */
import React from 'react';
import Post from '../Post/Post';
import './posts.css';

const Posts = ({ posts }) => (
    <div className="post_sec">
        <div className="post_sec_header">
            <h6>Travel Story</h6>
            <h1>Best Tourist&apos;s Shared Story</h1>
        </div>

        <div className="posts">
            {posts.map((p) => (
                <Post key={p._id} post={p} />
            ))}
        </div>
    </div>
);

export default Posts;
