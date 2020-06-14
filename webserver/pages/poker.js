import Link from 'next/link'
import Head from 'next/head'
import {useState, Component} from 'react'

class Poker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card1: "",
            card2: ""
        };

        this.getHand = this.getHand.bind(this);
    }

    async getHand(event) {
        await fetch('http://localhost:8080/api/player/get-hand', {
            method: 'get'
        })
        .then((res => res.json()))
        .then((responseJson) => {
            this.setState({card1: responseJson[0]['value'] + responseJson[0]['suit'], card2: responseJson[1]['value'] + responseJson[1]['suit']})
        });

    }

    render() {
        return (
            <div>
                <Head>
                    <title>Poker</title>
                </Head>

                <body>
                    <div>
                        {this.state.card1} {this.state.card2}
                    </div>
                    <div>
                        <button onClick={this.getHand}>
                            Get hand!
                        </button>
                    </div>
                </body>
            </div>
        )
    }
}

export default Poker
