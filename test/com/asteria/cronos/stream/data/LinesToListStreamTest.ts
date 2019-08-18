import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { CommonChar } from 'asteria-gaia';

// Class to test:
import { LinesToListStream } from '../../../../../../src/com/asteria/cronos/stream/data/LinesToListStream';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/LinesToListStreamTestUtils';

// Test:
describe('LinesToListStream class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the LinesToListStream fully qualified class name', ()=> {
            const stream: LinesToListStream = new LinesToListStream();
            expect(stream.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });

    describe('#transform()', ()=> {
        it('should invoke the onComplete() method', (done: Function)=> {
            const stream: any = new LinesToListStream();
            stream.onComplete = (err: any, result: any)=> {};
            const spy: any = sinon.spy(stream, 'onComplete');
            stream.transform(utils.DATA);
            sinon.assert.called(spy);
            sinon.restore();
            done();
        });

        it('should create as any items as input lines', (done: Function)=> {
            const stream: any = new LinesToListStream();
            stream.onComplete = (err: any, result: any)=> {
                const itemList: Array<string> = result.split(CommonChar.NEW_LINE);
                expect(itemList.length).to.equal(utils.NUM_LINES + 1); // last line is always empty
                done();
            };
            stream.transform(utils.DATA);
        });

        it('should create well formated asteria line objects', (done: Function)=> {
            const stream: any = new LinesToListStream();
            stream.onComplete = (err: any, result: any)=> {
                const itemList: Array<string> = result.split(CommonChar.NEW_LINE);
                itemList.forEach((item: string, index: number) => {
                    if (item !== CommonChar.EMPTY) { // last line is always empty
                        const obj: any = JSON.parse(item);
                        expect(obj.index).to.equal(index);
                        expect(typeof obj.value).to.equal('string');
                    }
                });
                done();
            };
            stream.transform(utils.DATA);
        });
    });
});