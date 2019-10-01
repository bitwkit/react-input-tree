import React from 'react';
import update from 'immutability-helper';

import Group from './Group.js';
import Checkbox from './Checkbox.js';
import Range from './Range.js';
import RadioGroup from './RadioGroup.js';
import Text from './Text.js';
import Button from './Button.js';

const TYPES = {
    'Group': Group,
    'Checkbox': Checkbox,
    'Range': Range,
    'RadioGroup': RadioGroup,
    'Text': Text,
    'Button': Button
};

const SPECIAL_PROPS = ['type', 'options'];

function makeMutatePattern(mutateArray, object) {
    if (mutateArray.length === 0) return object;
    return {[mutateArray.slice(0,1)[0]]: makeMutatePattern(mutateArray.slice(1), object)};
};

function getChildrenNames(obj) {
    return Object.getOwnPropertyNames(obj).filter(propName => !SPECIAL_PROPS.includes(propName));
};

function getChildrenArray(obj) {
    return getChildrenNames(obj).map(propName => obj[propName]);
};

function addChangeHandlers (stateBearer, treeNode = stateBearer.state, mutateArray = []) {
    if (treeNode.type && TYPES[treeNode.type] && TYPES[treeNode.type].simple && TYPES[treeNode.type].simple()) {
        treeNode.options.handleChange = treeNode.options.handleChange || function(newValue) {
            this.setState(update(this.state, makeMutatePattern(mutateArray, {value: {$set: newValue}})));
        };
        treeNode.options.handleChange = treeNode.options.handleChange.bind(stateBearer);
    }
    else {
        getChildrenNames(treeNode).forEach( childName => addChangeHandlers(stateBearer, treeNode[childName], mutateArray.concat(childName)) );
    };
};

function applyValue(object, mutateArray, value) {
    if (mutateArray.length > 1) {
        const prop = mutateArray.slice(0,1)[0];
        if (!object[prop]) object[prop] = {};
        applyValue(object[prop], mutateArray.slice(1), value);
    }
    else if (mutateArray.length === 1) {
        object[mutateArray[0]] = value;
    };
};

function copyValues(obj, treeNode, mutateArray = []) {
    if (treeNode.type && TYPES[treeNode.type] && TYPES[treeNode.type].simple && TYPES[treeNode.type].simple()) {
        applyValue(obj, mutateArray, treeNode.value);
    }
    else {
        getChildrenNames(treeNode).forEach( name => copyValues(obj, treeNode[name], [...mutateArray, name]) );
    };
};

function getPrunedCopy(rootNode) {
    const res = {};
    copyValues(res, rootNode);
    return res;
};

const InputTree = (props) => {
    const {node} = props;
    const {type, options, value} = node;
    const NodeComponent = TYPES[type];

    const nodeProps = options;
    
    if (NodeComponent.simple && NodeComponent.simple()) {
        nodeProps.value = value;
    } else {
        nodeProps.childNodes = getChildrenArray(node);
    };

    return (
        <NodeComponent {...nodeProps}/>
    );
};

export default InputTree;
export {addChangeHandlers, getPrunedCopy};