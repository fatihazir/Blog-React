import React, { Component} from "react";
import { Modal, Button} from "react-bootstrap";

export const NoAuth = () => {
        return (
            <div>
                <Modal show={true}
                       size="lg"
                       aria-labelledby="contained-modal-title-vcenter"
                       centered
                >
                    <Modal.Header>
                        <h4>Session is not active. <i className="fas fa-times-circle"></i>  </h4>
                        <h4>Login to access.</h4>
                    </Modal.Header>


                    <Modal.Footer>
                        <a href="/Login">
                            <Button
                                style={{ padding: "1rem" }}
                                variant="info"
                            >
                                Go To Login Page <i className="fas fa-sign-in-alt"></i>
                            </Button>
                        </a>
                    </Modal.Footer>
                </Modal>
            </div>

        );
}
