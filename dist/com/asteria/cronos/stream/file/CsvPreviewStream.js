"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const stream_1 = require("stream");
const fs = require("fs");
class CsvPreviewStream extends stream_1.Readable {
    constructor() {
        super();
        this._rowLimit = 10;
        this._csvRows = null;
        this._cursor = -1;
    }
    getClassName() {
        return CsvPreviewStream.CLASS_NAME;
    }
    init(config, context) {
        const rowLimit = config.rowLimit;
        if (rowLimit) {
            this._rowLimit = rowLimit;
        }
        this._csvRows = new Array();
        const readStream = fs.createReadStream(config.path);
        readStream.on(asteria_gaia_1.StreamEventType.DATA, (chunk) => {
            if (this._cursor < this._rowLimit) {
                const data = chunk.toString();
                readStream.destroy();
                this.buildCsvData(data);
                this.pushPreview();
            }
        });
    }
    _read(size) { }
    buildCsvData(data) {
        const arr = data.split(asteria_gaia_1.CommonRegExp.NEW_LINE);
        const len = data.length;
        this._csvRows.splice(0);
        let limit = this._rowLimit - this._cursor;
        let cursor = 0;
        if (limit > len) {
            limit = len;
        }
        while (cursor < limit) {
            this._csvRows.push(arr[cursor]);
            cursor++;
        }
        this._cursor += cursor;
    }
    pushPreview() {
        const preview = this._csvRows.join(asteria_gaia_1.CommonChar.NEW_LINE);
        this.push(preview);
        this.push(null);
        this.destroy();
    }
}
CsvPreviewStream.CLASS_NAME = 'com.asteria.cronos.stream.file::CsvPreviewStream';
exports.CsvPreviewStream = CsvPreviewStream;
