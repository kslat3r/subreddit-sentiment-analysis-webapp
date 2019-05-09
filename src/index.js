import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import subredditStore from './stores/subreddit'
import App from './containers/App'
import './index.css'

const stores = {
  subredditStore
}

ReactDOM.render((
  <Provider {...stores}>
    <App />
  </Provider>
), document.getElementById('root'))
