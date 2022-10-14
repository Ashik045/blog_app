/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import './popularpost.css';

const PopularPost = ({ post }) => (
    <div className="popular_post">
        <Link to={`post/${post._id}`}>
            <img src={post.photo} alt="blog" className="popular_post_img" />
        </Link>

        <div className="post_txt">
            <Link to={`post/${post._id}`} style={{ textDecoration: 'none' }}>
                <p className="title">{post.title}</p>
            </Link>
            <p>{post.desc}</p>
        </div>
    </div>
);

export default PopularPost;
