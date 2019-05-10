"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const FilterStream_1 = require("../../stream/data/FilterStream");
class FilterProcess extends asteria_gaia_1.AbstractAsteriaObject {
    constructor() {
        super('com.asteria.cronos.process.data::FilterProcess');
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
        const stream = new FilterStream_1.FilterStream();
        stream.init(this._config, context);
        return stream;
    }
}
exports.FilterProcess = FilterProcess;
