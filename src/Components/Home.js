import React, {Component} from 'react';
import {Button, Container, Card, Jumbotron} from "react-bootstrap";

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Posts: [],
            PostDueToView : 1,
        };
    }

    async RefleshList() {
        let url = "http://localhost:52030/api/post/posts"
        let response = await fetch(url);
        let data = await response.json();
        this.setState({
            Posts: data,
        });
    }

    componentDidMount() {
        this.RefleshList();
    }

    // componentDidUpdate() {
    //  this.RefleshList();
    // }


    render() {
        const { Posts } = this.state;
        return (
            <div>
                <Container className=" ManagePostsCardSection">
                    {Posts.sort((a, b) =>
                        a.DatetimeOfCreated < b.DatetimeOfCreated ? 1 : -1
                    ).map((post) => (
                        <span>
                            <Card key={post.Id} className="ManagePostsCard text-center">
                            <Card.Header>
                                <h2>{post.Title}</h2>
                                <h6>{post.CategoryName}</h6>
                            </Card.Header>

                    <Card.Body>
                        <Card.Title>{post.Info}</Card.Title>
                        <Card.Text>
                            {post.Text.substring(0,120) + "..."}
                        </Card.Text>
                       <a href={'http://localhost:3000/ReadPost/' + post.Id}> <Button variant="outline-success">Read</Button></a>
                    </Card.Body>
                    <Card.Footer className="text-muted">{post.DatetimeOfCreated.split("T")[0]}</Card.Footer>
                        </Card>
                        </span>
                    ))}
                </Container >
            </div>
        );
    }
}


