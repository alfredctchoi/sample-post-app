require('./post.scss');
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PostComments from '../containers/post-comments'

class Post extends Component {

    componentDidUpdate(prevProps) {
        const {isSelected} = this.props;

        // centers the post vertically on the page when selected
        if (!prevProps.isSelected && isSelected) {
            let component = ReactDOM.findDOMNode(this);
            document.body.scrollTop = component.offsetTop - 65;
        }
    }

    render() {
        const {post, onPostSelect, isSelected} = this.props;
        return <li id={`post_${post.id}`}
                   className={`post${isSelected ? ' selected' : ''}`}
                   onClick={onPostSelect}>
            <div className="post-container content">
                <div className="heading">{post.title}</div>
                <div className="body">{post.body}</div>
            </div>
            {
                isSelected && <PostComments classes="post-container"/>
            }

        </li>

    }
}

export default Post;