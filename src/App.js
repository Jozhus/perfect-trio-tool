import React from "react";
import { v4 as uuid } from "uuid";
import { generateNextTrio } from "./helpers/trioGenerator";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: [
        "123",
        "543",
        "612",
        "213",
        "456",
        "246",
        "245",
        "154",
        "132",
        "126",
        "416",
        "123",
        "213",
        "456",
        "546",
        "612",
        "231",
        "365"
      ],
      needed: "123456",
      maxSlots: 4,
      verbose: false,
      output: [],
    }

    this.addNext = this.addNext.bind(this);
  }

  componentDidMount() {
    this.setState({ trioGenerator: generateNextTrio(this.state.inputs, this.state.needed, this.state.maxSlots) });
  }

  addNext() {
    let next = this.state.trioGenerator.next();

    if (next.done) {
      return;
    }

    this.setState({ output: [...this.state.output, next.value.sort()] });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.output.map(solution => <div key={uuid()}>{JSON.stringify(solution)}</div>)}
        <button
          onClick={() => this.addNext()}
        >
          Add
        </button>
      </React.Fragment>
    );
  }
}
export { App };
