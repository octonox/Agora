import logo from './logo.svg';
import './App.css';
import React from 'react';

class PlaneVect {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  x() {
    return this.x;
  }

  y() {
    return this.x;
  }

  setx(newx) {
    this.x = newx;
  }

  sety(newy) {
    this.y = newy;
  }
}

function calculateDirection() {
  /* To be implemented */
}

// Represents the header with Agora written in it
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
    /* The states variables will be the acceleration, the velocity and the position of the character */
    this.state =  {
      acceleration = new PlaneVect(),
      velocity = new PlaneVect(),
      position = new PlaneVect()
    };
  }

  // Each 0.01 miliseconds, the function move() will be called
  componentDidMount () {
    this.timerID = setInterval(
      () => this.move(), 0.1
    );
  }

  // When it is called, move() changes the position of the character
  // We generate a number between 0 and 2pi, which is the direction of the letter, and then another number, the speed
  // By using trigonometry, we find the numbers to add to the positions
  move () {
    /* Si on veut qu'ils grelottent ce code est pas mal 
    const direction = Math.random() * 2 * Math.PI;
    const hypothenus = Math.random() * 10;
    const toAddX = hypothenus * Math.cos(direction);
    const toAddY = hypothenus * Math.sin(direction); */

    /* What we want is that the char has an acceleration, and an initial velocity and position,
    and each time move() is called, the char has a chance to undergo a new force, and hence a new acceleration,
    which means its velocity will change, depending on the laws of kinematics. It is like programming a particle
    that flies in a magnetic field */
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
          <RandomChar text={ch} maxX={1400} maxY={1000}></RandomChar> // TO CHANGE THE SQUARE IN WHICH THEY CAN MOVE
        ))
      }
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
