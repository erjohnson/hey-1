var HelloWorld = React.createClass({
  render: function() {
    return (
      <div className="helloWorld">
        <h1>Hello World!</h1>
      </div>
    );
  }
});

React.render(
  <HelloWorld/>,
  document.getElementById('content')
);