import React from 'react';
import InputTree from './InputTree.js';

const Group = (props) => {
    const {name, nodeClass, childNodes, childClass} = props;
    const divProps = {};
    if (nodeClass) divProps.className = nodeClass;
    return (
        <fieldset>
            <legend>
                {name}
            </legend>
            <div {...divProps}>
                {childNodes.map( (node, index) => {
                    if (!node.options.nodeClass && childClass) node.options.nodeClass = childClass;
                    return <InputTree key={index} node={node} />
                } )}
            </div>
        </fieldset>
    );
};

export default Group;