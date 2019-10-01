import React, {Component} from 'react';

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
    };

    static simple() { return true };

    setValue(e) {
        this.props.handleChange(e.target.value);
    };

    render() {
        const {name, nodeClass, childClass, valueSet, itemsName, value} = this.props;

        const divProps = {};
        if (nodeClass) divProps.className = nodeClass;
        const childProps = {};
        if (childClass) childProps.className = childClass;

        return (
            <fieldset>
                <legend>
                    {name}
                </legend>
                <div {...divProps}>
                    {Object.getOwnPropertyNames(valueSet).map( (radioName, index) => {
                        const checked = {};
                        if (radioName === value) checked.checked = true;
                        return (
                            <div key={index} {...childProps}>
                                <label>
                                    <input type="radio" name={itemsName} value={radioName} {...checked} onChange={this.setValue} />
                                    {valueSet[radioName]}
                                </label>
                            </div>
                        );
                    } )}
                </div>
            </fieldset>
        );
    };

}

export default RadioGroup;