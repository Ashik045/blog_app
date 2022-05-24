/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import loader from '../../Image/Rolling-1s-24px.png';
import './write.css';

const Write = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [photos, setPhotos] = useState(null);
    const [loading, setLoading] = useState(false);
    const [appErr, setAppErr] = useState(false);
    const { user } = useContext(Context);
    const nevigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const data = new FormData();
            data.append('file', photos);
            data.append('upload_preset', 'uploads');

            const uploadRes = await axios.post(
                'https://api.cloudinary.com/v1_1/dqctmbhde/image/upload',
                data
            );

            const { url } = uploadRes.data;

            const newPost = {
                username: user.username,
                title,
                desc,
                photo: url,
            };

            try {
                const res = await axios.post('/posts', newPost);
                // eslint-disable-next-line no-underscore-dangle
                nevigate(`/post/${res.data.message._id}`);
            } catch (error) {
                console.log(error.message);
            }
            setLoading(false);
        } catch (err) {
            // error
            setAppErr(true);
            setLoading(false);
        }
    };

    return (
        <div className="write_section container">
            {photos && (
                <div className="imgWrite">
                    <img src={URL.createObjectURL(photos)} alt="upload-img" />
                </div>
            )}

            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup ">
                    <label htmlFor="writeFile">
                        <BiImageAdd size={35} className="upIcon" />
                    </label>
                    <input
                        onChange={(e) => setPhotos(e.target.files[0])}
                        style={{ display: 'none' }}
                        type="file"
                        name=""
                        id="writeFile"
                    />

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Title"
                        className="writeInp"
                    />
                </div>

                <div className="writeFormGroup">
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        cols="50"
                        rows="5"
                        placeholder="Write your story.."
                    />
                </div>

                {appErr && (
                    <span className="appErr">
                        Something went wrong! Make sure you fill all the input field.
                    </span>
                )}
                <button type="submit" className="mb-2 submit_btn" disabled={loading}>
                    {loading ? (
                        <img
                            src={loader}
                            alt="loading.."
                            style={{
                                position: 'absolute',
                                left: '40%',
                                top: '23%',
                                height: '25px',
                                width: '25px',
                            }}
                        />
                    ) : (
                        'Publish Post'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Write;
