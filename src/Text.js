import React, {Component} from 'react';

class Text extends Component {
    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
    }

    static simple() { return true };

    setValue(e) {
        this.props.handleChange(e.target.value);
    };

    render() {
        const {name, nodeClass, value} = this.props;
        const divProps = {};
        if (nodeClass) divProps.className = nodeClass;
        return (
            <div {...divProps}>
                <label>
                    {name}
                    <input type="text" value={value} onChange={this.setValue} />
                </label>
            </div>
        );
    };
}

export default Text;