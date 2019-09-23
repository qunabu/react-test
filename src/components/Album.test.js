import React from "react";
import Album from "./Album";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("albums works", async () => {
  const onClick = jest.fn();

  const data = {
    name: "Pretty Hate Machine",
    songs: [
      "Head Like a Hole",
      "Terrible Lie",
      "Down in It",
      "Sanctified",
      "Something I Can Never Have",
      "Kinda I Want To",
      "Sin",
      "That's What I Get",
      "The Only Time",
      "Ringfinger",
      "Get Down Make Love"
    ]
  };

  const {
    getByTestId,
    queryByRole,
    getByText,
    queryByText,
    container,
    rerender
  } = render(<Album data={data} onClick={onClick} />);

  // we album name to be displayed
  expect(getByText(data.name)).toBeInTheDocument();

  // clicking on album name should fire callback
  fireEvent.click(getByText(data.name));
  expect(onClick).toHaveBeenCalled();

  // no songs should ne listed now 
  
  expect(container.querySelectorAll(".song")).toHaveLength(0);

  // passing `opened` props 
  rerender(<Album data={data} onClick={onClick} opened={true} />);

  // songs should be listed now 
  expect(container.querySelectorAll(".song")).toHaveLength(data.songs.length);

});
