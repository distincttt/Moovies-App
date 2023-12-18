import React from 'react'
import { Spin, Input } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Offline, Online } from 'react-detect-offline'
import { debounce } from 'lodash'

import GetMoovies from '../GetMoovies/GetMoovies'
import CardList from '../CardList/CardList'
import Error from '../Error/Error'
import Pages from '../Pagination/Pagination'
import './App.scss'

class App extends React.Component {
  state = {
    films: [],
    error: false,
    search: '',
  }

  getMoovies = new GetMoovies()

  onError = (err) => {
    this.setState({ error: err.message })
  }

  getCards = async (search = 'return', page = 1) => {
    const arrayMoovies = await this.getMoovies.getMoovies(search, page).catch((err) => this.onError(err))
    if (arrayMoovies) {
      this.setState({ films: arrayMoovies })
      this.setState({ error: false })
    }
  }

  componentDidMount() {
    this.getCards()
  }

  // componentDidUpdate(_, prevState) {
  //   console.log(prevState)
  //   if (this.state.search != prevState.search) this.render()
  // }

  onCardClick = (id) => {
    console.log(id)
  }

  debouncedGetCards = debounce((search) => {
    this.getCards(search)
  }, 1000)

  onLabelChange = (e) => {
    this.setState({ search: e.target.value })
    this.debouncedGetCards(e.target.value)
  }

  onPageChange = (page) => {
    // await this.setState({ page: page })
    this.getCards(this.state.search, page)
  }

  render() {
    return (
      <main className="main">
        <Online>
          <Input placeholder="Search" className="input" onChange={this.onLabelChange} value={this.state.search} />
          {!this.state.films.length && !this.state.error && (
            <Spin className="spin" indicator={<LoadingOutlined style={{ fontSize: 300 }} spin />} />
          )}
          {this.state.error.length && <Error text={this.state.error} />}
          {this.state.films.length !== 0 && !this.state.error && (
            <>
              <CardList films={this.state.films} onCardClick={this.onCardClick} />{' '}
              <Pages onPageChange={this.onPageChange} />
            </>
          )}
        </Online>
        <Offline>
          <Error text="Sorry, you don't have an internet connection..." />
        </Offline>
      </main>
    )
  }
}

export default App
