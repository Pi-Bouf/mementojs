// @ts-ignore
import {ImageDownloader} from './ImageDownloader';

let imgDownloader = new ImageDownloader({
    maxSimultaneousRequest: 1
});

imgDownloader.request("Test-0", data => {
    console.log("DL ! #1");
}, error => {
    console.error(error);
});

imgDownloader.request("Test-1", data => {
    console.log("DL ! #2");
}, error => {
    console.error(error);
});

imgDownloader.request("Test-2", data => {
    console.log("DL ! #3");
}, error => {
    console.error(error);
});

imgDownloader.request("Test-3", data => {
    console.log("DL ! #4");
}, error => {
    console.error(error);
});
