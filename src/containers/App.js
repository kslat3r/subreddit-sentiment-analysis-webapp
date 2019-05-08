import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('subredditStore')
@observer
class App extends React.Component {
  componentWillMount () {
    this.props.subredditStore.loadItems()
  }

  render () {
    return (
      <ul>
        {this.props.subredditStore.items.map((item, i) => (
          <li key={i}>
            <h1>{item.name}</h1>
            <ul>
              {item.dates.map((item, i) => (
                <li key={i}>
                  <h2>{item.label}</h2>
                  <h3>{item.average}</h3>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}

export default App
