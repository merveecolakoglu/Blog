import React from 'react'
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";


function TopHeader() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Container className="justify-content-end">
                {userInfo ? (
                    <NavDropdown className='badge rounded-pill bg-secondary' title={userInfo.username}
                                 id='username'>
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/manager/postList'>
                            <NavDropdown.Item>Posts</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/manager/postCreate'>
                            <NavDropdown.Item>Add a post</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                    </NavDropdown>
                ) : (
                    <></>
                )}
            </Container>
        </Navbar>
    )

}

export default TopHeader