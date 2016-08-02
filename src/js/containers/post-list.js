require('./post-list-container.scss');

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPosts, selectPost, deselectPost} from '../actions/post'
import Posts from '../components/posts'

class PostList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {loadPosts, closeAllComments} = this.props;
        document.body.addEventListener('click', closeAllComments);
        loadPosts();
    }

    componentWillUnmount(){
        const {closeAllComments} = this.props;
        document.body.removeEventListener('click', closeAllComments);
    }

    render() {
        const {isLoading, posts, selectedPostId, onPostSelect} = this.props;
        return <div className="post-list-container">
            {
                isLoading &&
                <div>
                    Loading...
                </div>
            }

            {
                !isLoading && posts.length > 0 &&
                <Posts posts={posts}
                       selectedPostId={selectedPostId}
                       onPostSelect={onPostSelect}/>
            }
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