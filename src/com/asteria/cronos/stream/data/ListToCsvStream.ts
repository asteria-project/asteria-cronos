import { TransformOptions } from 'stream';
import { AsteriaStream, CommonChar, AsteriaContext, CommonRegExp } from 'asteria-gaia';
import { CronosTransformStream } from '../../core/CronosTransformStream';
import { CsvColumnMapper } from '../../util/CsvColumnMapper';
import { ListToCsvConfig } from '../../config/data/ListToCsvConfig';

/**
 * The <code>ListToCsvStream</code> class is a transformation stream that turns a list of POJOs chuncks into a CSV
 * string.
 */
export class ListToCsvStream extends CronosTransformStream implements AsteriaStream {

    /**
     * The reference to the CSV default separator.
     */
    private static readonly DEFAULT_SEPARATOR: string = CommonChar.COMMA;

    /**
     * The reference to the CSV separator. Default value is <code>,</code>.
     */
    private _separator: string = ListToCsvStream.DEFAULT_SEPARATOR;

    /**
     * The list of references used to create "column to property" mapping.
     */
    private _mappingRefs: Array<CsvColumnMapper> = null;

    /**
     * A boolean that indicates whether the current chunck treated by the <code>_transform()</code> is the first of the
     * series <code>true</code>, or not <code>false</code>.
     */
    private _isFirstChunck: boolean = true;

    /**
     * A convenient value to store the size of the column mappers.
     */
    private _mappingRefsSize: number = -1;

    /**
     * Create a new <code>ListToCsvStream</code> instance.
     * 
     * @param {TransformOptions} opts the options config for this stream.
     */
    constructor(opts?: TransformOptions) {
        super('com.asteria.cronos.stream.data::ListToCsvStream', opts);
    }

    /**
     * @inheritdoc
     */
    public init(config: ListToCsvConfig, context: AsteriaContext): void {
        if (config) {
            this._separator = config.separator || ListToCsvStream.DEFAULT_SEPARATOR;
            if (config.colsMapping)  {
                this._mappingRefs = config.colsMapping;
            }
        }
    }

    /**
     * @inheritdoc
     */
    public transform(chunk: any): void {
        const data: Array<any> = this.buildPojosArray(CommonChar.EMPTY + chunk);
        const result: string = this.buildResultData(data);
        this.onComplete(null, result);
    }

    /**
     * Create and return a string that represent a list of Asteria POJOs in CSV format.
     * 
     * @param {Array<any>} data the list of Asteria POJOs to transform into CSV format.
     * 
     * @returns {string} a well-formed CSV string based on the input data.
     */
    private buildResultData(data: Array<any>): string {
        let result: string = CommonChar.EMPTY;
        if(this._isFirstChunck) {
            this._isFirstChunck = false;
            result += this.initModel(data[0]);
        }
        let i: number = 0;
        for (; i <= data.length - 1; ++i) {
            const csv: string = this.buildCsv(data[i]);
            result += csv;
        }
        return result;
    }

    /**
     * Build and return a CSV row created from an Asteria POJO.
     * 
     * @param {any} obj an Asteria POJO.
     * 
     * @returns {string} a string that represents a CSV row.
     */
    private buildCsv(obj: any): string {
        let row: string = CommonChar.EMPTY;
        this._mappingRefs.forEach((value: CsvColumnMapper, index: number)=> {
            const prop: string = value.property;
            row += `${obj[prop]}${this.getLastRowChar(index)}`;
        });
        return row;
    }

    /**
     * Build and return an array composed of each POJO of the Asteria input.
     * 
     * @param {string} data the string representation fo the Asteria input.
     * 
     * @returns {Array<string>} an array composed of each POJO of the Asteria input.
     */
    private buildPojosArray(data: string): Array<any> {
        const arr: Array<any> = new Array<any>();
        data.split(CommonRegExp.NEW_LINE).forEach((json: string)=> {
            if (json !== CommonChar.EMPTY) {
                arr.push(JSON.parse(json));
            }
        });
        return arr;
    }

    /**
     * Initialize the model used for converting POJOs into CSV columns.
     * 
     *  @param {any} input 
     */
    private initModel(input: any): string {
        let headerRow: string = CommonChar.EMPTY;
        if (this._mappingRefs === null)  {
            this._mappingRefs = new Array<CsvColumnMapper>();
            Object.keys(input).forEach((key: string, index: number)=> {
                this._mappingRefs.push(
                    {
                        index: index,
                        property: key
                    }
                );
            });
        }
        this._mappingRefsSize = this._mappingRefs.length;
        this._mappingRefs.sort((a: CsvColumnMapper, b: CsvColumnMapper)=> {
            return a.index - b.index;
        });
        this._mappingRefs.forEach((value: CsvColumnMapper, index: number)=> {
            headerRow += `${value.property}${this.getLastRowChar(index)}`;
        });
        return headerRow;
    }

    private getLastRowChar(index: number): string {
        const lastChar: string = (index < this._mappingRefsSize - 1) ? this._separator : CommonChar.NEW_LINE;
        return lastChar;
    }
}
