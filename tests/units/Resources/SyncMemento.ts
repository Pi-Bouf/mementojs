import {Memento, Request} from "../../../src";
import {IMementoConfiguration} from '../../../src/IMementoConfiguration';

export class SyncMemento extends Memento<string> {

    constructor(configuration?: IMementoConfiguration) {super(configuration);}

    request(id: string, dataCallback: (data: string) => void, errorCallback: (data: string) => void) {
        super.request(id, dataCallback, errorCallback);
    }

    load(id: string, request: Request<string>): void {
        if(id.includes("error")) {
            request.setError("id");
        }
        request.setData(id);
    }
}
