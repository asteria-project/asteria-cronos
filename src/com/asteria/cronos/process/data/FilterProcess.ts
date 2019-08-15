import { AbstractAsteriaObject, StreamProcess, StreamProcessType, AsteriaStream, AsteriaContext } from 'asteria-gaia';
import { FilterConfig } from '../../config/data/FilterConfig';
import { FilterStream } from '../../stream/data/FilterStream';

/**
 * A stream process that filters a list of Asteria POJOs.
 */
export class FilterProcess extends AbstractAsteriaObject implements StreamProcess {

    /**
     * The config object for this process.
     */
    private _config: FilterConfig = null;

    /**
     * Creates a new <code>FilterProcess</code> instance.
     */
    constructor() {
        super('com.asteria.cronos.process.data::FilterProcess');
    }

    /**
     * @inheritdoc
     */
    public getConfig(): FilterConfig {
        return this._config;
    }

    /**
     * @inheritdoc
     */
    public setConfig(config: FilterConfig): void {
        this._config = config;
    }

    /**
     * @inheritdoc
     */
    public getType(): StreamProcessType {
        return StreamProcessType.TRANSFORM;
    }

    /**
     * @inheritdoc
     */
    public create(context: AsteriaContext): AsteriaStream {
        const stream: AsteriaStream = new FilterStream();
        stream.init(this._config, context);
        return stream;
    }
}
