import 'mocha';
import { expect } from 'chai';
import { ListToCsvStream } from '../../../../../../src/com/asteria/cronos/stream/data/ListToCsvStream';
import { StreamProcessType, AsteriaContext, AsteriaStream } from 'asteria-gaia';

// Class to test:
import { ListToCsvProcess } from '../../../../../../src/com/asteria/cronos/process/data/ListToCsvProcess';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/ListToCsvProcessTestUtils';
import { AsteriaContextImpl } from '../../../../../../utils/test-utils/classes/AsteriaContextImpl';


// Test:
describe('ListToCsvProcess class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the ListToCsvProcess fully qualified class name', ()=> {
            const process: ListToCsvProcess = new ListToCsvProcess();
            expect(process.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#getType()', ()=> {
        it('should return StreamProcessType.TRANSFORM', ()=> {
            const process: ListToCsvProcess = new ListToCsvProcess();
            expect(process.getType()).to.equal(StreamProcessType.TRANSFORM);
        });
    });
    
    describe('#getConfig()', ()=> {
        it('should return null by default', ()=> {
            const process: ListToCsvProcess = new ListToCsvProcess();
            expect(process.getConfig()).to.be.null;
        });

        it('should return the same value as set by the setConfig() method', ()=> {
            const process: ListToCsvProcess = new ListToCsvProcess();
            process.setConfig(utils.CONFIG);
            expect(process.getConfig()).to.equal(utils.CONFIG);
        });
    });

    describe('#create()', ()=> {
        it('should return a new ListToCsvStream instance', ()=> {
            const process: ListToCsvProcess = new ListToCsvProcess();
            const context: AsteriaContext = new AsteriaContextImpl();
            const result: AsteriaStream = process.create(context);
            expect(result instanceof ListToCsvStream).to.be.true;
        });
    });
});