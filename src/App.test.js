import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { store } from "./redux";
import { get } from "https";

const DATA = require("./../public/data.json");

const mockGood = () => {
  global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
      resolve({
        ok: true,
        Id: "123",
        headers: { get: () => "application/json" },
        json: function() {
          return DATA;
        }
      });
    });

    return p;
  });
};

const mockFail = () => {
  global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
      reject({
        ok: false,
        Id: "error",
        json: function() {
          return { error: "error" };
        }
      });
    });

    return p;
  });
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it("loads and works", async () => {
  mockGood();

  const { queryByRole, getByText, queryByText, container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // show loading by default
  expect(queryByRole("main").classList.contains("loading")).toBe(true);

  const albumName = `${DATA[0].band} - ${DATA[0].album}`; // eg 'Cat Power - Sun'
  const songName = DATA[0].song;

  // wait until albums are loaded
  const waitForAlbum = await waitForElement(() => getByText(albumName));

  // loading is hidden
  expect(queryByRole("main").classList.contains("loading")).toBe(false);

  // we should have 5 elements now
  expect(container.querySelectorAll(".album")).toHaveLength(5);

  // clicking on first album
  fireEvent.click(getByText(albumName));

  // we still have this album displayed
  expect(getByText(albumName)).toBeInTheDocument();

  // expect the song to be now in the document
  expect(getByText(songName)).toBeInTheDocument();

  // clicking on first album again
  fireEvent.click(getByText(albumName));

  // expect the song to be hidden now
  expect(queryByText(songName)).toBeNull();

  // clicking on top albums
  fireEvent.click(getByText("Albums"));

  // we should have all songs displayed now
  expect(container.querySelectorAll(".song")).toHaveLength(DATA.length);

  // we still have this album displayed
});

it("error handlign and works", async () => {
  mockFail();

  const { queryByRole, getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(queryByRole("main").classList.contains("loading")).toBe(true);

  const waitForError = await waitForElement(() => getByText("Error"));

  expect(getByText("Error")).toBeInTheDocument();
});
