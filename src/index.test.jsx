import React from 'react';

import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

const { WithState } = require('./');

const Greeting = () => (<h1>Hello, world!</h1>)

test('should pass', () => {
  expect(1 === 1).toEqual(true);
  expect (1 === 2).toEqual(false);
  const { getByText } = render(<Greeting />);
  expect(getByText('Hello, world!')).toBeInTheDocument();
});

test('correctly sets context', () => {
  const message = 'hello from the other side';
  const { Consumer, Provider } = React.createContext(null);
  const WithContext = Component => props => WithState(Consumer)(Component)(props);
  const TestComponent = WithContext(({
    data,
  }) => (
    <div>{data.message}</div>
  ));
  const Wrapper = () => (
    <Provider value={{ data: { message } }}>
      <TestComponent />
    </Provider>
  );

  const {container, getByText} = render(<Wrapper />)
  expect(getByText(message)).toBeInTheDocument()
});
