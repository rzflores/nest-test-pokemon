import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.valitation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load : [ EnvConfiguration ],
      validationSchema : JoiValidationSchema
    }) ,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),
//    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon-db',
    MongooseModule.forRoot(process.env.MONGO_URL,
    {
      dbName : 'pokemonsdb'
      // user: 'root',
      // pass: 'example'
    }),  
    PokemonModule, CommonModule, SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

  constructor() {
    console.log(process.env)
    
  }
}
