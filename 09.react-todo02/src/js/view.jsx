var React = require('react');

var Name = React.createClass({
  render: function() {
    return (
      <span>{this.props.name}</span>
    );
  }
});

var AddTodoTitle = React.createClass({
  render: function() {
    return (
      <div>
        <p>'hello, message!'</p>
        <Name name="TEST" />
      </div>
    );
  }
});

module.exports = AddTodoTitle;