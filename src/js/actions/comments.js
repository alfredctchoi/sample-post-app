import {ROOT_URL} from '../config'

export const ENUMS = {
    LOADING_POST_COMMENTS: 'LOADING_POST_COMMENTS',
    LOADED_POST_COMMENTS: 'LOADED_POST_COMMENTS'
};

const shouldFetchComments = (state) => {
    const {comments, selectedPostId} = state.postList;
    return comments[selectedPostId] === undefined;
};


const loadingComments = () => {
    return {
        type: ENUMS.LOADING_POST_COMMENTS
    }
};

const loadedComments = (postId, comments) => {
    return {
        type: ENUMS.LOADED_POST_COMMENTS,
        postId,
        comments
    }
};

const fetchComments = (state) => {
    const {selectedPostId} = state.postList;
    return dispatch => {
        dispatch(loadingComments());
        return fetch(`${ROOT_URL}/posts/${selectedPostId}/comments`)
            .then(res => res.json())
            .then(json => dispatch(loadedComments(selectedPostId, json)))
    }
};

export const loadCommentsIfNeeded = () => {
    return (dispatch, getState) => {
        const state = getState();
        if (shouldFetchComments(state)) {
            return dispatch(fetchComments(state));
        }
    };
};