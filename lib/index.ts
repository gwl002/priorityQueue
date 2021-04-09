
type Comparator<T> = (s1: T, s2: T) => number;


export default class PriorityQueue<T> {
    private queue: T[];
    private comparator;

    constructor(comparator: Comparator<T>) {
        this.queue = [];
        this.comparator = comparator;
    }

    private parent(i: number): number {
        return Math.floor((i + 1) / 2) - 1;
    }

    private left(i: number): number {
        return 2 * i + 1;
    }

    private right(i: number): number {
        return 2 * i + 2;
    }

    private swap(i: number, j: number) {
        let temp = this.queue[i];
        this.queue[i] = this.queue[j];
        this.queue[j] = temp;
    }

    private shiftUp(): void {
        let current = this.size() - 1;
        while (current > 0 && this.isGreater(current, this.parent(current)) > 0) {
            this.swap(current, this.parent(current));
            current = this.parent(current);
        }
    }

    private shiftDown(): void {
        let size = this.size();
        let k = 0;
        let temp = this.queue[k];
        let current: number = k;
        while (this.left(k) < size) {
            current = this.left(k);
            if (this.right(k) < size && this.isGreater(this.right(k), this.left(k)) > 0) {
                current = this.right(k);
            }
            if (this.isGreater(k, current) > 0) {
                break;
            }
            this.swap(current, k);
            k = current;
        }
    }

    private isGreater(i: number, j: number): number {
        return this.comparator(this.queue[i], this.queue[j])
    }

    pop(): T | null {
        if (this.isEmpty()) {
            return null;
        } else {
            let topItem = this.queue[0];
            this.swap(0, this.size() - 1);
            this.queue.pop();
            if (this.size() > 0) {
                this.shiftDown();
            }
            return topItem;
        }
    }

    insert(item: T): void {
        this.queue.push(item);
        this.shiftUp();
    }

    isEmpty(): boolean {
        return this.queue.length === 0;
    }

    peek(): T | null {
        if (!this.isEmpty()) {
            return this.queue[0];
        } else {
            return null
        }
    }

    size(): number {
        return this.queue.length;
    }
}
