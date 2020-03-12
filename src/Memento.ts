import {Request} from "./Request";

export class Memento<T> {

    constructor() {

    }

    request(id: string, callback: (test: T) => void)
    {
        new Request();
    }
}
