/*!
 * This module constains utilities used by the ListToCsvStream test suite.
 */

import { ListToCsvConfig } from '../../../src/com/asteria/cronos/config/data/ListToCsvConfig';
import { CsvColumnMapper } from '../../../src/com/asteria/cronos/util/CsvColumnMapper';
import { ListToCsvStream } from '../../../src/com/asteria/cronos/stream/data/ListToCsvStream';

// Utilities:
export const CLASS_NAME: string = 'com.asteria.cronos.stream.data::ListToCsvStream';
export const ITEMS_NUM: number = 28;
export const MAPPING_NUM: number = 8;
export const getConfig: Function = function(separator: string = ';', colsMapping: Array<CsvColumnMapper> = null,
                                            excludedCols: Array<number> = null): ListToCsvConfig {
    return { separator: separator, colsMapping: colsMapping, excludedCols: excludedCols };
};
export const getSeparator: Function = function(stream: ListToCsvStream): string {
    return (stream as any)._separator;
};
export const getMappingRefs: Function = function(stream: ListToCsvStream): Array<CsvColumnMapper> {
    return (stream as any)._mappingRefs;
};
export const getCustomMapping: Function = function(): CsvColumnMapper[] {
    return [ { index: 0, property: 'City' }, { index: 1, property: 'Region' } ];
};
export const DEFAULT_PROPS: string[] = [
    'Country', 'City', 'AccentCity', 'Region', 'Population', 'Latitude', 'Longitude', 'geopoint'
];
export const CUSTOM_PROPS: string[] = [
    'City', 'Region'
];
export const DATA: string = `{"Country":"zm","City":"lisuka","AccentCity":"Lisuka","Region":5,"Population":0,"Latitude":-15.4833333,"Longitude":28.0833333,"geopoint":"-15.4833333, 28.0833333"}
{"Country":"zm","City":"lubesha","AccentCity":"Lubesha","Region":2,"Population":0,"Latitude":-12.9666667,"Longitude":27.65,"geopoint":"-12.9666667, 27.65"}
{"Country":"zm","City":"lukungu","AccentCity":"Lukungu","Region":3,"Population":0,"Latitude":-15.7333333,"Longitude":23.0333333,"geopoint":"-15.7333333, 23.0333333"}
{"Country":"zm","City":"lumbango","AccentCity":"Lumbango","Region":3,"Population":0,"Latitude":-15.2166667,"Longitude":22.9666667,"geopoint":"-15.2166667, 22.9666667"}
{"Country":"zm","City":"lupita","AccentCity":"Lupita","Region":7,"Population":0,"Latitude":-10.3333333,"Longitude":33.3166667,"geopoint":"-10.3333333, 33.3166667"}
{"Country":"zm","City":"lupumpaula","AccentCity":"Lupumpaula","Region":5,"Population":0,"Latitude":-14.1666667,"Longitude":27.2333333,"geopoint":"-14.1666667, 27.2333333"}
{"Country":"zm","City":"lupya","AccentCity":"Lupya","Region":5,"Population":0,"Latitude":-13.8,"Longitude":29.7166667,"geopoint":"-13.8, 29.7166667"}
{"Country":"zm","City":"lusengo","AccentCity":"Lusengo","Region":5,"Population":0,"Latitude":-13.1833333,"Longitude":29.9333333,"geopoint":"-13.1833333, 29.9333333"}
{"Country":"zm","City":"luwembe","AccentCity":"Luwembe","Region":6,"Population":0,"Latitude":-14.45,"Longitude":30.4666667,"geopoint":"-14.45, 30.4666667"}
{"Country":"zm","City":"lwembe","AccentCity":"Lwembe","Region":5,"Population":0,"Latitude":-15.0333333,"Longitude":27.7833333,"geopoint":"-15.0333333, 27.7833333"}
{"Country":"zm","City":"lyabwa","AccentCity":"Lyabwa","Region":4,"Population":0,"Latitude":-16.5666667,"Longitude":26.7666667,"geopoint":"-16.5666667, 26.7666667"}
{"Country":"zm","City":"macha","AccentCity":"Macha","Region":4,"Population":0,"Latitude":-16.4333333,"Longitude":26.7833333,"geopoint":"-16.4333333, 26.7833333"}
{"Country":"zm","City":"madiongo","AccentCity":"Madiongo","Region":4,"Population":0,"Latitude":-17.7,"Longitude":26.7833333,"geopoint":"-17.7, 26.7833333"}
{"Country":"zm","City":"mafulo","AccentCity":"Mafulo","Region":3,"Population":0,"Latitude":-14.55,"Longitude":23.7333333,"geopoint":"-14.55, 23.7333333"}
{"Country":"zm","City":"mageza","AccentCity":"Mageza","Region":6,"Population":0,"Latitude":-13.4333333,"Longitude":32.6333333,"geopoint":"-13.4333333, 32.6333333"}
{"Country":"zm","City":"maibwe","AccentCity":"Maibwe","Region":3,"Population":0,"Latitude":-16.9166667,"Longitude":24.85,"geopoint":"-16.9166667, 24.85"}
{"Country":"zm","City":"makabela","AccentCity":"Makabela","Region":4,"Population":0,"Latitude":-15.7333333,"Longitude":26.5,"geopoint":"-15.7333333, 26.5"}
{"Country":"zm","City":"makondola","AccentCity":"Makondola","Region":6,"Population":0,"Latitude":-11.6833333,"Longitude":32.7333333,"geopoint":"-11.6833333, 32.7333333"}
{"Country":"zm","City":"makwenyola","AccentCity":"Makwenyola","Region":7,"Population":0,"Latitude":-11.95,"Longitude":31.5166667,"geopoint":"-11.95, 31.5166667"}
{"Country":"zm","City":"makwindi","AccentCity":"Makwindi","Region":4,"Population":0,"Latitude":-17.5333333,"Longitude":25.6,"geopoint":"-17.5333333, 25.6"}
{"Country":"zm","City":"malabo","AccentCity":"Malabo","Region":2,"Population":0,"Latitude":-13,"Longitude":28.6666667,"geopoint":"-13.0, 28.6666667"}
{"Country":"zm","City":"malabwe","AccentCity":"Malabwe","Region":3,"Population":0,"Latitude":-16.8666667,"Longitude":25.1166667,"geopoint":"-16.8666667, 25.1166667"}
{"Country":"zm","City":"malacha","AccentCity":"Malacha","Region":3,"Population":0,"Latitude":-14.8833333,"Longitude":22.25,"geopoint":"-14.8833333, 22.25"}
{"Country":"zm","City":"malata","AccentCity":"Malata","Region":6,"Population":0,"Latitude":-14.2333333,"Longitude":32.3,"geopoint":"-14.2333333, 32.3"}
{"Country":"zm","City":"malimba","AccentCity":"Malimba","Region":6,"Population":0,"Latitude":-14.3,"Longitude":31.4833333,"geopoint":"-14.3, 31.4833333"}
{"Country":"zm","City":"mali sabas","AccentCity":"Mali Sabas","Region":6,"Population":0,"Latitude":-12.9833333,"Longitude":31.9333333,"geopoint":"-12.9833333, 31.9333333"}`