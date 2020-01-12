import React, {Component} from 'react';
import './App.css';
import {addNote} from "./notesActions";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            nameNote: '',
            textNote: '',
        };
        this.handleNoteNameChange = this.handleNoteNameChange.bind(this);
        this.handleNoteTextChange = this.handleNoteTextChange.bind(this);
        this.handleAddNote = this.handleAddNote.bind(this);
    }

    handleAddNote() {
        addNote({
            nameNote: this.state.nameNote,
            textNote: this.state.textNote,
            user: {email: 'admin', password: 'admin'}
        }).then(res => {
                fetch('http://localhost:3001/notes').then(res => res.json()).then((result) => {
                    this.setState({items: result.results})
                })
            }
        )

    }

    handleNoteNameChange = event => {
        this.setState({nameNote: event.target.value});
    };

    handleNoteTextChange = event => {
        this.setState({textNote: event.target.value});
    };

    componentDidMount() {
        fetch('http://localhost:3001/notes').then(res => res.json()).then((result) => {
            this.setState({items: result.results})
        })
    }

    render() {
        const {items} = this.state;
        return (
            <div className="Home">
                <header className="App-header">
                    <div>Hi, user!</div>
                    <menu>
                        <button>Grupuri</button>
                        <button>Etichete</button>
                    </menu>
                </header>
                <body>
                <h3>Notes</h3>
                <table>
                    <th>
                        <td>Name</td>
                        <td>Text</td>
                        <td>Created at</td>
                        <td>Updated at</td>
                    </th>
                    <tr>
                        {items.map(item => (
                            <div>
                                <td>{item.nameNote}</td>
                                <td>{item.textNote}</td>
                                <td>{item.createdAt}</td>
                                <td>{item.updatedAt}</td>
                            </div>
                        ))}
                    </tr>
                </table>
                <br/>
                <br/>
                <div>
                    <label>Name</label><br/>
                    <input type="text" onChange={this.handleNoteNameChange}/><br/>
                    <label>Text</label><br/>
                    <textarea onChange={this.handleNoteTextChange} rows="6" cols="60"/>
                </div>
                <button onClick={this.handleAddNote}>Add note</button>
                <br/>

                </body>
            </div>
        );
    }
}

export default HomePage;
