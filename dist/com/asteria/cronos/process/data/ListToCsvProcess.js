"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const ListToCsvStream_1 = require("../../stream/data/ListToCsvStream");
class ListToCsvProcess extends asteria_gaia_1.AbstractAsteriaObject {
    constructor() {
        super('com.asteria.cronos.process.data::ListToCsvProcess');
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
        const stream = new ListToCsvStream_1.ListToCsvStream();
        stream.init(this._config, context);
        return stream;
    }
}
exports.ListToCsvProcess = ListToCsvProcess;
