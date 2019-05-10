"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const LinesToListStream_1 = require("../../stream/data/LinesToListStream");
class LinesToListProcess extends asteria_gaia_1.AbstractAsteriaObject {
    constructor() {
        super('com.asteria.cronos.process.data::LinesToListProcess');
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
        const stream = new LinesToListStream_1.LinesToListStream();
        stream.init(this._config, context);
        return stream;
    }
}
exports.LinesToListProcess = LinesToListProcess;
