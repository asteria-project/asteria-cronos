import * as fs from 'fs';
import * as path from 'path';

/**
 * A utility class for loading test dataset.
 */
export class DataLoader {

    /**
     * Load the test dataset.
     */
    public static loadData(callback: (data: any)=> void): void {
        const dataPath: string = path.join(process.cwd(), 'utils/test-utils/data/test.csv') ;
        fs.readFile(dataPath, (err: NodeJS.ErrnoException, data: Buffer)=> {
            if (err) {
              throw err; 
            }
            callback(data);
        });
    }
}