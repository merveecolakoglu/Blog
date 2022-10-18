import React from 'react';
import {Card} from 'react-bootstrap'
import {Link} from "react-router-dom";

function Post({post}) {
    return (
        <Card className='card border-dark mb-3'>
            <Link to={`/post/${post.id}`}>
                <Card.Img src={post.image} height='300px'/>
            </Link>

            <Card.Body>
                <Link to={`/post/${post.id}`}>
                    <Card.Title as='div'>
                        <strong>{post.title}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <div className='my-3'>
                        <p className='text-primary'>{post.type} - {post.createdAt}</p>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Post;