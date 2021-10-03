import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../service/api.service';
import { FormsModule } from '@angular/forms';
import { PokemonlistsviewComponent } from './pokemonlistsview.component';

describe('PokemonlistsComponent', () => {
  let component: PokemonlistsviewComponent;
  let fixture: ComponentFixture<PokemonlistsviewComponent>;

  beforeEach(() => {
    const apiServiceStub = () => ({
      getPokemon: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }),
      getPokemonDetails: (name: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PokemonlistsviewComponent],
      providers: [{ provide: ApiService, useFactory: apiServiceStub }]
    });
    fixture = TestBed.createComponent(PokemonlistsviewComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`pokemonsarray has default value`, () => {
    expect(component.pokemonsarray).toEqual([]);
  });

  it(`pageselect has default value`, () => {
    expect(component.pageselect).toEqual([10, 20, 50]);
  });

  it(`sortingnames has default value`, () => {
    expect(component.sortingnames).toEqual(['name', 'height', 'weight']);
  });

  it(`page has default value`, () => {
    expect(component.page).toEqual(1);
  });

  it(`totalpoke has default value`, () => {
    expect(component.totalpoke).toEqual(10);
  });

  it(`selected has default value`, () => {
    expect(component.selected).toEqual(10);
  });

  it(`sort has default value`, () => {
    expect(component.sortvalue).toEqual('name');
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getPokemons').and.callThrough();
      component.ngOnInit();
      expect(component.getPokemons).toHaveBeenCalled();
    });
  });

  describe('getPokemons', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'getPokemon').and.callThrough();
      spyOn(apiServiceStub, 'getPokemonDetails').and.callThrough();
      component.getPokemons();
      expect(apiServiceStub.getPokemon).toHaveBeenCalled();
      expect(apiServiceStub.getPokemonDetails).toHaveBeenCalled();
    });
  });
});