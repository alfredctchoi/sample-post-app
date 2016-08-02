require('./comments.scss');
import React, {Component} from 'react'
import Comment from './comment'

class Comments extends Component {
    render() {
        const {comments} = this.props;
        if (!comments || comments.length === 0) {
            return <div className="text-center">
                No comments available
            </div>
        }

        return <ul className="comment-list">
            {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        </ul>
    }
}

export default Comments;