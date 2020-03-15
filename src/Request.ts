export class Request<T> {
    private _data: T | undefined;
    private _ready: boolean;
    private _callbacks: Array<(data: T) => void>;

    constructor() {
        this._data = undefined;
        this._ready = false;
        this._callbacks = [];
    }

    attach(callback: (data: T) => void) {
        if(this._ready && this._data !== undefined) {
            callback(this._data);
        } else {
            this._callbacks.push(callback);
        }
    }

    setData(data: T) {
        this._data = data;
        this._ready = true;

        this._callbacks.forEach(listener => {
           listener(data);
        });

        this.clearAllListeners();
    }

    private clearAllListeners() {
        this._callbacks = [];
    }
}
