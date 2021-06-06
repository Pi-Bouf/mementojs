import {Request} from "../../src";
import {expect} from "chai";

describe('Request unit tests', () => {
    let request: Request<string>;

    beforeEach(() => {
        request = new Request<string>();
    });

    it('Check initial states', () => {
        // @ts-ignore
        expect(request._data).is.eq(undefined);
        // @ts-ignore
        expect(request._ready).is.eq(false);
        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(0);
        // @ts-ignore
        expect(request._errorCallbacks.length).is.eq(0);
    });

    it('Attach mutliple callbacks', () => {
        // @ts-ignore
        expect(request._data).is.eq(undefined);
        // @ts-ignore
        expect(request._ready).is.eq(false);


        request.attach(data => {}, error => {});
        request.attach(data => {}, error => {});
        request.attach(data => {}, error => {});
        request.attach(data => {}, error => {});

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(4);
        // @ts-ignore
        expect(request._errorCallbacks.length).is.eq(4);
    });

    it('Set data and notify 3 callbacks', (done) => {
        let callbacksExecuted = 0;
        let callbacksToExecute = 3;

        request.attach(data => {
            callbacksExecuted++;
            if(callbacksExecuted === callbacksToExecute) done();
        }, error => {});
        request.attach(data => {
            callbacksExecuted++;
            if(callbacksExecuted === callbacksToExecute) done();
        }, error => {});
        request.attach(data => {
            callbacksExecuted++;
            if(callbacksExecuted === callbacksToExecute) done();
        }, error => {});

        request.setData("OK");
    });

    it('Set data and check data after', (done) => {
        let dataResult = "FIXUUUUUUUUUUUP";

        request.attach(data => {
            expect(data).is.eq(dataResult);
            done();
        }, error => {});

        request.setData(dataResult);
    });

    it('Check listeners counts', () => {
        let dataResult = "FIXUUUUUUUUUUUP";

        request.attach(data => {}, error => {});
        request.attach(data => {}, error => {});
        request.attach(data => {}, error => {});
        request.attach(data => {}, error => {});

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(4);

        request.setData(dataResult);

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(0);
    });

    it('Notify after a set data', (done) => {
        let dataResult = "FIXUUUUUUUUUUUP";

        request.attach(data => {}, error => {});

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(1);

        request.setData(dataResult);

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(0);

        request.attach(data => {
            expect(data).is.eq(dataResult);
            done();
        }, error => {});
    });

    it('Integrating errors', (done) => {
        let expectedError = "error zob";

        request.attach(data => {}, error => {});

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(1);

        request.setError(expectedError);

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(0);

        request.attach(data => {

        }, error => {
            expect(error).is.eq(expectedError);
            done();
        });
    });

    it('Check error listeners counts', () => {
        let dataResult = "FIXUUUUUUUUUUUP";

        request.attach(data => {}, error => {});
        request.attach(data => {});
        request.attach(data => {});
        request.attach(data => {}, error => {});

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(4);
        // @ts-ignore
        expect(request._errorCallbacks.length).is.eq(2);

        request.setData(dataResult);

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(0);
        // @ts-ignore
        expect(request._errorCallbacks.length).is.eq(0);
    });

    it('Check error listeners counts #2', () => {
        request.attach(data => {}, error => {});
        request.attach(data => {});
        request.attach(data => {}, error => {});
        request.attach(data => {}, error => {});

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(4);
        // @ts-ignore
        expect(request._errorCallbacks.length).is.eq(3);

        request.setError("ERROOOOR");

        // @ts-ignore
        expect(request._dataCallbacks.length).is.eq(0);
        // @ts-ignore
        expect(request._errorCallbacks.length).is.eq(0);
    });
});
