import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { OuranosLogger } from 'asteria-ouranos';
import { FilterCondition, CommonChar } from 'asteria-gaia';

// Class to test:
import { FilterStream } from '../../../../../../src/com/asteria/cronos/stream/data/FilterStream';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/FilterStreamTestUtils';

// Test:
describe('FilterStream class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the FilterStream fully qualified class name', ()=> {
            const stream: FilterStream = new FilterStream();
            expect(stream.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#init()', ()=> {
        it('should trace an error whether no configuration is set', ()=> {
            const stream: FilterStream = new FilterStream();
            const spy: any = sinon.spy(OuranosLogger.getLogger(), 'error');
            stream.init(null, utils.CONTEXT);
            sinon.assert.called(spy);
            sinon.restore();
        });

        it('should trace an error whether no configuration filters are defined', ()=> {
            const stream: FilterStream = new FilterStream();
            const spy: any = sinon.spy(OuranosLogger.getLogger(), 'error');
            stream.init(utils.getConfig(null, null), utils.CONTEXT);
            sinon.assert.called(spy);
            sinon.restore();
        });

        it('should not redefine initial condition', ()=> {
            const stream: FilterStream = new FilterStream();
            stream.init(utils.getConfig(null, [utils.FILTER_1]), utils.CONTEXT);
            expect(utils.getCondition(stream)).to.equal(FilterCondition.OR);
        });

        it('should redefine initial condition', ()=> {
            const stream: FilterStream = new FilterStream();
            stream.init(utils.getConfig(FilterCondition.AND, [utils.FILTER_1]), utils.CONTEXT);
            expect(utils.getCondition(stream)).to.equal(FilterCondition.AND);
        });
    });

    describe('#transform()', ()=> {
        it('should invoke the onComplete() method', (done: Function)=> {
            utils.loadData((data: any)=> {
                const stream: any = new FilterStream();
                stream.onComplete = (err: any, result: any)=> {};
                const spy: any = sinon.spy(stream, 'onComplete');
                stream.init(utils.getConfig(null, [utils.FILTER_1]), utils.CONTEXT);
                stream.transform(data);
                sinon.assert.called(spy);
                sinon.restore();
                done();
            });
        });

        it('should apply correctly single filter when condition is FilterCondition.OR', (done: Function)=> {
            utils.loadData((data: any)=> {
                const stream: any = new FilterStream();
                stream.onComplete = (err: any, result: any)=> {
                    const itemList: Array<string> = result.split(CommonChar.NEW_LINE);
                    itemList.forEach((item: string) => {
                        if (item !== CommonChar.EMPTY) { // last line is always empty
                            const obj: any = JSON.parse(item);
                            expect(obj.Country).to.equal(utils.FILTER_1.value);
                        }
                    });
                    done();
                };
                stream.init(utils.getConfig(null, [utils.FILTER_1]), utils.CONTEXT);
                stream.transform(data);
            });
        });

        it('should apply correctly single filter when condition is FilterCondition.AND', (done: Function)=> {
            utils.loadData((data: any)=> {
                const stream: any = new FilterStream();
                stream.onComplete = (err: any, result: any)=> {
                    const itemList: Array<string> = result.split(CommonChar.NEW_LINE);
                    itemList.forEach((item: string) => {
                        if (item !== CommonChar.EMPTY) { // last line is always empty
                            const obj: any = JSON.parse(item);
                            expect(obj.Country).to.equal(utils.FILTER_1.value);
                        }
                    });
                    done();
                };
                stream.init(utils.getConfig(FilterCondition.AND, [utils.FILTER_1]), utils.CONTEXT);
                stream.transform(data);
            });
        });

        it('should apply correctly multiple filter when condition is FilterCondition.OR', (done: Function)=> {
            utils.loadData((data: any)=> {
                const stream: any = new FilterStream();
                stream.onComplete = (err: any, result: any)=> {
                    const itemList: Array<string> = result.split(CommonChar.NEW_LINE);
                    itemList.forEach((item: string) => {
                        if (item !== CommonChar.EMPTY) { // last line is always empty
                            const obj: any = JSON.parse(item);
                            const check: boolean = obj.Country === utils.FILTER_1.value ||
                                                   obj.Country === utils.FILTER_3.value;
                            expect(check).to.be.true;
                        }
                    });
                    done();
                };
                stream.init(utils.getConfig(null, [utils.FILTER_1, utils.FILTER_3]), utils.CONTEXT);
                stream.transform(data);
            });
        });
        
        it('should apply correctly multiple filter when condition is FilterCondition.AND', (done: Function)=> {
            utils.loadData((data: any)=> {
                const stream: any = new FilterStream();
                stream.onComplete = (err: any, result: any)=> {
                    const itemList: Array<string> = result.split(CommonChar.NEW_LINE);
                    itemList.forEach((item: string) => {
                        if (item !== CommonChar.EMPTY) { // last line is always empty
                            const obj: any = JSON.parse(item);
                            const check: boolean = obj.Country === utils.FILTER_1.value &&
                                                   obj.City === utils.FILTER_2.value;
                            expect(check).to.be.true;
                        }
                    });
                    done();
                };
                stream.init(utils.getConfig(FilterCondition.AND, [utils.FILTER_1, utils.FILTER_2]), utils.CONTEXT);
                stream.transform(data);
            });
        });
        
        it('should not find invalid values when condition is FilterCondition.OR', (done: Function)=> {
            utils.loadData((data: any)=> {
                const stream: any = new FilterStream();
                stream.onComplete = (err: any, result: any)=> {
                    expect(result).to.be.null;
                    done();
                };
                stream.init(utils.getConfig(null, [utils.FILTER_4, utils.FILTER_5]), utils.CONTEXT);
                stream.transform(data);
            });
        });
        
        it('should not find invalid values when condition is FilterCondition.AND', (done: Function)=> {
            utils.loadData((data: any)=> {
                const stream: any = new FilterStream();
                stream.onComplete = (err: any, result: any)=> {
                    expect(result).to.be.null;
                    done();
                };
                stream.init(utils.getConfig(FilterCondition.AND, [utils.FILTER_1, utils.FILTER_3]), utils.CONTEXT);
                stream.transform(data);
            });
        });
    });
});