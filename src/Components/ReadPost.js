import React, { Component} from "react";
import {Container, Jumbotron, Card, CardColumns, Button} from "react-bootstrap";

export class ReadPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Post: {},
            SimilarContents : {}
        };
    }

    GetSimilarContents = async () => {
        let url = "http://localhost:52030/api/post/PostByCategory/" + this.state.Post.CategoryId
        let response = await fetch(url);
        let data = await response.json();
        this.setState({
            SimilarContents : data
        })

    }

    componentDidMount = async () => {
        let url = "http://localhost:52030/api/post/post/" + this.props.match.params.id;
        let response = await fetch(url);
        let data = await response.json();
        await this.setState({
            Post : data
        })

        this.GetSimilarContents();

    }




    render() {
        const { Post } = this.state
        const { SimilarContents } = this.state
        console.log(SimilarContents)

        return (
            <div className="ReadPost">
                <Jumbotron fluid>
                    <Container>
                        <h1>{Post.Title}</h1>
                        <br/>
                        <h3>{Post.Info}</h3>
                    </Container>
                </Jumbotron>
                <p>{Post.Text}</p>

                <Jumbotron fluid style={{background:'#F6E6D7'}}>
                    <Container>
                        <h3>Similar Contents</h3>
                        <br/>
                        <CardColumns>
                            {SimilarContents.length > 0 ? SimilarContents.map((similarContents) => (
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{similarContents.Title}</Card.Title>
                                        <Card.Text>
                                            {similarContents.Info}
                                        </Card.Text>
                                        <Card.Text>
                                            <a href={'http://localhost:3000/ReadPost/' + similarContents.Id}> <Button variant="outline-success">Read</Button></a>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )) : "Başka post yok"}

                        </CardColumns>
                    </Container>
                </Jumbotron>



            </div>

        );
    }
}


