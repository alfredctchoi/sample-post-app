import {combineReducers} from 'redux'
import postList from './post-list'
import postComments from './post-comment'

const app = combineReducers({
  postList,
  postComments
});

export default app;