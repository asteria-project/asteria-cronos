/*!
 * This module constains utilities used by the CsvPreviewProcess test suite.
 */

import { CsvPreviewConfig } from "../../../src/com/asteria/cronos/config/file/CsvPreviewConfig";
import { CsvPreviewStream } from "../../../src/com/asteria/cronos/stream/file/CsvPreviewStream";

// Utilities:
export const CLASS_NAME: string = 'com.asteria.cronos.stream.file::CsvPreviewStream';
export const ROW_LIMIT: number = 10;
export const getConfig: Function = function(rowLimit: number = null): CsvPreviewConfig {
    return { 
        path: 'utils/test-utils/data/test.csv',
        rowLimit: rowLimit
    };
};
export const getRowLimit: Function = function(stream: CsvPreviewStream): number {
    return (stream as any)._rowLimit;
};
