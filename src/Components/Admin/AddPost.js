import React, { Component } from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";

let dataOfAdmin = sessionStorage.getItem('Admin')
let Admin = JSON.parse(dataOfAdmin)

export class AddPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Category: "",
            Categories : []
        };
    }

    HandleSubmit = async (e) => {
        e.preventDefault();

        let form = e.target;

        let url = "http://localhost:52030/api/post/AddPost";

        await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                CategoryId : this.state.Category[0].Id,
                Title : form.Title.value,
                Info : form.Info.value,
                Text : form.Text.value
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

    yourChangeHandler(event) {
        this.setState({
            Category : this.state.Categories.filter(x => x.CategoryName === event.target.value)
        })

    }

    async RefleshList() {
        let url = "http://localhost:52030/api/category/categories"
        let response = await fetch(url);
        let data = await response.json();
        this.setState({
            Categories: data
        });
    }

    componentDidMount() {
        if(Admin){
            this.RefleshList();
        }

    }


    render() {
        const { Categories } = this.state;
        return (
            <div>
                <Modal show={true}
                       {...this.props}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                >
                    <Modal.Header>
                        Add Post
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <Col md={12} xs={6}>
                                <Form onSubmit={this.HandleSubmit}>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="CategoryName"
                                            onChange={this.yourChangeHandler.bind(this)}
                                            required>
                                            <option >Lütfen seçiniz</option>
                                            {Categories.map((category) => (
                                                <option>{category.CategoryName}</option>
                                            ))}

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput2">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            required
                                            name="Title"
                                            defaultValue = ""
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput2">
                                        <Form.Label>Info</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            required
                                            name="Info"
                                            defaultValue = ""
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput2">
                                        <Form.Label>Text</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            as="textarea" rows={15}
                                            placeholder=""
                                            required
                                            name="Text"
                                            defaultValue = ""
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
