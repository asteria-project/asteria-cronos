import { AsteriaContext, StreamProcessor, AsteriaLogger } from 'asteria-gaia';
import { OuranosLogger } from 'asteria-ouranos';

/**
 * A basic <code>AsteriaContext</code> implementation for unit testing.
 */
export class AsteriaContextImpl implements AsteriaContext {

    /**
     * @inheritdoc
     */
    public getName(): string {
        return 'AsteriaContextImpl';
    }
    
    /**
     * @inheritdoc
     */
    public getId(): string {
        return '0bca3bac-f371-4249-8b3a-0249349eed94';
    }
    
    /**
     * @inheritdoc
     */
    public getProcessor(): StreamProcessor {
        return null;
    }

    /**
     * @inheritdoc
     */
    public getLogger(): AsteriaLogger {
        return OuranosLogger.getLogger();
    }
}