import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import {ListItem, ScoreElement, Btn, ResultMessage} from './styledComponents'
import Image from './Image'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
    testId: 'rockButton',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
    testId: 'paperButton',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
    testId: 'scissorsButton',
  },
]

class App extends Component {
  state = {
    score: 0,
    showResults: false,
    userSelection: '',
    computerSelection: '',
    resultMessage: '',
  }

  resultCard = () => {
    const {userSelection, computerSelection, resultMessage} = this.state
    return (
      <div className="result-card">
        <ul className="game-card">
          <ListItem className="result-list-item-div">
            <p className="player">YOU</p>
            <Btn type="button">
              <Image imageUrl={userSelection.imageUrl} id="your choice" />
            </Btn>
          </ListItem>
          <ListItem className="result-list-item-div">
            <p className="player">OPPONENT</p>
            <Btn type="button">
              <Image
                imageUrl={computerSelection.imageUrl}
                id="opponent choice"
              />
            </Btn>
          </ListItem>
        </ul>
        <ResultMessage>{resultMessage}</ResultMessage>
        <button
          type="button"
          onClick={this.onClickPlayAgain}
          className="play-again"
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  startGame = userSelection => {
    const userChoice = userSelection.id

    const generatedIndex = Math.floor(Math.random() * 3)
    const computerSelection = choicesList[generatedIndex]
    const computerChoice = computerSelection.id

    let resultMessage = ''

    if (userChoice === computerChoice) {
      resultMessage = 'IT IS DRAW'
      this.setState({
        userSelection,
        computerSelection,
        resultMessage,
        showResults: true,
      })
    } else if (
      (userChoice === 'ROCK' && computerChoice === 'SCISSORS') ||
      (userChoice === 'PAPER' && computerChoice === 'ROCK') ||
      (userChoice === 'SCISSORS' && computerChoice === 'PAPER')
    ) {
      resultMessage = 'YOU WON'
      this.setState(prevState => ({
        score: prevState.score + 1,
        userSelection,
        computerSelection,
        resultMessage,
        showResults: true,
      }))
    } else {
      resultMessage = 'YOU LOSE'
      this.setState(prevState => ({
        score: Math.max(prevState.score - 1),
        userSelection,
        computerSelection,
        resultMessage,
        showResults: true,
      }))
    }
  }

  onClickPlayAgain = () => {
    this.setState({showResults: false})
  }

  renderChoices = choiceDetails => {
    const {id, imageUrl, testId} = choiceDetails
    const onClickChoice = () => {
      this.startGame(choiceDetails)
    }

    return (
      <ListItem key={id}>
        <Btn type="button" data-testid={testId} onClick={onClickChoice}>
          <Image imageUrl={imageUrl} id={id} />
        </Btn>
      </ListItem>
    )
  }

  renderPopup = () => (
    <div className="pop-up-container">
      <Popup
        modal
        trigger={
          <button className="rules-btn" type="button">
            RULES
          </button>
        }
      >
        {close => (
          <div className="rules-popup">
            <div className="pop-btn-container">
              <button
                type="button"
                className="close-popup-btn"
                onClick={() => close()}
              >
                <RiCloseLine />
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
              alt="rules"
              className="rules-image"
            />
          </div>
        )}
      </Popup>
    </div>
  )

  render() {
    const {score, showResults} = this.state
    return (
      <div className="main-bg">
        <div className="score-card-container">
          <div>
            <h1 className="game-name">Rock Paper Scissors</h1>
          </div>
          <div className="score-card">
            <p className="score-head">Score</p>
            <ScoreElement>{score}</ScoreElement>
          </div>
        </div>
        {showResults ? (
          this.resultCard()
        ) : (
          <ul className="game-card">
            {choicesList.map(eachChoice => this.renderChoices(eachChoice))}
          </ul>
        )}
        {this.renderPopup()}
      </div>
    )
  }
}

export default App
