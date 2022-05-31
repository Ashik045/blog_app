import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Posts from '../../component/Posts/Posts';
import SectionHeader from '../../component/SectionHeader/SectionHeader';
import loader from '../../Image/Spinner-1s-71px.png';
import './myposts.css';

const MyPosts = () => {
    const [post, setPost] = useState([]);
    const { search } = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const data = async () => {
            setLoading(true);
            const res = await axios.get(`https://journal11.herokuapp.com/api/posts/${search}`);
            setPost(res.data.message);
            setLoading(false);
        };

        data();
    }, [search]);

    if (loading) {
        return <img src={loader} alt="loading.." className="loader_img" />;
    }

    return (
        <div className="my_posts">
            {post?.length >= 1 ? (
                <SectionHeader subHeader="Travel Story" header="Best Travel Story  Shared." />
            ) : (
                <SectionHeader subHeader="Opps!!" header="You don't have shared any storys yet!" />
            )}

            <Posts posts={post} />
            {/* <SectionHeader subHeader="Opps!!" header="You Haven't created any posts yet!" /> */}
        </div>
    );
};

export default MyPosts;
