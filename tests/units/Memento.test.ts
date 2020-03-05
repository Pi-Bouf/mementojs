import {Memento} from "../../src/Memento";

describe('Memento unit tests', () => {
  let memento: Memento<HTMLImageElement>;

  beforeEach(() => {
    memento = new Memento<HTMLImageElement>();
  });

  it("Requesting non existent object", () => {
    /*
    Main logic

    let memento = new Memento<HTMLImageElement>();
    memento.request("awesome-unique-id", (request: HTMLImageElement) => {
      console.log("This is my first loading, now this request is cached");
    });

    memento.request("awesome-unique-id", (request: HTMLImageElement) => {
      console.log("Second request ! No need to downloading it again in memento !");
    });
     */
  });
});
