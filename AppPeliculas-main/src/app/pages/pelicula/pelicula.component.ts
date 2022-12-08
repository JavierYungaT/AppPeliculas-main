import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/app/interfaces/pelicula.interface';
import { PeliculasService } from 'src/app/services/peliculas.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common'
import { Cast} from 'src/app/interfaces/credits.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula?:MovieDetails;
  cast:Cast[]=[];

  constructor(config: NgbRatingConfig, private activatedRoute: ActivatedRoute, private peliculasSvc:PeliculasService, private location:Location, private router: Router) { 
  
     config.max = 10;
     config.readonly = true;
  }

  ngOnInit() {
    const {id} = this.activatedRoute.snapshot.params;
    
    combineLatest([
      this.peliculasSvc.getPeliculaDetalle(id),
      this.peliculasSvc.getCast(id)  
    ]).subscribe(([movie, cast])=>{

      if (!movie) {
        this.router.navigateByUrl('/');
          return;
        }

        this.pelicula=movie;
        this.cast=cast;
    })

  }

  regresar(){

this.location.back();

  }  

}
