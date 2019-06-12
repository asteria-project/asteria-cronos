"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const CsvPreviewStream_1 = require("../../stream/file/CsvPreviewStream");
class CsvPreviewProcess extends asteria_gaia_1.AbstractAsteriaObject {
    constructor() {
        super('com.asteria.cronos.process.file::CsvPreviewProcess');
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
        const stream = new CsvPreviewStream_1.CsvPreviewStream();
        stream.init(this._config, context);
        return stream;
    }
}
exports.CsvPreviewProcess = CsvPreviewProcess;
