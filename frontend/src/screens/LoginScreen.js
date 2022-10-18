import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {Form, Button, Navbar, Image, Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {login} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import {LinkContainer} from "react-router-bootstrap";

function LoginScreen() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    let navigateLog = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            navigateLog('/profile')
        }
    }, [navigateLog, userInfo])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (

        <Container className='card border-dark my-5 align-items-center' style={{maxWidth: 600}}>
            <h2 className='text-secondary my-3'>Welcome to <LinkContainer to='/'>
                <Navbar.Brand><Image
                    src="../logo.png"
                    width="140"
                    height="70"
                    className="d-inline-block align-top"
                    alt=""
                /></Navbar.Brand>
            </LinkContainer></h2>
            <FormContainer>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='username' className='mb-3'>
                        <Form.Label className='text-primary'>Username</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password' className='mb-3'>
                        <Form.Label className='text-primary'>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="btn btn-outline-secondary mb-4">Sign In</Button>
                </Form>
            </FormContainer>

        </Container>
    );
}

export default LoginScreen;