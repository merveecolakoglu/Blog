import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";

function ProfileScreen() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    let navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.first_name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            } else {
                setUsername(user.username)
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setEmail(user.email)
            }
        }
    }, [navigate, dispatch, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user.id,
                'first_name': firstName,
                'last_name': lastName,
                'username': username,
                'email': email,
                'password': password,
            }))
        }
    }

    return (
        <Row>
            <h2>My Profile</h2>
            <Col md={4}>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='form-control form-control-lg'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='firstname'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Firstname'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='form-control form-control-lg'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='lastname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Lastname'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className='form-control form-control-lg'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='form-control form-control-lg'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='form-control form-control-lg'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='form-control form-control-lg'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="btn btn-outline-secondary btn-lg my-3">Update</Button>
                </Form>
            </Col>
        </Row>

    );
}

export default ProfileScreen;