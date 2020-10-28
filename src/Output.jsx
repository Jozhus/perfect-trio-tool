import React from "react";
import { v4 as uuid } from "uuid";

class Output extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.output.map(trioGroup => {
                    return <div key={uuid()}>{JSON.stringify(trioGroup)}</div>
                })}
            </React.Fragment>
        );
    }
}

export { Output };