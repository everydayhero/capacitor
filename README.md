# react-capacitor

Flux store, and dispatcher.

## Example Usage

```js
npm install react-capacitor

...

// Or in packagae

"react-capacitor": "~0.0.5",
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
// Set a single value
UserStore.set('email', 'marty.mcfly@1985.com');

// Set multiple values
UserStore.setProperties({name: 'Marty McFly', car: 'Delorean'});

// Reset and set multiple values
UserStore.setAll({name: 'Doc Brown'});

// Reset values
UserStore.reset();
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

componentWillUnmount: function() {
  UserStore.on('change', this._change);
},

componentWillUnmount: function() {
  UserStore.removeListener('change', this._change);
},

...
```

