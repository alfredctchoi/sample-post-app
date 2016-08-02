import {ENUMS as COMMENT_ENUMS} from '../actions/comments'

const INITIAL_STATE = {
    comments: {},
    isLoading: false
};

const postComment = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMMENT_ENUMS.LOADING_POST_COMMENTS:
            return Object.assign({}, state, {
                isLoading: true
            });
            return;
        case COMMENT_ENUMS.LOADED_POST_COMMENTS:
            const existingComments = Object.assign({}, state.comments);
            existingComments[action.postId] = action.comments;
            return Object.assign({}, state, {
                comments: existingComments,
                isLoading: false
            });
        default:
            return state;
    }
};

export default postComment;