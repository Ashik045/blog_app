/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import postImg from '../../Image/no-image-available-icon-6.png';
import './post.css';

const Post = ({ post }) => (
    // const { user } = useContext(Context);
    <div className="single_post">
        <Link to={`/post/${post._id}`} className="post_title ">
            <img src={post.photo ? post.photo : postImg} alt="noimg" />
        </Link>

        <div className="post_info">
            <div className="post_cat ">
                <p className="username">
                    Author:
                    <Link to={`/users/?user=${post.username}`} style={{ color: '#16213E' }}>
                        <span> {post.username}</span>
                    </Link>
                </p>

                <p className="post_date">
                    <i>{new Date(post.createdAt).toDateString()}</i>
                </p>
            </div>

            <Link to={`/post/${post._id}`} className="post_title">
                {post.title}
            </Link>

            <p className="post_text">{post.desc}</p>
        </div>
    </div>
);
export default Post;
