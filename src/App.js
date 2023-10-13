import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import {
  ListItem,
  ScoreElement,
  Btn,
  ResultMessage,
  ChoiceImage,
} from './styledComponents'
import ButtonImage from './ButtonImage'
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
    userChoice: '',
    computerSelection: '',
    resultMessage: '',
  }

  resultCard = () => {
    const {userChoice, computerSelection, resultMessage} = this.state

    const userSelection = choicesList.filter(each => each.id === userChoice)[0]

    return (
      <div className="result-card">
        <ul className="game-card">
          <ListItem className="result-list-item-div">
            <p className="player">YOU</p>
            <Btn type="button">
              <ChoiceImage
                src={userSelection.imageUrl}
                id="your choice"
                alt="your choice"
              />
            </Btn>
          </ListItem>
          <ListItem className="result-list-item-div">
            <p className="player">OPPONENT</p>
            <Btn type="button">
              <ChoiceImage
                src={computerSelection.imageUrl}
                id="opponent choice"
                alt="opponent choice"
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

  startGame = userChoice => {
    const generatedIndex = Math.floor(Math.random() * 3)
    const computerSelection = choicesList[generatedIndex]
    const computerChoice = computerSelection.id

    let resultMessage = ''

    if (userChoice === computerChoice) {
      resultMessage = 'IT IS DRAW'
      this.setState({
        userChoice,
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
        userChoice,
        computerSelection,
        resultMessage,
        showResults: true,
      }))
    } else {
      resultMessage = 'YOU LOSE'
      this.setState(prevState => ({
        score: Math.max(prevState.score - 1),
        userChoice,
        computerSelection,
        resultMessage,
        showResults: true,
      }))
    }
  }

  onClickPlayAgain = () => {
    this.setState({showResults: false})
  }

  onClickChoice = userChoice => {
    this.startGame(userChoice)
  }

  renderChoices = choiceDetails => {
    const {id} = choiceDetails

    return (
      <ListItem key={id}>
        <ButtonImage
          choiceDetails={choiceDetails}
          onClickChoice={this.onClickChoice}
        />
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
