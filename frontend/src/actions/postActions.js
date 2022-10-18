import axios from 'axios'
import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,

    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,

    POST_TOP_REQUEST,
    POST_TOP_SUCCESS,
    POST_TOP_FAIL,

    POST_FASHION_REQUEST,
    POST_FASHION_SUCCESS,
    POST_FASHION_FAIL,

    POST_BEAUTY_REQUEST,
    POST_BEAUTY_SUCCESS,
    POST_BEAUTY_FAIL,

    POST_LIFE_STYLE_REQUEST,
    POST_LIFE_STYLE_SUCCESS,
    POST_LIFE_STYLE_FAIL,

    POST_PEOPLE_REQUEST,
    POST_PEOPLE_SUCCESS,
    POST_PEOPLE_FAIL,

    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,

    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,

    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,
} from '../constants/postConstants'

export const listPosts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({type: POST_LIST_REQUEST})

        const {data} = await axios.get(`/api/posts${keyword}`)

        dispatch({
            type: POST_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createPost = (title,type,home_image,image,description) => async (dispatch, getState) => {
    try {
        dispatch({type: POST_CREATE_REQUEST})

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/posts/create/`,
            {'title':title,'type':type,'home_image':home_image,'image':image,'description':description},
            config
        )

        dispatch({
            type: POST_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listTopPosts = () => async (dispatch) => {
    try {
        dispatch({type: POST_TOP_REQUEST})

        const {data} = await axios.get(`/api/posts/top/`)

        dispatch({
            type: POST_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_TOP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const listFashionPosts = () => async (dispatch) => {
    try {
        dispatch({type: POST_FASHION_REQUEST})

        const {data} = await axios.get(`/api/posts/fashion/`)

        dispatch({
            type: POST_FASHION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_FASHION_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const listBeautyPosts = () => async (dispatch) => {
    try {
        dispatch({type: POST_BEAUTY_REQUEST})

        const {data} = await axios.get(`/api/posts/beauty/`)

        dispatch({
            type: POST_BEAUTY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_BEAUTY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const listlifestylePosts = () => async (dispatch) => {
    try {
        dispatch({type: POST_LIFE_STYLE_REQUEST})

        const {data} = await axios.get(`/api/posts/lifestyle/`)

        dispatch({
            type: POST_LIFE_STYLE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_LIFE_STYLE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const listPeoplePosts = () => async (dispatch) => {
    try {
        dispatch({type: POST_PEOPLE_REQUEST})

        const {data} = await axios.get(`/api/posts/people/`)

        dispatch({
            type: POST_PEOPLE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_PEOPLE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const listPostDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: POST_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updatePost = (post) => async (dispatch, getState) => {
    try {
        dispatch({type: POST_UPDATE_REQUEST})

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/posts/update/${post.id}/`,
            post,
            config
        )

        dispatch({
            type: POST_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: POST_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deletePost = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: POST_DELETE_REQUEST})

        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(
            `/api/posts/delete/${id}/`,
            config
        )

        dispatch({
            type: POST_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: POST_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}