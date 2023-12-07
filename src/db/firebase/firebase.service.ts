import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../src/db/firebase/serviceaccount.json');

@Injectable()
export class FirebaseService {
    private readonly db: admin.firestore.Firestore;
    
    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            })
          }
        this.db = admin.firestore();
    }

    public returnDBHandler(): any {
        return this.db;
    }

}
