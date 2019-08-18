import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { CommonChar } from 'asteria-gaia';
import { CsvToListConfig } from '../../../../../../src/com/asteria/cronos/config/data/CsvToListConfig';
import { CsvColumnMapper } from '../../../../../../src/com/asteria/cronos/util/CsvColumnMapper';

// Class to test:
import { CsvToListStream } from '../../../../../../src/com/asteria/cronos/stream/data/CsvToListStream';

// Utilities:
import * as utils from '../../../../../../utils/test-utils/utilities/CsvToListStreamTestUtils';
import { DataLoader } from '../../../../../../utils/test-utils/classes/DataLoader';

// Test:
describe('CsvToListStream class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the CsvToListStream fully qualified class name', ()=> {
            const stream: CsvToListStream = new CsvToListStream();
            expect(stream.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#init()', ()=> {
        it('should not redefine initial separator', ()=> {
            const stream: CsvToListStream = new CsvToListStream();
            stream.init(null, null);
            expect(utils.getSeparator(stream)).to.equal(CommonChar.COMMA);
        });

        it('should not redefine initial columns mapping', ()=> {
            const stream: CsvToListStream = new CsvToListStream();
            stream.init(null, null);
            expect(utils.getMappingRefs(stream)).to.be.null;
        });

        it('should redefine initial separator', ()=> {
            const stream: CsvToListStream = new CsvToListStream();
            const config: CsvToListConfig = utils.getConfig(CommonChar.SEMICOLON);
            stream.init(config, null);
            expect(utils.getSeparator(stream)).to.equal(CommonChar.SEMICOLON);
        });
        
        it('should redefine initial columns mapping', ()=> {
            const stream: CsvToListStream = new CsvToListStream();
            const mapping: CsvColumnMapper[] = [{
                index: 0, property: 'test'
            }];
            const config: CsvToListConfig = utils.getConfig(CommonChar.SEMICOLON, mapping);
            stream.init(config, null);
            expect(utils.getMappingRefs(stream)).to.equal(mapping);
        });
    });

    describe('#transform()', ()=> {
        it('should invoke the onComplete() method', (done: Function)=> {
            DataLoader.loadData((data: any)=> {
                const stream: any = new CsvToListStream();
                stream.onComplete = (err: any, result: any)=> {};
                const spy: any = sinon.spy(stream, 'onComplete');
                stream.init(null, null);
                stream.transform(data);
                sinon.assert.called(spy);
                sinon.restore();
                done();
            });
        });

        it('should create column mapping built from data set', (done: Function)=> {
            DataLoader.loadData((data: any)=> {
                const stream: any = new CsvToListStream();
                const config: CsvToListConfig = utils.getConfig(CommonChar.SEMICOLON);
                stream.onComplete = (err: any, result: any)=> {};
                stream.init(config, null);
                stream.transform(data);
                const mappingRefs: Array<CsvColumnMapper> = utils.getMappingRefs(stream);
                expect(mappingRefs.length).to.equal(utils.MAPPING_NUM);
                mappingRefs.forEach((item: CsvColumnMapper, index: number)=> {
                    expect(item.property).to.equal(utils.DEFAULT_PROPS[index]);
                    expect(item.index).to.equal(index);
                });
                done();
            });
        });
        
        it('should create as many objects as lines into the dataset: last line is always empty', (done: Function)=> {
            DataLoader.loadData((data: any)=> {
                const stream: any = new CsvToListStream();
                const config: CsvToListConfig = utils.getConfig(CommonChar.SEMICOLON);
                stream.onComplete = (err: any, result: any)=> {
                    const itemList: string[] = result.split(CommonChar.NEW_LINE);
                    expect(itemList.length).to.equal(utils.ITEMS_NUM);
                    done();
                };
                stream.init(config, null);
                stream.transform(data);
            });
        });
        
        it('should create Asteria objects based upon the initial mapping', (done: Function)=> {
            DataLoader.loadData((data: any)=> {
                const stream: any = new CsvToListStream();
                const config: CsvToListConfig = utils.getConfig(CommonChar.SEMICOLON);
                stream.onComplete = (err: any, result: any)=> {
                    const itemList: string[] = result.split(CommonChar.NEW_LINE);
                    const item: any = JSON.parse(itemList[0]);
                    for (let key in item) {
                        expect(utils.DEFAULT_PROPS.indexOf(key)).to.not.equal(-1);
                    }
                    done();
                };
                stream.init(config, null);
                stream.transform(data);
            });
        });
        
        it('should create Asteria objects based custom mapping', (done: Function)=> {
            DataLoader.loadData((data: any)=> {
                const stream: any = new CsvToListStream();
                const mapping: CsvColumnMapper[] = utils.getCustomMapping();
                const config: CsvToListConfig = utils.getConfig(CommonChar.SEMICOLON, mapping);
                stream.onComplete = (err: any, result: any)=> {
                    const itemList: string[] = result.split(CommonChar.NEW_LINE);
                    const item: any = JSON.parse(itemList[0]);
                    for (let key in item) {
                        expect(utils.CUSTOM_PROPS.indexOf(key)).to.not.equal(-1);
                    }
                    done();
                };
                stream.init(config, null);
                stream.transform(data);
            });
        });
            
        it('should return an empty dataset', (done: Function)=> {
            const stream: any = new CsvToListStream();
            const config: CsvToListConfig = utils.getConfig(CommonChar.SEMICOLON);
            stream.onComplete = (err: any, result: any)=> {
                expect(result).to.equal(CommonChar.EMPTY);
                done();
            };
            stream.init(config, null);
            stream.transform(CommonChar.EMPTY);
        });
          
        it('should correctly process splitted dataset', (done: Function)=> {
            const stream: any = new CsvToListStream();
            const config: CsvToListConfig = utils.getConfig(CommonChar.SEMICOLON);
            const data_1: string = `Country;City;AccentCity;Region;Population;Latitude;Longitude;geopoint
zm;lisuka;Lisuka;05;;-15.48333`;
            const data_2: string = `33;28.0833333;-15.4833333, 28.0833333
zm;lubesha;Lubesha;02;;-12.9666667;27.65;-12.9666667, 27.65`;
            let cursor: number = 0;
            stream.onComplete = (err: any, result: any)=> {
                cursor++;
                if (cursor === 1) {
                    // incomplete data set is retained
                    expect(result).to.equal(CommonChar.EMPTY);
                } else {
                    // complete data set is processed
                    const itemList: string[] = result.split(CommonChar.NEW_LINE);
                    expect(itemList.length).to.equal(3); // last line is always empty
                    done();
                }
            };
            stream.init(config, null);
            stream.transform(data_1);
            stream.transform(data_2);
        });
    });
});