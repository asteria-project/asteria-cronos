import 'mocha';
import { expect } from 'chai';
import { CsvToListStream } from '../../../../../../src/com/asteria/cronos/stream/data/CsvToListStream';
import { StreamProcessType, AsteriaContext, AsteriaStream } from 'asteria-gaia';

// Class to test:
import { CsvToListProcess } from '../../../../../../src/com/asteria/cronos/process/data/CsvToListProcess';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/CsvToListProcessTestUtils';
import { AsteriaContextImpl } from '../../../../../../utils/test-utils/classes/AsteriaContextImpl';


// Test:
describe('CsvToListProcess class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the CsvToListProcess fully qualified class name', ()=> {
            const process: CsvToListProcess = new CsvToListProcess();
            expect(process.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#getType()', ()=> {
        it('should return StreamProcessType.TRANSFORM', ()=> {
            const process: CsvToListProcess = new CsvToListProcess();
            expect(process.getType()).to.equal(StreamProcessType.TRANSFORM);
        });
    });
    
    describe('#getConfig()', ()=> {
        it('should return null by default', ()=> {
            const process: CsvToListProcess = new CsvToListProcess();
            expect(process.getConfig()).to.be.null;
        });

        it('should return the same value as set by the setConfig() method', ()=> {
            const process: CsvToListProcess = new CsvToListProcess();
            process.setConfig(utils.CONFIG);
            expect(process.getConfig()).to.equal(utils.CONFIG);
        });
    });

    describe('#create()', ()=> {
        it('should return a new CsvToListStream instance', ()=> {
            const process: CsvToListProcess = new CsvToListProcess();
            const context: AsteriaContext = new AsteriaContextImpl();
            const result: AsteriaStream = process.create(context);
            expect(result instanceof CsvToListStream).to.be.true;
        });
    });
});