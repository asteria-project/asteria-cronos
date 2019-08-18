/*!
 * This module constains utilities used by the CsvToListStream test suite.
 */

import { CsvToListConfig } from '../../../src/com/asteria/cronos/config/data/CsvToListConfig';
import { CsvColumnMapper } from '../../../src/com/asteria/cronos/util/CsvColumnMapper';
import { CsvToListStream } from '../../../src/com/asteria/cronos/stream/data/CsvToListStream';

// Utilities:
export const CLASS_NAME: string = 'com.asteria.cronos.stream.data::CsvToListStream';
export const ITEMS_NUM: number = 201;
export const MAPPING_NUM: number = 8;
export const getConfig: Function = function(separator: string = ';', colsMapping: Array<CsvColumnMapper> = null,
                                            excludedCols: Array<number> = null): CsvToListConfig {
    return { separator: separator, colsMapping: colsMapping, excludedCols: excludedCols };
};
export const getSeparator: Function = function(stream: CsvToListStream): string {
    return (stream as any)._separator;
};
export const getMappingRefs: Function = function(stream: CsvToListStream): Array<CsvColumnMapper> {
    return (stream as any)._mappingRefs;
};
export const getCustomMapping: Function = function(): CsvColumnMapper[] {
    return [ { index: 1, property: 'city' }, { index: 4, property: 'pop' } ];
};
export const DEFAULT_PROPS: string[] = [
    'Country', 'City', 'AccentCity', 'Region', 'Population', 'Latitude', 'Longitude', 'geopoint'
];
export const CUSTOM_PROPS: string[] = [
    'city', 'pop'
];
