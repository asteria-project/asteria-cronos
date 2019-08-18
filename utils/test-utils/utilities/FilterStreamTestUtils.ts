/*!
 * This module constains utilities used by the FilterStream test suite.
 */

import { FilterConfig } from '../../../src/com/asteria/cronos/config/data/FilterConfig';
import { AsteriaContext, FilterCondition, FilterDefinition, FilterOperator, CommonChar } from 'asteria-gaia';
import { OuranosContext } from 'asteria-ouranos';
import { FilterStream } from '../../../src/com/asteria/cronos/stream/data/FilterStream';
import { DataLoader } from '../classes/DataLoader';
import { CsvToListStream } from '../../../src/com/asteria/cronos/stream/data/CsvToListStream';
import { CsvToListConfig } from '../../../src/com/asteria/cronos/config/data/CsvToListConfig';

// Utilities:
export const CLASS_NAME: string = 'com.asteria.cronos.stream.data::FilterStream';
export const CONTEXT: AsteriaContext = new OuranosContext('test-context', '9139a8df-2f48-4dc5-bb82-007dedde4516');
export const getConfig: Function = function(condition: FilterCondition, filters: FilterDefinition[]): FilterConfig {
    return { condition: condition, filters: filters };
};
export const FILTER_1: FilterDefinition = {
    property: 'Country',
    operator: FilterOperator.EQUAL,
    value: 'ye'
};
export const FILTER_2: FilterDefinition = {
    property: 'City',
    operator: FilterOperator.EQUAL,
    value: 'lasba'
};
export const FILTER_3: FilterDefinition = {
    property: 'Country',
    operator: FilterOperator.EQUAL,
    value: 'kr'
};
export const FILTER_4: FilterDefinition = {
    property: 'Country',
    operator: FilterOperator.EQUAL,
    value: 'fr'
};
export const FILTER_5: FilterDefinition = {
    property: 'geopoint',
    operator: FilterOperator.GREATER_THAN,
    value: 1000
};
export const getCondition: Function = function(stream: FilterStream): string {
    return (stream as any)._condition;
};
export const loadData: Function = function(callback: (data: any)=>void): void {
    DataLoader.loadData((data: any)=> {
        const stream: any = new CsvToListStream();
        const config: CsvToListConfig = { separator: CommonChar.SEMICOLON };
        stream.onComplete = (err: any, result: any)=> {
            callback(result);
        };
        stream.init(config, null);
        stream.transform(data);
    });
};
