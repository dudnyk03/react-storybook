import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { store } from './app-state'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
