"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class FileWriterStream extends fs_1.WriteStream {
    constructor(path) {
        super(path);
    }
    getClassName() {
        return FileWriterStream.CLASS_NAME;
    }
    init(config, context) { }
}
FileWriterStream.CLASS_NAME = 'com.asteria.cronos.stream.file::FileWriterStream';
exports.FileWriterStream = FileWriterStream;
