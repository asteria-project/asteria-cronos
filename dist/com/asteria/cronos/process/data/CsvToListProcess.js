"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const CsvToListStream_1 = require("../../stream/data/CsvToListStream");
class CsvToListProcess extends asteria_gaia_1.AbstractAsteriaObject {
    constructor() {
        super('com.asteria.cronos.process.data::CsvToListProcess');
        this._config = null;
    }
    getConfig() {
        return this._config;
    }
    setConfig(config) {
        this._config = config;
    }
    getType() {
        return asteria_gaia_1.StreamProcessType.TRANSFORM;
    }
    create(context) {
        const stream = new CsvToListStream_1.CsvToListStream();
        stream.init(this._config, context);
        return stream;
    }
}
exports.CsvToListProcess = CsvToListProcess;
