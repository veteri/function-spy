# function-spy

Run any function before or after a specified method of any possible object.

## Usage

Import the script

```javascript
import Spy from "/your/path/Spy.js";
```

### Example: Spy on document.querySelector

Hook into the desired method.
```javascript
Spy.after(document, "querySelector", args => {
  //Code to execute after 
});
```

## Methods

```javascript
Spy.before(obj, method, callback)
```

- Execute any function *before* the specified `method` is called.
- The passed callback gets access to all args of `method`.

```javascript
Spy.after(obj, method, callback)
```

- Execute any function *after* the specified `method` is called.
- The passed callback gets access to all args of `method`.

