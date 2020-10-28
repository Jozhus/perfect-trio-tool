import React from "react";
import { v4 as uuid } from "uuid";
import { Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { classes, important } from "./constants/constants";


class Inputs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleDropdownChange(e) {
        this.props.updateSettings({ class: e.target.name, needed: important[e.target.name] });
    }

    handleTextChange(e) {
        let parsed = parseInt(e.target.value.slice(0, 3));

        if (isNaN(parsed)) {
            parsed = "";
        }

        this.props.updateSettings({ maxSlots: parsed });
    }

    render() {
        return (
            <React.Fragment>
                <UncontrolledDropdown>
                    <DropdownToggle caret>
                        {this.props.class || "Select your class"}
                    </DropdownToggle>
                    <DropdownMenu>
                        {classes.map(c => <DropdownItem key={uuid()} name={c} onClick={this.handleDropdownChange}>{c}</DropdownItem>)}
                    </DropdownMenu>
                </UncontrolledDropdown>
                <Input
                    type="text"
                    placeholder={"Max number of node slots to use"}
                    value={this.props.maxSlots}
                    onChange={this.handleTextChange}
                />
            </React.Fragment>
        );
    }
}

export { Inputs };