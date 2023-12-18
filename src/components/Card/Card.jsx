import './Card.scss'
import { format } from 'date-fns'

const Card = ({ title, dates, text, poster, onCardClick }) => {
  let imageUrl
  if (poster) {
    imageUrl = `https://image.tmdb.org/t/p/w500${poster}`
  } else imageUrl = 'https://via.placeholder.com/180x280/ebebeb/969696?text=no+picture'

  const textSplice = (text) => {
    const maxWords = 45
    if (text.split(' ').length < maxWords) return text
    else return `${text.split(' ').splice(0, maxWords).join(' ')} ...`
  }

  return (
    <li className="card" onClick={onCardClick}>
      <img className="card__image" src={imageUrl} alt="#" />
      <div className="card__items">
        <title className="card__items-title">{title}</title>
        {Boolean(dates) && <time className="card__items-time">{format(new Date(dates), 'MMMM dd, yyyy')}</time>}
        <div className="card__items-genres">
          <span className="card__items-genres-genre">Action</span>
          <span className="card__items-genres-genre">Drama</span>
        </div>
        <span className="card__items-text">{textSplice(text)}</span>
      </div>
    </li>
  )
}

export default Card
