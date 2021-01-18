// @ts-ignore
import {TimeoutMemento} from "./Resources/TimeoutMemento";
// @ts-ignore
import {SyncMemento} from './Resources/SyncMemento';
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

  it('Execute request one by one', (done) => {
    let memento = new TimeoutMemento({maxSimultaneousRequest: 1});

    let startingTime = new Date().getMilliseconds();

    memento.request("1", data => {
      expect(data).is.eq("1");
      expect(new Date().getTime() - startingTime > 300).is.eq(true);
    });
    memento.request("2", data => {
      expect(data).is.eq("2");
      expect(new Date().getTime() - startingTime > 600).is.eq(true);
    });
    memento.request("3", data => {
      expect(data).is.eq("3");
      expect(new Date().getTime() - startingTime > 900).is.eq(true);
      done();
    });
  });

  it("Check duplicate requests but with maxSimultaneous", (done) => {
    let memento = new SyncMemento({maxSimultaneousRequest: 1});

    memento.request("request-1", data => {});
    memento.request("request-2", data => {});
    memento.request("request-3", data => {});
    memento.request("request-4", data => {});
    memento.request("request-3", data => {});
    memento.request("request-4", data => {});
    memento.request("request-3", data => {});
    memento.request("request-4", data => { done() });
  });
});
