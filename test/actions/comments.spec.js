import {ROOT_URL} from '../../src/js/config'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as CommentActions from '../../src/js/actions/comments'
import nock from 'nock'
import expect from 'expect'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions', () => {
    afterEach(() => {
        nock.cleanAll()
    });

    describe('comments', () => {

        describe('loadCommentsIfNeeded', () => {

            it('creates LOADED_POST_COMMENTS after fetching comments is completed', () => {
                nock(ROOT_URL)
                    .get('/posts/1/comments')
                    .reply(200, ['c1', 'c2']);

                const expectedActions = [{
                    type: CommentActions.ENUMS.LOADING_POST_COMMENTS
                }, {
                    type: CommentActions.ENUMS.LOADED_POST_COMMENTS,
                    postId: 1,
                    comments: ['c1', 'c2']
                }];

                const store = mockStore({
                    postList: {
                        selectedPostId: 1
                    },
                    postComments: {
                        comments: {}
                    }
                });

                return store.dispatch(CommentActions.loadCommentsIfNeeded())
                    .then(() => { // return of async actions
                        expect(store.getActions()).toEqual(expectedActions);
                    })
            });

            it('should not dispatch anything', () => {
                const expectedActions = [];
                const store = mockStore({
                    postList: {
                        selectedPostId: 5
                    },
                    postComments: {
                        comments: {
                            5: {
                                id: 1
                            }
                        }
                    }
                });
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});