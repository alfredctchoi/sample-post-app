require('./post-list-container.scss');

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPosts, selectPost, deselectPost} from '../actions/post'
import Posts from '../components/posts'

export class PostList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {loadPosts, closeAllComments} = this.props;
        document.body.addEventListener('click', closeAllComments);
        loadPosts();
    }

    componentWillUnmount() {
        const {closeAllComments} = this.props;
        document.body.removeEventListener('click', closeAllComments);
    }

    render() {
        const {isLoading, posts, selectedPostId, onPostSelect} = this.props;

        if (isLoading) {
            return <div className="loading">
                Loading...
            </div>
        }

        if (!isLoading && (!posts || posts.length === 0)) {
            return <div className="posts-not-found">
                No posts found.
            </div>;
        }

        return <div className="post-list-container">
            <Posts posts={posts}
                   selectedPostId={selectedPostId}
                   onPostSelect={onPostSelect}/>
        </div>
    }
}

const isInPostRecursive = (node, className) => {
    if (node.className.indexOf(className) > -1) return true;
    if (node.nodeName !== 'BODY') {
        return isInPostRecursive(node.parentNode, className);
    }

    return false;
};

const mapStateToProps = (state) => {
    const {posts, isLoading, selectedPostId} = state.postList;
    return {
        posts,
        isLoading,
        selectedPostId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPostSelect: (id) => {
            dispatch(selectPost(id))
        },
        loadPosts: () => {
            dispatch(getPosts())
        },
        closeAllComments: (e) => {
            if (isInPostRecursive(e.target, 'post')) return;
            dispatch(deselectPost());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);