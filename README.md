# hyperapp-snapshot

Take and reproduce a snapshot of a hyperapp state as a JSON. Provides `wrapView` function to wrap your hyperapp application's `view` function to append two buttons to the view: save and load the state of the application as a JSON file.

## Example

[Run on Stackblitz](https://stackblitz.com/edit/typescript-rmfwbs?file=index.ts)

```ts
import { h, text, app } from 'hyperapp';
import * as Snapshot from 'hyperapp-snapshot';

const view = (model) =>
  h('main', {}, [
    // Your app view
  ]);

app({
  init: initialModel,
  view: Snapshot.wrapView(view),
  /* Or else:
  view: Snapshot.wrapView(view, JSON.parse)
  // You can optionally pass a JSON decoder function to convert the loaded
  // JSON string into the application's state type.
  */
  node: document.getElementById('app'),
});
```
