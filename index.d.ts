declare module 'Memento' {
	export class Memento<T> {
	    constructor();
	    request(id: string, callback: (test: T) => void): void;
	}

}
declare module 'Request' {
	export class Request<T> {
	    private _data;
	    private _loaded;
	    private _listeners;
	    constructor();
	    clearAllListeners(): void;
	}

}
