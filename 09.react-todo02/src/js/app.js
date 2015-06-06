var React = require('react');

var Component = React.createClass({
  getInitialState: function() {
    return {
      ttlText: '',
      contentText: '',
      ttlMessages: ['aaaa'],
      contentMessages: [],
    }
  },

  onTextChanged: function() {
    this.setState({
      ttlText: this.refs.title.getDOMNode().value,
      ttlMessages: this.state.ttlMessages
    });
  },

  onContentTextChanged: function() {
    this.setState({
      contentText: this.refs.contents.getDOMNode().value,
      contentMessages: this.state.contentMessages
    });
  },

  onButtonClicked: function() {
    this.setState({
      ttlText: '',
      contentText: '',
      ttlMessages: this.state.ttlMessages.concat([
        this.state.ttlText
      ]),
      contentMessages: this.state.contentMessages.concat([
        this.state.contentText
      ])
    });
  },

  render: function() {
    return (
      <div id="js-todoInput" class="todoInput">

        <p>TODOタイトル：</p>
        <input type="text" class="" ref="title"
          value={this.state.text}
          onChange={this.onTextChanged} />

        <p>TODO内容：</p>
        <input type="text" class="" ref="contents"
          value={this.state.text}
          onChange={this.onContentTextChanged} />

        <button onClick={this.onButtonClicked}>
          追加
        </button>
        {
          this.state.ttlMessages.map(function(m, i) {
            return
              <dl>
                <dt key={i}>{m}</dt><dd>aaa</dd>
              </dl>
          })
        }
      </div>

    );
  }
});

var todoTest = document.querySelector('#js-todoMain');
var dom = <Component />;
React.render(dom, todoTest);
