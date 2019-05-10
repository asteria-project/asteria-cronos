import { TransformOptions } from 'stream';
import { AsteriaStream, CommonChar, AsteriaContext, CommonRegExp } from 'asteria-gaia';
import { CronosTransformStream } from '../../core/CronosTransformStream';
import { CsvToListConfig } from '../../config/data/CsvToListConfig';
import { CsvColumnMapper } from '../../util/CsvColumnMapper';

/**
 * The <code>CsvToListStream</code> class is a transformation stream that turns CSV chuncks into a list of POJOs.
 */
export class CsvToListStream extends CronosTransformStream implements AsteriaStream {

    /**
     * The reference to the CSV default separator.
     */
    private static readonly DEFAULT_SEPARATOR: string = CommonChar.COMMA;

    /**
     * The reference to the CSV separator. Default value is <code>,</code>.
     */
    private _separator: string = CsvToListStream.DEFAULT_SEPARATOR;

    /**
     * The reference to the object used as prototype for all list entries.
     */
    private _objModel: any = null;

    /**
     * The list of references used to create "column to property" mapping.
     */
    private _mappingRefs: Array<CsvColumnMapper> = null;

    /**
     * The number of columns defined in the input CSV file.
     */
    private _numCols: number = 0;

    /**
     * Represents an incomplete row, extracted from the last chunck.
     */
    private _incompleteRow: string = null;

    /**
     * Create a new <code>CsvToListStream</code> instance.
     * 
     * @param {TransformOptions} opts the options config for this stream.
     */
    constructor(opts?: TransformOptions) {
        super('com.asteria.cronos.stream.data::CsvToListStream', opts);
    }

    /**
     * @inheritdoc
     */
    public init(config: CsvToListConfig, context: AsteriaContext): void {
        if (config) {
            this._separator = config.separator || CsvToListStream.DEFAULT_SEPARATOR;
            if (config.colsMapping)  {
                this._mappingRefs = config.colsMapping;
            }
        }
    }

    /**
     * @inheritdoc
     */
    public transform(chunk: any): void {
        const data: Array<string> = this.buildCsvArray(CommonChar.EMPTY + chunk);
        const result: string = this.buildResultData(data);
        this.onComplete(null, result);
    }

    /**
     * Create and return a string that represent a list of marshaled rows.
     * 
     * @param {string} csvArr the reference to the CSV input array.
     * 
     * @return {Array<any>} a list of marshaled rows.
     */
    private buildResultData(csvArr: Array<string>): string {
        let result: string = CommonChar.EMPTY;
        let i: number = 0;
        if (this._incompleteRow) {
            csvArr[0] = this._incompleteRow + csvArr[0];
            this._incompleteRow = null;
        }
        for (; i <= csvArr.length - 1; ++i) {
            const obj: any = this.buildObj(csvArr[i]);
            if (obj) {
                result += JSON.stringify(obj) + CommonChar.NEW_LINE;
            }
        }
        return result;
    }

    /**
     * Build and return an object created from a CSV row. Return <code>null</code> whether the specified row is empty.
     * 
     * @param {string} csvRow a string that represents a CSV row.
     * 
     * @return {any} a vanilla JavaScript object created from a CSV row, or <code>null</code> whether the specified row
     *               is empty.
     */
    private buildObj(csvRow: string): any {
        const isEmpty: boolean = csvRow === CommonChar.EMPTY;
        let obj: any = null;
        if (!isEmpty) {
            const values: Array<string> = csvRow.split(this._separator);
            if (values.length === this._numCols) {
                const len = this._mappingRefs.length - 1;
                let i: number = 0;
                obj = Object.create(this._objModel);
                for (; i <= len; ++i) {
                    const mapper: CsvColumnMapper = this._mappingRefs[i];
                    const val: any = values[mapper.index];
                    obj[mapper.property] = isNaN(val) ? val : +val;
                };
            } else {
                this._incompleteRow = csvRow;
            }
        }
        return obj;
    }

    /**
     * Build and return an array composed of each row of the CSV input.
     * 
     * @param {string} data the string representation fo the CSV input.
     * 
     * @return {Array<string>} an array composed of each row of the CSV input.
     */
    private buildCsvArray(data: string): Array<string> {
        const arr: Array<string> = data.split(CommonRegExp.NEW_LINE);
        if(!this._objModel) {
            this.initModel(arr);
            arr.splice(0, 1);
        }
        return arr;
    }

    /**
     * Initialize the model used for converting CSV columns to POJOs.
     * 
     *  @param {Array<string>} input the reference to the input CSV rows.
     */
    private initModel(input: Array<string>): void {
        const firstRow: Array<string> = input[0].split(this._separator);
        this._numCols = firstRow.length;
        if (this._mappingRefs === null)  {
            this._mappingRefs = new Array<CsvColumnMapper>();
            firstRow.forEach((value: string, index: number)=> {
                this._mappingRefs.push(
                    {
                        index: index,
                        property: value
                    }
                );
            });
        }
        this.buildObjModel();
    }

    /**
     * Build the object model used for creating all list items.
     */
    private buildObjModel(): void {
        this._objModel = {};
        this._mappingRefs.forEach((mapper: CsvColumnMapper)=> {
            this._objModel[mapper.property] = undefined;
        });
    }
}
