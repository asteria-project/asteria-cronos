import { StreamProcessConfig } from 'asteria-gaia';

/**
 * The <code>CsvPreviewConfig</code> interface represents the configuration of a <code>CsvPreviewProcess</code> stream
 * process.
 */
export interface CsvPreviewConfig extends StreamProcessConfig {

    /**
     * The path to the local file to preview.
     */
    path: string;

    /**
     * The maximum number of rows to be treated by the associated process. Default value is <code>10</code>.
     */
    rowLimit?: number;
}
