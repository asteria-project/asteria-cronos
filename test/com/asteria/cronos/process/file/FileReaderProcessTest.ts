import 'mocha';
import { expect } from 'chai';
import { FileReaderStream } from '../../../../../../src/com/asteria/cronos/stream/file/FileReaderStream';
import { StreamProcessType, AsteriaContext, AsteriaStream } from 'asteria-gaia';

// Class to test:
import { FileReaderProcess } from '../../../../../../src/com/asteria/cronos/process/file/FileReaderProcess';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/FileReaderProcessTestUtils';
import { AsteriaContextImpl } from '../../../../../../utils/test-utils/classes/AsteriaContextImpl';

// Test:
describe('FileReaderProcess class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the FileReaderProcess fully qualified class name', ()=> {
            const process: FileReaderProcess = new FileReaderProcess();
            expect(process.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#getType()', ()=> {
        it('should return StreamProcessType.READABLE', ()=> {
            const process: FileReaderProcess = new FileReaderProcess();
            expect(process.getType()).to.equal(StreamProcessType.READABLE);
        });
    });
    
    describe('#getConfig()', ()=> {
        it('should return null by default', ()=> {
            const process: FileReaderProcess = new FileReaderProcess();
            expect(process.getConfig()).to.be.null;
        });

        it('should return the same value as set by the setConfig() method', ()=> {
            const process: FileReaderProcess = new FileReaderProcess();
            process.setConfig(utils.CONFIG);
            expect(process.getConfig()).to.equal(utils.CONFIG);
        });
    });

    describe('#create()', ()=> {
        it('should return a new FileReaderStream instance', ()=> {
            const process: FileReaderProcess = new FileReaderProcess();
            process.setConfig(utils.CONFIG);
            const context: AsteriaContext = new AsteriaContextImpl();
            const result: AsteriaStream = process.create(context);
            expect(result instanceof FileReaderStream).to.be.true;
        });
    });
});