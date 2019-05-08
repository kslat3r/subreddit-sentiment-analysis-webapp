import { observable, action } from 'mobx';

class SubredditStore {
  @observable items = []
  @observable offset = 0
  @observable requesting = false
  @observable success = false
  @observable error = false

  @action fetch (offset) {
    this.requesting()

    return fetch('localhost:3000/api/subreddits')
      .then(response => response.json())
      .then(items => this.items = items)
      .then(() => this.offset += 20)
  }

  @action requesting () {
    this.requesting = true
    this.success = false
    this.error = false
  }

  @action success () {
    this.requesting = false
    this.success = true
    this.error = false
  }

  @action error (msg) {
    this.requesting = false
    this.success = false
    this.error = msg
  }
}

module.exports = new SubredditStore()
