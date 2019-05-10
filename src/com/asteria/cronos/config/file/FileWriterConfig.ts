import { StreamProcessConfig } from 'asteria-gaia';

/**
 * The <code>FileWriterConfig</code> interface represents the configuration of a <code>FileWriterProcess</code> stream
 * process.
 */
export interface FileWriterConfig extends StreamProcessConfig {

    /**
     * The path to the local file to write.
     */
    path: string;
}
