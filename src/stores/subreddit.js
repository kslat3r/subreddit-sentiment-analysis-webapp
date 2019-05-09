import { observable, action } from 'mobx';

class SubredditStore {
  @observable items = []
  @observable item
  @observable offset = 0
  @observable requesting = false
  @observable success = false
  @observable error = false

  @action loadItems () {
    this.requesting = true;
    this.success = false;
    this.error = false

    return fetch(`${process.env.REACT_APP_API_HOST}/api/subreddits`)
      .then(response => response.json())
      .then(body => {
        if (body.error) {
          throw new Error(body.error)
        }

        this.items = body
        this.requesting = false
        this.success = true
        this.error = false
      })
      .catch(err => {
        this.requesting = false
        this.success = false
        this.error = err.message
      })
  }

  @action loadMoreItems () {
    this.requesting = true
    this.success = false
    this.error = false
    this.offset += 20

    return fetch(`${process.env.REACT_APP_API_HOST}/api/subreddits?offset=${this.offset}`)
      .then(response => response.json())
      .then(body => {
        if (body.error) {
          throw new Error(body.error)
        }

        this.items = this.items.concat(body)
        this.requesting = false
        this.success = true
        this.error = false
      })
      .catch(err => {
        this.requesting = false
        this.success = false
        this.error = err.message
      })
  }

  @action search (term) {
    this.requesting = true
    this.success = false
    this.error = false
    this.offset = 0

    return fetch(`${process.env.REACT_APP_API_HOST}/api/subreddits/${term}`)
      .then(response => response.json())
      .then(body => {
        if (body.error) {
          throw new Error(body.error)
        }

        this.item = body
        this.requesting = false
        this.success = true
        this.error = false
      })
      .catch(err => {
        this.item = null
        this.requesting = false
        this.success = false
        this.error = err.message
      })
  }

  @action resetSearch () {
    this.item = null
  }
}

export default new SubredditStore()
