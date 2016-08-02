import {ROOT_URL} from '../config'

export const ENUMS = {
    LOADING_POSTS: 'LOADING_POSTS',
    LOADED_POSTS: 'LOADED_POSTS',
    SELECT_POST: 'SELECT_POST',
    DESELECT_POST: 'DESELECT_POST'
};

const loadingPosts = () => {
    return {
        type: ENUMS.LOADING_POSTS
    }
};

const loadedPosts = (posts) => {
    return {
        type: ENUMS.LOADED_POSTS,
        posts: posts
    }
};

export const getPosts = () => {
    return dispatch => {
        dispatch(loadingPosts());
        return fetch(`${ROOT_URL}/posts`)
            .then(res => res.json())
            .then(json => dispatch(loadedPosts(json)));
    }
};

export const selectPost = (id) => {
    return {
        type: ENUMS.SELECT_POST,
        postId: id
    }
};

export const deselectPost = () => {
    return {
        type: ENUMS.DESELECT_POST
    }
};