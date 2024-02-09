import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { FirebaseService } from './../db/firebase/firebase.service';

@Injectable()
export class RjsService {
    private readonly db: any;

    constructor(private readonly dbConnect: FirebaseService) {
        this.db = this.dbConnect.returnDBHandler();
    }

    async returnUsers(): Promise<any> {
        const dbHandler = this.dbConnect.returnDBHandler();
        try {
            const users = await dbHandler.collection('user').get();
            const usersData = users.docs.map(user => user.data());
            return usersData;
        } catch (err) {
            throw new Error(err);
        }
    }

    async shortenUrl(originalUrl: string): Promise<string> {
        const shortCode = this.generateShortCode();
        const shortUrl = `https://fairs.as/${shortCode}`;
    
        await this.saveToDatabase(shortCode, originalUrl);
    
        return shortUrl;
    }

    private generateShortCode(): string {
        // Generate a 5-digit random character code
        return Math.random().toString(36).substr(2, 5);
    }

    private async saveToDatabase(shortCode: string, originalUrl: string): Promise<void> {
        try {
            const docRef = this.db.collection('shortUrls').doc(shortCode);
            await docRef.set({ originalUrl });
        } catch (error) {
            console.error('Error saving to database:', error);
        }
    }

    async redirectToOriginalUrl(shortCode: string): Promise<string> {
        try {
            const docRef = this.db.collection('shortUrls').doc(shortCode);
            const doc = await docRef.get();

            if (doc.exists) {
                const originalUrl = doc.data().originalUrl;
                return originalUrl;
            } else {
                throw new NotFoundException('Short URL not found');
            }
        } catch (error) {
            console.error('Error fetching original URL:', error);
            throw new Error('Internal Server Error');
        }
    }
}
