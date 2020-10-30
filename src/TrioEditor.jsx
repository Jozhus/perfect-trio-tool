import React from "react";
import { v4 as uuid } from "uuid";
import { Button, ListGroup, ListGroupItem, Col, Row } from "reactstrap";
import { Trio } from "./Trio";
import classes from "./constants/constants.json";
import "./css/trio-editor.css";

class TrioEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focussedNode: -1,
            selectedSkills: [-1, -1, -1]
        };

        this.handleSkillSelected = this.handleSkillSelected.bind(this);
        this.handleNodeSelected = this.handleNodeSelected.bind(this);
        this.handleAddNode = this.handleAddNode.bind(this);
        this.handleUpdateNode = this.handleUpdateNode.bind(this);
        this.handleDeleteNode = this.handleDeleteNode.bind(this);
    }

    handleNodeSelected(e, nodeNum) {
        if (e.shiftKey) {
            this.handleDeleteNode(nodeNum);
        } else if (this.state.focussedNode === nodeNum) {
            this.setState({ focussedNode: -1, selectedSkills: [-1, -1, -1] });
        } else {
            this.setState({ focussedNode: nodeNum, selectedSkills: this.props.settings.inputs[nodeNum] });
        }
    }

    handleSkillSelected(skillNum) {
        const newSelectedSkills = [...this.state.selectedSkills];

        if (newSelectedSkills.includes(skillNum)) {
            newSelectedSkills[newSelectedSkills.indexOf(skillNum)] = -1;
        } else {
            newSelectedSkills.some((n, i) => {
                if (!~n) {
                    newSelectedSkills[i] = skillNum;
                }

                return (!~n);
            });
        }

        this.setState({ selectedSkills: newSelectedSkills })
    }

    handleAddNode() {
        this.props.updateSettings({ inputs: [...this.props.settings.inputs, this.state.selectedSkills] });

        this.setState({ selectedSkills: [-1, -1, -1] });
    }

    handleUpdateNode() {
        const newInputs = [...this.props.settings.inputs];

        newInputs[this.state.focussedNode] = this.state.selectedSkills;

        this.props.updateSettings({ inputs: newInputs });
    }

    handleDeleteNode(nodeNum) {
        const newInputs = [...this.props.settings.inputs];

        newInputs.splice(nodeNum || this.state.focussedNode, 1);

        this.props.updateSettings({ inputs: newInputs });

        this.setState({ focussedNode: -1, selectedSkills: [-1, -1, -1] });
    }

    render() {
        return (
            <React.Fragment>
                <Row style={{}}>
                    <Col xs="6" className="verticalDivider">
                        <ListGroup className="container">
                            {this.props.settings.class ?
                                classes[this.props.settings.class].important.concat(
                                    classes[this.props.settings.class].decent).concat(
                                        classes[this.props.settings.class].bad).map(skillNum =>
                                            <ListGroupItem
                                                key={uuid()}
                                                className="noselect clickable"
                                                onClick={() => this.handleSkillSelected(skillNum)}
                                                style={this.state.selectedSkills.indexOf(skillNum) === 0 ? { background: "#208637" }
                                                    : this.state.selectedSkills.indexOf(skillNum) > 0 ? { background: "#67da82" }
                                                        : null}
                                                disabled={!this.state.selectedSkills.includes(skillNum) && this.state.selectedSkills.every(skill => ~skill)}
                                            >
                                                <img
                                                    className="skillIcon"
                                                    src={`./images/skills/${this.props.settings.class}/${classes[this.props.settings.class].skills[skillNum]}.png`}
                                                    alt={classes[this.props.settings.class].skills[skillNum]}
                                                />
                                                {"  " + classes[this.props.settings.class].skills[skillNum]}
                                            </ListGroupItem>
                                        )
                                : null}
                        </ListGroup>
                        <hr />
                        <Row>
                            <Col>
                                <Button
                                    color={!~this.state.focussedNode ? "success" : "primary"}
                                    onClick={!~this.state.focussedNode ? this.handleAddNode : this.handleUpdateNode}
                                    disabled={!this.state.selectedSkills.every(skill => ~skill)}
                                    style={{ width: "100%" }}
                                >
                                    {!~this.state.focussedNode ? "Add node" : "Update node"}
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    color="danger"
                                    onClick={this.handleDeleteNode}
                                    disabled={!~this.state.focussedNode}
                                    style={{ width: "100%" }}
                                >
                                    Delete node
                            </Button>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <div className="information">
                                    <p>Select 3 skills and click "Add node" to add it to the node list.</p>
                                    <p>The first skill you select will be the left-most skill on the node and will be marked dark green.</p>
                                    <p>You can deselect a node / skill by clicking it again.</p>
                                    <p>You can update / delete nodes by selecting the node in the node list.</p>
                                    <p>You can Shift + Click a node to quickly delete it from the node list.</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="6" className="verticalDivider">
                        <div className="container nodes">
                            {this.props.settings.class ? this.props.settings.inputs.map((trio, i) =>
                                <div
                                    key={uuid()}
                                    className="nodeWrapper"
                                    onClick={(e) => this.handleNodeSelected(e, i)}
                                    // Check for trios that are in the selected group in Output and highlight them. Don't highlight duplicates. Change color if that node is also selected in the editor.
                                    style={this.props.selectedGroup.some(outputTrio => outputTrio.join() === trio.join()) && this.props.settings.inputs.findIndex(anotherTrio => anotherTrio.join() === trio.join()) === i
                                        ? { background: `radial-gradient(circle, rgba(0,232,255,1) 45%, ${this.state.focussedNode === i ? "rgba(255,0,255,1)" : "rgba(0,232,255,1)"} 50%, rgba(0,232,255,0) 70%)` }
                                        : this.state.focussedNode === i
                                            ? { background: "radial-gradient(circle, rgba(154,0,255,1) 45%, rgba(154,0,255,1) 50%, rgba(209,0,255,0) 70%)" }
                                            : null}

                                >
                                    <Trio
                                        class={this.props.settings.class}
                                        trio={trio}
                                    />
                                </div>
                            ) : null}
                        </div>
                        <hr />
                        <Row>
                            <Col>
                                <div className="information">
                                    <p>Once a trio group is generated, clicking one will highlight those nodes in the node list.</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment >
        );
    }
}

export { TrioEditor };