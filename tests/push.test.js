const Keep = require("../Keep");

test("pushing a single value updates the value in state", () => {
    const keep = new Keep({ state: { stateValue: 'init' }});
    keep.push("$.stateValue", "newValue");
    expect(keep.state).toEqual({ stateValue: 'newValue'});
});

test("pushing an object updates the object in the store", () => {
    const keep = new Keep({ state: { stateObj: null}});
    keep.push("$.stateObj", { newProp: "hello world", beepBoop: true });
    expect(keep.state.stateObj).toEqual({ newProp: "hello world", beepBoop: true});
});