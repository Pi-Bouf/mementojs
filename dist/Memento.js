"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request_1 = require("./Request");
var Memento = (function () {
    function Memento() {
        console.log("Hello ;)");
        var pk = new Request_1.Request();
    }
    return Memento;

}());
exports.Memento = Memento;
