import { observable, action } from 'mobx';

class SubredditStore {
  @observable items = []
  @observable offset = 0
  @observable requesting = false
  @observable success = false
  @observable error = false

  @action loadItems (offset) {
    this.requesting = true;
    this.success = false;
    this.error = false

    return fetch(`${process.env.API_HOST}/api/subreddits`)
      .then(response => response.json())
      .then(items => {
        this.items = items
        this.offset += 20
        this.requesting = false
        this.success = true
        this.error = false
      })
      .catch(err => {
        this.requesting = false
        this.success = false
        this.errro = err.message
      })
  }
}

export default new SubredditStore()
