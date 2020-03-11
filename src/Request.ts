export class Request<T> {
    private _data: T | undefined;
    private _loaded: boolean;
    private _listeners: Array<() => void>;

    constructor() {
        this._data = undefined;
        this._loaded = false;
        this._listeners = [];
    }

    clearAllListeners() {
        this._listeners = [];
    }
}
