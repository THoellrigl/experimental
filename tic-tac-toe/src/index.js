import React from 'react';
import ReactDOM from 'react-dom';
//import FB from 'fb-react-sdk';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import './index.css';


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

var userLoggedIn = false;
var loggedInUser = '';

/*function getUserLoginStatus(response){
if (response.status === 'connected') {
    // the user is logged in and has authenticated your
    // app, and response.authResponse supplies
    // the user's ID, a valid access token, a signed
    // request, and the time the access token
    // and signed request each expire
    var uid = response.authResponse.userID;
    var accessToken = response.authResponse.accessToken;
} else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook,
    // but has not authenticated your app
} else {
    // the user isn't logged in to Facebook.
}
};*/

class PlayerList extends React.Component{
    render() {
        return (
            <ol>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ol>
        );
    }
}

const responseFacebook = (response) => {
    if (response.expiresIn > 0) {
        userLoggedIn = true;
        loggedInUser = response.name;
    }else{
        userLoggedIn = false;
    }
};

function UserLogin(){
    if (!userLoggedIn){
    return (
        <div className='status'>Please login!&nbsp;&nbsp;&nbsp;
            <FacebookLogin
                appId="572367896437141"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}>
            </FacebookLogin>
        </div>
    );
    }else{
        return(
            <div className='status'>Logged in with account of:&nbsp;
                {loggedInUser}
            </div>
        );
    }
}

class Board extends React.Component {

    /*renderUserLogin(props) {
        return (
          < UserLogin
              value={props}
          />
        );
    }*/

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}


class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
            items: [],
            text: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                    squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    setStateIfMounted(state) {
        if (this._isMounted) {
            this.setState(state);
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        if (this.state.items.length > 1) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: ''
        }));
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map ((step,move) => {
            const desc = move ?
                'Go to move #' +move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if(this.state.items.length >= 2) {
            const player1 = this.state.items[0].text;
            const player2 = this.state.items[1].text;
            if (winner) {
                status = 'Winner: ' + ((winner === 'X') ? player1 : player2);
            }else{
                status = 'Next player: ' + (this.state.xIsNext ? player1 : player2);
            }
        }


        if(this.state.items.length < 2){
            return (
                <div className="game">
                    <div className="status">
                        <UserLogin />
                    </div>
                    <div className='status'>
                        <h3>Players</h3>
                        <PlayerList items={this.state.items}/>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                onChange={this.handleChange}
                                value={this.state.text}
                            />
                        </form>
                        <button>
                            Add #{this.state.items.length + 1}
                        </button>
                    </div>
                    <div className="status">Please add at two players!</div>
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                <div className="status">&nbsp;&nbsp;&nbsp;
                <UserLogin />
                </div>
                <div className='status'>
                <h3>Players</h3>
                <PlayerList items={this.state.items}/>
                </div>
                <div className="status">{status}</div>
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            );
        }
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

Board.propTypes = {
    isDisabled: PropTypes.bool,
    callback: PropTypes.func.isRequired,
    appId: PropTypes.string.isRequired,
    xfbml: PropTypes.bool,
    cookie: PropTypes.bool,
    reAuthenticate: PropTypes.bool,
    scope: PropTypes.string,
    returnScopes: PropTypes.bool,
    redirectUri: PropTypes.string,
    textButton: PropTypes.string,
    typeButton: PropTypes.string,
    autoLoad: PropTypes.bool,
    disableMobileRedirect: PropTypes.bool,
    isMobile: PropTypes.bool,
    size: PropTypes.string,
    fields: PropTypes.string,
    cssClass: PropTypes.string,
    version: PropTypes.string,
    icon: PropTypes.any,
    language: PropTypes.string,
    onClick: PropTypes.func,
    containerStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    children: PropTypes.node,
    tag: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onFailure: PropTypes.func,
    userLoggedIn: PropTypes.string,
};

Board.defaultProps = {
    textButton: 'Login with Facebook',
    typeButton: 'button',
    redirectUri: typeof window !== 'undefined' ? window.location.href : '/',
    scope: 'public_profile,email',
    returnScopes: false,
    xfbml: false,
    cookie: false,
    reAuthenticate: false,
    size: 'metro',
    fields: 'name',
    cssClass: 'kep-login-facebook',
    version: '2.3',
    language: 'en_US',
    disableMobileRedirect: false,
    tag: 'button',
    onFailure: null,
};


/*function userLogin(squares){
  let user
  return null;
}*/


// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

