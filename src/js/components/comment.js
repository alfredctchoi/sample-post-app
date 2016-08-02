require('./comment.scss');
import React, {Component} from 'react'

class Comment extends Component {
    render(){
        const {comment} = this.props;
        return <li className="comment">
            <div className="author">{comment.name}:</div>
            <div className="comment-content">{comment.body}</div>
        </li>
    }
}

export default Comment;