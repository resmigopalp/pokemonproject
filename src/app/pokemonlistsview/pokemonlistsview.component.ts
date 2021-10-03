import { Component, OnInit } from '@angular/core';
import{ApiService} from '../service/api.service';

@Component({
  selector: 'app-pokemonlistsview',
  templateUrl: './pokemonlistsview.component.html',
  styleUrls: ['./pokemonlistsview.component.css']
})
export class PokemonlistsviewComponent implements OnInit {


  pokemonsarray:any[]=[];
  pageselect:any[]=[10,20,50];
  sortingnames:any[]=["name","height","weight"];
  page=1;
  totalpoke:number =10;
  selected=10;
  sortvalue:string="name";
  public searchText: any;
  constructor(private dataapiservice:ApiService)
   { }

  ngOnInit(): void 
  {
    this.getPokemons();
  }
  update(e:any){
    this.selected = e.target.value
    this.getPokemons();
  }
 
  getPokemons()
  {
    
    this.dataapiservice.getPokemon(this.selected,this.page+0).subscribe((response:any)=>
    {
        response.results.forEach((result:any) =>
         {
           this.totalpoke = response.count;
            this.dataapiservice.getPokemonDetails(result.name).subscribe((morerespone:any)=>
            {
                this.pokemonsarray.push(morerespone);
                console.log(this.pokemonsarray);
            });
            
          
          });
     

    });
  }
}
