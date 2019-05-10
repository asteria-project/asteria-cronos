import { Transform, TransformCallback, TransformOptions } from 'stream';
import { AsteriaStream, StreamProcessConfig, AsteriaContext } from 'asteria-gaia';

/**
 * The <code>CronosTransformStream</code> class is the base class for all transformation streams in the Cronos 
 * framework.
 */
export abstract class CronosTransformStream extends Transform implements AsteriaStream {

    /**
     * Provides encoding information for the current chunk of data to be treated by this transformation stream.
     */
    protected encoding: string = null;

    /**
     * The callback function to be invoked by developer once the the current chunk of data has been treated.
     */
    protected onComplete: (err: any, result: any)=>void = null;

    /**
     * Store the reference to the fully qualified class name for this object.
     */
    private readonly _className: string;

    /**
     * Create a new <code>AsteriaObject</code> instance.
     * 
     * @param {string} className the fully qualified class name for this object.
     * @param {TransformOptions} opts the list of options for this stream.
     */
    protected constructor(className: string, opts?: TransformOptions) {
        super(opts);
        this._className = className;
    }

    /**
     * @inheritdoc
     */
    public getClassName(): string {
        return this._className;
    }

    /**
     * @inheritdoc
     */
    public abstract init(config: StreamProcessConfig, context: AsteriaContext): void;
    
    /**
     * The <code>transform()</code> must be overridden by develeporer to implement custom transformation stream process.
     * 
     * @param {any} chunk the current chunk of data to be treated by this transformation stream.
     */
    public abstract transform(chunk: any): void;
    
    /**
     * @internal
     */
    public _transform(chunk: any, encoding: string, callback: TransformCallback): void {
        this.onComplete = callback;
        this.encoding = encoding;
        this.transform.bind(this)(chunk);
    }
}
