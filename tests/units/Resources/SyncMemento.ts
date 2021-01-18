import {Memento, Request} from "../../../src";
import {IMementoConfiguration} from '../../../src/IMementoConfiguration';

export class SyncMemento extends Memento<string> {

    constructor(configuration?: IMementoConfiguration) {super(configuration);}

    request(id: string, callback: (data: string) => void) {
        super.request(id, callback);
    }

    load(id: string, request: Request<string>): void {
        request.setData(id);
    }
}
