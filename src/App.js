import logo from './logo.svg';
import './App.css';
import React from 'react';

class RandomChar extends React.Component {
  render () {
    var posX = Math.floor(Math.random() * (this.props.maxX + 1));
    var posY = Math.floor(Math.random() * (this.props.maxY + 1));

    const styling = "bottom: " + String(posX) + ";left: " + String(posY);

    return (
      <p style={styling}>{this.props.text}</p>
    );
  }
}

class FlyingChars extends React.Component {
  render () {
    const tab = [
      "a", "z", "e", "r", "t", "t", "y", "u", "i", "o",
      "p", "q", "s", "d", "f", "g", "h", "j", "k", "l",
      "m", "w", "x", "c", "v", "b", "n"
    ];

    return (
      {
        tab.map((char) => (
          <RandomChar text={char}></RandomChar>
        ))
      }
    );
  }
}

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

class CentralPanel extends React.Component {
  render () {
    return (
      <div className="gridPanel">
        <FlyingChars nb="200"></FlyingChars>
        <div className="welcomeText">
          <p>The power of</p>
          <p><span>Words</span></p>
          <p><span>Thinking</span></p>
          <p><span>Facts</span></p>
        </div>
      </div>
    );
  }
}

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

class App extends React.Component {
  render () {
    return (
      <HomePage></HomePage>
    );
  }
}

export default App;
