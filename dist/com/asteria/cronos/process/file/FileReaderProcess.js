"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const FileReaderStream_1 = require("../../stream/file/FileReaderStream");
class FileReaderProcess extends asteria_gaia_1.AbstractAsteriaObject {
    constructor() {
        super('com.asteria.cronos.process.file::FileReaderProcess');
        this._config = null;
    }
    getConfig() {
        return this._config;
    }
    setConfig(config) {
        this._config = config;
    }
    getType() {
        return asteria_gaia_1.StreamProcessType.READABLE;
    }
    create(context) {
        const stream = new FileReaderStream_1.FileReaderStream(this._config.path);
        stream.init(this._config, context);
        return stream;
    }
}
exports.FileReaderProcess = FileReaderProcess;
