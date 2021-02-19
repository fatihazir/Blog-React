import React, {Component} from 'react';
import {Button, Card, CardColumns, Container, Jumbotron} from "react-bootstrap";

export class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Categories: [],
        };
    }

    async RefleshList() {
        let url = "http://localhost:52030/api/category/categories"
        let response = await fetch(url);
        let data = await response.json();

        this.setState({
            Categories: data,
        });
    }

    componentDidMount() {
        this.RefleshList();

    }
    render() {
        const { Categories } = this.state;
        return (
            <div>
                <Container className="CategoriesButtonSection">
                    {Categories.map((category) => (
                        <a href={'http://localhost:3000/PostsByCategory/' + category.Id}> <Button className="CategoriesButtons" variant="outline-primary" size="lg" block>
                            {category.CategoryName}
                        </Button></a>
                    ))}
                </Container>
            </div>
        );
    }
}

