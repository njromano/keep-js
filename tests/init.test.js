const Keep = require("../Keep");

test("the initial state is created", () => {
    const keep = new Keep({ state: { stateObj: 'test' }});
    expect(keep.state).toEqual({ stateObj: 'test' });
});