import React from "react";
import { v4 as uuid } from "uuid";
import classes from "./constants/constants.json";
import "./css/trio.css";

class Trio extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="node clickable">
                    <div className="nodeFrame">
                        <img
                            src={"./images/node-frame.png"}
                            alt="frame"
                        />
                        <div className="skillImage">
                            <img
                                className="divider"
                                src={"./images/trio-divider.png"}
                                alt="divider"
                            />
                            {this.props.trio.map((skillNum, i) =>
                                <img
                                    key={uuid()}
                                    className={`skill${i}`}
                                    src={`./images/skills/${this.props.class}/${classes[this.props.class].skills[skillNum]}.png`}
                                    alt={classes[this.props.class].skills[skillNum]}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export { Trio };