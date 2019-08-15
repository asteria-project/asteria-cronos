import { AsteriaStream, AsteriaContext, StreamProcess, AbstractAsteriaObject, StreamProcessType } from 'asteria-gaia';
import { CsvPreviewConfig } from '../../config/file/CsvPreviewConfig';
import { CsvPreviewStream } from '../../stream/file/CsvPreviewStream';

/**
 * A basic stream process that allows to read a local file.
 */
export class CsvPreviewProcess extends AbstractAsteriaObject implements StreamProcess {
    
    /**
     * The config object for this process.
     */
    private _config: CsvPreviewConfig = null;

    /**
     * Create a new <code>CsvPreviewProcess</code> instance.
     */
    constructor() {
        super('com.asteria.cronos.process.file::CsvPreviewProcess');
    }

    /**
     * @inheritdoc
     */
    public getConfig(): CsvPreviewConfig {
        return this._config;
    }

    /**
     * @inheritdoc
     */
    public setConfig(config: CsvPreviewConfig): void {
        this._config = config;
    }

    /**
     * @inheritdoc
     */
    public getType(): StreamProcessType {
        return StreamProcessType.READABLE;
    }

    /**
     * @inheritdoc
     */
    public create(context: AsteriaContext): AsteriaStream {
        const stream: AsteriaStream = new CsvPreviewStream();
        stream.init(this._config, context);
        return stream;
    }
}