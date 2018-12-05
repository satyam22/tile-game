import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component{
  constructor(props){
    super(props);
    const bestScore = Number(localStorage.getItem('reactTilesBestScore')) || 0;
    this.state = {
      timeLeft: 120,
      level: 'easy',
      score: 0,
      gameOn: false,
      totalTile: 9,
      position: 100,
      bestScore
    }
  }

  restartGame = () => {
    clearInterval(this.interval);
    this.setState({score: 0, timeLeft: 120, gameOn: false });
    this.startGame();
  }

  startGame = () => {
    this.setState({ gameOn: true })
    this.interval = setInterval(() => {
      const { timeLeft } = this.state;
      if(timeLeft === 0){
        clearInterval(this.interval);
        this.setState({gameOn: false })
      }
      else{
        const position = this.getRandomNumber();
        this.setState({timeLeft: timeLeft -1 , position });
      }
    },1000)
  }
  stopGame = () => {
    clearInterval(this.interval);
    this.setState({timeLeft: 120, score: 0, gameOn: false })
  }

  handleTileClick = (pos) => {
    console.log(pos);
    const { position, gameOn, score, bestScore } = this.state;
    if(gameOn && position === pos) {
      console.log("true")
      if(score === bestScore){
        localStorage.setItem('reactTilesBestScore', score+1);
        this.setState({ score: score+1, bestScore: score+1})
      }
      else {
        this.setState({ score: score+1 })
      }
    }
    else if(gameOn && score > 0){
      this.setState({ score: score-1 })
    }
  }

  getRandomNumber = () => {
    const { totalTile } = this.state;
    const randNumber = Math.floor(Math.random()*totalTile);
    return randNumber;
  }
  setEasyLevel = () => {
    const { level } = this.state;
    if(level !== 'easy'){
      this.setState({ level: 'easy', totalTile: 9 });
    }
  }

  setMediumLevel = () => {
    const { level } = this.state;
    if(level !== 'medium'){
      this.setState({ level: 'medium', totalTile: 16 });
    }
  }
  

  setHardLevel = () => {
    const { level } = this.state;
    if(level !== 'hard'){
      this.setState({ level: 'hard', totalTile: 36 });
    }
  }

  setEasyLevel = () => {
    const { level } = this.state;
    if(level !== 'easy'){
      this.setState({ level: 'easy', totalTile: 9 });
    }
  }

  render(){
    const { score, bestScore, timeLeft, level, position } = this.state;
    return(
      <div className = 'app'>
      <header>
        <nav>
          <button onClick = {this.setEasyLevel}>Easy</button>
          <button onClick = {this.setMediumLevel}>Medium</button>
          <button onClick = {this.setHardLevel}>Hard</button>
          <button onClick = {this.startGame}>Start Game</button>
          <button onClick = {this.restartGame}>Restart Game</button>
          <button onClick = {this.stopGame}>Stop Game</button>
        </nav>
        <p> Score: {score}</p>
        <p>Best Score: {bestScore} </p>
        <p>Time Left: {timeLeft}</p>
        <Board position = {position} level= {level} handleTileClick = {this.handleTileClick }/>
      </header>
      </div>
    )
  }
}
export default App;