// @ts-ignore
import {TimeoutMemento} from "./Resources/TimeoutMemento";
import {expect} from "chai";

describe('Memento unit tests', () => {
  let memento: TimeoutMemento;
  let map = new Map<string, number>();

  beforeEach(() => {
    memento = new TimeoutMemento();
  });

  it("Check request count", () => {
    let memento = new TimeoutMemento();

    memento.request("request-1", data => {});
    memento.request("request-2", data => {});
    memento.request("request-3", data => {});
    memento.request("request-4", data => {});

    // @ts-ignore
    expect(memento._requests.size).is.eq(4);
  });

  it("Check duplicate requests", () => {
    let memento = new TimeoutMemento();

    memento.request("request-1", data => {});
    memento.request("request-2", data => {});
    memento.request("request-3", data => {});
    memento.request("request-4", data => {});
    memento.request("request-3", data => {});
    memento.request("request-4", data => {});
    memento.request("request-3", data => {});
    memento.request("request-4", data => {});

    // @ts-ignore
    expect(memento._requests.size).is.eq(4);
  });

  it("Requesting non existent object", (done) => {
    let memento = new TimeoutMemento();

    let requestId = "Remember me... <3";

    memento.request(requestId, data => {
      expect(data).is.eq(requestId);
      done();
    });
  });

  it("Request multiple objects", (done) => {
    let memento = new TimeoutMemento();

    let requestExecutedCount = 0;
    let requestNeededToBeExecuted = 3;

    let request1 = "Req-1";
    let request2 = "Req-2";
    let request3 = "Req-3";

    memento.request(request1, data => {
      expect(data).is.eq(request1);
      requestExecutedCount++;
      if(requestExecutedCount === requestNeededToBeExecuted) {
        done();
      }
    });

    memento.request(request2, data => {
      expect(data).is.eq(request2);
      requestExecutedCount++;
      if(requestExecutedCount === requestNeededToBeExecuted) {
        done();
      }
    });

    memento.request(request3, data => {
      expect(data).is.eq(request3);
      requestExecutedCount++;
      if(requestExecutedCount === requestNeededToBeExecuted) {
        done();
      }
    });
  });

  it('Done on second listener', (done) => {
    let memento = new TimeoutMemento();

    let request1 = "Req-1";


    memento.request(request1, data => {
      expect(data).is.eq(request1);
    });

    memento.request(request1, data => {
      expect(data).is.eq(request1);
      done();
    });
  });
});
