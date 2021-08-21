import logo from './logo.svg';
import './App.css';
import React from 'react';
import { getDefaultNormalizer } from '@testing-library/react';

class PlaneVect {
  constructor(constant, otherVect) {
    this.x = constant * otherVect.x();
    this.y = constant * otherVect.y();
  }

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

/* Returns the subtraction of the two vectors */
function subVect(vectA, vectB) {
  return new PlaneVect(vectA.x() - vectB.x(), vectA.y() - vectB.y())
}

/* Returns the distance between two points A and B */
function norme(pointA, pointB) {
  return Math.sqrt((pointA.x() - pointB().x())^2 + (pointA.y() - pointA.x())^2)
}

/* Returns the direction of the vector between A and B (its angle with the x-axis) */
/* A and B must be PlaneVect's */
function calculateDirection(pointA, pointB) {
  VectAB = subVect(pointB, pointA);

  if (VectAB.x() >= 0 && VectAB.y() >= 0) {
    return Math.atan(VectAB.y()/VectAB.x())
  } else if (VectAB.x() < 0 && VectAB.y() >= 0) {
    return Math.PI - Math.atan(VectAB.y()/VectAB.x())
  } else if (VectAB.x() < à && VectAB.y() < 0) {
    return Math.PI + Math.atan(VectAB.y()/VectAB.x())
  } else {
    return 2 * Math.PI - Math.atan(VectAB.y()/VectAB.x())
  }
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

class FieldPoint {
  constructor(maxMass, maxX, maxY) {
    this.mass = Math.random() * maxMass;
    this.position = new PlaneVect(Math.random() * maxX, Math.random() * maxY);
  }

  mass() {
    return this.mass
  }

  position() {
    return this.position
  }
}

/* Returns the force vector between A and B */
function NewtonLaw(G, mass, A, B) {
  return PlaneVect(G * mass^2 / norme(A, B)^3, subVect(B, A))
}

// Represents a random character that will move on its own
class RandomChar extends React.Component {
  constructor (props) {
    super(props);
    const bufX = Math.random() * (this.props.maxX + 1);
    const bufY = Math.random() * (this.props.maxY + 1);
    const bufPosition = new PlaneVect(bufX, bufY)
    const bufFieldPoint = new FieldPoint(this.props.maxMass, this.props.maxX + 1, this.props.maxY + 1);

    /* The states variables will be the acceleration, the velocity and the position of the character */
    /* velx and vely are the maximum velocity possible */
    /* Field point is the random point which is going to apply a force on the character, and thus an acceleration */
    /* Explanation on the acceleration:
          We use here newton laws of gravitation to calculate the acceleration induced by the field point
          So basically this tough formula is just the vectorial application of this law
          We multiply the unity vector (AB/norme(AB)) by G*mass^2/norme(AB)^2 
          G is chosen by us as a property, it is by changing its value that we'll change the ways characters move */

    this.state =  {
      fieldPoint = bufFieldPoint,
      acceleration = NewtonLaw(this.props.G, bufFieldPoint.mass(), bufPosition, bufFieldPoint.position()),
      velocity = new PlaneVect(Math.random() * this.props.velx, Math.random() * this.props.vely),
      position = bufPosition
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
    and each time move() is called, the char has a chance (maybe one out of ten) to undergo a new force, and hence a new acceleration,
    which means its velocity will change, depending on the laws of kinematics. It is like programming a particle
    that flies in a magnetic field */

    // First is decided whether a new FieldPoint is applied or not 
    if (Math.random() <= 0.1) {
      // In this case we create a new field point and calculate the new acceleration
      newFieldPoint = new FieldPoint(this.props.maxMass, this.props.maxX, this.props.maxY);

      // We change the value of the state variable acceleration
      this.setState({
        fieldPoint: newFieldPoint,
        acceleration: NewtonLaw(this.props.G, newFieldPoint.mass(), this.state.position(), newFieldPoint.position())
      });
    }

    // If there was a new field point created, the character will undergo a new acceleration, which will change its velocity and position
    // Now, the character must be moved
    // The speed changes the position, and the acceleration changes the speed. Finally, the new position changes the acceleration, because the vector between the point and the field point is not the same
    const newPosition = new PlaneVect(this.state.position.x() + this.state.velocity.x(), this.state.position.y() + this.state.velocity.y());
    const newVelocity = new PlaneVect(this.state.velocity.x() + this.state.acceleration.x(), this.state.velocity.y() + this.state.acceleration.y());
    const newAcceleration = NewtonLaw(this.props.G, this.state.fieldPoint.mass(), newPosition, this.state.fieldPoint);

    this.setState({
      position: newPosition,
      velocity: newVelocity,
      acceleration: newAcceleration
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
          <RandomChar text={ch} maxMass={} maxX={1400} maxY={1000} velx={} vely={} G={}></RandomChar> // TO CHANGE THE SQUARE IN WHICH THEY CAN MOVE
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
