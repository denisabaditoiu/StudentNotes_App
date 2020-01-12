import React, {Component} from 'react';

class Register extends Component {

    render() {
        return (
            <div style={{textAlign: "center"}} >
                <header className="App-header">REGISTER NOW</header>
                <form>
                    <div>Nume:</div>
                    <input type="text"/>
                    <div>Email:</div>
                    <input type="email"/>
                    <div>Parola:</div>
                    <input type="password"/>
                </form>
                <button className="button">REGISTER</button>
            </div>
        );
    }
}

export default Register;
