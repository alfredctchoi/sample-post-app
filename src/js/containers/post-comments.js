require('./post-comments.scss');
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadCommentsIfNeeded} from '../actions/comments'
import Comments from '../components/comments'

class PostComments extends Component {
    componentDidMount() {
        const {loadCommentsIfNeeded} = this.props;
        loadCommentsIfNeeded();
    }

    render() {
        const {comments, isLoading, classes} = this.props;
        if (isLoading) {
            return <div className="text-center">
                Loading...
            </div>
        }

        return <div>
            <hr className="divider"/>
            <div className={`comments-container ${classes}`}>
                <div className="comment-heading">Comments</div>
                <input type="text" className="input" placeholder="add comment..."/>
                <Comments comments={comments}/>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    const {isLoading, comments} = state.postComments;
    const {selectedPostId} = state.postList;
    return {
        comments: comments[selectedPostId],
        isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadCommentsIfNeeded: () => {
            dispatch(loadCommentsIfNeeded());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostComments);