import { TransformOptions } from 'stream';
import { AsteriaStream, AsteriaContext, CommonChar, CommonRegExp, AsteriaLine } from 'asteria-gaia';
import { CronosTransformStream } from '../../core/CronosTransformStream';
import { LinesToListConfig } from '../../config/data/LinesToListConfig';

/**
 * The <code>LinesToListStream</code> class is a transformation stream that turns a string into a list of
 * <code>AsteriaLine</code> objects.
 */
export class LinesToListStream extends CronosTransformStream implements AsteriaStream {

    /**
     * Represents a carriage return character combined with a newline character.
     */
    private static CR_NEW_LINE: string = '\r\n';

    /**
     * Represents a carriage return character.
     */
    private static CR: string = '\r';

    /**
     * The reference to the object used as prototype for all list entries.
     */
    private _objModel: AsteriaLine = {
        index: -1,
        value: CommonChar.EMPTY
    };

    /**
     * Represents an incomplete line, extracted from the last chunck.
     */
    private _incompleteLine: string = null;

    /**
     * The number of lines treated by this stream process.
     */
    private _lineNum: number = 0;

    /**
     * Create a new <code>LinesToListStream</code> instance.
     * 
     * @param {TransformOptions} opts the options config for this stream.
     */
    constructor(opts?: TransformOptions) {
        super('com.asteria.cronos.stream.data::LinesToListStream', opts);
    }

    /**
     * @inheritdoc
     */
    public init(config: LinesToListConfig, context: AsteriaContext): void {}

    /**
     * @inheritdoc
     */
    public transform(chunk: any): void {
        const input: string = CommonChar.EMPTY + chunk;
        const lastLineComplete: boolean = this.checkFinalChar(input);
        const data: Array<string> = input.split(CommonRegExp.NEW_LINE);
        const result: string = this.buildAsteriaList(data, lastLineComplete);
        this.onComplete(null, result);
    }

    /**
     * Return a boolean that indicates whether the last character of the input string is a new line character
     * (<code>true</code>), or not (<code>false</code>).
     * 
     * @param {string} input the input string to check.
     * 
     * @return {boolean} <code>true</code> whether the last character of the input string is a new line character;
     *                   <code>false</code> otherwise.
     */
    private checkFinalChar(input: string): boolean {
        return input.endsWith(CommonChar.NEW_LINE) ||
               input.endsWith(LinesToListStream.CR_NEW_LINE) ||
               input.endsWith(LinesToListStream.CR);
    }

    /**
     * Build and return a string composed of Asteria list objects.
     * 
     * @param {Array<string>} data an array composed of each lines found in the input string.
     * @param {boolean} lastLineComplete indicates whether the last line of the input data is complete
     *                                   (<code>true</code>), or not (<code>false</code>).
     * 
     * @return {string} a string composed of Asteria list objects.
     */
    private buildAsteriaList(data: Array<string>, lastLineComplete: boolean): string {
        let result: string = CommonChar.EMPTY;
        if (this._incompleteLine && data[0] !== CommonChar.EMPTY) {
            data[0] = this._incompleteLine + data[0];
            this._incompleteLine = null;
        }
        let i: number = 0;
        let to: number = lastLineComplete ? data.length - 2 : data.length - 1;
        for(; i <= to; ++i) {
            const obj: AsteriaLine = this.buildLineObj(data[i]);
            result += JSON.stringify(obj) + CommonChar.NEW_LINE;
            this._lineNum++;
        }
        if (!lastLineComplete) {
            this._incompleteLine = data[data.length - 1];
        }
        return result;
    }

    /**
     * Build and return an <code>AsteriaLine</code> object.
     * 
     * @param {string} value the content of the line for which to create a new an <code>AsteriaLine</code> object.
     * 
     * @returns {any} an <code>AsteriaLine</code> object.
     */
    private buildLineObj(value: string): AsteriaLine {
        let result: AsteriaLine = Object.create(this._objModel);
        result.index = this._lineNum;
        result.value = value;
        return result;
    }
}
