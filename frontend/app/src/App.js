import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {login} from "./authActions";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange() {
        if (login(this.state)) {
            this.props.history.push('/home');
        }

    };


    handleUsernameChange = event => {
        this.setState({username: event.target.value});
    };

    handlePasswordChange = event => {
        this.setState({password: event.target.value});
    };

    openRegisterPage = () => {
        this.props.history.push('/register');
    };

    render() {
        return (
            <div className="App">
                <header className="App-header"/>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    WELCOME TO STUDENT NOTES!
                </p>
                <form>
                    <div>Email:</div>
                    <input type="email" onChange={this.handleUsernameChange} value={this.state.username}/>
                    <div>Parola:</div>
                    <input type="password" onChange={this.handlePasswordChange} value={this.state.password}/>
                </form>
                <br/>
                <button className="button" onClick={this.routeChange}>LOGIN</button>
                <br/>
                <button className="button" onClick={this.openRegisterPage}>REGISTER</button>
            </div>
        );
    }

}


export default App;
