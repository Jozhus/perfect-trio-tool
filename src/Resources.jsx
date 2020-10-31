import React from "react";
import { Card, CardHeader, CardBody, ListGroup, ListGroupItem, CardGroup } from "reactstrap";
import { v4 as uuid } from "uuid";
import classes from "./constants/classInfo.json";
import groupColors from "./constants/groupColors.json";
import "./css/resources.css";

class Resources extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ padding: "15px" }}>
                    <p>
                        I'll probably be formatting this differently later, but for now, here are all the classes and their respective important skills as I have found during my research.
                    </p>
                    <br />
                    <hr />
                    <div className="classList">
                        <Card>
                            <CardHeader>Legend</CardHeader>
                            <ListGroup>
                                <ListGroupItem
                                    style={{ background: "#208637", textAlign: "center" }}
                                >
                                    Important
                                </ListGroupItem>
                                <ListGroupItem
                                    style={{ background: "#67da82", textAlign: "center" }}
                                >
                                    Decent
                                </ListGroupItem>
                                <ListGroupItem
                                    style={{ textAlign: "center" }}
                                >
                                    Bad
                                </ListGroupItem>
                                {Object.entries(groupColors.classType).map(([classType, color]) =>
                                    <ListGroupItem
                                        key={uuid()}
                                        style={{ border: `3px solid ${color}`, textAlign: "center" }}
                                    >
                                        {classType}
                                    </ListGroupItem>
                                )}
                                {Object.entries(groupColors.jobGroup).map(([jobGroup, color]) =>
                                    <ListGroupItem
                                        key={uuid()}
                                        style={{ background: `linear-gradient(90deg, ${color} 0%, rgba(0,0,0,0) 50%, ${color} 100%)`, textAlign: "center" }}
                                    >
                                        {jobGroup}
                                    </ListGroupItem>
                                )}
                            </ListGroup>
                        </Card>
                        <br />
                        {Object.entries(classes).map(([className, skillInfo]) =>
                            <Card key={uuid()}>
                                <CardHeader
                                    style={{
                                        background: `linear-gradient(90deg, ${groupColors.jobGroup[classes[className].meta.jobGroup]} 0%, rgba(0,0,0,0) 50%, ${groupColors.jobGroup[classes[className].meta.jobGroup]} 100%)`,
                                        border: `3px solid ${groupColors.classType[classes[className].meta.classType]}`
                                    }}
                                >
                                    {className}
                                </CardHeader>
                                <ListGroup>
                                    {skillInfo.skills.map((skill, skillNum) =>
                                        <ListGroupItem
                                            key={uuid()}
                                            style={skillInfo.important.includes(skillNum) ? { background: "#208637" }
                                                : skillInfo.decent.includes(skillNum) ? { background: "#67da82" }
                                                    : null}
                                        >
                                            <img
                                                src={`./images/skills/${className}/${skill}.png`}
                                                style={{ width: "32px", height: "32px" }}
                                                alt={skill}
                                            />
                                            {"  " + skill}
                                        </ListGroupItem>
                                    )}
                                </ListGroup>
                            </Card>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export { Resources };