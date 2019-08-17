import 'mocha';
import { expect } from 'chai';
import { FilterStream } from '../../../../../../src/com/asteria/cronos/stream/data/FilterStream';
import { StreamProcessType, AsteriaContext, AsteriaStream } from 'asteria-gaia';

// Class to test:
import { FilterProcess } from '../../../../../../src/com/asteria/cronos/process/data/FilterProcess';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/FilterProcessTestUtils';
import { AsteriaContextImpl } from '../../../../../../utils/test-utils/classes/AsteriaContextImpl';


// Test:
describe('FilterProcess class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the FilterProcess fully qualified class name', ()=> {
            const process: FilterProcess = new FilterProcess();
            expect(process.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#getType()', ()=> {
        it('should return StreamProcessType.TRANSFORM', ()=> {
            const process: FilterProcess = new FilterProcess();
            expect(process.getType()).to.equal(StreamProcessType.TRANSFORM);
        });
    });
    
    describe('#getConfig()', ()=> {
        it('should return null by default', ()=> {
            const process: FilterProcess = new FilterProcess();
            expect(process.getConfig()).to.be.null;
        });

        it('should return the same value as set by the setConfig() method', ()=> {
            const process: FilterProcess = new FilterProcess();
            process.setConfig(utils.CONFIG);
            expect(process.getConfig()).to.equal(utils.CONFIG);
        });
    });

    describe('#create()', ()=> {
        it('should return a new FilterStream instance', ()=> {
            const process: FilterProcess = new FilterProcess();
            process.setConfig(utils.CONFIG);
            const context: AsteriaContext = new AsteriaContextImpl();
            const result: AsteriaStream = process.create(context);
            expect(result instanceof FilterStream).to.be.true;
        });
    }); 
});