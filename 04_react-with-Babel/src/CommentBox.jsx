// CommentBox.jsx
import {mixin} from 'arda';
import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';

var CommentBox = React.createClass({
  mixins: [mixin],
  render() {
    return (
      <div className='commentBox'>
      <h1>Comments</h1>
      <CommentList data={this.props.data} />
      <CommentForm />
      </div>
      );
  }

});

module.exports = CommentBox;