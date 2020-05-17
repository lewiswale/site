import Head from 'next/head'
import {useState, Component} from 'react'


class Poodle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            sender: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        await fetch('http://localhost:5000/sender?message=' + this.state.message, {
            method: 'get'
        })
        .then((res) => res.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({sender: responseJson})
        });
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Poodle bot</title>
                </Head>

                <body>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Message:
                            <input type="text" value={this.state.text} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    <div>
                        <h3>Predicted sender: {this.state.sender}</h3>
                    </div>
                </body>

            </div>
        );
    }

}

export default Poodle
