import { StreamProcessConfig, FilterCondition, FilterDefinition } from 'asteria-gaia';

/**
 * The <code>FilterConfig</code> interface represents the configuration of a <code>FilterProcess</code> stream process.
 */
export interface FilterConfig extends StreamProcessConfig {
    
    /**
     * The condition to be applyed to filter a list of objects. Default value is <code>FilterCondition.OR</code>.
     */
    condition?: FilterCondition;

    /**
     * The list of filters to be applyed to a list of objects.
     */
    filters: Array<FilterDefinition>;
}
