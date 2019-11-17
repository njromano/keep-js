const JsonPath = require('./JsonPath');

Array.prototype.peek = function() {
    if (this.length < 1)
        return null;
    return this[this.length - 1];
};

class Keep {
    constructor(props) {
        this.state = props.state;
        this.actionStack = [];
    }

    push(path, value) {
        const p = new JsonPath(path);
        const previousValue = p.getObject(this.state);
        p.setValue(this.state, value);
        this.pushAction(path, previousValue, value);
    }

    revert(actionId) {
        if (this.actionStack.length === 0) {
            return;
        }
        let actionIndex = this.actionStack.findIndex(s => s.id === actionId);
        if (actionIndex === -1) {
            actionIndex = this.actionStack.length - 1;
        }
        for (let i = this.actionStack.length - 1; i >= actionIndex; i--) {
            const action = this.actionStack[i];
            new JsonPath(action.path).setValue(this.state, action.previousValue);
        }
    }

    generateId() {
        return this.actionStack.length ? Math.max(...this.actionStack.map(s => s.id)) + 1 : 0;
    }

    pushAction(path, previousValue, value) {
        let action = {
            id: this.generateId(),
            timestamp: new Date(),
            path,
            previousValue,
            value
        };
        this.actionStack.push(action);
        return action;
    }

}

module.exports = Keep;