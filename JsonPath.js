class JsonPath {
    constructor(path) {
        this.path = path;
        // regex for parsing custom paths: \.(\w+)(?:\[(?:(\d)|([^\d]+:\w+))\])?
        const matches = path.matchAll(/\.(\w+)(?:\[(?:(\d)|([^\d]+:\w+))])?/g);
        console.log(matches);
        this.expressions = [...matches].map(m => {
            return {
                key: m[1],
                index: m[2] || null,
                query: m[3] || null }
        });
        console.log(this.expressions);
    }

    getObject(state) {
        let head = state;

        for(const exp of this.expressions) {
            head = head[exp.key];
            console.log(head);
            if (exp.index) {
                head = head[exp.index];
                console.log(head);
            } else if (exp.query) {
                const q = exp.query.split(':').map(s => { return { prop: s[0], value: s[1]}});
                head = head.filter(h => h[q.prop] === q.value)[0];
                console.log(head);
            }
        }

        return head;
    }

    setValue(state, value) {
        let head = state;
        for (let i = 0; i < this.expressions.length; i++) {
            const key = this.expressions[i].key;
            if (i === this.expressions.length - 1) {
                head[key] = value;
                break;
            }
            head = head[key];
        }
    }

    get lastExpression() {
        return this.expressions[this.expressions.length - 1]
    }
}

module.exports = JsonPath;