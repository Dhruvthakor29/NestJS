import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import {user ,userSchema} from './Schemas/user.schema'

@Module({
   imports: [MongooseModule.forFeature([{ name: user.name, schema: userSchema }])],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
