import { Controller, Get, Param, Post,Delete, Body  } from '@nestjs/common';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
    constructor(private readonly catService: CatService) {}

    @Get()
    getRootMessage() : string {
        return this.catService.defaultPage();
    }

    @Get('all')
    getAll() : {name: string, age: number} [] {
        return this.catService.returnCatData();
    }

    @Get(':name')
    getCatByName(@Param('name') name: string): any {
        const cat = this.catService.findbyName(name);
        return cat ? cat : { message: 'Unknown cat', name };
    }

    @Post('/add')
    addNewCat(@Body() catData: {name: string, age: number}) : any {
        this.catService.addNewCat(catData);

        return catData;
    }
    @Delete(':name')
    deleteCatByName(@Param('name') name: string) : any {
        const del = this.catService.deleteCat(name);
 
        return del;
    }


    
}
