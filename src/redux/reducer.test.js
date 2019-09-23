import reducer, { INITIAL_STATE } from "./reducer";
import * as ACTIONS from "./actions";

describe("todos reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should return the loading state", () => {
    expect(reducer(undefined, { type: ACTIONS.FETCH })).toEqual({
      ...INITIAL_STATE,
      loading: true
    });
  });

  it("should return the error state", () => {
    expect(
      reducer(undefined, { type: ACTIONS.FAILURE, error: "not good" })
    ).toEqual({
      ...INITIAL_STATE,
      error: "not good"
    });
  });

  it("should return the success state", () => {
    const inputData = [
      { song: "a", album: "a", band: "a" },
      { song: "b", album: "a", band: "a" },
      { song: "c", album: "a", band: "a" },
      { song: "d", album: "e", band: "f" }
    ];

    const outputData = [
      { name: "a - a", songs: ["a", "b", "c"] },
      { name: "f - e", songs: ["d"] }
    ];

    expect(
      reducer(undefined, { type: ACTIONS.SUCCESS, data: inputData })
    ).toEqual({
      ...INITIAL_STATE,
      albums: outputData
    });
  });

  /*

  it('should handle ADD_TODO', () => {
    expect(
      reducer([], {
        type: types.ADD_TODO,
        text: 'Run the tests'
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0
      }
    ])

    expect(
      reducer(
        [
          {
            text: 'Use Redux',
            completed: false,
            id: 0
          }
        ],
        {
          type: types.ADD_TODO,
          text: 'Run the tests'
        }
      )
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 1
      },
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })
  */
});
