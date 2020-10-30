import React from "react";
import { Button, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import "./css/porter.css"

class Porter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            import: false,
            importText: ""
        };

        this.handleImport = this.handleImport.bind(this);
    }

    handleImport() {
        this.props.updateSettings(JSON.parse(this.state.importText));

        this.setState({ modalOpen: false });
    }

    render() {
        return (
            <React.Fragment>
                <Modal isOpen={this.state.modalOpen} >
                    <ModalHeader>
                        {this.state.import ? "Import" : "Export"}
                    </ModalHeader>
                    <ModalBody>
                        {!this.state.import ?
                            <div className="information">
                                <p>Copy and save this data somewhere so you can import it in the future.</p>
                            </div>
                            : null}
                        <Input
                            type="textarea"
                            style={{ height: "300px" }}
                            value={!this.state.import ? JSON.stringify(this.props.settings, null, 3) : this.state.importText}
                            onChange={(e) => { this.setState({ importText: e.target.value }) }}
                            disabled={!this.state.import}
                        />
                        <br />
                    </ModalBody>
                    <ModalFooter>
                        {this.state.import ?
                            <Col>
                                <Button
                                    onClick={this.handleImport}
                                    style={{ width: "100%" }}
                                >
                                    {this.state.import ? "Import" : "Close"}
                                </Button>
                            </Col> : null
                        }
                        <Col>
                            <Button
                                onClick={() => this.setState({ modalOpen: false })}
                                style={{ width: "100%" }}
                            >
                                Close
                            </Button>
                        </Col>
                    </ModalFooter>
                </Modal>
                <Row>
                    <Col xs="6">
                        <Button
                            onClick={() => { this.setState({ modalOpen: true, import: true }) }}
                            style={{ width: "100%" }}
                        >
                            Import settings
                        </Button>
                    </Col>
                    <Col xs="6">
                        <Button
                            onClick={() => { this.setState({ modalOpen: true, import: false }) }}
                            style={{ width: "100%" }}
                        >
                            Export settings
                        </Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export { Porter };