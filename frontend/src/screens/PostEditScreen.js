import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {listPostDetails, updatePost} from "../actions/postActions";
import {POST_UPDATE_RESET} from "../constants/postConstants";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {Button, Form} from "react-bootstrap";

function PostEditScreen() {

    let navigate = useNavigate()
    const {id} = useParams()

    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const postDetails = useSelector(state => state.postDetails)
    const {error, loading, post} = postDetails

    const postUpdate = useSelector(state => state.postUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success: successUpdate} = postUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({type: POST_UPDATE_RESET})
            navigate('/manager/postList')
        } else {
            if (!post.title || post.id !== Number(id)) {
                dispatch(listPostDetails(id))
            } else {
                setType(post.type)
                setTitle(post.title)
                setImage(post.image)
                setDescription(post.description)
            }
        }
    }, [dispatch, post, id, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePost({
            id: id,
            type,
            title,
            image,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('post_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/posts/upload/', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/manager/postList'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Post</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='type'>
                            <Form.Label className='form-label mt-4'>Type</Form.Label>
                            <Form.Select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className='form-select form-select-lg'
                            >
                                <option>Fashion</option>
                                <option>Beauty</option>
                                <option>Lifestyle</option>
                                <option>People</option>

                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter title'
                                value={title}
                                className='form-control form-control-lg'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='Image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                value={image || ''}
                                placeholder='Enter image'
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <Form.Control
                                type='file'
                                size='lg'
                                custom='true'
                                onChange={uploadFileHandler}
                            />
                            {uploading && <Loader/>}
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                placeholder='Enter description'
                                value={description}
                                className='form-control form-control-lg'
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Button type='submit' variant='btn btn-outline-secondary btn-lg my-3'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
}

export default PostEditScreen;