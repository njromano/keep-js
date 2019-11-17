const JsonPath = require('./JsonPath');

class Keep {
    constructor(props) {
        this.state = props.state;
        this.actions = [
            {
                id: 0,
                timestamp: new Date(),
                path: null,
                value: null
            }
        ]
    }

    push(path, value) {
        const p = new JsonPath(path);
        console.log(p);
        p.setValue(this.state, value);
    }
}

module.exports = Keep;