export const FETCH = "REQUEST_POSTS";
export const SUCCESS = "REQUEST_ALBUMS_SUCCESS";
export const FAILURE = "REQUEST_ALBUMS_FAILURE";

export function requestAlbums() {
  return {
    type: FETCH
  };
}

export function requestAlbumsSuccess(data) {
  return {
    type: SUCCESS,
    data
  };
}

export function requestAlbumsError(error) {
  return {
    type: FAILURE,
    error
  };
}

export function fetchAlbums() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestAlbums());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch('data.json')
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => dispatch(requestAlbumsError(error))
      )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(requestAlbumsSuccess(json))
      );
  };
}
