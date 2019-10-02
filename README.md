# react-input-tree
A flexible dialog form builder with automatic state update.

## Purpose
This Javascript module introduces an InputTree component for React to build dialog forms from standard html inputs which automatically update the global form state.

## Description
The whole dialog form structure along with values of inputs is stored in a state object of a single root component. This object represents DOM hierarchy in a slightly simplified way, as a tree of "nodes" which can be either html inputs or groups of nodes. Change handlers for all input elements in a tree are added automatically.

## Usage
The concept and main steps are described below. **You can find a fully functional [example here](https://github.com/bitwkit/react-input-tree-example.git)**.

### Step 0: import dependencies
```javascript
import InputTree, {addChangeHandlers, getPrunedCopy} from 'react-input-tree';
```

### Step 1: describe dialog structure
Form structure is described in a state object in an hierarchical way, as a "tree" of node objects.
Nodes have three special properties: '*type*', '*options*' and '*value*'.
Currently supported types:
* '*Group*': a group of nodes. All of its non-special properties are considered as references to child nodes of the group. 'value' property, if present, is also considered as a reference to a child node.
* '*Checkbox*', '*Range*', '*RadioGroup*', '*Text*', '*Button*': an input node with a '*value*' property.

Group node reference:
```javascript
{
/* Group */ grp: {
    type: 'Group',
    options: {name: 'Group label', nodeClass: 'group-node-class'},
    // rest of the properties should contain child nodes
    prop1: { /* child node 1 */ },
    prop2: { /* child node 2 */ },
    // ...
}
}
```

Input nodes reference:
```javascript
{
/* Checkbox */chk: {type: 'Checkbox', options: {name: 'Checkbox label', nodeClass: 'checkbox-node-class'}, value: true},
/* Range */ rng: {type: 'Range', options: {name: 'Range label', nodeClass: 'range-node-class', min: 0, max: 100}, value: 0},
/* Text */ txt: {type: 'Text', options: {name: 'Text label', nodeClass: 'text-node-class'}, value: 'default text'},
/* RadioGroup */ rdo: {
    type: 'RadioGroup',
    options: {
        name: 'RadioGroup label', nodeClass: 'radio-group-class', childClass: 'radio-item-class', itemsName: 'common-radio-items-name',
        valueSet: {
            value1: 'Option 1',
            value2: 'Option 2'
        }
    },
    value: 'value1'
},
/* Button */ btn: {type: 'Button', options: {name: 'Button label', nodeClass: 'button-node-class'} }
```

Example of an object with initial state of a dialog form:
```javascript
this.state = {
    settings1: {
        // Special properties:
        type: 'Group',
        options: {name: 'Settings 1', nodeClass: 'horizontal-group'},
        // All other properties of a 'Group' object are considered its child nodes:
        group1: {
            // another nested group...
            type: 'Group',
            options: {name: 'Group 1', nodeClass: 'vertical-group', childClass: 'checkbox-item'},
            // ...this group in turn contains input nodes
            check1: {type: 'Checkbox', options: {name: 'Checkbox 1'}, value: true},
            check2: {type: 'Checkbox', options: {name: 'Checkbox 2'}, value: false},
            radio: {
                type: 'RadioGroup',
                options: {name: 'radio group', nodeClass: 'horizontal-group', childClass: 'radio-item', itemsName: 'radios',
                    valueSet: {
                        one: 'First',
                        two: 'Second',
                        three: 'Third'
                    }
                },
                value: 'one'
            }
        },
        /// ...and so on...
        group2: {
            type: 'Group',
            options: {name: 'Group 2', nodeClass: 'vertical-group', childClass: 'range-item'},

            range1: {type: 'Range', options: {name: 'Range 1', min: 0, max: 100}, value: 10},
            range2: {type: 'Range', options: {name: 'Range 2', min: 50, max: 60}, value: 55},
            range3: {type: 'Range', options: {name: 'Range 3', min: -1, max: 1}, value: 0},
            text: {type: 'Text', options: {name: 'Text box:', nodeClass: 'text-item'}, value: 'default text'}
        }
    },
    settings2: {
        type: 'Group',
        options: {name: 'Settings 2', nodeClass: 'vertical-group'},

        block1: {
            type: 'Group',
            options: {name: 'Block 1', nodeClass: 'horizontal-group-centered'},

            check: {type: 'Checkbox', options: {name: 'Query checkbox'}, value: true},
            select: {
                type: 'RadioGroup',
                options: {
                    name: 'Select', nodeClass: 'horizontal-group', childClass: 'radio-item', itemsName: 'query-select',
                    valueSet: {
                        op1: 'Option 1',
                        op2: 'Option 2'
                    }
                },
                value: 'op1'
            }
        },
        block2: {
            type: 'Group',
            options: {name: 'Block 2', nodeClass: 'horizontal-group-centered'},

            enter: {type: 'Text', options: {name: 'Enter data:', nodeClass: 'text-item'}, value: ''},
            submitBtn: {type: 'Button', options: {name: 'Run query', nodeClass: 'button-item'} }
        }
    }
};
```

### Step 2: add change handlers to the structure
```javascript
addChangeHandlers(this); // from constructor of a component which holds the state of the dialog form
```

### Step 3: render form
```javascript
// nodes taken from the example above
<InputTree node={this.state.settings1} />
<InputTree node={this.state.settings2} />
```

### Step 4: get the results
```javascript
console.log(getPrunedCopy(this.state)); // returns an object copy with structure reduced to only node key names and input values
```