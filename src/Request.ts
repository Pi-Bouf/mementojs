export class Request<T> {
    private _data: T | undefined;
    private _error: string | undefined;
    private _ready: boolean;
    private _dataCallbacks: Array<(data: T) => void>;
    private _errorCallbacks: Array<(error: string) => void>;

    constructor() {
        this._data = undefined;
        this._error = undefined;
        this._ready = false;
        this._dataCallbacks = [];
        this._errorCallbacks = [];
    }

    attach(dataCallback: (data: T) => void, errorCallback?: (error: string) => void) {
        if(errorCallback !== undefined && this._ready && this._error !== undefined) {
            errorCallback(this._error);
        } else if (this._ready && this._data !== undefined) {
            dataCallback(this._data);
        } else {
            this._dataCallbacks.push(dataCallback);
            if(errorCallback !== undefined) {
                this._errorCallbacks.push(errorCallback);
            }
        }
    }

    setData(data: T) {
        this._data = data;
        this._ready = true;

        this._dataCallbacks.forEach(listener => {
           listener(data);
        });

        this.clearAllListeners();
    }

    setError(error: string) {
        this._error = error;
        this._ready = true;

        this._errorCallbacks.forEach(listener => {
            listener(error);
        });

        this.clearAllListeners();
    }

    private clearAllListeners() {
        this._dataCallbacks = [];
        this._errorCallbacks = [];
    }
}
