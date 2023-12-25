import { Rate } from 'antd'
import { format } from 'date-fns'

import { GenresConsumer } from '../GenresContext/GenresContext'
import Genres from '../Genres/Genres'

import './Card.scss'

const Card = ({ title, dates, text, poster, onRated, genres, rating, starValue }) => {
  let imageUrl
  if (poster) {
    imageUrl = `https://image.tmdb.org/t/p/w500${poster}`
  } else imageUrl = 'https://via.placeholder.com/180x280/ebebeb/969696?text=no+picture'

  const textSplice = (text) => {
    const maxWords = 45
    if (text.split(' ').length < maxWords) return text
    else return `${text.split(' ').splice(0, maxWords).join(' ')} ...`
  }

  if (rating === '0.0') {
    rating = 0
  }

  let colorRating
  if (rating < 3) colorRating = 'card__items-header-rating-red'
  if (3 < rating && rating < 5) colorRating = 'card__items-header-rating-orange'
  if (5 < rating && rating < 7) colorRating = 'card__items-header-rating-yellow'
  if (7 < rating) colorRating = 'card__items-header-rating-green'

  return (
    <GenresConsumer>
      {({ GetGenres }) => {
        return (
          <li className="card">
            <img className="card__image" src={imageUrl} alt="#" />
            <div className="card__items">
              <div className="card__items-header">
                <title className="card__items-header-title">{title}</title>
                <div className={colorRating}>{rating}</div>
              </div>
              {Boolean(dates) && <time className="card__items-time">{format(new Date(dates), 'MMMM dd, yyyy')}</time>}
              <Genres GetGenres={GetGenres} genres={genres} />
              <span className="card__items-text">{textSplice(text)}</span>
              <Rate className="rate" count={10} onChange={onRated} value={starValue} />
            </div>
          </li>
        )
      }}
    </GenresConsumer>
  )
}

export default Card
