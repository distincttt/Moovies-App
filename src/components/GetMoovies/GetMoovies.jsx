class GetMoovies {
  constructor() {
    this._apiBase = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&'
    this._token =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWU0ZDFmNzIxMDYzNjg5MjI3MjE1ZGZkNDAzZjRjYyIsInN1YiI6IjY1Nzk4ZDU5ODlkOTdmMDExZGNlMDc2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rydNhrcnM1QaHzbyPkH8V7CjBa1sa88dc-MpkxI-gt0'
  }
  getMoovies = async (search, page) => {
    const url = this._apiBase + `query=${search}&page=${page}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this._token,
      },
    })
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`, `received ${res.status}`)
    } else {
      let response = await res.json()
      const total = response.total_results
      let localFilms = []
      for (let i = 0; i < localStorage.length; i++) {
        localFilms.push(JSON.parse(localStorage.getItem(i)))
      }
      if (response.results?.length) {
        const arrayMoovies = response.results.map((el, inc) => {
          for (let i = 0; i < localFilms.length; i++) {
            if (localFilms[i]?.idMovies === el.id) {
              console.log(localFilms[i].idMovies, el.id)
              const localFilmsReturned = { ...localFilms[i], id: inc }
              return localFilmsReturned
            }
          }
          return {
            id: inc,
            title: el.title,
            dates: el.release_date,
            genres: el.genre_ids,
            text: el.overview,
            poster: el.poster_path,
            rating: el.vote_average.toFixed(1),
            starValue: 0,
            idMovies: el.id,
          }
        })
        console.log(arrayMoovies)
        return { arrayMoovies, total, localFilms }
      } else throw new Error('Sorry, nothing was found according to your request...')
    }
  }
}

export default GetMoovies
// https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1
