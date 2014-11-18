require('jquery');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var App = React.createClass({
  mixins: [ Router.Navigation ],
  getInitialState: function() {
    getLocation();
    return null;
  },
  componentDidMount: function() {
    var self = this;
    $.when(getLocation()).done(function() {
      self.setState({position: [current_lat, current_lon]});
      self.transitionTo('/messages');
    });
  },
  render: function() {
    return (
      <div>
        <this.props.activeRouteHandler/>
      </div>
    );
  }
});

var Dashboard = React.createClass({
  render: function() {
    return (
      <h1>Loading...</h1>
    )
  }
});

var MessageBox = React.createClass({
  loadMessagesFromServer: function() {
    $.ajax({
      url: '/api/messages',
      dataType: 'json',
      type: 'GET',
      data: {latitude: current_lat, longitude: current_lon},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(status, err.toString());
      }.bind(this)
    });
  },
  handleMessageSubmit: function(message) {
    var messages = this.state.data;
    $.ajax({
      url: '/api/messages',
      dataType: 'json',
      type: 'POST',
      data: message,
      success: function(data) {
        console.log(data)
        var newMessages = [data].concat(messages);
        this.setState({data: newMessages});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Failed to create message");
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="messageBox">
        <h1>Messages</h1>
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
        <MessageList data={this.state.data} />
      </div>
    );
  }
});

var MessageList = React.createClass({
  render: function() {
    var messageNodes = this.props.data.map(function(message, index) {
      return (
        <Message key={index}>
          {message.content}
        </Message>
      );
    });
    return (
      <div className="messageList">
        {messageNodes}
      </div>
    );
  }
});

var MessageForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var content = this.refs.content.getDOMNode().value.trim();
    if (!content) {
      return;
    }
    this.props.onMessageSubmit({content: content, latitude: current_lat, longitude: current_lon});
    this.refs.content.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Say something..." ref="content" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var Message = React.createClass({
  render: function() {
    return (
      <div className="message">
        <h2 className="messageContent">
          {this.props.content}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="messages" handler={MessageBox} pollInterval={20000} />
      <DefaultRoute handler={Dashboard}/>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.body);