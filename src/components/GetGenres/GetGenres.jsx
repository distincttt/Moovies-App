class GetGenres {
  constructor() {
    this._apiBase = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    this._token =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWU0ZDFmNzIxMDYzNjg5MjI3MjE1ZGZkNDAzZjRjYyIsInN1YiI6IjY1Nzk4ZDU5ODlkOTdmMDExZGNlMDc2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rydNhrcnM1QaHzbyPkH8V7CjBa1sa88dc-MpkxI-gt0'
  }
  GetGenres = async () => {
    const res = await fetch(this._apiBase, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this._token,
      },
    })
    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}`, `received ${res.status}`)
    }
    const response = await res.json()
    // console.log(response.genres)
    return response.genres
  }
}

export default GetGenres
