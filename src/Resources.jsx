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
                    <br />
                    <p>
                        The following is a list of all possible skills on a boost node for every class.
                    </p>
                    <p>
                        Hopefully we can all take solace in the fact that we aren't Hayato mains who hold the record for the largest pool of potentially boostable skills with a whopping grand total of 23 skills.
                    </p>
                    <p>Information was sourced from:</p>
                    <ul>
                        <li><a href="https://www.reddit.com/r/Maplestory/comments/5nhdam/v_matrix_optimization_guide_for_all_classes/">V Matrix Optimization Guide for All Classes</a></li>
                        <li><a href="https://docs.google.com/document/d/1oyJSU3EUaJ4HPlG7IcGogHTc-0Iju2rw5XCXi2fIoK8/edit#">How to Train Your Haku</a></li>
                        <li>Maining multiple classes like a complete idiot</li>
                        <li>Word of mouth</li>
                    </ul>
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
                                        style={{ background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, ${color} 100%)`, textAlign: "center" }}
                                    >
                                        {classType}
                                    </ListGroupItem>
                                )}
                                {Object.entries(groupColors.jobGroup).map(([jobGroup, color]) =>
                                    <ListGroupItem
                                        key={uuid()}
                                        style={{ background: `linear-gradient(90deg, ${color} 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)`, textAlign: "center" }}
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
                                        background: `linear-gradient(90deg, ${groupColors.jobGroup[classes[className].meta.jobGroup]} 0%, rgba(0,0,0,0) 50%, ${groupColors.classType[classes[className].meta.classType]} 100%)`,
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