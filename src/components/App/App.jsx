import React from 'react'
import { Spin, Input } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Offline, Online } from 'react-detect-offline'
import { debounce } from 'lodash'

import GetMoovies from '../GetMoovies/GetMoovies'
import GetGenres from '../GetGenres/GetGenres'
import CardList from '../CardList/CardList'
import Error from '../Error/Error'
import Pages from '../Pagination/Pagination'
import Tab from '../Tab/Tab'
import { GenreProvider } from '../GenresContext/GenresContext'

import './App.scss'
class App extends React.Component {
  state = {
    films: [],
    total: null,
    error: false,
    search: '',
    page: 1,
    localFilms: [],
  }

  getMoovies = new GetMoovies()
  getGenres = new GetGenres()

  onError = (err) => {
    this.setState({ error: err.message })
  }

  getCards = async (search = 'return', page = 1) => {
    if (search === '') search = 'return'
    const { arrayMoovies, total, localFilms } = await this.getMoovies
      .getMoovies(search, page)
      .catch((err) => this.onError(err))
    if (arrayMoovies) {
      this.setState({ films: arrayMoovies, total: total, error: false })
    }
    this.setState({ localFilms: localFilms })
  }

  componentDidMount() {
    this.getCards()
  }

  componentDidCatch(err) {
    this.onError(err)
  }

  componentDidUpdate(_, prevState) {
    if (prevState !== this.state) this.render()
  }

  onRated = (id, star) => {
    this.setState(({ films, localFilms }) => {
      const idx = films.findIndex((el) => el.id === id)
      const oldItem = films[idx]
      const newItem = { ...oldItem, starValue: star }
      console.log(newItem)
      if (localFilms.length) {
        for (let i = 0; i < localFilms.length; i++) {
          if (localFilms[i].idMovies === oldItem.idMovies) {
            let newLocalItem = { ...localFilms[i], starValue: star }
            localStorage.removeItem(i)
            localStorage.setItem(i, JSON.stringify(newLocalItem))
            return {
              localFilms: [...localFilms.slice(0, i), newLocalItem, ...localFilms.slice(i + 1)],
              films: [...films.slice(0, idx), newItem, ...films.slice(idx + 1)],
            }
          }
        }
        let localItem = { ...oldItem, starValue: star, id: localFilms.length }
        localStorage.setItem(localStorage.length, JSON.stringify(localItem))
        console.log(this.state.films)
        return {
          localFilms: [...localFilms, localItem],
          films: [...films.slice(0, idx), newItem, ...films.slice(idx + 1)],
        }
      } else {
        let localItem = { ...oldItem, starValue: star, id: localFilms.length }
        localStorage.setItem(localStorage.length, JSON.stringify(localItem))
        return {
          localFilms: [...localFilms, localItem],
          films: [...films.slice(0, idx), newItem, ...films.slice(idx + 1)],
        }
      }
    })
    // console.log(this.state.localFilms)
    // localStorage.clear()
  }

  changeRated = (id, star) => {
    this.setState(({ localFilms, films }) => {
      const idx = localFilms.findIndex((el) => el.id === id)
      const oldItem = localFilms[idx]
      const newItem = { ...oldItem, starValue: star }
      localStorage.removeItem(id)
      localStorage.setItem(id, JSON.stringify(newItem))

      const [oldItemFilms] = films.filter((el) => el.idMovies === newItem.idMovies)
      const newItemFilms = { ...oldItemFilms, starValue: star }
      let i = newItemFilms.id
      return {
        localFilms: [...localFilms.slice(0, idx), newItem, ...localFilms.slice(idx + 1)],
        films: [...films.slice(0, i), newItemFilms, ...films.slice(i + 1)],
      }
    })
  }

  debouncedGetCards = debounce((search) => {
    this.setState({ page: 1 })
    this.getCards(search)
  }, 1000)

  onLabelChange = (e) => {
    this.setState({ search: e.target.value })
    this.debouncedGetCards(e.target.value)
  }

  onPageChange = (page) => {
    this.setState({ page: page })
    this.getCards(this.state.search, page)
  }

  render() {
    let tabOne = {
      key: '1',
      label: 'Search',
      children: (
        <>
          <Input placeholder="Search" className="input" onChange={this.onLabelChange} value={this.state.search} />
          {!this.state.films.length && !this.state.error && (
            <Spin className="spin" indicator={<LoadingOutlined style={{ fontSize: 300 }} spin />} />
          )}
          {this.state.error.length && <Error text={this.state.error} />}
          {this.state.films.length !== 0 && !this.state.error && (
            <GenreProvider value={this.getGenres}>
              <CardList films={this.state.films} onRated={this.onRated} />
              <Pages onPageChange={this.onPageChange} total={this.state.total} page={this.state.page} />
            </GenreProvider>
          )}
        </>
      ),
    }
    let tabTwo
    if (this.state.localFilms.length) {
      tabTwo = {
        key: '2',
        label: 'Rated',
        children: (
          <GenreProvider value={this.getGenres}>
            <CardList films={this.state.localFilms} onRated={this.changeRated} />
          </GenreProvider>
        ),
      }
    } else
      tabTwo = {
        key: '2',
        label: 'Rated',
        children: <Error text="Your wishlist is empty. Add a rating to any movie." />,
      }
    const items = [tabOne, tabTwo]
    return (
      <>
        <Online>
          <main className="main">
            <Tab items={items} />
          </main>
        </Online>
        <Offline>
          <Error text="Sorry, you don't have an internet connection..." />
        </Offline>
      </>
    )
  }
}

export default App
