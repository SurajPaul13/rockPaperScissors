import {ListItem, Btn, ChoiceImage} from './styledComponents'

const ImageButton = props => {
  const {choiceDetails, onClickChoice} = props
  const {id, imageUrl, testId} = choiceDetails

  const onClickButton = () => {
    onClickChoice(choiceDetails)
  }

  return (
    <ListItem key={id}>
      <Btn type="button" data-testid={testId} onClick={onClickButton}>
        <ChoiceImage src={imageUrl} alt={id} />
      </Btn>
    </ListItem>
  )
}

export default ImageButton
