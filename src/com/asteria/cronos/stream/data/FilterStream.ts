import { TransformOptions } from 'stream';
import { AsteriaStream, FilterDefinition, FilterCondition, CommonChar, AsteriaContext, AsteriaError, AsteriaErrorCode, CommonRegExp } from 'asteria-gaia';
import { OuranosFilterManager, OuranosErrorBuilder, OuranosContext } from 'asteria-ouranos';
import { CronosTransformStream } from '../../core/CronosTransformStream';
import { FilterConfig } from '../../config/data/FilterConfig';

/**
 * The <code>FilterStream</code> class is a transformation stream that allows to filter lists of POJOs.
 */
export class FilterStream extends CronosTransformStream implements AsteriaStream {

    /**
     * The filtering condition defined for this stream.
     */
    private _condition: FilterCondition = FilterCondition.OR;

    /**
     * The list of filters defined for this stream.
     */
    private _filters: Array<FilterDefinition> = new Array<FilterDefinition>();
    
    /**
     * Create a new <code>FilterStream</code> instance.
     * 
     * @param {TransformOptions} opts the options config for this stream.
     */
    constructor(opts?: TransformOptions) {
        super('com.asteria.cronos.stream.data::FilterStream', opts);
    }

    /**
     * @inheritdoc
     */
    public init(config: FilterConfig, context: AsteriaContext): void {
        if (config && config.filters) {
            if (config.condition) {
                this._condition = config.condition;
            }
            if (config.filters) {
                config.filters.forEach((value: FilterDefinition)=> {
                    this._filters.push(value);
                });
            }
        } else {
            const error: AsteriaError = OuranosErrorBuilder.getInstance().build(
                AsteriaErrorCode.MISSING_FILTER,
                this.getClassName(),
                'missing filter list'
            );
            (context as OuranosContext).getLogger().error(error.toString());
        }
    }

    /**
     * @inheritdoc
     */
    public transform(chunk: any): void {
        const data: Array<string> = this.buildJsonArray(CommonChar.EMPTY + chunk);
        const result: string = this.doFilters(data);
        this.onComplete(null, result);
    }

    /**
     * Build and return an array composed of each row of the Asteria input.
     * 
     * @param {string} data the string representation fo the Asteria input.
     * 
     * @return {Array<string>} an array composed of each object of the Asteria input.
     */
    private buildJsonArray(data: string): Array<string> {
        return data.split(CommonRegExp.NEW_LINE);
    }

    /**
     * Apply all filters defines for this module to the input object list and return the result of the operation.
     * 
     * @param {Array<string>} input the input on which to apply filters.
     * 
     * @returns {Array<string>} the result of the filtering operation.
     */
    private doFilters(input: Array<string>): string {
        let result: string = CommonChar.EMPTY;
        let len: number = input.length;
        if (this._condition === FilterCondition.OR) {
            while (len--) {
                result += this.applyFiltersOr(input[len]);
            }
        } else if (this._condition === FilterCondition.AND) {
            while (len--) {
                result += this.applyFiltersAnd(input[len]);
            }
        }
        return result !== CommonChar.EMPTY ? result : null;
    }

    /**
     * Apply all filters defines for this stream to the specified object, according to the
     * <code>FilterCondition.OR/code> condition algorithm.
     * 
     * @param {string} json the JSON object on whitch to apply the stream process filters.
     * 
     * @returns {string} the string that contains the result of the stream process operation.
     */
    private applyFiltersOr(json: any): string {
        let result: string = CommonChar.EMPTY;
        if (json !== CommonChar.EMPTY) {
            const obj: any = JSON.parse(json);
            const filtersSize: number = this._filters.length - 1;
            let i: number = 0;
            for (; i <= filtersSize; ++i) {
                if (this.applyFilter(obj, this._filters[i])) {
                    result += json + CommonChar.NEW_LINE;
                    break;
                }
            }
        }
        return result;
    }

    /**
     * Apply all filters defines for this stream to the specified object, according to the
     * <code>FilterCondition.AND/code> condition algorithm.
     * 
     * @param {string} json the JSON object on whitch to apply the stream process filters.
     * 
     * @returns {string} the list that contains the result of the stream process operation.
     */
    private applyFiltersAnd(json: string): string {
        let result: string = CommonChar.EMPTY;
        if (json !== CommonChar.EMPTY) {
            const obj: any = JSON.parse(json);
            const filtersSize: number = this._filters.length - 1;
            let i: number = 0;
            let matchAll: boolean = true;
            for (; i <= filtersSize; ++i) {
                if (this.applyFilter(obj, this._filters[i]) === false) {
                    matchAll = false;
                    break;
                }
            }
            if (matchAll) {
                result += json + CommonChar.NEW_LINE;
            }
        }
        return result;
    }

    /**
     * Return a boolean value that indicates whether the filter matches the specified object (<code>true</code>), or
     * not (<code>false</code>).
     * 
     * @param {any} obj the object on whitch to apply the filter.
     * @param {FilterDefinition} def the definition that represents the filter to apply.
     * 
     * @returns {boolean} <code>true</code> whether the filter matches the specified object; <code>false</code>
     *                    otherwise.
     */
    private applyFilter(obj: any, def: FilterDefinition): boolean {
        return OuranosFilterManager.getInstance()
                                   .getFilter(def.operator)
                                   .apply(obj, def.property, def.value);
    }
}
