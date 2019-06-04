/*!
 * Asteria Cronos Node Module
 * Copyright(c) 2019 Pascal ECHEMANN
 * MIT Licensed
 * This is a part of the Asteria Project: <https://github.com/asteria-project>
 */

declare module "asteria-cronos" {

import { AbstractAsteriaObject, AsteriaSessionConfig, AsteriaSession, StreamProcessConfig, StreamProcess, AsteriaContext, AsteriaLogger, StreamProcessor, FilterOperator, AsteriaFilter, FilterOperatorNotation, AsteriaStream, AsteriaErrorCode, StreamProcessBuilder, AsteriaError, AsteriaLogLevel, FilterCondition, FilterDefinition, StreamProcessType } from "asteria-gaia";
import { TransformOptions, Transform, TransformCallback } from "stream";
import { ReadStream, WriteStream } from "fs";
    
export interface CsvToListConfig extends StreamProcessConfig {    excludedCols?: Array<number>;    colsMapping?: Array<CsvColumnMapper>;    separator?: string;}export interface FilterConfig extends StreamProcessConfig {    condition?: FilterCondition;    filters: Array<FilterDefinition>;}export interface LinesToListConfig extends StreamProcessConfig {}export interface ListToCsvConfig extends StreamProcessConfig {    excludedProps?: Array<string>;    colsMapping?: Array<CsvColumnMapper>;    separator?: string;}export interface FileReaderConfig extends StreamProcessConfig {    path: string;}export interface FileWriterConfig extends StreamProcessConfig {    path: string;}/// <reference types="node" />export abstract class CronosTransformStream extends Transform implements AsteriaStream {    protected encoding: string;    protected onComplete: (err: any, result: any) => void;    private readonly _className;    protected constructor(className: string, opts?: TransformOptions);    getClassName(): string;    abstract init(config: StreamProcessConfig, context: AsteriaContext): void;    abstract transform(chunk: any): void;    _transform(chunk: any, encoding: string, callback: TransformCallback): void;}export class CsvToListProcess extends AbstractAsteriaObject implements StreamProcess {    private _config;    constructor();    getConfig(): CsvToListConfig;    setConfig(config: CsvToListConfig): void;    getType(): StreamProcessType;    create(context: AsteriaContext): AsteriaStream;}export class FilterProcess extends AbstractAsteriaObject implements StreamProcess {    private _config;    constructor();    getConfig(): FilterConfig;    setConfig(config: FilterConfig): void;    getType(): StreamProcessType;    create(context: AsteriaContext): AsteriaStream;}export class LinesToListProcess extends AbstractAsteriaObject implements StreamProcess {    private _config;    constructor();    getConfig(): LinesToListConfig;    setConfig(config: LinesToListConfig): void;    getType(): StreamProcessType;    create(context: AsteriaContext): AsteriaStream;}export class ListToCsvProcess extends AbstractAsteriaObject implements StreamProcess {    private _config;    constructor();    getConfig(): ListToCsvConfig;    setConfig(config: ListToCsvConfig): void;    getType(): StreamProcessType;    create(context: AsteriaContext): AsteriaStream;}export class FileReaderProcess extends AbstractAsteriaObject implements StreamProcess {    private _config;    constructor();    getConfig(): FileReaderConfig;    setConfig(config: FileReaderConfig): void;    getType(): StreamProcessType;    create(context: AsteriaContext): AsteriaStream;}export class FileWriterProcess extends AbstractAsteriaObject implements StreamProcess {    private _config;    constructor();    getConfig(): FileWriterConfig;    setConfig(config: FileWriterConfig): void;    getType(): StreamProcessType;    create(context: AsteriaContext): AsteriaStream;}/// <reference types="node" />export class CsvToListStream extends CronosTransformStream implements AsteriaStream {    private static readonly DEFAULT_SEPARATOR;    private _separator;    private _objModel;    private _mappingRefs;    private _numCols;    private _incompleteRow;    constructor(opts?: TransformOptions);    init(config: CsvToListConfig, context: AsteriaContext): void;    transform(chunk: any): void;    private buildResultData;    private buildObj;    private buildCsvArray;    private initModel;    private buildObjModel;}/// <reference types="node" />export class FilterStream extends CronosTransformStream implements AsteriaStream {    private _condition;    private _filters;    constructor(opts?: TransformOptions);    init(config: FilterConfig, context: AsteriaContext): void;    transform(chunk: any): void;    private buildJsonArray;    private doFilters;    private applyFiltersOr;    private applyFiltersAnd;    private applyFilter;}/// <reference types="node" />export class LinesToListStream extends CronosTransformStream implements AsteriaStream {    private static CR_NEW_LINE;    private static CR;    private _objModel;    private _incompleteLine;    private _lineNum;    constructor(opts?: TransformOptions);    init(config: LinesToListConfig, context: AsteriaContext): void;    transform(chunk: any): void;    private checkFinalChar;    private buildAsteriaList;    private buildLineObj;}/// <reference types="node" />export class ListToCsvStream extends CronosTransformStream implements AsteriaStream {    private static readonly DEFAULT_SEPARATOR;    private _separator;    private _mappingRefs;    private _isFirstChunck;    private _mappingRefsSize;    constructor(opts?: TransformOptions);    init(config: ListToCsvConfig, context: AsteriaContext): void;    transform(chunk: any): void;    private buildResultData;    private buildCsv;    private buildPojosArray;    private initModel;    private getLastRowChar;}/// <reference types="node" />export class FileReaderStream extends ReadStream implements AsteriaStream {    private static readonly CLASS_NAME;    constructor(path: string);    getClassName(): string;    init(config: FileReaderConfig, context: AsteriaContext): void;}/// <reference types="node" />export class FileWriterStream extends WriteStream implements AsteriaStream {    private static readonly CLASS_NAME;    constructor(path: string);    getClassName(): string;    init(config: FileWriterConfig, context: AsteriaContext): void;}export class CsvColumnMapper {    index: number;    property: string;}}