"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const CronosTransformStream_1 = require("../../core/CronosTransformStream");
class CsvToListStream extends CronosTransformStream_1.CronosTransformStream {
    constructor(opts) {
        super('com.asteria.cronos.stream.data::CsvToListStream', opts);
        this._separator = CsvToListStream.DEFAULT_SEPARATOR;
        this._objModel = null;
        this._mappingRefs = null;
        this._numCols = 0;
        this._incompleteRow = null;
    }
    init(config, context) {
        if (config) {
            this._separator = config.separator || CsvToListStream.DEFAULT_SEPARATOR;
            if (config.colsMapping) {
                this._mappingRefs = config.colsMapping;
            }
        }
    }
    transform(chunk) {
        const data = this.buildCsvArray(asteria_gaia_1.CommonChar.EMPTY + chunk);
        const result = this.buildResultData(data);
        this.onComplete(null, result);
    }
    buildResultData(csvArr) {
        let result = asteria_gaia_1.CommonChar.EMPTY;
        let i = 0;
        if (this._incompleteRow) {
            csvArr[0] = this._incompleteRow + csvArr[0];
            this._incompleteRow = null;
        }
        for (; i <= csvArr.length - 1; ++i) {
            const obj = this.buildObj(csvArr[i]);
            if (obj) {
                result += JSON.stringify(obj) + asteria_gaia_1.CommonChar.NEW_LINE;
            }
        }
        return result;
    }
    buildObj(csvRow) {
        const isEmpty = csvRow === asteria_gaia_1.CommonChar.EMPTY;
        let obj = null;
        if (!isEmpty) {
            const values = csvRow.split(this._separator);
            if (values.length === this._numCols) {
                const len = this._mappingRefs.length - 1;
                let i = 0;
                obj = Object.create(this._objModel);
                for (; i <= len; ++i) {
                    const mapper = this._mappingRefs[i];
                    const val = values[mapper.index];
                    obj[mapper.property] = isNaN(val) ? val : +val;
                }
                ;
            }
            else {
                this._incompleteRow = csvRow;
            }
        }
        return obj;
    }
    buildCsvArray(data) {
        const arr = data.split(asteria_gaia_1.CommonRegExp.NEW_LINE);
        if (!this._objModel) {
            this.initModel(arr);
            arr.splice(0, 1);
        }
        return arr;
    }
    initModel(input) {
        const firstRow = input[0].split(this._separator);
        this._numCols = firstRow.length;
        if (this._mappingRefs === null) {
            this._mappingRefs = new Array();
            firstRow.forEach((value, index) => {
                this._mappingRefs.push({
                    index: index,
                    property: value
                });
            });
        }
        this.buildObjModel();
    }
    buildObjModel() {
        this._objModel = {};
        this._mappingRefs.forEach((mapper) => {
            this._objModel[mapper.property] = undefined;
        });
    }
}
CsvToListStream.DEFAULT_SEPARATOR = asteria_gaia_1.CommonChar.COMMA;
exports.CsvToListStream = CsvToListStream;
