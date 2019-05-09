import React from 'react';
import { inject, observer } from 'mobx-react';
import SearchAppBar from '../components/SearchAppBar'
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
      loading,
      success,
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

        {!item && items.length ? (
          <React.Fragment>
            <Subreddits
              subreddits={items}
              loading={loading}
              success={success}
              error={error}
              onLoadMoreClick={this.onLoadMoreClick}
            />

            <LoadMore
              onClick={this.onLoadMoreClick}
            />
          </React.Fragment>
        ) : null}

        {item ? (
          <Subreddit
            subreddit={item}
            lonely={true}
          />
        ) : null}
      </div>
    );
  }
}

export default App
