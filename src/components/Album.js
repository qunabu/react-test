import React from "react";
import PropTypes from 'prop-types';
import "./Album.css";

function Album(props) {
  return (
    <li className={props.opened ? "opened album" : "album" }>
      <p onClick={e => props.onClick && props.onClick()}>{props.data.name}</p>
      {props.opened && (
        <ul>
          {props.data.songs.map(song => (
            <li key={song}>{song}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

Album.propTypes = {
  /** data contect of the album */
  data: PropTypes.shape({
    /** title of the album */
    name: PropTypes.string,
    /** list of songs */
    songs: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  /** controls wheter Albums is showing its songs */
  opened: PropTypes.bool,
  /** callback called when album title is clicked */
  onClick: PropTypes.func
};

Album.defaultProps = {
    opened: false,
    onClick: () => {}
  };

export default Album;
