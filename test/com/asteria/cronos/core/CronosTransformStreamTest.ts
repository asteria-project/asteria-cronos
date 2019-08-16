import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';

// Class to test:
import { CronosTransformStream } from '../../../../../src/com/asteria/cronos/core/CronosTransformStream';

// Utilities:
import * as utils from '../../../../../utils/test-utils/utilities/CronosTransformStreamTestUtils';
import { CronosTransformStreamImpl } from '../../../../../utils/test-utils/classes/CronosTransformStreamImpl';

// Test:
describe('CronosTransformStream class test', ()=> {

    describe('#getClassName()', ()=> {
        it('should return the CronosTransformStream fully qualified class name', ()=> {
            const transform: CronosTransformStream = new CronosTransformStreamImpl(utils.CLASS_NAME);
            expect(transform.getClassName()).to.equal(utils.CLASS_NAME);
        });
    });
    
    describe('#_transform()', ()=> {
        it('should invoke the transform() method of the CronosTransformStream implementation with the specified chunk object', ()=> {
            const transform: CronosTransformStream = new CronosTransformStreamImpl(utils.CLASS_NAME);
            const spy: any = sinon.spy(transform, '_transform');
            transform._transform(utils.CHUNCK, utils.ENCODING, utils.CALLBACK);
            sinon.assert.calledWith(spy, utils.CHUNCK);
            sinon.restore();
        });

        it('should set the internal onComplete property with the callback parameter', ()=> {
            const transform: CronosTransformStream = new CronosTransformStreamImpl(utils.CLASS_NAME);
            transform._transform(utils.CHUNCK, utils.ENCODING, utils.CALLBACK);
            expect((transform as any).onComplete).to.equal(utils.CALLBACK);
        });
        
        it('should set the internal encoding property with the encoding parameter', ()=> {
            const transform: CronosTransformStream = new CronosTransformStreamImpl(utils.CLASS_NAME);
            transform._transform(utils.CHUNCK, utils.ENCODING, utils.CALLBACK);
            expect((transform as any).encoding).to.equal(utils.ENCODING);
        });
    });
});