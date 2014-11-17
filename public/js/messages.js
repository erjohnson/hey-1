var App = React.createClass({
  findCurrentPosition: function() {
    getLocation();
  },
  componentDidMount: function() {
    this.findCurrentPosition();
    setInterval(this.findCurrentPosition, this.props.pollInterval);
  },
  render: function() {
    var appContent;
    if (current_lat && current_lon) {
      appContent = <MessageBox url="/api/messages" pollInterval={20000} />;
    } else {
      appContent = <LoadingDialogue />;
    }
    return (
      appContent
    )
  }
});

var LoadingDialogue = React.createClass({
  render: function() {
    return (
      <h2>Loading...</h2>
    )
  }
});

var MessageBox = React.createClass({
  loadMessagesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      data: {latitude: current_lat, longitude: current_lon},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleMessageSubmit: function(message) {
    var messages = this.state.data;
    $.ajax({
      url: this.props.url,
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
        // `key` is a React-specific concept and is not mandatory for the
        // purpose of this tutorial. if you're curious, see more here:
        // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
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

var app = <App pollInterval={60000} />; // This is just a ReactElement.

React.render(app, document.body);