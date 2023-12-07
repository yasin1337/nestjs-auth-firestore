import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import {FirebaseService} from '../db/firebase/firebase.service';

@Module({
  controllers: [CatController],
  providers: [CatService, FirebaseService]
})
export class CatModule {}
