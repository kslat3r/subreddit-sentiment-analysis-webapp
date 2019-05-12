import React from 'react'
import { inject, observer } from 'mobx-react'
import SearchAppBar from '../components/SearchAppBar'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Subreddits from '../components/Subreddits'
import LoadMore from '../components/LoadMore'
import Subreddit from '../components/Subreddit'

@inject('subredditStore')
@observer
class App extends React.Component {
  constructor () {
    super()

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchKeyPress = this.onSearchKeyPress.bind(this)
    this.onLoadMoreClick = this.onLoadMoreClick.bind(this)
    this.onReset = this.onReset.bind(this)

    this.state = {
      searchTerm: ''
    }
  }

  componentWillMount () {
    this.props.subredditStore.fetch(0)
    this.props.subredditStore.receive()
  }

  onSearchChange (e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  onSearchKeyPress (e) {
    if (e.key === 'Enter') {
      if (this.state.searchTerm !== '') {
        this.props.subredditStore.search(this.state.searchTerm)
      } else {
        this.props.subredditStore.resetSearch()
      }
    }
  }

  onReset() {
    this.setState({ searchTerm: '' })
    this.props.subredditStore.resetSearch()
  }

  onLoadMoreClick () {
    this.props.subredditStore.fetch(this.props.subredditStore.offset + 20)
  }

  render () {
    const {
      items,
      item,
      requesting,
      error
    } = this.props.subredditStore

    return (
      <div>
        <SearchAppBar
          searchTerm={this.state.searchTerm}
          onChange={this.onSearchChange}
          onKeyPress={this.onSearchKeyPress}
          onReset={this.onReset}
        />

        {requesting && !items.length ? (
          <Loading />
        ) : null}

        {error ? (
          <Error
            message={error}
          />
        ) : null}

        {!item && items.length && !error ? (
          <React.Fragment>
            <Subreddits
              subreddits={items}
              onLoadMoreClick={this.onLoadMoreClick}
            />

            <LoadMore
              onClick={this.onLoadMoreClick}
              requesting={requesting}
            />
          </React.Fragment>
        ) : null}

        {item && !error ? (
          <Subreddit
            subreddit={item}
            lonely={true}
          />
        ) : null}
      </div>
    )
  }
}

export default App
