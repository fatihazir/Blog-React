import React, { Component } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";

export class EditCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Category: this.props.category,
        };

    }

    RemoveCategory = async () =>
    {
        let categoryId = this.state.Category[0].Id
        let url = "http://localhost:52030/api/category/DeleteCategory/" + categoryId;
        let response = await fetch(url, { method: 'DELETE' });
        let data = await response.json();
        alert(data)
        this.props.onClose()
    }

    HandleSubmit =async (e) => {
        e.preventDefault();

        let form = e.target;

        let url = "http://localhost:52030/api/category/UpdateCategory";

        await fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Id : form.Id.value,
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
        let category = this.state.Category[0]

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
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Category Id</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name="Id"
                                            required
                                            placeholder={category.Id}
                                            defaultValue = {category.Id}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput2">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            required
                                            name="CategoryName"
                                            defaultValue = {category.CategoryName}
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
                            style={{ padding: "1rem" , marginRight : '1%'}}
                            size="sm"
                            variant="secondary"
                            onClick={this.RemoveCategory}
                        >
                            Remove Category
                        </Button>
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
