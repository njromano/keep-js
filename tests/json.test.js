const JsonPath = require('../JsonPath');

test("json path is parsed successfully", () => {
    const path = new JsonPath("$.parent.child[0].grandchildren[id:1]");
    let obj = path.getObject({ parent: { child: [ { grandchildren: [ { id: 1, name: 'test'}, { id: 2, name: "wrong"}]}]}});
    expect(obj.name).toBe('test');
});