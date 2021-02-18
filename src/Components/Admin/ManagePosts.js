import React, {Component} from 'react';
import {Button, Container, Card, Jumbotron} from "react-bootstrap";
import {EditPost} from "./EditPost"
import {AddCategory} from "./AddCategory";


let dataOfAdmin = sessionStorage.getItem('Admin')
let Admin = JSON.parse(dataOfAdmin)

export class ManagePosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Posts: [],
            AddPostPopUpShow: false,
            EditPostPopUpShow: false,
            PostDueToEdit : 1,
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
        if(Admin){
            this.RefleshList();
        }
    }

    componentDidUpdate() {
        if(Admin){
            this.RefleshList();
        }
    }

    ShowPopUpEditPost = (postId) => {
        this.setState({
            EditPostPopUpShow: true,
            PostDueToEdit : postId
        });
    };

    HidePopUpEditPost = () => {
        this.setState({
            EditPostPopUpShow: false,
        });
    };

    ShowPopUpAddPost = () => {
        this.setState({
            AddPostPopUpShow: true,
        });
    };

    HidePopUpAddPost = () => {
        this.setState({
            AddPostPopUpShow: false,
        });
    };


    render() {
        const { Posts } = this.state;
        if (Admin){
            return(
                <div>
                    <Jumbotron fluid>
                        <Container>
                            <p>
                                <Button onClick = {this.ShowPopUpAddPost} className="ManageCategoriesButton" variant="success" size="lg" block>
                                    Add Post
                                </Button>
                            </p>
                        </Container>
                    </Jumbotron>

                    {this.state.EditPostPopUpShow ? (
                        <EditPost onClose={this.HidePopUpEditPost} post = {this.state.Posts.filter(item => item.Id === this.state.PostDueToEdit)} />
                    ) : null}

                    {/*{this.state.AddCategoryPopUpShow ? (*/}
                    {/*    <AddPost  onClose={this.HidePopUpAddPost}  />*/}
                    {/*) : null}*/}

                    <Container className="ManagePostsCardSection">
                        {Posts.sort((a, b) =>
                            a.DatetimeOfCreated < b.DatetimeOfCreated ? 1 : -1
                        ).map((post) => (
                            <span>
                            <Card key={post.Id} className="ManagePostsCard">
                            <Card.Header as="h5">{post.Title}</Card.Header>
                            <Card.Body>
                                <Card.Title>{post.Info}</Card.Title>
                                <Card.Text>
                                    {post.Text.substring(0,120) + "..."}
                                </Card.Text>
                                <Button variant="outline-primary">Read</Button>
                                <Button onClick={() => this.ShowPopUpEditPost(post.Id)}
                                        variant="outline-secondary">Edit</Button>
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

