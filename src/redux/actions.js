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

export function fetchAlbums(url = "data.json") {
  return function(dispatch) {
    dispatch(requestAlbums());
    let f;
    try {
      f = fetch(url)
        .then(
          response =>
            response &&
            response.headers &&
            response.headers.get("content-type").includes("application/json")
              ? response.json()
              : { error: "response is not a json" },
          error => dispatch(requestAlbumsError(error))
        )
        .then(json =>
          json.error
            ? dispatch(requestAlbumsError(json))
            : dispatch(requestAlbumsSuccess(json))
        );
    } catch (error) {
      console.log("errr", error);
      dispatch(requestAlbumsError(error));
    }

    return f;
  };
}
