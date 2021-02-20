import React from 'react';
import {NoAuth} from '../NoAuth'
import {Button, Container} from "react-bootstrap";

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
                       <a href="/ChangePassword" > <Button className="AdminPanelButtons" variant="outline-secondary" size="lg" block>
                           Change Password
                       </Button></a>
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

