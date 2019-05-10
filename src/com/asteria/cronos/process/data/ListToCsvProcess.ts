import { AbstractAsteriaObject, StreamProcess, StreamProcessType, AsteriaStream, AsteriaContext } from 'asteria-gaia';
import { ListToCsvConfig } from '../../config/data/ListToCsvConfig';
import { ListToCsvStream } from '../../stream/data/ListToCsvStream';

/**
 * A basic stream process that turns list of POJOs into a CSV string.
 */
export class ListToCsvProcess extends AbstractAsteriaObject implements StreamProcess {
    
    /**
     * The config object for this process.
     */
    private _config: ListToCsvConfig = null;

    /**
     * Create a new <code>ListToCsvProcess</code> instance.
     */
    constructor() {
        super('com.asteria.cronos.process.data::ListToCsvProcess');
    }

    /**
     * @implements
     */
    public getConfig(): ListToCsvConfig {
        return this._config;
    }

    /**
     * @implements
     */
    public setConfig(config: ListToCsvConfig): void {
        this._config = config;
    }

    /**
     * @implements
     */
    public getType(): StreamProcessType {
        return StreamProcessType.TRANSFORM;
    }

    /**
     * @implements
     */
    public create(context: AsteriaContext): AsteriaStream {
        const stream: AsteriaStream = new ListToCsvStream();
        stream.init(this._config, context);
        return stream;
    }
}
