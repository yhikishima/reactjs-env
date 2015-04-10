// CommentForm.jsx
import {mixin} from 'arda';

var CommentForm = React.createClass({
  mixins: [mixin],
  render() {
    return (
      <form className='commentForm' onSubmit={this.handleSubmit.bind(this)}>
      <input type='text' placeholder='Your name' ref='author'/>
      <input type='text' placeholder='Say something...' ref='text'/>
      <input type='submit' value='Post'/>
      </form>
      );
  },

  handleSubmit(e) {
    e.preventDefault();
    let author = React.findDOMNode(this.refs.author).value.trim();
    let text = React.findDOMNode(this.refs.text).value.trim();
    if (!author || !text)
      return;

    this.dispatch('commentSubmit', {author, text});

    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  }

});

module.exports = CommentForm;