import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  //@HttpCode( HttpStatus.OK )
  create(@Body() createPokemonDto: CreatePokemonDto) {
    
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll( @Query() pagination : PaginationDto) {

    pagination.limite = pagination.limite  ?? 10
    pagination.pagina = pagination.pagina ?? 0
    return this.pokemonService.findAll(pagination);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':term')
  remove(
    @Param('term',ParseMongoIdPipe) term: string
  ) {
    return this.pokemonService.remove(term);
  }
}
