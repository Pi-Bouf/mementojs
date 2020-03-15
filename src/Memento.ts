import {Request} from "./Request";
import {IMementoConfiguration} from "./IMementoConfiguration";

export abstract class Memento<T> {

    private _configuration: IMementoConfiguration | undefined;
    private _requests: Map<string, Request<T>>;

    constructor(configuration?: IMementoConfiguration) {
        this._configuration = configuration;
        this._requests = new Map<string, Request<T>>();
    }

    request(id: string, callback: (data: T) => void)
    {
        let request = this._requests.get(id);

        if(request !== undefined) {
            request.attach(callback);
        } else {
            this.newRequest(id, callback);
        }
    }

    private newRequest(id: string, firstCallback: (data: T) => void) {
        let newRequest = new Request<T>();
        newRequest.attach(firstCallback);
        this._requests.set(id, newRequest);

        this.load(id, newRequest);
    }

    abstract load(id: string, request: Request<T>): void;
}
