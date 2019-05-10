"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const CronosTransformStream_1 = require("../../core/CronosTransformStream");
class LinesToListStream extends CronosTransformStream_1.CronosTransformStream {
    constructor(opts) {
        super('com.asteria.cronos.stream.data::LinesToListStream', opts);
        this._objModel = {
            index: -1,
            value: asteria_gaia_1.CommonChar.EMPTY
        };
        this._incompleteLine = null;
        this._lineNum = 0;
    }
    init(config, context) { }
    transform(chunk) {
        const input = asteria_gaia_1.CommonChar.EMPTY + chunk;
        const lastLineComplete = this.checkFinalChar(input);
        const data = input.split(asteria_gaia_1.CommonRegExp.NEW_LINE);
        const result = this.buildAsteriaList(data, lastLineComplete);
        this.onComplete(null, result);
    }
    checkFinalChar(input) {
        return input.endsWith(asteria_gaia_1.CommonChar.NEW_LINE) ||
            input.endsWith(LinesToListStream.CR_NEW_LINE) ||
            input.endsWith(LinesToListStream.CR);
    }
    buildAsteriaList(data, lastLineComplete) {
        let result = asteria_gaia_1.CommonChar.EMPTY;
        if (this._incompleteLine && data[0] !== asteria_gaia_1.CommonChar.EMPTY) {
            data[0] = this._incompleteLine + data[0];
            this._incompleteLine = null;
        }
        let i = 0;
        let to = lastLineComplete ? data.length - 2 : data.length - 1;
        for (; i <= to; ++i) {
            const obj = this.buildLineObj(data[i]);
            result += JSON.stringify(obj) + asteria_gaia_1.CommonChar.NEW_LINE;
            this._lineNum++;
        }
        if (!lastLineComplete) {
            this._incompleteLine = data[data.length - 1];
        }
        return result;
    }
    buildLineObj(value) {
        let result = Object.create(this._objModel);
        result.index = this._lineNum;
        result.value = value;
        return result;
    }
}
LinesToListStream.CR_NEW_LINE = '\r\n';
LinesToListStream.CR = '\r';
exports.LinesToListStream = LinesToListStream;
