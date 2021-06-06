import {Request} from './Request';
import {IMementoConfiguration} from './IMementoConfiguration';

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

    request(id: string, dataCallback: (data: T) => void, errorCallback?: (error: string) => void) {
        let request = this._requests.get(id);

        if (request !== undefined) {
            request.attach(dataCallback, errorCallback);
        } else {
            this.newRequest(id, dataCallback, errorCallback);
        }
    }

    private newRequest(id: string, firstDataCallback: (data: T) => void, firstErrorCallback?: (error: string) => void) {
        let newRequest = new Request<T>();
        newRequest.attach(firstDataCallback, firstErrorCallback);
        newRequest.attach(() => {this.executedRequest();}, () => {this.executedRequest();});

        this._requests.set(id, newRequest);
        this._waitingRequests.push(id);

        this.executeAll();
    }

    private executeAll() {
        if (this._configuration?.maxSimultaneousRequest !== undefined) {
            if (this._configuration.maxSimultaneousRequest > this._loadingRequestCount) {
                this._loadingRequestCount++;
                this.executeNextRequest();
            }
        } else {
            this.executeNextRequest();
        }
    }

    private executeNextRequest() {
        let nextId = this._waitingRequests.shift();
        if (nextId === undefined) {
            this._loadingRequestCount--;
            return;
        }
        let nextRequest = this._requests.get(nextId);
        if (nextRequest === undefined) {
            this._loadingRequestCount--;
            return;
        }

        this.load(nextId, nextRequest);
    }

    private executedRequest() {
        this._loadingRequestCount--;
        this.executeAll();
    }

    abstract load(id: string, request: Request<T>): void;
}
