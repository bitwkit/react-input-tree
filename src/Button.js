import React from 'react';

const Button = (props) => {
    const {name, nodeClass, handleClick} = props;
    const divProps = {};
    if (nodeClass) divProps.className = nodeClass;
    return (
        <div {...divProps}>
            <input type="button" value={name} onClick={handleClick} />
        </div>
    );
};

export default Button;