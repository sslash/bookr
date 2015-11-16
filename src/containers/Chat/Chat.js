import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
    state => ({user: state.auth.user})
)
export default class Chat extends Component {
    static propTypes = {
        user: PropTypes.object
    };

    state = {
        message: '',
        messages: []
    };

    componentDidMount() {
        if (socket && !this.onMsgListener) {
            this.onMsgListener = socket.on('msg', this.onMessageReceived.bind(this));

            setTimeout(() => {
                socket.emit('history', {offset: 0, length: 100});
            }, 100);
        }
    }

    componentWillUnmount() {
        if (socket && this.onMsgListener) {
            socket.removeListener('on', this.onMsgListener);
            this.onMsgListener = null;
        }
    }

    onMessageReceived(data) {
        const messages = this.state.messages;
        messages.push(data);
        this.setState({messages});
    }

    handleSubmit(event) {
        event.preventDefault();

        const msg = this.state.message;

        this.setState({message: ''});

        socket.emit('msg', {
            from: this.props.user.name,
            text: msg
        });
    }

    renderChat() {
        if (!this.props.hideHeader) {
            return;
        }

        if (this.props.user) {
            const {user} = this.props;
            return (<div>
                <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" ref="message" placeholder="Enter your message"
                        value={this.state.message}
                        onChange={(event) => {
                            this.setState({message: event.target.value});
                        }
                    }/>
                    <button className="btn" onClick={this.handleSubmit.bind(this)}>Send</button>
                </form>
            </div>);
        } else {
            return <a href="/login">Logg inn for å skrive meldinger</a>;
        }
    }

    render() {
        const style = require('./Chat.scss');

        return (
            <div className={style.chat + ' container'}>
                    {this.props.hideHeader ? null : <h1 className={style}>Meldinger</h1>}
                    <ul>
                        {this.state.messages.map((msg) => {
                            return <li key={`chat.msg.${msg.id}`}>{msg.from}: {msg.text}</li>;
                        })}
                    </ul>

                    {this.renderChat()}
            </div>
        );
    }
}
