[![Travis](https://img.shields.io/travis/Pi-Bouf/mementojs.svg)](https://travis-ci.org/Pi-Bouf/mementojs/)
[![npm](https://img.shields.io/npm/v/mementojs.svg)](https://www.npmjs.com/package/mementojs)
[![npm](https://img.shields.io/npm/dt/mementojs.svg)](https://www.npmjs.com/package/mementojs)

# mementojs

A lightweight and dependency-free cache system for manager like a downloader.
Execute request, store the data and re-serve it with at next request. 

You can use it on node, browser in JS or TS :)

### Explanations
- *If you make a Downloader (own need), you will wait during the first request during download. But at next request, it will be more fast because data is already downloaded and cached.*
- *Multiple request on same object can be made but only one download will be launch. However, all listeners will be notified when first request will be done.*  

## Installation

Install by `npm`

```sh
npm install --save mementojs
```

**or** install with `yarn`

```sh
yarn add mementojs
```

# Usage
Before all, you need to extend the class Memento (***extend only***) and implement the `load` function.

```
export class JSONDownloader extends Memento<HTMLImageElement> {
    
    // Load function need to be implemented ! 
    load(id: string, request: Request<string>): void {
        
        // Execute the first request
        fetch('http://example.com/image-example.png').then(result: string => {

            // Store the data in the cache & notify every listeners
            request.setData(result);
        });
    }
}
```

Now, in your main code, you can just make request like this:
```
let jsonDownloader = new JSONDownloader();

jsonDownloader.request("json-city", (data: HTMLImageElement) => {
    // Get your data here ! 
});

jsonDownloader.request("json-city", (data: HTMLImageElement) => {
    // Get your data again, without waiting because it's already loaded :)
});

jsonDownloader.request("json-country", (data: HTMLImageElement) => {
    // Request another data :)
});
```
All request will be executed one time, but notify every listeners when they will be done.

# Options
* maxSimultaneousRequest: Determine the number of conccurency request


# Todo
- [ ] Max age caching
- [ ] Max request caching
- [x] Max simultaneous request 