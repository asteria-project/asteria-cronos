import { AbstractAsteriaObject, StreamProcess, StreamProcessType, AsteriaStream, AsteriaContext } from 'asteria-gaia';
import { LinesToListConfig } from '../../config/data/LinesToListConfig';
import { LinesToListStream } from '../../stream/data/LinesToListStream';

/**
 * A basic stream process that turns a string into a list of <code>AsteriaLine</code> objects.
 */
export class LinesToListProcess extends AbstractAsteriaObject implements StreamProcess {
    
    /**
     * The config object for this process.
     */
    private _config: LinesToListConfig = null;

    /**
     * Create a new <code>LinesToListProcess</code> instance.
     */
    constructor() {
        super('com.asteria.cronos.process.data::LinesToListProcess');
    }

    /**
     * @implements
     */
    public getConfig(): LinesToListConfig {
        return this._config;
    }

    /**
     * @implements
     */
    public setConfig(config: LinesToListConfig): void {
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
        const stream: AsteriaStream = new LinesToListStream();
        stream.init(this._config, context);
        return stream;
    }
}
