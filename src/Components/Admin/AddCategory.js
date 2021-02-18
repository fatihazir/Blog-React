import React, { Component } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";

export class AddCategory extends Component {

    HandleSubmit = async (e) => {
        e.preventDefault();

        let form = e.target;

        let url = "http://localhost:52030/api/category/AddCategory";

        await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                CategoryName : form.CategoryName.value
            })
        })
            .then(res => res.json())
            .then((result) =>
            {
                alert('Result: ' + result)
                this.props.onClose()
            }).catch((error) =>
                {
                    alert(error.message)
                }

            )
    };


    render() {

        return (
            <div>
                <Modal show={true}
                       {...this.props}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                >
                    <Modal.Header>
                        Edit Category
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <Col md={12} xs={6}>
                                <Form onSubmit={this.HandleSubmit}>
                                    <Form.Group controlId="exampleForm.ControlInput2">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            required
                                            name="CategoryName"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Button
                                            style={{ padding: "1rem" }}
                                            variant="success"
                                            type="submit"
                                        >
                                            Save And Close
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </div>
                    </Modal.Body>


                    <Modal.Footer>
                        <Button
                            style={{ padding: "1rem" }}
                            variant="danger"
                            onClick={this.props.onClose}
                        >
                            Close Without Saving
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
