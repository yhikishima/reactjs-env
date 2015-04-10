// Comment.jsx
import {mixin} from 'arda';
import md2react from 'md2react';

var Comment = React.createClass({
  mixins: [mixin],
  render() {
    return (
      <div className='comment'>
      <h2 className='commentAuthor'>
      {this.props.author}
      </h2>
      { md2react(this.props.children.toString()) }
      </div>
      );
  }
});

module.exports = Comment;