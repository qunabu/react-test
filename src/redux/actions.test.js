import * as ACTIONS from "./actions";

describe("actions", () => {
  it("fetch", () => {
    expect(ACTIONS.fetchAlbums()).toBeInstanceOf(Function); // thunk
  });

  it("request", () => {
    const expectedAction = {
      type: ACTIONS.FETCH,
    };
    expect(ACTIONS.requestAlbums(expectedAction.data)).toEqual(
      expectedAction
    );
  });

  it("success", () => {
    const expectedAction = {
      type: ACTIONS.SUCCESS,
      data: ["a", "b", "c"]
    };
    expect(ACTIONS.requestAlbumsSuccess(expectedAction.data)).toEqual(
      expectedAction
    );
  });

  it("fail", () => {
    const expectedAction = {
      type: ACTIONS.FAILURE,
      error: "something is not right"
    };
    expect(ACTIONS.requestAlbumsError(expectedAction.error)).toEqual(
      expectedAction
    );
  });
});
