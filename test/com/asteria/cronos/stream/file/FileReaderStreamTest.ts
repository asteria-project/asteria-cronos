import 'mocha';
import { expect } from 'chai';

// Class to test:
import { FileReaderStream } from '../../../../../../src/com/asteria/cronos/stream/file/FileReaderStream';

// Test:
describe('FileReaderStream class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the FilterStream fully qualified class name', ()=> {
            const stream: FileReaderStream = new FileReaderStream('utils/test-utils/data/test.csv');
            stream.close();
            expect(stream.getClassName()).to.equal('com.asteria.cronos.stream.file::FileReaderStream');
        });
    });
});