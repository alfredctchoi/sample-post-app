import PostListReducer from '../../src/js/reducers/post-list'
import {ENUMS as POST_ENUMS} from '../../src/js/actions/post'
import  expect from "expect";

describe('post-list reducer', () => {
  it('should select a post', () => {
    expect(PostListReducer(undefined, {
      type: POST_ENUMS.SELECT_POST,
      postId: 1
    }))
      .toEqual({
        posts: [],
        selectedPostId: 1,
        isLoading: false
      });
  });

  it('should set isLoading to true', () => {
    expect(PostListReducer(undefined, {
      type: POST_ENUMS.LOADING_POSTS
    }))
      .toEqual({
        posts: [],
        selectedPostId: null,
        isLoading: true
      });
  });

  it('should set the post list', () => {
    const posts = [{
      id: 1
    }, {
      id: 2
    }];

    expect(PostListReducer(undefined, {
      type: POST_ENUMS.LOADED_POSTS,
      posts
    }))
      .toEqual({
        posts,
        selectedPostId: null,
        isLoading: false
      });
  });

  it('should set the post list', () => {
    const initialState = {
      posts: [],
      selectedPostId: 1,
      isLoading: false
    };

    expect(PostListReducer(initialState, {
      type: POST_ENUMS.DESELECT_POST
    }))
      .toEqual({
        posts: [],
        selectedPostId: null,
        isLoading: false
      });
  });
});