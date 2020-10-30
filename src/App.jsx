import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Tool } from "./Tool";
import { Resources } from "./Resources";
import { About } from "./About";
import "./css/app.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: "0"
        };
    }

    render() {
        return (
            <React.Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            onClick={() => this.setState({ activeTab: "0" })}
                        >
                            Tool
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.setState({ activeTab: "1" })}
                        >
                            Resources
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.setState({ activeTab: "2" })}
                        >
                            About
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="0">
                        <Tool />
                    </TabPane>
                    <TabPane tabId="1">
                        <Resources />
                    </TabPane>
                    <TabPane tabId="2">
                        <About />
                    </TabPane>
                </TabContent>
            </React.Fragment>
        );
    }
}

export { App };