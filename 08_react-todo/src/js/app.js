
var TodoList = React.createClass({
  createItem: function(itemText) {
    return <li>{itemText} [<a href="#" onClick={this.props.handleDelete.bind(this, itemText)}>x</a>]</li>;
  },

  render: function() {
    return <ul>{this.props.items.map(this.createItem)}</ul>;
  }
});

var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  handleDelete: function(itemToDelete, e) {
    var newItems = _.reject(this.state.items, function(item) {
      return item == itemToDelete
    });
    this.setState({items: newItems});
  },
  handleChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} handleDelete={this.handleDelete} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  }
});
React.render(<TodoApp />, document.getElementById('app-container'));