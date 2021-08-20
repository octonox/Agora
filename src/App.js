import logo from './logo.svg';
import './App.css';
import React from 'react';

// Rrepesents the header with Agora written in it
class Header extends React.Component {
  render () {
    return (
      <header>
        <div className="headerFlex">
          <div className="title">
            <h2><span>Agora</span></h2>
          </div>
          <div className="headerBuf"></div>
        </div>
      </header>
    );
  }
}

// Represents a random character that will move on its own
class RandomChar extends React.Component {
  constructor (props) {
    super(props);
    this.state =  { // The state variables represent the position of the character in the window
      posX: Math.floor(Math.random() * (this.props.maxX + 1)),
      posY: Math.floor(Math.random() * (this.props.maxY + 1))
    };
  }

  // Each 1 seconds, the function move() will be called
  componentDidMount () {
    this.timerID = setInterval(
      () => this.move(), 1000
    );
  }

  // When it is called, move() changes the position of the character
  move () {
    this.setState({
        posX: Math.floor(Math.random() * (this.props.maxX + 1)),
        posY: Math.floor(Math.random() * (this.props.maxY + 1))
      });
  }

  componentWillUnmount () {
    clearInterval(this.timerID);
  }

  render () {
    return (
      <li style={{bottom: this.state.posX, left: this.state.posY}}>{this.props.text}</li>
    );
  }
}

// Generates all the flying characters
class FlyingChars extends React.Component {
  render () {
    const tab = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n'];

    return (
      <ul className="no-bullets">
      {
        tab.map((ch) => ( 
          <RandomChar text={ch} maxX={200} maxY={200}></RandomChar>
        ))
      }
      <li style={{ bottom: 3, left: 108 }}>Fuck I hope it works</li>
      </ul>
    );
  }
}

// Represents the central panel, with the characters and the text written in it
class CentralPanel extends React.Component {
  render () {
    return (
      <div>
        <FlyingChars nb="200"></FlyingChars>
        <div className="gridPanel">
          <div className="welcomeText">
            <p>The power of</p>
            <p><span>Words</span></p>
            <p><span>Thinking</span></p>
            <p><span>Facts</span></p>
          </div>
        </div>
      </div>
    );
  }
}

// The page we arrive in first
class HomePage extends React.Component {
  render () {
    return (
      <div className="bodyFlex">
        <Header></Header>
        <CentralPanel></CentralPanel>
      </div>
    );
  }
}

// The application that loads the differents pages depending on its state
class App extends React.Component {
  render () {
    return (
      <HomePage></HomePage>
    );
  }
}

export default App;
