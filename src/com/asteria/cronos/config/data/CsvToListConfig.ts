import { StreamProcessConfig } from 'asteria-gaia';
import { CsvColumnMapper } from '../../util/CsvColumnMapper';

/**
 * The <code>CsvToListConfig</code> interface represents the configuration of a <code>CsvToListProcess</code> stream
 * process.
 */
export interface CsvToListConfig extends StreamProcessConfig {

    /**
     * A list of column indexes excluded from the object mapping.
     */
    excludedCols?: Array<number>;
    
    /**
     * A definition list used to perform object mapping.
     */
    colsMapping?: Array<CsvColumnMapper>;

    /**
     * The reference to the CSV separator. Default value is <code>,</code>.
     */
    separator?: string;
}
