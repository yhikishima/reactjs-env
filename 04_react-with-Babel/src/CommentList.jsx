// CommentList.jsx
import {mixin} from 'arda';
import Comment from './Comment.jsx';

var CommentList = React.createClass({
  mixins: [mixin],

  render() {
    let commentNodes = this.props.data.map((comment) => (
      <Comment author={comment.author}>
      {comment.text}
      </Comment>
      )
    );

    return (
      <div className='commentList'>
      {commentNodes}
      </div>
      );
  }
});

module.exports = CommentList;