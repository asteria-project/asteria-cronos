import 'mocha';
import { expect } from 'chai';
import { LinesToListStream } from '../../../../../../src/com/asteria/cronos/stream/data/LinesToListStream';
import { StreamProcessType, AsteriaContext, AsteriaStream } from 'asteria-gaia';

// Class to test:
import { LinesToListProcess } from '../../../../../../src/com/asteria/cronos/process/data/LinesToListProcess';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/LinesToListProcessTestUtils';
import { AsteriaContextImpl } from '../../../../../../utils/test-utils/classes/AsteriaContextImpl';


// Test:
describe('LinesToListProcess class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the LinesToListProcess fully qualified class name', ()=> {
            const process: LinesToListProcess = new LinesToListProcess();
            expect(process.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#getType()', ()=> {
        it('should return StreamProcessType.TRANSFORM', ()=> {
            const process: LinesToListProcess = new LinesToListProcess();
            expect(process.getType()).to.equal(StreamProcessType.TRANSFORM);
        });
    });
    
    describe('#getConfig()', ()=> {
        it('should return null by default', ()=> {
            const process: LinesToListProcess = new LinesToListProcess();
            expect(process.getConfig()).to.be.null;
        });

        it('should return the same value as set by the setConfig() method', ()=> {
            const process: LinesToListProcess = new LinesToListProcess();
            process.setConfig(utils.CONFIG);
            expect(process.getConfig()).to.equal(utils.CONFIG);
        });
    });

    describe('#create()', ()=> {
        it('should return a new LinesToListStream instance', ()=> {
            const process: LinesToListProcess = new LinesToListProcess();
            const context: AsteriaContext = new AsteriaContextImpl();
            const result: AsteriaStream = process.create(context);
            expect(result instanceof LinesToListStream).to.be.true;
        });
    });
});