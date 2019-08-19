import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { CommonChar } from 'asteria-gaia';

// Class to test:
import { CsvPreviewStream } from '../../../../../../src/com/asteria/cronos/stream/file/CsvPreviewStream';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/CsvPreviewStreamTestUtils';

// Test:
describe('CsvPreviewStream class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the FilterStream fully qualified class name', ()=> {
            const stream: CsvPreviewStream = new CsvPreviewStream();
            expect(stream.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#init()', ()=> {
        it('should not redefine initial row limit', (done: Function)=> {
            const stream: CsvPreviewStream = new CsvPreviewStream();
            stream.on('close', ()=> {
                done();
            });
            stream.init(utils.getConfig(), null);
            expect(utils.getRowLimit(stream)).to.equal(utils.ROW_LIMIT);
        });

        it('should redefine initial row limit', (done: Function)=> {
            const stream: CsvPreviewStream = new CsvPreviewStream();
            stream.on('close', ()=> {
                done();
            });
            stream.init(utils.getConfig(5), null);
            expect(utils.getRowLimit(stream)).to.equal(5);
        });

        it('should invoke the destroy() method', (done: Function)=> {
            const stream: CsvPreviewStream = new CsvPreviewStream();
            const spy: any = sinon.spy(stream, 'destroy');
            stream.on('close', ()=> {
                sinon.assert.called(spy);
                sinon.restore();
                done();
            });
            stream.init(utils.getConfig(), null);
        });
        
        it('should create preview with the default lines number', (done: Function)=> {
            const stream: CsvPreviewStream = new CsvPreviewStream();
            stream.on('data', (chunk: any)=> {
                const result: Array<string> = chunk.toString().split(CommonChar.NEW_LINE)
                expect(result.length).to.equal(utils.ROW_LIMIT + 1) // Properties row + row limit
                done();
            });
            stream.init(utils.getConfig(), null);
        });
        
        it('should create preview with the specified lines number', (done: Function)=> {
            const stream: CsvPreviewStream = new CsvPreviewStream();
            stream.on('data', (chunk: any)=> {
                const result: Array<string> = chunk.toString().split(CommonChar.NEW_LINE)
                expect(result.length).to.equal(6) // Properties row + row limit
                done();
            });
            stream.init(utils.getConfig(5), null);
        });
    });
});