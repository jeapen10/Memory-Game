import React, { Component } from 'react';
import OfficeCard from "./components/OfficeCard";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import characters from "./characters.json";
import logo from './logo.svg';
import './App.css';

// Random shuffle 
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
};

// this.state
class App extends Component {
  state = {
    characters, 
    newScore: 0,
    highScore: 0,
    clicked: []
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState ({ clicked: this.state.clicked.concat(id) });
    } else {
      alert("Sorry, you already clicked that character!");
      this.handleReset();
    }
    this.handleShuffle()
  };

  handleIncrement = () => {
    const newScore = this.state.newScore + 1;
    console.log(newScore)
    this.setState({ newScore: newScore });
    if (newScore >= this.state.highScore) {
      this.setState({ highScore: newScore });
    } 
    if (newScore === 15) {
      console.log("You won");
      console.log(this.state.newScore);
      alert ("Nice work, you won!!");
    }
  };

  handleShuffle = () => {
    let shuffledCharacters = shuffleArray(characters);
    this.setState({ characters: shuffledCharacters });
  };

  handleReset = () => {
    this.setState({
      newScore: 0,
      highScore: this.state.highScore,
      clicked: []
    });
   
  };

  render() {
    return (
      <Wrapper>
        <Header>
          <h1>The Office Memory Game</h1>
          <br/>
            <h4>Try to click on all the characters without repeating any.....or we will release the dementors!</h4>
        </Header>
        <h1 className="scoring">
          Score: {this.state.newScore}
          <br />
          <br />
          High Score: {this.state.highScore}
        </h1>

        {this.state.characters.map(character => (
          <OfficeCard
            handleClick={this.handleClick}
            id={character.id}
            key={character.id}
            image={character.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
