
var PriorityQueue = require("../dist/index").default;


function main() {
    const queue = new PriorityQueue((a, b) => a - b);
    queue.insert(1);
    queue.insert(2);
    queue.insert(5);
    queue.insert(4);
    queue.insert(8);
    queue.insert(1);

    while (queue.size() > 0) {
        let item = queue.pop();
        if (item) {
            console.log(item);
        }
    }
}

main();