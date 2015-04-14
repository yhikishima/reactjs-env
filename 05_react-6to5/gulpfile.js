// gulpfile.js
var gulp = require('gulp');

var Hello = React.createClass({
  render: function() {
    return (
      <div className="container">Hello {this.props.name}</div>
    );
  }
})

React.render(<Hello name="React" />, document.getElementById("app"));