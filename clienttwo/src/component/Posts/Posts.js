/* eslint-disable no-underscore-dangle */
import React from 'react';
import Post from '../Post/Post';
import './posts.css';

const Posts = ({ posts }) => (
    // const [page, setPage] = useState(1);

    // const fetchMore = () => {
    //     setPage(page + 9);
    // };

    <div className="post_sec">
        <div className="posts">
            {posts.map((p) => (
                <Post key={p._id} post={p} />
            ))}
        </div>
    </div>
);
export default Posts;
