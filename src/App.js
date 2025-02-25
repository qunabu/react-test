import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "./redux/actions";
import Album from "./components/Album";
import "./App.css";

/**
 * The App is using 
 * - redux for storing the global data, album songs 
 * - state for open keys of the albums 
 * 
 * It could use redux for open keys as well, 
 * but I've decided that this is local state
 */

function App(props) {
  /** contains array of opened albums */
  const [openAlbums, setOpenAlbums] = useState([]);
  const dispatch = useDispatch();
  /** get data from the redux */
  const data = useSelector(state => state);

  /** show/hide album by row */
  const toggleAlbum = i => {
    setOpenAlbums(
      openAlbums.includes(i)
        ? openAlbums.filter(albumI => albumI !== i)
        : [...openAlbums, i]
    );
  };

  /** show/hide all the albums */
  const toggleAllAlbums = i => {
    setOpenAlbums(
      openAlbums.length === data.albums.length
        ? []
        : data.albums.map((r, i) => i)
    );
  };

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  if (data.loading) {
    return <main className="loading">loading...</main>;
  }

  if (data.error) {
    return (
      <main className="error">
        <h2>Error</h2> <pre>{JSON.stringify(data.error)}</pre>
      </main>
    );
  }

  return (
    <main>
      <ul>
        <li>
          <p onClick={() => toggleAllAlbums()}>Albums</p>
          <ul>
            {data.albums.map((album, i) => (
              <Album
                onClick={() => toggleAlbum(i)}
                key={album.name}
                data={album}
                opened={openAlbums.includes(i)}
              />
            ))}
          </ul>
        </li>
      </ul>
    </main>
  );
}

export default App;
