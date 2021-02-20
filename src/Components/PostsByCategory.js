import React, { Component} from "react";
import {Container, Jumbotron, Card, CardColumns, Button} from "react-bootstrap";

export class PostsByCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Posts: {}

        };
    }


    componentDidMount = async () => {
        let url = "http://localhost:52030/api/post/PostByCategory/" + this.props.match.params.id;
        let response = await fetch(url);
        let data = await response.json();
        this.setState({
            Posts : data
        })
    }


    render() {
        const { Posts } = this.state;
       return(
          <div>
              <Container className=" ManagePostsCardSection">
                  <h1>{Posts.length > 0 ? Posts[0].CategoryName : ""}</h1>
                  {Posts.length > 0 ? Posts.sort((a, b) =>
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
                  )) : <div><h1>Henüz bu kategoriye ait bir post yok.</h1></div>}
              </Container >
          </div>
       )
    }
}


