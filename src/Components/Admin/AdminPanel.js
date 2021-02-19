import React, {Component} from 'react';
import {Button, Container, Navbar} from "react-bootstrap";
import {getFirstHiddenTime} from "web-vitals/dist/modules/lib/polyfills/getFirstHiddenTimePolyfill";

let dataOfAdmin = sessionStorage.getItem('Admin')
let Admin = JSON.parse(dataOfAdmin)

export const AdminPanel = () => {
       if (Admin){
           return(
               <div>
                    <br/><br/><br/>
                   <Container className="AdminPanelButtonSection">
                       <a href="ManagePosts"> <Button className="AdminPanelButtons" variant="outline-primary" size="lg" block>
                           Manage Posts
                       </Button></a>
                       <a href="/ManageCategories" ><Button className="AdminPanelButtons" variant="outline-info" size="lg" block>
                           Manage Categories
                       </Button></a>
                       <a href="" > <Button className="AdminPanelButtons" variant="outline-secondary" size="lg" block>
                           Change Password
                       </Button></a>
                   </Container>

               </div>
           )
       }
       else{
           return(
               <div>
                   <h1>Yetkiniz yok</h1>
               </div>
           )
       }
}

