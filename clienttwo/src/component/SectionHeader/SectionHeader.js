import React from 'react';
import './sectionheader.css';

const SectionHeader = ({ header, subHeader }) => (
    <div className="post_sec_header">
        <h5>{subHeader}</h5>
        <h1>{header}</h1>
    </div>
);

export default SectionHeader;
