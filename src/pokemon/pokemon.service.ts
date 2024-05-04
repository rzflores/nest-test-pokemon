import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit : number;
  constructor( 
    @InjectModel(Pokemon.name)
    private readonly pokemonModel : Model<Pokemon> ,
    private readonly configService : ConfigService
  ){
    this.defaultLimit = this.configService.get<number>('defaultLimit');

  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
      
    } catch (error) {
      this.handleErrorException(error);
    }

  }

  async findAll(pagination: PaginationDto) {

    

    const { limite = this.defaultLimit , pagina = 1 } = pagination 

    return await this.pokemonModel.find()
    .limit( limite )
    .skip( pagina )
    .sort({
      no : 1
    } )
    .select('-__v');
  }

  async findOne(term: string) {
   // try {
      let pokemon : Pokemon ;
      
      if(!isNaN(+term)){
        pokemon = await this.pokemonModel.findOne( { no: term } );
      }
      if( isValidObjectId(term) ){
        pokemon = await this.pokemonModel.findById( term );
      }
      if( !pokemon ){
        pokemon = await this.pokemonModel.findOne( { name : term.toLowerCase().trim() })
      }
      if(!pokemon) {
        throw new NotFoundException(`Pokemon no encontrado`)
      }
      return pokemon;

    // } catch (error) {

    // }

  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    try {
      let pokemon = await this.findOne(term);
      if( updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase()
  
     await pokemon.updateOne(updatePokemonDto)
  
      return { ...pokemon.toJSON(), ...updatePokemonDto };
      
    } catch (error) {
      this.handleErrorException(error);  
    }
  }

  async remove(term: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id : term })
    if( deletedCount === 0){
      throw new BadRequestException(`el pokemon con id ${term} no encontrado`)
    }
    //const pokemon = await this.findOne(term);
    //await pokemon.deleteOne();
    return;
  }

  private handleErrorException(error:any){
    if(error.code === 11000){
      console.log(error)
      throw new BadRequestException(`El pokemon con ${ JSON.stringify( error.keyValue ) } ya existe`)
    }
    throw new InternalServerErrorException("Ocurrio un error en la actualizacion")
  
  }
}
