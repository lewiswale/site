import Link from 'next/link'
import Head from 'next/head'
import {useState, Component} from 'react'
import cardsStyle from '../styles/cards.module.css'

class Poker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerId: -1,
            playerCount: -1,
            card1: "14S",
            card2: "14H",
            card1img: "AS",
            card2img: "AH",
            joinedGame: false
        };

        this.getHand = this.getHand.bind(this);
        this.getImageName = this.getImageName.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    getImageName(value, suit) {
        switch(value) {
            case 11:
                return 'J' + suit;
            case 12:
                return 'Q' + suit;
            case 13:
                return 'K' + suit;
            case 14:
                return 'A' + suit;
            default:
                return value + suit;
        }
    }

    parseGameState(responseJson) {
        var id = responseJson['player']['id'];
        var count = responseJson['playerCount'];
        var value1 = responseJson['player']['playerHand'][0]['value'];
        var suit1 = responseJson['player']['playerHand'][0]['suit'];
        var value2 = responseJson['player']['playerHand'][1]['value'];
        var suit2 = responseJson['player']['playerHand'][1]['suit'];
        var img1 = this.getImageName(value1, suit1);
        var img2 = this.getImageName(value2, suit2);

        this.setState({
            playerId: id,
            playerCount: count,
            card1: value1 + suit1,
            card2: value2 + suit2,
            card1img: img1,
            card2img: img2
        });
    }

    async getHand(event) {

        await fetch(`http://localhost:8080/api/player/get-hand/` + this.state.playerId, {
            method: 'get'
        })
        .then((res => res.json()))
        .then((responseJson) => {
            console.log(responseJson);
            this.parseGameState(responseJson);
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        });
    }

    async joinGame(event) {
        await fetch('http://localhost:8080/api/game/join-game', {
            method: 'get'
        })
        .then((res) => res.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.parseGameState(responseJson);
            this.setState({
                joinedGame: true
            });
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        })
    }

    render() {
        if (!this.state.joinedGame) {
            return (
                <div>
                    <Head>
                        <title>Poker</title>
                    </Head>

                    <body>
                        <div>
                            <button onClick={this.joinGame}>Join game</button>
                        </div>
                    </body>
                </div>
            )
        } else {
            return (
                <div>
                    <Head>
                        <title>Poker</title>
                    </Head>

                    <body>
                        <div>
                            <img className={cardsStyle.card} src={`/cards/${this.state.card1img}.png`} alt={this.state.card1img}/>
                            <img className={cardsStyle.card} src={`/cards/${this.state.card2img}.png`} alt={this.state.card2img}/>
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
}

export default Poker
