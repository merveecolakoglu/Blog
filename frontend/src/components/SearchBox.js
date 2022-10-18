import React, {useState} from 'react'
import {Button, Form} from "react-bootstrap"
import {useLocation, useNavigate} from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let navigate=useNavigate()
    let location=useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        }else {
            navigate(navigate(navigate.location.pathname))
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                className='me-sm-2'
                placeholder="Search"
            >
            </Form.Control>
            <Button
                type="submit"
                variant='btn btn-outline-primary'
                className='my-2 my-sm-0'
            >
                <i className='fas fa-search'></i>
            </Button>
        </Form>
    );
}

export default SearchBox