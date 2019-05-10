"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const CronosTransformStream_1 = require("../../core/CronosTransformStream");
class ListToCsvStream extends CronosTransformStream_1.CronosTransformStream {
    constructor(opts) {
        super('com.asteria.cronos.stream.data::ListToCsvStream', opts);
        this._separator = ListToCsvStream.DEFAULT_SEPARATOR;
        this._mappingRefs = null;
        this._isFirstChunck = true;
        this._mappingRefsSize = -1;
    }
    init(config, context) {
        if (config) {
            this._separator = config.separator || ListToCsvStream.DEFAULT_SEPARATOR;
            if (config.colsMapping) {
                this._mappingRefs = config.colsMapping;
            }
        }
    }
    transform(chunk) {
        const data = this.buildPojosArray(asteria_gaia_1.CommonChar.EMPTY + chunk);
        const result = this.buildResultData(data);
        this.onComplete(null, result);
    }
    buildResultData(data) {
        let result = asteria_gaia_1.CommonChar.EMPTY;
        if (this._isFirstChunck) {
            this._isFirstChunck = false;
            result += this.initModel(data[0]);
        }
        let i = 0;
        for (; i <= data.length - 1; ++i) {
            const csv = this.buildCsv(data[i]);
            result += csv;
        }
        return result;
    }
    buildCsv(obj) {
        let row = asteria_gaia_1.CommonChar.EMPTY;
        this._mappingRefs.forEach((value, index) => {
            const prop = value.property;
            row += `${obj[prop]}${this.getLastRowChar(index)}`;
        });
        return row;
    }
    buildPojosArray(data) {
        const arr = new Array();
        data.split(asteria_gaia_1.CommonRegExp.NEW_LINE).forEach((json) => {
            if (json !== asteria_gaia_1.CommonChar.EMPTY) {
                arr.push(JSON.parse(json));
            }
        });
        return arr;
    }
    initModel(input) {
        let headerRow = asteria_gaia_1.CommonChar.EMPTY;
        if (this._mappingRefs === null) {
            this._mappingRefs = new Array();
            Object.keys(input).forEach((key, index) => {
                this._mappingRefs.push({
                    index: index,
                    property: key
                });
            });
        }
        this._mappingRefsSize = this._mappingRefs.length;
        this._mappingRefs.sort((a, b) => {
            return a.index - b.index;
        });
        this._mappingRefs.forEach((value, index) => {
            headerRow += `${value.property}${this.getLastRowChar(index)}`;
        });
        return headerRow;
    }
    getLastRowChar(index) {
        const lastChar = (index < this._mappingRefsSize - 1) ? this._separator : asteria_gaia_1.CommonChar.NEW_LINE;
        return lastChar;
    }
}
ListToCsvStream.DEFAULT_SEPARATOR = asteria_gaia_1.CommonChar.COMMA;
exports.ListToCsvStream = ListToCsvStream;
