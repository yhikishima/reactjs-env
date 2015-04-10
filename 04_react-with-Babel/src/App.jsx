// App.jsx
window.React = require('react');
window.Promise = require('bluebird');
window.ReactBootstrap = require('react-bootstrap');
import {Context, Router, DefaultLayout, mixin} from 'arda';
import CommentBox from './CommentBox.jsx';
import request from 'superagent';

var App = React.createClass({
  mixins: [mixin],
  render() {
    return (
      <div>
      <CommentBox data={ this.props.data } />
      </div>
      );
  }
});

class AppContext extends Context {
  get component() {
    return App;
  }

  initState() { return { data:[] }; }

  expandComponentProps(props, state) { return { data: state.data}; }

  loadCommentsFromServer() {
    request
    .get(this.props.url)
    .set({Accept:'application/json'})
    .end((res)=> this.update( ()=> { return {data:res.body}; }) );
  }

  delegate(subscribe) {
    super.delegate();

    subscribe('context:started', ()=> {
      this.loadCommentsFromServer();
      setInterval(()=>this.loadCommentsFromServer(), this.props.pollInterval);
    });

    subscribe('commentSubmit', (comment) => {
      request
      .post(this.props.url)
      .send(comment)
      .set({Accept:'application/json'})
      .end((err, res) => { /* 最新のsuperagentでは第一引数にerrが必要 */
        if (res.ok) {
          this.update( (s)=> {
            return {data:s.data.concat([res.body])};
          });
        } else {
          console.log(res.text);
        }
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', ()=> {
  let router = new Router(DefaultLayout, document.body);
  router.pushContext(AppContext, {url:'/comments.json', pollInterval:2000});
});