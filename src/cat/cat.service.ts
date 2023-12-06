import { Injectable } from '@nestjs/common';

interface Cat {
    name: string;
    age: number;
}

enum CatServiceMessages {
    RootCatPageMessage = 'Root Cat Page Message',
    CatNotFound = 'Cat not found',
};

@Injectable()
export class CatService {
    private message: CatServiceMessages = CatServiceMessages.RootCatPageMessage;

    private cats: Cat[]  = [
        {name: 'Meow 1', age: 1},
        {name: 'Meow 2', age: 2}
    ];

    defaultPage() : string {
        return this.message;
    }

    returnCatData(): Cat[] {
        return [... this.cats];
    }

    findbyName(name: string) : any {
        return this.cats.find(cat => cat.name === name);
    }

    addNewCat(newCat : Cat) : void {
        this.cats.push(newCat);
    }
    deleteCat(name: string): string {
        const catIndex = this.cats.findIndex((cat) => cat.name === name);
    
        if (catIndex !== -1) {
          this.cats.splice(catIndex, 1);
          return `Cat ${name} deleted successfully`;
        }
    
        return CatServiceMessages.CatNotFound;
      }
}
