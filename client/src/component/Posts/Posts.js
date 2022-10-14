/* eslint-disable no-underscore-dangle */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Post from '../Post/Post';
import './posts.css';

const Posts = ({ posts, loading }) => (
    // if (loading) {
    //     return <img src={loader} alt="loading.." className="loader_imgg" />;
    // }

    <div className="post_sec">
        <div className="posts">
            {loading ? (
                <>
                    <div>
                        <Skeleton height={250} />
                        <Skeleton height={40} style={{ marginTop: '10px', marginBottom: '10px' }} />
                        <Skeleton count={4} />
                    </div>
                    <div>
                        <Skeleton height={250} />
                        <Skeleton height={40} style={{ marginTop: '10px', marginBottom: '10px' }} />
                        <Skeleton count={4} />
                    </div>
                    <div>
                        <Skeleton height={250} />
                        <Skeleton height={40} style={{ marginTop: '10px', marginBottom: '10px' }} />
                        <Skeleton count={4} />
                    </div>
                    <div>
                        <Skeleton height={250} />
                        <Skeleton height={40} style={{ marginTop: '10px', marginBottom: '10px' }} />
                        <Skeleton count={4} />
                    </div>
                </>
            ) : (
                posts.map((p) => <Post key={p._id} post={p} />)
            )}
        </div>
    </div>
);
export default Posts;
