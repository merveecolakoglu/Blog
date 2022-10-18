import React, {useState, useEffect} from 'react';
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Post from "../components/Post";
import {listPosts} from "../actions/postActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import PostCarousel from "../components/PostCarousel";
import {useLocation} from "react-router-dom";

function HomeScreen() {
    let location = useLocation()

    const dispatch = useDispatch()
    const postList = useSelector(state => state.postList)
    const {error, loading, posts, page, pages} = postList

    let keyword = location.search

    useEffect(() => {
        dispatch(listPosts(keyword))

    }, [dispatch, keyword])


    return (
        <div>
            {!keyword && <PostCarousel/>}
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

export default HomeScreen;