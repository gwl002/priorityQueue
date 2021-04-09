
import { expect } from 'chai';
import { describe, it } from 'mocha';

import PriorityQueue from "../lib/index";

interface Obj {
    key: number,
    b: string
}

describe('api test', () => {
    it('size check', () => {
        const queue = new PriorityQueue<number>((a, b) => a - b);
        queue.insert(1);
        queue.insert(2);
        expect(queue.size()).equals(2);
        queue.insert(1);
        queue.insert(2);
        expect(queue.size()).equals(4);
        queue.pop();
        expect(queue.size()).equals(3);
    });
    it('peek check', () => {
        const queue = new PriorityQueue<number>((a, b) => a - b);
        queue.insert(1);
        queue.insert(2);
        expect(queue.peek()).equals(2);
        queue.insert(3);
        queue.insert(4);
        expect(queue.peek()).equals(4);
        queue.pop();
        expect(queue.peek()).equals(3);
    });
    it('isEmpty check', () => {
        const queue = new PriorityQueue<number>((a, b) => a - b);
        queue.insert(1);
        queue.insert(2);
        expect(queue.isEmpty()).equals(false);
        queue.pop();
        queue.pop();
        expect(queue.isEmpty()).equals(true);
    });
});

describe('number type queue priority sorted', () => {
    it('pop item should be sorted in priority', () => {
        const queue = new PriorityQueue<number>((a, b) => a - b);
        queue.insert(1);
        queue.insert(2);
        queue.insert(5);
        queue.insert(4);
        queue.insert(8);
        queue.insert(1);
        let originArr = [8, 5, 4, 2, 1, 1]

        let arr = [];
        while (queue.size() > 0) {
            let item = queue.pop();
            arr.push(item);
        }

        for (let i = 0; i < arr.length; i++) {
            expect(arr[i], "should have same item for same index").equals(originArr[i])
        }
    });
});


describe('object type queue priority sorted', () => {
    let originArr: Obj[] = [
        {
            key: 8,
            b: "sssss"
        },
        {
            key: 5,
            b: "sss"
        },
        {
            key: 4,
            b: "s"
        },
        {
            key: 2,
            b: "sss"
        },
        {
            key: 1,
            b: "sss"
        },
        {
            key: 1,
            b: "ss"
        },
        {
            key: 1,
            b: ""
        }
    ]
    it('pop item should be sorted in priority', () => {
        const queue = new PriorityQueue<Obj>((objA: Obj, objB: Obj) => objA.key - objB.key);
        queue.insert({ key: 1, b: "ss" });
        queue.insert({ key: 2, b: "sss" });
        queue.insert({ key: 8, b: "sssss" });
        queue.insert({ key: 5, b: "sss" });
        queue.insert({ key: 4, b: "s" });
        queue.insert({ key: 1, b: "" });
        queue.insert({ key: 1, b: "sss" });

        let arr = [];
        while (queue.size() > 0) {
            let item = queue.pop();
            if (item) {
                arr.push(item);
            }
        }

        for (let i = 0; i < arr.length; i++) {
            expect(arr[i].key, "should have same item for same index").equals(originArr[i].key)
        }
    });

    it('pop item should be sorted in priority for multi key', () => {
        const queue = new PriorityQueue<Obj>(
            (objA: Obj, objB: Obj) => {
                if (objA.key > objB.key) {
                    return 1
                } else if (objA.key < objB.key) {
                    return -1
                } else {
                    return objA.b.length - objB.b.length
                }
            }
        );

        queue.insert({ key: 1, b: "ss" });
        queue.insert({ key: 2, b: "sss" });
        queue.insert({ key: 8, b: "sssss" });
        queue.insert({ key: 5, b: "sss" });
        queue.insert({ key: 4, b: "s" });
        queue.insert({ key: 1, b: "" });
        queue.insert({ key: 1, b: "sss" });

        let arr = [];
        while (queue.size() > 0) {
            let item = queue.pop();
            if (item) {
                arr.push(item);
            }
        }

        for (let i = 0; i < arr.length; i++) {
            expect(arr[i].key, "plan1").equals(originArr[i].key);
            expect(arr[i].b.length, "plan2").equals(originArr[i].b.length);
        }
    });
});


