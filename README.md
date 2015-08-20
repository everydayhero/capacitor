# react-capacitor

Flux store, and dispatcher.

## Example Usage

```js
npm install --save react-capacitor
```

```js
var Dispatcher = require('react-capacitor/lib/Dispatcher');
var AppDispatcher = new Dispatcher();
```

###Trigger an action in the view

```js
AppDispatcher.triggerAction('signup', {
  email: 'emmett.brown@1985.com',
  name: 'Emmett'
});
```

###Binding to actions

```js
AppDispatcher.onAction('signup', function(data) {
  UserStore.setProperties({
    email: data.email,
    name: data.name
  });
  // automatically emits the change event, but only when the data is different
});
```

### Create a store and set the default

```js
var Store = require('react-capacitor/lib/Store');

var UserStore = new Store({
  // Default values
  email: '',
  name: ''
});
```

###Managing the store

```js
// Store starts with defaults: { email: '', name: '' }

// Set a single value
UserStore.set('email', 'marty.mcfly@1985.com');
// Store contains: { email: 'marty.mcfly@1985.com', name: '' }

// Set multiple values
UserStore.setProperties({name: 'Marty McFly', car: 'Delorean'});
// Store contains: { email: 'marty.mcfly@1985.com', name: 'Marty McFly', car: 'Delorean' }

// Reset and set multiple values
UserStore.setAll({name: 'Doc Brown'});
// Store contains: { email: '', name: 'Doc Brown' }

// Reset values
UserStore.reset();
// Store contains: { email: '', name: '' }
```

###Getting store data

```js
// Get a single value
UserStore.get('email');

// Get multiple values
UserStore.getProperties('email', 'name');

// Get all values
UserStore.getAll();
```

###Binding to change events on a React component

```js
...

componentWillMount: function() {
  UserStore.on('change', this._change);
},

componentWillUnmount: function() {
  UserStore.removeListener('change', this._change);
},

...
```

