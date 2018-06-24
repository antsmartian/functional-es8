/*
  A simple redux
*/

function createStore(reducer, preloadedState) {
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action);
    const listeners = currentListeners = nextListeners;
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }

    return action;
  }

  function subscribe(listener) {
    nextListeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe,
    currentListeners,
  };
}

//Example of using my redux.
var initialState = {
  counter: 0
};

var store = createStore(reducer, initialState);

store.subscribe(function () {
  render(store.getState());
});

function render(state) {
  if (document != null || document != undefined)
    document.getElementById("counter").textContent = state.counter;
}

function incrementCounter() {
  store.dispatch({
    type: "INCREMENT"
  });
}

function reducer(state, action) {
  if (action.type === "INCREMENT") {
    state = Object.assign({}, state, {
      counter: state.counter + 1
    });
  }
  return state;
}

function loadRedux() {
  // Render the initial state
  render(store.getState());

  if (document != undefined) {
    document.getElementById("button").addEventListener("click", function () {
      incrementCounter();
    });
  }
}

export {
  loadRedux,
  createStore,
  incrementCounter,
  reducer,
  render,
  initialState,
  store
};