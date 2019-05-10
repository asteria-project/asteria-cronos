"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
class CronosTransformStream extends stream_1.Transform {
    constructor(className, opts) {
        super(opts);
        this.encoding = null;
        this.onComplete = null;
        this._className = className;
    }
    getClassName() {
        return this._className;
    }
    _transform(chunk, encoding, callback) {
        this.onComplete = callback;
        this.encoding = encoding;
        this.transform.bind(this)(chunk);
    }
}
exports.CronosTransformStream = CronosTransformStream;
