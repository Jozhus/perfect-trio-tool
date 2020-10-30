import React from "react";
import { v4 as uuid } from "uuid";
import { Trio } from "./Trio";
import "./css/output.css";

class Output extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focussedGroup: -1
        };

        this.handleGroupSelection = this.handleGroupSelection.bind(this);
    }

    handleGroupSelection(trioGroup, trioGroupNum) {
        if (this.state.focussedGroup === trioGroupNum) {
            this.setState({ focussedGroup: -1 });
            this.props.updateSelectedGroup([]);
        } else {
            this.setState({ focussedGroup: trioGroupNum });
            this.props.updateSelectedGroup(trioGroup);

            // Smooth scroll to the top.
            let startX = window.scrollX || window.pageXOffset,
                startY = window.scrollY || window.pageYOffset,
                distanceX = 0 - startX,
                distanceY = 0 - startY,
                startTime = new Date().getTime();

            // Easing function
            let easeInOutQuart = function (time, from, distance, duration) {
                if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
                return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
            };

            let timer = window.setInterval(function () {
                let time = new Date().getTime() - startTime,
                    newX = easeInOutQuart(time, startX, distanceX, 500),
                    newY = easeInOutQuart(time, startY, distanceY, 500);
                if (time >= 500) {
                    window.clearInterval(timer);
                }
                window.scrollTo(newX, newY);
            }, 1000 / 60); // 60 fps
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="outputContainer">
                    {this.props.output.map((trioGroup, i) =>
                        <div
                            key={uuid()}
                            className="clickable"
                            onClick={() => this.handleGroupSelection(trioGroup, i)}
                            style={this.state.focussedGroup === i
                                ? { background: "radial-gradient(circle, rgba(0,232,255,1) 0%, rgba(0,232,255,0.5) 25%, rgba(209,0,255,0) 100%)" }
                                : null}
                        >
                            {trioGroup.map(trio => {
                                return (
                                    <Trio
                                        key={uuid()}
                                        class={this.props.class}
                                        trio={trio}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export { Output };