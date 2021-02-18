import React, {Component} from 'react';
import {Button} from "react-bootstrap";

let dataOfAdmin = sessionStorage.getItem('Admin')
let Admin = JSON.parse(dataOfAdmin)

export class AdminPanel extends Component {
    render() {
       if (Admin){
           return(
               <div>
                   <p>Yetkilisiniz</p>
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
}

