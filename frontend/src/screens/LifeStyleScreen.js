import React, {useState, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Post from "../components/Post";
import {listlifestylePosts} from "../actions/postActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {useLocation} from "react-router-dom";

function LifeStyleScreen() {
    let location = useLocation()

    const dispatch = useDispatch()
    const postlifeStyle = useSelector(state => state.postlifeStyle)
    const {error, loading, posts, page, pages} = postlifeStyle

    let keyword = location.search

    useEffect(() => {
        dispatch(listlifestylePosts())

    }, [dispatch])


    return (
        <div>
            {
                loading ? <Loader/>
                    : error ? <Message variant="danger">{error}</Message>
                        :
                        (
                            <div>
                                <Row>
                                    {posts.map(post => (
                                        <Col key={post.id} sm={12} md={6}>
                                            <Post post={post}/>
                                        </Col>
                                    ))}
                                </Row>
                                <Paginate page={page} pages={pages} keyword={keyword}/>
                            </div>
                        )
            }
        </div>
    );
}

export default LifeStyleScreen;