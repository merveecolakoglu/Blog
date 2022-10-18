import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel, Image} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "./Loader";
import {listTopPosts} from "../actions/postActions";

function PostCarousel() {
    const dispatch = useDispatch()
    const postTop = useSelector(state => state.postTop)

    const {error, loading, posts} = postTop

    useEffect(() => {
        dispatch(listTopPosts())
    }, [dispatch])

    return (
        loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Carousel pause='hover' interval={1000} className='card border-secondary mb-3' style={{borderRadius:10}}>
                        {posts.map(post => (
                            <Carousel.Item key={post.id}>
                                <Link to={`/post/${post.id}`}>
                                    <Image className='d-block w-100' src={post.home_image} alt={post.title} fluid/>
                                     <Carousel.Caption className='carousel.caption'>
                                         <p className='text-primary'>{post.type} - {post.createdAt}</p>
                                     </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )
    );
}

export default PostCarousel;