import { Module } from '@nestjs/common';
import { RjsController } from './rjs.controller';
import { RjsService } from './rjs.service';
import { FirebaseService } from './../db/firebase/firebase.service';

@Module({
  controllers: [RjsController],
  providers: [RjsService, FirebaseService]
})
export class RjsModule {}
