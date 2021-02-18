import React, { Component } from "react";
import {Modal, Button, Col, Form, Jumbotron, Container} from "react-bootstrap";

export class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Post: this.props.post,
        };

    }

    RemovePost = async () =>
    {
        let postId = this.state.Post[0].Id
        let url = "http://localhost:52030/api/post/DeletePost/" + postId;
        let response = await fetch(url, { method: 'DELETE' });
        let data = await response.json();
        alert(data)
        this.props.onClose()
    }

    HandleSubmit = async (e) => {
        e.preventDefault();

        let form = e.target;

        let url = "http://localhost:52030/api/post/UpdatePost";

        await fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Id : form.Id.value,
                DatetimeOfCreated : form.DatetimeOfCreated.value,
                CategoryId : form.CategoryId.value,
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


    render() {
        let post = this.state.Post[0]

        return (
            <div>

                <Modal show={true}
                       {...this.props}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                >
                    <Modal.Header>
                        Edit Post
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <Col md={12} xs={6}>
                                <Form onSubmit={this.HandleSubmit}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name="Id"
                                            required
                                            placeholder={post.Id}
                                            defaultValue = {post.Id}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Category Id</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name="CategoryId"
                                            required
                                            placeholder={post.CategoryId}
                                            defaultValue = {post.CategoryId}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Date-Time of created</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name="DatetimeOfCreated"
                                            required
                                            placeholder={post.DatetimeOfCreated}
                                            defaultValue = {post.DatetimeOfCreated}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            name="CategoryName"
                                            required
                                            placeholder="CategoryName"
                                            defaultValue = "CategoryName"
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput2">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            placeholder=""
                                            required
                                            name="Title"
                                            defaultValue = {post.Title}
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
                                            defaultValue = {post.Info}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlInput2">
                                        <Form.Label>Text</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            as="textarea" rows={10}
                                            placeholder=""
                                            required
                                            name="Text"
                                            defaultValue = {post.Text}
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
                            onClick={this.RemovePost}
                        >
                            Remove Post
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
