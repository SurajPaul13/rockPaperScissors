import {ChoiceImage, Btn} from './styledComponents'

const ButtonImage = props => {
  const {choiceDetails, onClickChoice} = props
  const {id, imageUrl, testId} = choiceDetails

  const onClickButton = () => {
    onClickChoice(id)
  }

  return (
    <Btn type="button" data-testid={testId} onClick={onClickButton}>
      <ChoiceImage src={imageUrl} alt={id} />
    </Btn>
  )
}

export default ButtonImage
