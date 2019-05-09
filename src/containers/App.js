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

    this.state = {
      searchTerm: ''
    }
  }

  componentWillMount () {
    this.props.subredditStore.loadItems()
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

  onLoadMoreClick () {
    this.props.subredditStore.loadMoreItems()
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
        />

        {items.length && !item ? (
          <Subreddits
            subreddits={items}
            loading={loading}
            success={success}
            error={error}
            onLoadMoreClick={this.onLoadMoreClick}
          />
        ) : null}

        {items.length && !item ? (
          <LoadMore
            onClick={this.onLoadMoreClick}
          />
        ) : null}

        {item ? (
          <Subreddit
            subreddit={item}
          />
        ) : null}
      </div>
    );
  }
}

export default App
