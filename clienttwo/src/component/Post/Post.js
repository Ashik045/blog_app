/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import postImg from '../../Image/no-image-available-icon-6.png';
import './post.css';

const Post = ({ post }) => {
    const { user } = useContext(Context);
    return (
        <div className="single_post">
            {post.photo ? <img src={post.photo} alt="noimg" /> : <img src={postImg} alt="" />}

            <div className="post_info">
                <div className="post_cat ">
                    <div className="tags text-muted">
                        {post.categories?.map((c) => (
                            <span key={c}>
                                <i>{c.name}</i>
                            </span>
                        ))}
                    </div>

                    <p className="post_date text-muted">
                        <i>{new Date(post.createdAt).toDateString()}</i>
                    </p>
                </div>

                <Link to={user ? `/post/${post._id}` : '/signup'} className="post_title ">
                    {post.title}
                </Link>

                <p className="post_text">{post.desc}</p>
            </div>
        </div>
    );
};

export default Post;
