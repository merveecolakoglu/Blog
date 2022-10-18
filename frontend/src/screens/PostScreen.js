import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom"
import {LinkContainer} from "react-router-bootstrap"
import {Row, Col, Image, ListGroup, Button, Nav} from "react-bootstrap"
import {listPostDetails} from "../actions/postActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function PostScreen() {
    const {id} = useParams()

    const dispatch = useDispatch()
    const postDetails = useSelector(state => state.postDetails)
    const {loading, error, post} = postDetails

    useEffect(() => {
        dispatch(listPostDetails(id))

    }, [dispatch, id])


    return (
        <div>
            {
                loading ? <Loader/>
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        :
                        (
                            <Row>
                                <Row className='align-items-center'>
                                    <Col md={6}>
                                        <Image src={post.image} alt={post.title} fluid/>
                                    </Col>
                                    <Col md={6}>
                                        <ListGroup className='align-items-center' variant='flush'>

                                            <p className='mb-3'>{post.type} - {post.createdAt}</p>
                                            <h3 className='text-secondary mb-3'>{post.title}</h3>
                                            <Button className='btn btn-primary mb-3'>ADD TO FAVORITE <i
                                                className='fas fa-heart'></i></Button>

                                            <Nav className='auto mb-3'>
                                                <LinkContainer to='#'>
                                                    <Nav.Link><i className='fa-brands fa-facebook'></i></Nav.Link>
                                                </LinkContainer>
                                                <LinkContainer to='#'>
                                                    <Nav.Link><i className='fa-brands fa-twitter'></i></Nav.Link>
                                                </LinkContainer>
                                                <LinkContainer to='#'>
                                                    <Nav.Link><i className='fa-brands fa-pinterest'></i></Nav.Link>
                                                </LinkContainer>
                                                <LinkContainer to='#'>
                                                    <Nav.Link><i className='fa-solid fa-envelope'></i></Nav.Link>
                                                </LinkContainer>
                                            </Nav>

                                        </ListGroup>
                                    </Col>
                                </Row>
                                <Row className='my-lg-5'>
                                    <Col md={9}>
                                        <p>{post.description}</p>
                                    </Col>
                                </Row>
                            </Row>
                        )
            }
        </div>
    );
}

export default PostScreen;