import React, {Component} from 'react'
import PropTypes from 'prop-types';
import ReactEncrypt from 'react-encrypt'
import {Button, Form, Container, Modal} from 'react-bootstrap';
import {DirectToPanelAfterLogin} from './DirectToPanelAfterLogin'



export class Renderer extends Component {

    static contextTypes = {
        encrypt: PropTypes.func.isRequired,
        decrypt: PropTypes.func.isRequired,
    }

    state = {
        pureText: "",
        RedirectPopUp: false,
    };


    HandleSubmit =async (e) => {
        var self = this
        e.preventDefault();

        let form = e.target;

        let url = "http://localhost:52030/api/admin/login";

        await fetch(url)
            .then(res => res.json())
            .then((result) =>
            {
                console.log("dbden gelen encr sifre : " + result)
                const {decrypt} = this.context;

                if(form.pureText.value === decrypt(result)){

                    sessionStorage.setItem('Admin', JSON.stringify(result))
                    self.setState({
                        RedirectPopUp: true
                    });

                }
                else{
                    alert("Username or password is not valid!")
                }
            }).catch((error) =>
                {
                    alert("failed " + error.message)
                }

            )
    };


    onChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value,
        });


    }

    render() {
        const {pureText} = this.state;

        const {encrypt} = this.context;

        let encryptedText = encrypt(pureText);


        return (
            <div className="justify-content-center">
                <Container>

                    <h1>Admin Panel</h1>

                    <Form onSubmit={this.HandleSubmit}>

                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                size="sm"
                                type="password"
                                placeholder="Password"  onChange={this.onChange} name="pureText"
                                required

                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput3">
                            <Form.Label></Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Your encrypted password will be shown here"
                                name="encryptedText"
                                required
                                readOnly
                                defaultValue={encryptedText}
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Button
                                style={{ padding: "1rem" }}
                                variant="success"
                                type="submit"

                            >
                                Login
                            </Button>
                        </Form.Group>
                    </Form>

                </Container>
                {this.state.RedirectPopUp ? (
                    <DirectToPanelAfterLogin />
                ) : null}
            </div>
        )

    }
}

export class Login extends Component {

    render() {
        const encryptKey = "ewfWE@#%$rfdsefgdsf";
        return <div>

            <ReactEncrypt
                encryptKey={encryptKey}
            >
                <Renderer/>
            </ReactEncrypt>
        </div>
    }
}


