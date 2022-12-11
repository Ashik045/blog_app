/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../component/Input/Input';
import blob from '../../Image/blob.svg';
import './signup.css';

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        repassword: '',
    });
    const [profilePhoto, setProfilePhoto] = useState('');
    const [authErr, setAuthErr] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const inputs = [
        {
            id: 1,
            label: 'Username',
            name: 'username',
            placeholder: 'Enter your name',
            type: 'text',
            required: true,
            pattern: '^[A-Za-z0-9]{3,15}$',
            errMsg: 'Username should be 3-15 characters & should not include any special character!',
        },
        {
            id: 2,
            label: 'Email',
            name: 'email',
            placeholder: 'example@gmail.com',
            type: 'email',
            required: true,
            errMsg: 'Email should be a valid email address!',
        },
        {
            id: 3,
            label: 'Password',
            name: 'password',
            placeholder: 'Enter password',
            type: 'password',
            required: true,
            pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,20}$',
            errMsg: 'Password should be 6-20 characters and include at last 1 num, 1 letter, 1 special character!',
        },
        {
            id: 4,
            label: 'Confirm Password',
            name: 'repassword',
            placeholder: 'Enter your name',
            type: 'password',
            required: true,
            pattern: values.password,
            errMsg: 'Password does not matched!',
        },
    ];

    const nevigate = useNavigate();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (profilePhoto) {
                const data = new FormData();
                data.append('file', profilePhoto);
                data.append('upload_preset', 'uploads');

                const uploadRes = await axios.post(
                    'https://api.cloudinary.com/v1_1/dqctmbhde/image/upload',
                    data
                );

                const { url } = uploadRes.data;
                const newUser = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    profilepic: url,
                };

                try {
                    await axios.post(
                        'https://weblog-backend.onrender.com/api/auth/register',
                        newUser
                    );
                    nevigate('/login');

                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    setAuthErr(true);
                    setError(err);
                    setValues({
                        repassword: '',
                    });
                }
            } else {
                const newUser = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                };

                try {
                    await axios.post(
                        'https://weblog-backend.onrender.com/api/auth/register',
                        newUser
                    );
                    nevigate('/login');

                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    setAuthErr(true);
                    setError(err);
                    setValues({
                        repassword: '',
                    });
                }
            }
        } catch (err) {
            setLoading(false);
            setError(err);
            setAuthErr(true);
            console.log(error);
            setValues({
                repassword: '',
            });
        }
    };

    return (
        <div className="signUpForm">
            <div className="signUpForm_main">
                <img src={blob} alt="ss" />

                <div className="body_form">
                    <div className="fform ">
                        <h3>Signup Hare</h3>
                        <form onSubmit={handleSubmit}>
                            {inputs.map((input) => (
                                <Input
                                    key={input.id}
                                    {...input}
                                    value={values[input.name]}
                                    onChange={handleChange}
                                />
                            ))}

                            <input
                                type="file"
                                onChange={(e) => setProfilePhoto(e.target.files[0])}
                                className="mt-2 file_inp"
                                style={{ cursor: 'pointer' }}
                            />
                            <button
                                type="submit"
                                className="mb-2 submit_btn"
                                disabled={loading}
                                style={{
                                    position: 'relative',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {loading ? 'Loading..' : 'Sign Up'}
                            </button>

                            {authErr && (
                                <p style={{ margin: '5px 0', color: 'red' }} className="error">
                                    {error ? `Username already in use!` : 'Authentication failed!'}
                                </p>
                            )}

                            <Link to="/login">Already have an account? Login hare..</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
