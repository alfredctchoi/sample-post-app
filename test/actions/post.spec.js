import {ROOT_URL} from '../../src/js/config'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as PostActions from '../../src/js/actions/post'
import nock from 'nock'
import expect from 'expect'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('post actions', () => {

  afterEach(() => {
    nock.cleanAll()
  });

  describe('getPosts', () => {
    it('creates LOADED_POSTS after fetching posts is completed', () => {
      nock(ROOT_URL)
        .get('/posts')
        .reply(200, ['p1', 'p2']);

      const expectedActions = [{
        type: PostActions.ENUMS.LOADING_POSTS
      }, {
        type: PostActions.ENUMS.LOADED_POSTS,
        posts: ['p1', 'p2']
      }];

      const store = mockStore({
        postList: {
          selectedPostId: null,
          posts: []
        }
      });

      return store.dispatch(PostActions.getPosts())
        .then(() => { // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        })
    });
  });

  describe('selectPost', () => {
    it('should dispatch SELECT_POST', () => {
      const expectedValue = [{
        type: PostActions.ENUMS.SELECT_POST,
        postId: 1
      }];

      const store = mockStore();

      store.dispatch(PostActions.selectPost(1));
      expect(store.getActions()).toEqual(expectedValue);
    });
  });

  describe('deselectPost', () => {
    it('should dispatch DESELECT_POST', () => {
      const expectedValue = [{
        type: PostActions.ENUMS.DESELECT_POST
      }];

      const store = mockStore();

      store.dispatch(PostActions.deselectPost());
      expect(store.getActions()).toEqual(expectedValue);
    });
  });
});