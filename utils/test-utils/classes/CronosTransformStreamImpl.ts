import { CronosTransformStream } from '../../../src/com/asteria/cronos/core/CronosTransformStream';
import { TransformOptions } from 'stream';
import { StreamProcessConfig, AsteriaContext } from 'asteria-gaia';

/**
 * A test implementation of the <code>CronosTransformStream</code> class.
 */
export class CronosTransformStreamImpl extends CronosTransformStream {

    /**
     * Create a new <code>CronosTransformStreamImpl</code> instance.
     * 
     * @param {string} className the fully qualified class name for this object.
     * @param {TransformOptions} opts the list of options for this stream.
     */
    constructor(className: string, opts?: TransformOptions) {
        super(className, opts);
    }

    /**
     * @inheritdoc
     */
    public init(config: StreamProcessConfig, context: AsteriaContext): void {}

    /**
     * @inheritdoc
     */
    public transform(chunk: any): void {}
}