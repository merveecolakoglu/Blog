import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Col, Row, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {listPosts, deletePost} from "../actions/postActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";

function PostListScreen() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    let location = useLocation()

    let keyword = location.search

    const postList = useSelector(state => state.postList)
    const {loading, error, posts, pages, page} = postList

    const postDelete = useSelector(state => state.postDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = postDelete

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isManager) {
            dispatch(listPosts())
        } else {
            navigate('/login')
        }
    }, [navigate,dispatch,keyword, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            dispatch(deletePost(id))
        }
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Posts</h1>
                </Col>
            </Row>

            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loading
                ? (<Loader/>)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-dark table-hover table-sm'>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <td>Type</td>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Created</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {posts.map(post => (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.type}</td>
                                        <td><img src={post.image} width='80' height='50'alt={post.image.name}/></td>
                                        <td>{post.title.substring(0, 50)}</td>
                                        <td>{post.description.substring(0, 50)}</td>
                                        <td>{post.createdAt}</td>

                                        <td>
                                            <LinkContainer to={`/manager/post/${post.id}/edit`}>
                                                <Button variant='primary' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='secondary' className='btn-sm'
                                                    onClick={() => deleteHandler(post.id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <Paginate pages={pages} page={page} isManager={true}/>
                        </div>
                    )}
        </div>
    );
}

export default PostListScreen;