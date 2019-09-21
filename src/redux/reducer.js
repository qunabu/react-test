import * as ACTIONS from "./actions";

const INITIAL_STATE = {
  loading: false,
  error: null,
  albums: []
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.FETCH:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ACTIONS.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        albums: action.data.reduce((prev, curr) => {
          const albumName = `${curr.band} - ${curr.album}`;
          let prevSongsIndex = prev.findIndex(
            album => album.name === albumName
          );

          prev[prevSongsIndex === -1 ? prev.length : prevSongsIndex] =
            prevSongsIndex === -1
              ? {
                  name: albumName,
                  songs: []
                }
              : prev[
                  prevSongsIndex
                ];
          return prev.map(album =>
            album.name === albumName
              ? {
                  ...album,
                  songs: [...album.songs, curr.song]
                }
              : album
          );
        }, [])
      };
    case ACTIONS.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
