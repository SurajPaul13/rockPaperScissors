import {ChoiceImage} from './styledComponents'

const Image = props => {
  const {id, imageUrl} = props

  return <ChoiceImage src={imageUrl} alt={id} />
}

export default Image
