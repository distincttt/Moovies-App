import React from 'react'

class Genres extends React.Component {
  state = {
    spans: [],
  }

  componentDidMount() {
    this.Genres()
  }

  Genres = async () => {
    const gottenGenres = await this.props.GetGenres()
    const spans = this.props.genres.map((name, i) => {
      gottenGenres.forEach((element) => {
        if (element.id === name) name = element.name
      })
      return (
        <div key={i} className="card__items-genres-genre">
          {name}
        </div>
      )
    })
    this.setState({ spans: spans })
  }
  render() {
    return <div className="card__items-genres">{this.state.spans}</div>
  }
}

export default Genres
