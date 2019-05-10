import { StreamProcessConfig } from 'asteria-gaia';
import { CsvColumnMapper } from '../../util/CsvColumnMapper';

/**
 * The <code>ListToCsvConfig</code> interface represents the configuration of a <code>ListToCsvProcess</code> stream
 * process.
 */
export interface ListToCsvConfig extends StreamProcessConfig {

    /**
     * A list of object members excluded from the object mapping.
     */
    excludedProps?: Array<string>;
    
    /**
     * A definition list used to perform object mapping.
     */
    colsMapping?: Array<CsvColumnMapper>;

    /**
     * The reference to the CSV separator. Default value is <code>,</code>.
     */
    separator?: string;
}
