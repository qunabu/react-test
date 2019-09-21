export const FETCH = "REQUEST_ALBUMS";
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
   return function(dispatch) {
    dispatch(requestAlbums());
   return fetch('data.json')
      .then(
        response => response.json(),
        error => dispatch(requestAlbumsError(error))
      )
      .then(json =>
        dispatch(requestAlbumsSuccess(json))
      );
  };
}
