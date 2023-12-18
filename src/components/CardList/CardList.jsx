import Card from '../Card/Card'
import './CardList.scss'

const CardList = ({ films, onCardClick }) => {
  return (
    <ul className="cards">
      {films.map((el) => {
        return <Card key={el.id} {...el} onCardClick={() => onCardClick(el.id)} />
      })}
    </ul>
  )
}

export default CardList
