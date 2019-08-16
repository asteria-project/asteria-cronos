/*!
 * This module constains utilities used by the CronosTransformStream test suite.
 */

import { TransformCallback } from 'stream';

// Utilities:
export const CLASS_NAME: string = 'CronosTransformStreamImpl';
export const CHUNCK: any = { foo: 'bar' };
export const CALLBACK: TransformCallback = function(error?: Error, data?: any): void {};
export const ENCODING: string = 'utf8';