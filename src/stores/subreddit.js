import { observable, action } from 'mobx';

class SubredditStore {
  @observable items = []
  @observable item = null
  @observable offset = 0
  @observable requesting = false
  @observable error = false

  mapper (items) {
    return items.map(item => {
      item.dates = item.dates.map(date => {
        date.label = date.created.split('T')[0].split('-').reverse().join('/')

        return date
      })

      return item
    })
  }

  @action fetch (offset) {
    this.offset = offset
    this.requesting = true;
    this.success = false;
    this.error = false

    return fetch(`${process.env.REACT_APP_API_HOST}/api/subreddits?offset=${this.offset}`)
      .then(response => response.json())
      .then(body => {
        if (body.error) {
          throw new Error(body.error)
        }

        this.items = this.mapper(this.items.concat(body))
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

    return fetch(`${process.env.REACT_APP_API_HOST}/api/subreddits/${term}`)
      .then(response => response.json())
      .then(body => {
        if (body.error) {
          throw new Error(body.error)
        }

        this.item = this.mapper([body])[0]
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

  @action resetSearch () {
    this.item = null
  }
}

export default new SubredditStore()
