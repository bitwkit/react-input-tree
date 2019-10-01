import React, {Component} from 'react';

class CheckboxItem extends Component {
    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
    };

    static simple() { return true };

    setValue(e) {
        this.props.handleChange(e.target.checked);
    };

    render() {
        const {name, nodeClass, value} = this.props;
        const divProps = {};
        if (nodeClass) divProps.className = nodeClass;
        return (
            <div {...divProps}>
                <label>
                    <input type="checkbox" checked={value} onChange={this.setValue} />
                    {name}
                </label>
            </div>
        );
    };
}

export default CheckboxItem;