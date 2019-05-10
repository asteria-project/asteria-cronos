"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asteria_gaia_1 = require("asteria-gaia");
const asteria_ouranos_1 = require("asteria-ouranos");
const CronosTransformStream_1 = require("../../core/CronosTransformStream");
class FilterStream extends CronosTransformStream_1.CronosTransformStream {
    constructor(opts) {
        super('com.asteria.cronos.stream.data::FilterStream', opts);
        this._condition = asteria_gaia_1.FilterCondition.OR;
        this._filters = new Array();
    }
    init(config, context) {
        if (config && config.filters) {
            if (config.condition) {
                this._condition = config.condition;
            }
            if (config.filters) {
                config.filters.forEach((value) => {
                    this._filters.push(value);
                });
            }
        }
        else {
            const error = asteria_ouranos_1.OuranosErrorBuilder.getInstance().build(asteria_gaia_1.AsteriaErrorCode.MISSING_FILTER, this.getClassName(), 'missing filter list');
            context.getLogger().error(error.toString());
        }
    }
    transform(chunk) {
        const data = this.buildJsonArray(asteria_gaia_1.CommonChar.EMPTY + chunk);
        const result = this.doFilters(data);
        this.onComplete(null, result);
    }
    buildJsonArray(data) {
        return data.split(asteria_gaia_1.CommonRegExp.NEW_LINE);
    }
    doFilters(input) {
        let result = asteria_gaia_1.CommonChar.EMPTY;
        let len = input.length;
        if (this._condition === asteria_gaia_1.FilterCondition.OR) {
            while (len--) {
                result += this.applyFiltersOr(input[len]);
            }
        }
        else if (this._condition === asteria_gaia_1.FilterCondition.AND) {
            while (len--) {
                result += this.applyFiltersAnd(input[len]);
            }
        }
        return result !== asteria_gaia_1.CommonChar.EMPTY ? result : null;
    }
    applyFiltersOr(json) {
        let result = asteria_gaia_1.CommonChar.EMPTY;
        if (json !== asteria_gaia_1.CommonChar.EMPTY) {
            const obj = JSON.parse(json);
            const filtersSize = this._filters.length - 1;
            let i = 0;
            for (; i <= filtersSize; ++i) {
                if (this.applyFilter(obj, this._filters[i])) {
                    result += json + asteria_gaia_1.CommonChar.NEW_LINE;
                    break;
                }
            }
        }
        return result;
    }
    applyFiltersAnd(json) {
        let result = asteria_gaia_1.CommonChar.EMPTY;
        if (json !== asteria_gaia_1.CommonChar.EMPTY) {
            const obj = JSON.parse(json);
            const filtersSize = this._filters.length - 1;
            let i = 0;
            let matchAll = true;
            for (; i <= filtersSize; ++i) {
                if (this.applyFilter(obj, this._filters[i]) === false) {
                    matchAll = false;
                    break;
                }
            }
            if (matchAll) {
                result += json + asteria_gaia_1.CommonChar.NEW_LINE;
            }
        }
        return result;
    }
    applyFilter(obj, def) {
        return asteria_ouranos_1.OuranosFilterManager.getInstance()
            .getFilter(def.operator)
            .apply(obj, def.property, def.value);
    }
}
exports.FilterStream = FilterStream;
