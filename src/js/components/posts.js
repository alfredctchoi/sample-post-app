require('./posts.scss');
import React, {PropTypes} from 'react'
import Post from '../components/post'


const Posts = ({posts, selectedPostId, onPostSelect}) => (
    <ul className="post-list">
        {
            posts.map(post => <Post key={post.id}
                                    post={post}
                                    onPostSelect={() => {onPostSelect(post.id)}}
                                    isSelected={selectedPostId === post.id}/>)
        }
    </ul>
);

Posts.propTypes = {
  posts: PropTypes.array,
  selectedPostId: PropTypes.number,
  onPostSelect: PropTypes.func
};

Posts.defaultProps = {
  posts: []
};

export default Posts;