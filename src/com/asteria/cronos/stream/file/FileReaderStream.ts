import { AsteriaStream, AsteriaContext } from 'asteria-gaia';
import { FileReaderConfig } from '../../config/file/FileReaderConfig';
import { ReadStream } from 'fs';

/**
 * The <code>FileReaderStream</code> class provides an input stream for a file.
 */
export class FileReaderStream extends ReadStream implements AsteriaStream {

    /**
     * The class name reference.
     */
    private static readonly CLASS_NAME: string = 'com.asteria.cronos.stream.file::FileReaderStream';

    /**
     * Create a new <code>FileReaderStream</code> instance.
     * 
     * @param {string} path the path to the file to read.
     */
    constructor(path: string) {
        super(path as any);
    }

    /**
     * @inheritdoc
     */
    public getClassName(): string {
        return FileReaderStream.CLASS_NAME;
    }

    /**
     * @inheritdoc
     */
    public init(config: FileReaderConfig, context: AsteriaContext): void {}
}
