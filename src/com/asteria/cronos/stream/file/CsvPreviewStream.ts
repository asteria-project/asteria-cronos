import { AsteriaStream, AsteriaContext, StreamEventType, CommonRegExp, CommonChar } from 'asteria-gaia';
import { Readable } from 'stream';
import * as fs from 'fs';
import { CsvPreviewConfig } from '../../config/file/CsvPreviewConfig';

/**
 * The <code>CsvPreviewStream</code> class provides an stream to preview content of a CSV file.
 */
export class CsvPreviewStream extends Readable implements AsteriaStream {

    /**
     * The class name reference.
     */
    private static readonly CLASS_NAME: string = 'com.asteria.cronos.stream.file::CsvPreviewStream';
    
    /**
     * The maximum number of rows to display in the CSV preview.
     */
    private _rowLimit: number = 10;

    /**
     * The list of rows to display in the CSV preview.
     */
    private _csvRows: Array<string> = null;

    /**
     * The list of rows to display in the CSV preview.
     */
    private _cursor: number = -1;

    /**
     * Create a new <code>CsvPreviewStream</code> instance.
     */
    constructor() {
        super();
    }

    /**
     * @inheritdoc
     */
    public getClassName(): string {
        return CsvPreviewStream.CLASS_NAME;
    }

    /**
     * @inheritdoc
     */
    public init(config: CsvPreviewConfig, context: AsteriaContext): void {
        const rowLimit: number = config.rowLimit;
        if (rowLimit) {
            this._rowLimit = rowLimit;
        }
        this._csvRows = new Array<string>();
        const readStream: fs.ReadStream = fs.createReadStream(config.path);
        readStream.on(StreamEventType.DATA, (chunk: Buffer)=> {
            if (this._cursor < this._rowLimit) {
                const data: string = chunk.toString();
                readStream.destroy();
                this.buildCsvData(data);
                this.pushPreview();
            }
        });
    }

    /**
     * @inheritdoc
     */
    public _read(size: number): void {}

    /**
     * Add rows extracted from the CSV string input.
     * 
     * @param {string} data a partial string representation of the CSV input.
     */
    private buildCsvData(data: string): void {
        const arr: Array<string> = data.split(CommonRegExp.NEW_LINE);
        const len: number = data.length;
        this._csvRows.splice(0);
        let limit = this._rowLimit - this._cursor;
        let cursor: number = 0;
        if (limit > len) {
            limit = len;
        }
        while (cursor < limit) {
            this._csvRows.push(arr[cursor]);
            cursor++;
        }
        this._cursor += cursor;
    }

    /**
     * Push data into the stream processes pipe.
     */
    private pushPreview(): void {
        const preview: string = this._csvRows.join(CommonChar.NEW_LINE);
        this.push(preview);
        this.push(null);
        this.destroy();
    }
}
