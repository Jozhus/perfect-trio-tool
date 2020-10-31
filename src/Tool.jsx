import React from "react";
import { Button, Row, Col } from "reactstrap";
import { v4 as uuid } from "uuid";
import { generateNextTrioGroup } from "./helpers/trioGroupGenerator";
import { Inputs } from "./Inputs";
import { Output } from "./Output";

class Tool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {
        class: "",
        inputs: [],
        needed: [],
        maxSlots: ""
      },
      done: false,
      output: [],
      selectedGroup: [],
      outputKey: uuid()
    }

    this.updateSettings = this.updateSettings.bind(this);
    this.updateSelectedGroup = this.updateSelectedGroup.bind(this);
    this.addNext = this.addNext.bind(this);
  }

  updateSettings(newSettings) {
    const settings = { ...this.state.settings, ...newSettings };

    this.setState({
      settings,
      trioGenerator: generateNextTrioGroup(settings.inputs, settings.needed, settings.maxSlots),
      done: false,
      output: [],
      selectedGroup: [],
      outputKey: uuid()
    });
  }

  updateSelectedGroup(selectedGroup) {
    this.setState({ selectedGroup });
  }

  addNext(amount) {
    const newOutput = [...this.state.output];

    while (amount) {
      let next = this.state.trioGenerator.next();

      if (next.done) {
        this.setState({ done: next.done });
        break;
      }

      newOutput.push(next.value);
      amount--;
    }

    newOutput.sort((a, b) => a.length - b.length);

    this.setState({ output: newOutput });
  }

  render() {
    return (
      <React.Fragment>
        <Inputs
          updateSettings={this.updateSettings}
          settings={this.state.settings}
          selectedGroup={this.state.selectedGroup}
        />
        <Row style={{ margin: "2px" }}>
          <Col>
            <Button
              color="primary"
              onClick={() => this.addNext(1)}
              style={{ width: "100%" }}
              disabled={this.state.done || !this.state.settings.inputs.length || !this.state.settings.class || !this.state.settings.maxSlots || !this.state.settings.needed}
            >
              {this.state.done ? "That's all of them" : "Generate 1 more"}
            </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              onClick={() => this.addNext(5)}
              style={{ width: "100%" }}
              disabled={this.state.done || !this.state.settings.inputs.length || !this.state.settings.class || !this.state.settings.maxSlots || !this.state.settings.needed}
            >
              {this.state.done ? "That's all of them" : "Generate 5 more"}
            </Button>
          </Col>
          <Col>
            <Button
              color="primary"
              onClick={() => this.addNext(20)}
              style={{ width: "100%" }}
              disabled={this.state.done || !this.state.settings.inputs.length || !this.state.settings.class || !this.state.settings.maxSlots || !this.state.settings.needed}
            >
              {this.state.done ? "That's all of them" : "Generate 20 more"}
            </Button>
          </Col>
        </Row>
        <br />
        <Row style={{ margin: "2px" }}>
          <Col>
            <Output
              key={this.state.outputKey}
              updateSelectedGroup={this.updateSelectedGroup}
              class={this.state.settings.class}
              output={this.state.output}
            />
          </Col>
        </Row>
      </React.Fragment >
    );
  }
}
export { Tool };
