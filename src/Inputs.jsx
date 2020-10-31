import React from "react";
import { v4 as uuid } from "uuid";
import { Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledCollapse, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { TrioEditor } from "./TrioEditor";
import { Porter } from "./Porter";
import classes from "./constants/classInfo.json";
import groupColors from "./constants/groupColors.json";
import "./css/inputs.css";

class Inputs extends React.Component {
    constructor(props) {
        super(props);

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNeededChange = this.handleNeededChange.bind(this);
    }

    handleDropdownChange(e) {
        this.props.updateSettings({ class: e.target.name, needed: classes[e.target.name].important, inputs: [] });
    }

    handleTextChange(e) {
        let parsed = parseInt(e.target.value.slice(0, 3));

        if (isNaN(parsed)) {
            parsed = "";
        }

        this.props.updateSettings({ maxSlots: parsed });
    }

    handleNeededChange(skillNum) {
        const newNeeded = [...this.props.settings.needed];

        if (newNeeded.includes(skillNum)) {
            newNeeded.splice(newNeeded.indexOf(skillNum), 1);
        } else {
            newNeeded.push(skillNum);
        }

        this.props.updateSettings({ needed: newNeeded });
    }

    render() {
        return (
            <React.Fragment>
                <div className="label clickable" id="toggler">
                    ▼ Settings ▼
                </div>
                <UncontrolledCollapse toggler="#toggler">
                    <Row style={{ margin: "2px", paddingTop: "13px" }}>
                        <Col xs="4">
                            {this.props.settings.class ?
                                <div>
                                    <ListGroup className="container">
                                        {classes[this.props.settings.class].important.concat(
                                            classes[this.props.settings.class].decent).concat(
                                                classes[this.props.settings.class].bad).map(skillNum =>
                                                    <ListGroupItem
                                                        key={uuid()}
                                                        className="noselect clickable"
                                                        onClick={() => this.handleNeededChange(skillNum)}
                                                        style={this.props.settings.needed.includes(skillNum) ? { background: "#0055B1" } : null}
                                                    >
                                                        <img
                                                            className="skillIcon"
                                                            src={`./images/skills/${this.props.settings.class}/${classes[this.props.settings.class].skills[skillNum]}.png`}
                                                            alt={classes[this.props.settings.class].skills[skillNum]}
                                                        />
                                                        {"  " + classes[this.props.settings.class].skills[skillNum]}
                                                    </ListGroupItem>)}
                                    </ListGroup>
                                    <hr />
                                </div> : null}
                            <Row>
                                <Col>
                                    <UncontrolledDropdown>
                                        <DropdownToggle caret>
                                            {this.props.settings.class || "Select your class"}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {Object.keys(classes).map(c =>
                                                <DropdownItem
                                                    key={uuid()}
                                                    style={{
                                                        borderLeft: `5px solid ${groupColors.jobGroup[classes[c].meta.jobGroup]}`,
                                                        borderRight: `5px solid ${groupColors.classType[classes[c].meta.classType]}`
                                                    }}
                                                    name={c}
                                                    onClick={this.handleDropdownChange}>
                                                    {c}
                                                </DropdownItem>)}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <br />
                                </Col>
                                <Col>
                                    <Input
                                        type="text"
                                        placeholder={"Max # of node slots to use"}
                                        value={this.props.settings.maxSlots}
                                        onChange={this.handleTextChange}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="information">
                                        <p>First, select your class, then choose which skills you want and the max amount of node slots you're willing to use.</p>
                                        <p>Your most important skills are at the top and will be marked by default.</p>
                                        <p>You can deselect a skill by clicking it again.</p>
                                        <p>I don't advise choosing too many skills of else the tool will hang when generating pairs.</p>
                                        <p>This tool does not generate the most optimized grouping first, but it will push them to the top of the list if found, so keep on generating more if you think you can get a better grouping.</p>
                                    </div>
                                </Col>
                            </Row>
                            <Porter
                                updateSettings={this.props.updateSettings}
                                settings={this.props.settings}
                            />
                        </Col>
                        <Col xs="8">
                            {this.props.settings.class ?
                                <TrioEditor
                                    key={this.props.settings.class} // Just used to unmount / mount TrioEditor whenever class selection changes.
                                    updateSettings={this.props.updateSettings}
                                    settings={this.props.settings}
                                    selectedGroup={this.props.selectedGroup}
                                /> : null}
                        </Col>
                    </Row>
                </UncontrolledCollapse>
                <hr />
            </React.Fragment >
        );
    }
}

export { Inputs };