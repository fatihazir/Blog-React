import React, {Component} from 'react';
import {Button, Container, Card, Jumbotron} from "react-bootstrap";
import {EditCategory} from "./EditCategory"
import {AddCategory} from "./AddCategory"

let dataOfAdmin = sessionStorage.getItem('Admin')
let Admin = JSON.parse(dataOfAdmin)

export class ManageCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Categories: [],
            AddCategoryPopUpShow: false,
            EditCategoryPopUpShow: false,
            CategorydDueToEdit : 1,
        };
    }

    async RefleshList() {
        let url = "http://localhost:52030/api/category/categories"
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        this.setState({
            Categories: data,
        });
    }

    componentDidMount() {
        if(Admin){
            this.RefleshList();
        }
    }

    componentDidUpdate() {
        if(Admin){
            this.RefleshList();
        }
    }

    ShowPopUpEditCategory = (categoryId) => {
        this.setState({
            EditCategoryPopUpShow: true,
            CategorydDueToEdit : categoryId
        });
    };

    HidePopUpEditCategory = () => {
        this.setState({
            EditCategoryPopUpShow: false,
        });
    };

    ShowPopUpAddCategory = () => {
        this.setState({
            AddCategoryPopUpShow: true,
        });
    };

    HidePopUpAddCategory = () => {
        this.setState({
            AddCategoryPopUpShow: false,
        });
    };


    render() {
        const { Categories } = this.state;
        if (Admin){
            return(
                <div>

                    <Jumbotron fluid>
                        <Container>
                            <p>
                                <Button onClick = {this.ShowPopUpAddCategory} className="ManageCategoriesButton" variant="success" size="lg" block>
                                    Add Category
                                </Button>
                            </p>
                        </Container>
                    </Jumbotron>

                    {this.state.EditCategoryPopUpShow ? (
                        <EditCategory  onClose={this.HidePopUpEditCategory} category = {this.state.Categories.filter(item => item.Id === this.state.CategorydDueToEdit)} />
                    ) : null}

                    {this.state.AddCategoryPopUpShow ? (
                        <AddCategory  onClose={this.HidePopUpAddCategory}  />
                    ) : null}

                    <Container className="ManageCategoriesCardSection">
                        {Categories.map((category) => (
                            <span>
                            <Card className="ManageCategoriesCard">
                            <Card.Header as="h3" style={{textAlign:"center"}}>{category.CategoryName}</Card.Header>
                            <Card.Body>
                               <Button onClick={() => this.ShowPopUpEditCategory(category.Id)}
                                       className="ManageCategorieslButtons" variant="outline-primary"
                                       size="sm" block>
                                    Edit
                               </Button>
                            </Card.Body>
                        </Card>
                        </span>
                        ))}
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
}

