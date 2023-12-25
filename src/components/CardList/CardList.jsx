import Card from '../Card/Card'
import './CardList.scss'

const CardList = ({ films, onRated }) => {
  return (
    <ul className="cards">
      {films.map((el) => {
        return <Card key={el.id} {...el} onRated={(star) => onRated(el.id, star)} />
      })}
    </ul>
  )
}
export default CardList
