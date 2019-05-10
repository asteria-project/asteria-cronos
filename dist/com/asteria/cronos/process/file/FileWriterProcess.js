"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const FileWriterStream_1 = require("../../stream/file/FileWriterStream");
class FileWriterProcess extends asteria_gaia_1.AbstractAsteriaObject {
    constructor() {
        super('com.asteria.cronos.process.file::FileWriterProcess');
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
        const stream = new FileWriterStream_1.FileWriterStream(this._config.path);
        stream.init(this._config, context);
        return stream;
    }
}
exports.FileWriterProcess = FileWriterProcess;
