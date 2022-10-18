import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Form} from "react-bootstrap";
import {createPost, listPosts} from "../actions/postActions";
import {useNavigate} from "react-router-dom";
import {POST_CREATE_RESET} from "../constants/postConstants";

function PostCreateScreen() {
    let navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [homeImage, setHomeImage] = useState()
    const [image, setImage] = useState()
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const postCreate = useSelector(state => state.postCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, post: createdPost} = postCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        dispatch({type: POST_CREATE_RESET})

        if (!userInfo.isManager) {
            navigate('/login')
        }
        if (successCreate) {
            navigate('/manager/postList')
        } else {
            dispatch(listPosts())
        }

    }, [dispatch, userInfo, navigate, successCreate, createdPost])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createPost(
            title,
            type,
            homeImage,
            image,
            description
        ))
    }

    return (
        <FormContainer>
            <h1>Post Create</h1>
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='type'>
                    <Form.Label className='form-label mt-4'>Type</Form.Label>
                    <Form.Select
                        value={type.value}
                        onChange={(e) => setType(e.target.value)}
                        className='form-select form-select-lg'
                    >
                        <option>Choose Type</option>
                        <option>Fashion</option>
                        <option>Beauty</option>
                        <option>Lifestyle</option>
                        <option>People</option>

                    </Form.Select>
                </Form.Group>

                <Form.Group controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter title'
                        value={title}
                        className='form-control form-control-lg'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='homeImage'>
                    <Form.Label>Home Image</Form.Label>
                    <Form.Control
                        type='file'
                        size='lg'
                        custom='true'
                        label='Choose File'
                        onChange={(e) => setHomeImage(e.target.files[0])}
                    />
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='file'
                        size='lg'
                        custom='true'
                        label='Choose File'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </Form.Group>

                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as='textarea'
                        placeholder='Enter description..'
                        value={description}
                        className='form-control form-control-lg'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='btn btn-outline-secondary btn-lg my-3'>Post Create</Button>
            </Form>

        </FormContainer>
    );
}

export default PostCreateScreen;