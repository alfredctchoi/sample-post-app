import {ENUMS as POST_ENUMS} from '../actions/post'

const INITIAL_STATE = {
    posts: [],
    comments: {},
    selectedPostId: null,
    isLoading: false
};

const posts = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_ENUMS.SELECT_POST:
            return Object.assign({}, state, {
                selectedPostId: action.postId
            });
        case POST_ENUMS.LOADING_POSTS:
            return Object.assign({}, state, {
                isLoading: true
            });
        case POST_ENUMS.LOADED_POSTS:
            return Object.assign({}, state, {
                isLoading: false,
                posts: action.posts
            });
        case POST_ENUMS.DESELECT_POST:
            return Object.assign({}, state, {
                selectedPostId: null
            });
        default:
            return state;
    }
};

export default posts;