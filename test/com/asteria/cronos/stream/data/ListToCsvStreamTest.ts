import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { CommonChar } from 'asteria-gaia';
import { ListToCsvConfig } from '../../../../../../src/com/asteria/cronos/config/data/ListToCsvConfig';
import { CsvColumnMapper } from '../../../../../../src/com/asteria/cronos/util/CsvColumnMapper';

// Class to test:
import { ListToCsvStream } from '../../../../../../src/com/asteria/cronos/stream/data/ListToCsvStream';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/ListToCsvStreamTestUtils';

// Test:
describe('ListToCsvStream class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the ListToCsvStream fully qualified class name', ()=> {
            const stream: ListToCsvStream = new ListToCsvStream();
            expect(stream.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#init()', ()=> {
        it('should not redefine initial separator', ()=> {
            const stream: ListToCsvStream = new ListToCsvStream();
            stream.init(null, null);
            expect(utils.getSeparator(stream)).to.equal(CommonChar.COMMA);
        });

        it('should not redefine initial columns mapping', ()=> {
            const stream: ListToCsvStream = new ListToCsvStream();
            stream.init(null, null);
            expect(utils.getMappingRefs(stream)).to.be.null;
        });

        it('should redefine initial separator', ()=> {
            const stream: ListToCsvStream = new ListToCsvStream();
            const config: ListToCsvConfig = utils.getConfig(CommonChar.SEMICOLON);
            stream.init(config, null);
            expect(utils.getSeparator(stream)).to.equal(CommonChar.SEMICOLON);
        });
        
        it('should redefine initial columns mapping', ()=> {
            const stream: ListToCsvStream = new ListToCsvStream();
            const mapping: CsvColumnMapper[] = [{
                index: 0, property: 'test'
            }];
            const config: ListToCsvConfig = utils.getConfig(CommonChar.SEMICOLON, mapping);
            stream.init(config, null);
            expect(utils.getMappingRefs(stream)).to.equal(mapping);
        });
    });

    describe('#transform()', ()=> {
        it('should invoke the onComplete() method', ()=> {
            const stream: any = new ListToCsvStream();
            stream.onComplete = (err: any, result: any)=> {};
            const spy: any = sinon.spy(stream, 'onComplete');
            stream.init(null, null);
            stream.transform(utils.DATA);
            sinon.assert.called(spy);
            sinon.restore();
        });

        it('should create column mapping built from data set', ()=> {
            const stream: any = new ListToCsvStream();
            const config: ListToCsvConfig = utils.getConfig(CommonChar.SEMICOLON);
            stream.onComplete = (err: any, result: any)=> {};
            stream.init(config, null);
            stream.transform(utils.DATA);
            const mappingRefs: Array<CsvColumnMapper> = utils.getMappingRefs(stream);
            expect(mappingRefs.length).to.equal(utils.MAPPING_NUM);
            mappingRefs.forEach((item: CsvColumnMapper, index: number)=> {
                expect(item.property).to.equal(utils.DEFAULT_PROPS[index]);
                expect(item.index).to.equal(index);
            })
        });
        
        it('should create as many lines as objects into the dataset: first line is properties definition, last line is always empty', (done: Function)=> {
            const stream: any = new ListToCsvStream();
            const config: ListToCsvConfig = utils.getConfig(CommonChar.SEMICOLON);
            stream.onComplete = (err: any, result: any)=> {
                const itemList: string[] = result.split(CommonChar.NEW_LINE);
                expect(itemList.length).to.equal(utils.ITEMS_NUM);
                done();
            };
            stream.init(config, null);
            stream.transform(utils.DATA);
        });
        
        it('should create properties definition based upon the initial mapping', (done: Function)=> {
            const stream: any = new ListToCsvStream();
            const config: ListToCsvConfig = utils.getConfig(CommonChar.SEMICOLON);
            stream.onComplete = (err: any, result: any)=> {
                const firstLine: string = result.split(CommonChar.NEW_LINE)[0];
                const itemList: string[] = firstLine.split(CommonChar.SEMICOLON);
                itemList.forEach((item: string)=> {
                    expect(utils.DEFAULT_PROPS.indexOf(item)).to.not.equal(-1);
                });
                done();
            };
            stream.init(config, null);
            stream.transform(utils.DATA);
        });
        
        it('should create CSV lines based custom mapping', (done: Function)=> {
            const stream: any = new ListToCsvStream();
            const mapping: CsvColumnMapper[] = utils.getCustomMapping();
            const config: ListToCsvConfig = utils.getConfig(CommonChar.SEMICOLON, mapping);
            const customProps: string[] = utils.CUSTOM_PROPS;
            const initialDataList: string[] = utils.DATA.split(CommonChar.NEW_LINE);
            stream.onComplete = (err: any, result: any)=> {
                const csv: string[] = result.split(CommonChar.NEW_LINE);
                let len: number = csv.length - 2; // last line is always empty
                for (let i = 1; i <= len; ++i) {
                    const initialItem: any = JSON.parse(initialDataList[i - 1]);
                    const items: string[] = csv[i].split(CommonChar.SEMICOLON);
                    expect(items[0]).to.equal(initialItem[customProps[0]]);
                    expect(Number(items[1])).to.equal(initialItem[customProps[1]]);
                }
                done();
            };
            stream.init(config, null);
            stream.transform(utils.DATA);
        });
    });
});