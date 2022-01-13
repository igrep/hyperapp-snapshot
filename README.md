# hyperapp-snapshot

Take and reproduce a snapshot of a hyperapp state as a JSON. Provides `wrapView` function to wrap your hyperapp application's `view` function to append two buttons to the view: save and load the state of the application as a JSON file.

## Example

[Run on Stackblitz](https://stackblitz.com/edit/typescript-rmfwbs?file=index.ts)

```ts
import { h, text, app } from 'hyperapp';
import * as Snapshot from './hyperapp-snapshot';

const AddTodo = (state) => ({
  ...state,
  value: '',
  todos: state.todos.concat(state.value),
});

const NewValue = (state, event) => ({
  ...state,
  value: event.target.value,
});

const view = ({ todos, value }) =>
  h('main', {}, [
    h('h1', {}, text('To do list')),
    h('input', { type: 'text', oninput: NewValue, value }),
    h(
      'ul',
      {},
      todos.map((todo) => h('li', {}, text(todo)))
    ),
    h('button', { onclick: AddTodo }, text('New!')),
  ]);

app({
  init: { todos: [], value: '' },
  view: Snapshot.wrapView(view),
  /* Or else:
  view: Snapshot.wrapView(view, JSON.parse)
  // You can optionally pass a JSON decoder function to convert the loaded
  // JSON string into the application's state type.
  */
  node: document.getElementById('app'),
});
```

NOTE: Modified from the example in [the README of hyperapp](https://github.com/jorgebucaran/hyperapp/blob/f9518be1ada51ae993b062eac264efa25a8cd16c/README.md).
