import {Memento, Request} from '../../../src';
import {IMementoConfiguration} from '../../../src/IMementoConfiguration';

export class ImageDownloader extends Memento<HTMLImageElement> {
    constructor(configuration?: IMementoConfiguration) {super(configuration);}

    public load(id: string, request: Request<HTMLImageElement>) {
        console.info("Starting execute request...", id);
        setTimeout(() => {
            request.setData(new Image());
        }, 5000);
    }
}