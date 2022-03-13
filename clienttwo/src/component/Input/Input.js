/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './input.css';

const Input = (inpDetails) => {
    const [focus, setFocus] = useState(false);
    const { label, errMsg, onChange, ...inputs } = inpDetails;

    // eslint-disable-next-line no-unused-vars
    const handleBlur = (e) => {
        setFocus(true);
    };
    return (
        <div className="inp_div">
            <label className="signLeb">{inpDetails.label}</label>
            <input
                className="signInp"
                {...inputs}
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={() => inputs.name === 'repassword' && setFocus(true)}
                focused={focus.toString()}
            />
            <span className="error">{errMsg}</span>
        </div>
    );
};

export default Input;
