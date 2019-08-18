import 'mocha';
import { expect } from 'chai';

// Class to test:
import { CsvColumnMapper } from '../../../../../src/com/asteria/cronos/util/CsvColumnMapper';

// Test:
describe('CsvColumnMapper class test', ()=> {

    describe('#index', ()=> {
        it('should have a property named index', ()=> {
            const mapper: CsvColumnMapper = new CsvColumnMapper();
            expect(mapper.index).to.be.undefined;
        });
    });
    
    describe('#property', ()=> {
        it('should have a property named property', ()=> {
            const mapper: CsvColumnMapper = new CsvColumnMapper();
            expect(mapper.property).to.be.undefined;
        });
    });
});