import PostCommentReducer from '../../src/js/reducers/post-comment'
import {ENUMS as COMMENT_ENUMS} from '../../src/js/actions/comments'
import  expect from "expect";

describe('post-comment reducer', () => {
  it('should set isLoading to true', () => {
    expect(PostCommentReducer(undefined, {
      type: COMMENT_ENUMS.LOADING_POST_COMMENTS
    }))
      .toEqual({
        comments: {},
        isLoading: true
      });
  });

  it('should set comments and set isLoading to false', () => {
    expect(PostCommentReducer({
      comments: {},
      isLoading: true
    }, {
      type: COMMENT_ENUMS.LOADED_POST_COMMENTS,
      comments: ['1', '2'],
      postId: 1
    }))
      .toEqual({
        isLoading: false,
        comments: {
          1: ['1', '2']
        }
      });
  });
});