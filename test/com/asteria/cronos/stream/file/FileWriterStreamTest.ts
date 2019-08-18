import 'mocha';
import { expect } from 'chai';

// Class to test:
import { FileWriterStream } from '../../../../../../src/com/asteria/cronos/stream/file/FileWriterStream';

// Test:
describe('FileWriterStream class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the FilterStream fully qualified class name', ()=> {
            const stream: FileWriterStream = new FileWriterStream('utils/test-utils/data/temp.csv');
            stream.close();
            expect(stream.getClassName()).to.equal('com.asteria.cronos.stream.file::FileWriterStream');
        });
    });
});