/*!
 * This module constains utilities used by the FilterProcess test suite.
 */

import { FilterConfig } from '../../../src/com/asteria/cronos/config/data/FilterConfig';
import { FilterCondition, FilterOperator } from 'asteria-gaia';

// Utilities:
export const CLASS_NAME: string = 'com.asteria.cronos.process.data::FilterProcess';
export const CONFIG: FilterConfig = {
    condition: FilterCondition.AND,
    filters: [
        {
            property: 'foo',
            operator: FilterOperator.EQUAL,
            value: 'test'
        },
        {
            property: 'bar',
            operator: FilterOperator.LIKE,
            value: 'test'
        }
    ]
};