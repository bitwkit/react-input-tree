import React, {Component} from 'react';

class RangeItem extends Component {
    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
    };

    static simple() { return true };

    setValue(e) {
        this.props.handleChange(Number.parseInt(e.target.value, 10));
    };

    render() {
        const {name, nodeClass, min, max, value} = this.props;
        const divProps = {};
        if (nodeClass) divProps.className = nodeClass;
        return (
            <div {...divProps}>
                <label>
                    {name}
                    <input type="range" min={min} max={max} value={value} onChange={this.setValue}/>
                    {value}
                </label>
            </div>
        );
    }
};

export default RangeItem;