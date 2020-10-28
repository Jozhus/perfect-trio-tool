import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Button } from "reactstrap";
import { generateNextTrioGroup } from "./helpers/trioGroupGenerator";
import { Inputs } from "./Inputs";
import { Output } from "./Output";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {
        class: "",
        inputs: [
          [1, 2, 3],
          [5, 6, 7],
          [4, 8, 9],
          [10, 9, 8],
          [10, 11, 12],
          [0, 1, 2],
          [5, 7, 6],
          [6, 7, 8],
          [7, 8, 9],
          [8, 9, 10],
          [9, 10, 11],
          [12, 11, 10],
          [11, 10, 9],
          [10, 9, 8],
          [9, 8, 7],
          [8, 7, 6],
          [7, 6, 5],
          [5, 6, 7],
          [8, 9, 12],
          [6, 7, 5],
          [12, 9, 8]
        ],
        needed: [],
        maxSlots: "",
        done: false
      },
      output: []
    }

    this.addNext = this.addNext.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }

  updateSettings(newSettings) {
    console.log(newSettings)
    const settings = { ...this.state.settings, ...newSettings };

    this.setState({ settings, trioGenerator: generateNextTrioGroup(settings.inputs, settings.needed, settings.maxSlots), output: [], done: false });
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
          class={this.state.settings.class}
          maxSlots={this.state.settings.maxSlots}
        />
        <Button
          onClick={() => this.addNext(5)}
          disabled={this.state.done || !this.state.settings.inputs.length || !this.state.settings.class || !this.state.settings.maxSlots || !this.state.settings.needed}
        >
          {this.state.done ? "That's all of them" : "Generate 5 more"}
        </Button>
        <Output
          output={this.state.output}
        />
      </React.Fragment>
    );
  }
}
export { App };
