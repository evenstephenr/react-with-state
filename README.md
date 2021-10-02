# react-with-state

This is a really simple react-based HOC utility I use a lot in my personal projects. This is the first npm module I ever published.

## Installation

```
npm i @evenstephenr/react-with-state
```

## Usage

Often, when we use React Context modules, we typically want to enforce specific behavior. `react-with-state` enforces the following behaviors

* If the data provided by a context Provider is not loaded or undefined, whatever modules exist under that scope will not render
* The context Consumers can be defined and exported separately from 'dumb' components, saving us the neccessity of mocking hook calls inside a unit test suite or storybook story
* The values pulled from the context Consumer should be injected alongside other local props in a component, since context Providers are not always a direct replacement for local props
* You do not stack context _consumers_ directly. If you need to stitch together multiple context Consumers maybe the react hook `useContext` will work better for your use case

### Example usage

```
// ~/context.js
import React from 'react';
import { WithState } from '@evenstephenr/react-with-state';

const { Consumer, Provider } = React.createContext(null);
const WithContext = Component => props => WithState(Consumer)(Component)(props);

export {
  Provider,
  WithContext,
}

// ~/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { AppWithContext } from './App';
import { Provider } from './Context';

ReactDOM.render(
  <React.StrictMode>
    <Provider value={{ data: { message: 'hello hi hey' } }}>
      <AppWithContext otherVal="some data" />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// ~/App.js
import { WithContext } from './Context';
// base component being exported
export const App = ({
  data,
  otherVal
}) => (
  <div className="App">
    <p>{data.message}</p>
    <p>{otherVal}</p>
  </div>
);
// using the WithContext HOC we created earlier
export const AppWithContext = props => WithContext(App)(props);
```