import {Memento, Request} from "../../../src";

export class TimeoutMemento extends Memento<string> {

    request(id: string, callback: (data: string) => void) {
        super.request(id, callback);
    }

    load(id: string, request: Request<string>): void {
        setTimeout(() => {
            request.setData(id);
        }, Math.random() * 300);
    }
}