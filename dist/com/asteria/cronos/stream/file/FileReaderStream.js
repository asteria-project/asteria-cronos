"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class FileReaderStream extends fs_1.ReadStream {
    constructor(path) {
        super(path);
    }
    getClassName() {
        return FileReaderStream.CLASS_NAME;
    }
    init(config, context) { }
}
FileReaderStream.CLASS_NAME = 'com.asteria.cronos.stream.file::FileReaderStream';
exports.FileReaderStream = FileReaderStream;
