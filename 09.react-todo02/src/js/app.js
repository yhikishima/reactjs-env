var React = require('react');

var Component = React.createClass({
  getInitialState: function() {
    return {
      text: '',
      messages: []
    }
  },

  onTextChanged: function() {
    this.setState({
      text: this.refs.text.getDOMNode().value,
      messages: this.state.messages
    });
  },

  onButtonClicked: function() {
    this.setState({
      text: '',
      messages: this.state.messages.concat([this.state.text])
    });
  },

  render: function() {
    return (
      <div id="js-todoInput" class="todoInput">

        <p>TODOタイトル：</p>
        <input type="text" class="" ref="text"
          value={this.state.text}
          onChange={this.onTextChanged} />

        <button onClick={this.onButtonClicked}>
          追加
        </button>
        { this.state.messages.map(function(m, i) {
          return <div key={i}>{m}</div>
        }) }
      </div>
    );
  }
});

var todoTest = document.querySelector('#js-todoMain');
var dom = <Component />;
React.render(dom, todoTest);
