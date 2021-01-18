import {Request} from "./Request";
import {IMementoConfiguration} from "./IMementoConfiguration";

export abstract class Memento<T> {

    private _configuration: IMementoConfiguration | undefined;
    private _requests: Map<string, Request<T>>;
    private _waitingRequests: string[];
    private _loadingRequestCount: number;

    constructor(configuration?: IMementoConfiguration) {
        this._configuration = configuration;
        this._requests = new Map<string, Request<T>>();
        this._waitingRequests = [];
        this._loadingRequestCount = 0;
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
        newRequest.attach(() => {this.executedRequest(id)});

        this._requests.set(id, newRequest);
        this._waitingRequests.push(id);

        this.executeAll();
    }

    private executeAll() {
        if(this._configuration?.maxSimultaneousRequest !== undefined) {
            if(this._configuration.maxSimultaneousRequest > this._loadingRequestCount) {
                this._loadingRequestCount++;
                this.executeNextRequest();
            }
        } else {
            this.executeNextRequest();
        }
    }

    private executeNextRequest() {
        let nextId = this._waitingRequests.shift();
        if(nextId === undefined) {
            this._loadingRequestCount--;
            return;
        }
        let nextRequest = this._requests.get(nextId);
        if(nextRequest === undefined) {
            this._loadingRequestCount--;
            return;
        }

        this.load(nextId, nextRequest);
    }

    private executedRequest(id: string) {
        this._loadingRequestCount--;
        this.executeAll();
    }

    abstract load(id: string, request: Request<T>): void;
}
