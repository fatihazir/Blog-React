import React, {Component} from 'react';
import {NoAuth} from '../NoAuth'
import {Button, Col, Container, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import ReactEncrypt from "react-encrypt";

let dataOfAdmin = sessionStorage.getItem('Admin')
let Admin = JSON.parse(dataOfAdmin)

export class Renderer extends Component {

    static contextTypes = {
        encrypt: PropTypes.func.isRequired,
        decrypt: PropTypes.func.isRequired,
    }

    state = {
        pureText: "",
    };


    HandleSubmit =async (e) => {
        e.preventDefault();
        let form = e.target;

      if(form.pureText.value === form.pureTextControl.value){

          e.preventDefault();

          let url = "http://localhost:52030/api/admin/ChangePassword";

          await fetch(url, {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  Password : form.encryptedText.value
              })
          })
              .then(res => res.json())
              .then((result) =>
              {
                  alert(result)
                      sessionStorage.setItem('Admin', null)
                      alert("Session End. You Have to login again.")
                      window.location.reload()

              })
              .catch((error) =>
                  {
                      alert(error.message)
                  }
              )
      }
      else{
          alert("Passwords Must Be Same!")
      }
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


       if(Admin){
           return (
               <div className="justify-content-center">
                   <Container>

                       <h1>Change Password</h1>

                       <Form onSubmit={this.HandleSubmit}>

                           <Form.Group controlId="exampleForm.ControlInput2">
                               <Form.Label>New Password</Form.Label>
                               <Form.Control
                                   size="sm"
                                   type="password"
                                   placeholder=""  onChange={this.onChange} name="pureText"
                                   required

                               />
                           </Form.Group>

                           <Form.Group controlId="exampleForm.ControlInput2">
                               <Form.Label>New Password Control</Form.Label>
                               <Form.Control
                                   size="sm"
                                   type="password"
                                   placeholder=""  name="pureTextControl"
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
                                   Change Password
                               </Button>
                           </Form.Group>
                       </Form>

                   </Container>

               </div>
           )

       }
       else{
           return(
               <div>
                   <NoAuth />
               </div>
           )
       }

    }
}

export class ChangePassword extends Component {

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



