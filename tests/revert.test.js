const Keep = require('../Keep');

test("one revert sets the state back one action", () => {
    const keep = new Keep({
        state: {
            testObj: {
                count: 0
            }
        }
    });
    keep.push("$.testObj.count", 1);
    keep.push("$.testObj.count", 2);

    keep.revert();

    expect(keep.state.testObj.count).toBe(1);
});

test("revert to specific action id resets state to that period of time", () => {
    const keep = new Keep({
        state: {
            testObj: {
                count: 0
            }
    }});
    for (let i = 1; i < 100; i++) {
        keep.push("$.testObj.count", i);
    }
    const actionId = 77;
    keep.revert(actionId);

    expect(keep.state.testObj.count).toBe(actionId);
});