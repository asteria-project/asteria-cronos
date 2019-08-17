import 'mocha';
import { expect } from 'chai';
import { FileWriterStream } from '../../../../../../src/com/asteria/cronos/stream/file/FileWriterStream';
import { StreamProcessType, AsteriaContext, AsteriaStream } from 'asteria-gaia';

// Class to test:
import { FileWriterProcess } from '../../../../../../src/com/asteria/cronos/process/file/FileWriterProcess';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/FileWriterProcessTestUtils';
import { AsteriaContextImpl } from '../../../../../../utils/test-utils/classes/AsteriaContextImpl';

// Test:
describe('FileWriterProcess class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the FileWriterProcess fully qualified class name', ()=> {
            const process: FileWriterProcess = new FileWriterProcess();
            expect(process.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#getType()', ()=> {
        it('should return StreamProcessType.READABLE', ()=> {
            const process: FileWriterProcess = new FileWriterProcess();
            expect(process.getType()).to.equal(StreamProcessType.READABLE);
        });
    });
    
    describe('#getConfig()', ()=> {
        it('should return null by default', ()=> {
            const process: FileWriterProcess = new FileWriterProcess();
            expect(process.getConfig()).to.be.null;
        });

        it('should return the same value as set by the setConfig() method', ()=> {
            const process: FileWriterProcess = new FileWriterProcess();
            process.setConfig(utils.CONFIG);
            expect(process.getConfig()).to.equal(utils.CONFIG);
        });
    });

    describe('#create()', ()=> {
        it('should return a new FileWriterStream instance', ()=> {
            const process: FileWriterProcess = new FileWriterProcess();
            process.setConfig(utils.CONFIG);
            const context: AsteriaContext = new AsteriaContextImpl();
            const result: AsteriaStream = process.create(context);
            expect(result instanceof FileWriterStream).to.be.true;
        });
    });
});