import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/PokeResponse.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name ) 
    private readonly pokemonModel : Model<Pokemon>, 
    private readonly http : AxiosAdapter
  ) {
    
  }
  //private readonly axios : AxiosInstance = axios;

  async execute() {
    
    await this.pokemonModel.deleteMany({});
    
    //const { data } = await axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`)
    const data = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`)
    //const insertPromsises  = [];
    
    const insertToPokemos : { name : string , no : number}[]  = [];

    data.results.forEach( ({ name , url }) => {
        const segmento = url.split('/')
        const no = +segmento[segmento.length -2 ]
        
        insertToPokemos.push({ name, no })
        // insertPromises.push(
        //   this.pokemonModel.create({ name,no })
        // )
      })

      await this.pokemonModel.insertMany(insertToPokemos);
//    await Promise.all( insertPromises );

    // data.results.forEach( async ({ name , url }) => {
    //     const segmento = url.split('/')
    //     const no = +segmento[segmento.length -2 ]
    //     await this._pokemonModel.create({ name , no })
    //     console.log({ name , no })
    // } )
    return 'data ingresada';
  }

}
