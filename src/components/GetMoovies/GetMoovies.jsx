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
      if (response.results?.length) {
        return response.results.map((el, i) => {
          return {
            id: i,
            title: el.title,
            dates: el.release_date,
            genres: el.genre_ids,
            text: el.overview,
            poster: el.poster_path,
          }
        })
      } else throw new Error('Sorry, nothing was found according to your request...')
    }
  }
}

export default GetMoovies
// https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1
