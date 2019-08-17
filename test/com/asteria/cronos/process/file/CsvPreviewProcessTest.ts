import 'mocha';
import { expect } from 'chai';
import { CsvPreviewStream } from '../../../../../../src/com/asteria/cronos/stream/file/CsvPreviewStream';
import { StreamProcessType, AsteriaContext, AsteriaStream } from 'asteria-gaia';

// Class to test:
import { CsvPreviewProcess } from '../../../../../../src/com/asteria/cronos/process/file/CsvPreviewProcess';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/CsvPreviewProcessTestUtils';
import { AsteriaContextImpl } from '../../../../../../utils/test-utils/classes/AsteriaContextImpl';

// Test:
describe('CsvPreviewProcess class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the CsvPreviewProcess fully qualified class name', ()=> {
            const process: CsvPreviewProcess = new CsvPreviewProcess();
            expect(process.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#getType()', ()=> {
        it('should return StreamProcessType.READABLE', ()=> {
            const process: CsvPreviewProcess = new CsvPreviewProcess();
            expect(process.getType()).to.equal(StreamProcessType.READABLE);
        });
    });
    
    describe('#getConfig()', ()=> {
        it('should return null by default', ()=> {
            const process: CsvPreviewProcess = new CsvPreviewProcess();
            expect(process.getConfig()).to.be.null;
        });

        it('should return the same value as set by the setConfig() method', ()=> {
            const process: CsvPreviewProcess = new CsvPreviewProcess();
            process.setConfig(utils.CONFIG);
            expect(process.getConfig()).to.equal(utils.CONFIG);
        });
    });

    describe('#create()', ()=> {
        it('should return a new CsvPreviewStream instance', ()=> {
            const process: CsvPreviewProcess = new CsvPreviewProcess();
            process.setConfig(utils.CONFIG);
            const context: AsteriaContext = new AsteriaContextImpl();
            const result: AsteriaStream = process.create(context);
            expect(result instanceof CsvPreviewStream).to.be.true;
        });
    });
});