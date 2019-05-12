import { observable, action } from 'mobx';
import socketIo from 'socket.io-client'

class SubredditStore {
  socket = null
  @observable items = []
  @observable item = null
  @observable offset = 0
  @observable requesting = false
  @observable error = false

  datesMapper (dates) {
    return dates.map(date => {
      if (!date.label) {
        date.label = date.created.split('T')[0].split('-').reverse().join('/')
      }

      return date
    })
  }

  itemsMapper (items) {
    return items.map(item => {
      item.dates = this.datesMapper(item.dates)

      return item
    })
  }

  receive () {
    if (!this.socket) {
      this.socket = socketIo(process.env.REACT_APP_API_HOST)
    }

    this.socket.on('averageComputed', data => {
      const items = []

      // find in array

      let item = this.items.find(item => item.id === data.subredditId);

      if (item) {
        items.push(item)
      }

      // find from single

      item = this.item && this.item.id === data.subredditId ? this.item : null

      if (item) {
        items.push(item)
      }

      // loop

      if (items.length) {
        items.forEach(item => {
          const date = item.dates.find(date => date.label === data.created.split('T')[0].split('-').reverse().join('/'))

          if (date) {
            date.average = data.average
          } else {
            item.dates.push(this.datesMapper([data])[0])
          }
        })
      }
    })
  }

  @action async fetch (offset) {
    this.offset = offset
    this.requesting = true;
    this.error = false

    let response
    let body

    try {
      response = await fetch(`${process.env.REACT_APP_API_HOST}/api/subreddits?offset=${this.offset}`)
      body = await response.json()

      if (body.error) {
        throw new Error(body.error)
      }
    } catch (e) {
      this.requesting = false
      this.error = e.message

      return
    }

    this.items = this.itemsMapper(this.items.concat(body))
    this.requesting = false
    this.error = false
  }

  @action async search (term) {
    this.requesting = true
    this.error = false

    let response
    let body

    try {
      response = await fetch(`${process.env.REACT_APP_API_HOST}/api/subreddits/${term}`)
      body = await response.json()

      if (body.error) {
        throw new Error(body.error)
      }
    } catch (e) {
      this.requesting = false
      this.error = e.message

      return
    }

    this.item = this.itemsMapper([body])[0]
    this.requesting = false
    this.error = false
  }

  @action resetSearch () {
    this.item = null
    this.requesting = false
    this.error = false
  }
}

export default new SubredditStore()
