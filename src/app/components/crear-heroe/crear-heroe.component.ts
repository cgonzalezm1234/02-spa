import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-crear-heroe',
  templateUrl: './crear-heroe.component.html'
})
export class CrearHeroeComponent implements OnInit {

  contactForm: FormGroup;
  heroe: any = {};

  createFormGroup() {
    return new FormGroup({
      nombre : new FormControl('', [Validators.required]),
      bio : new FormControl('', [Validators.required]),
      img : new FormControl('', [Validators.required]),
      aparicion : new FormControl('', [Validators.required]),
      casa : new FormControl('', [Validators.required])
    });
  }

  constructor(private heroesService: HeroesService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void {
    $(document).ready(e => {
      console.log('ready');
      $('#customFileLang').on('change', function() {
        const img: string = $(this).val().toString().toLowerCase().split('c:\\fakepath\\').join('');
        $(this).next('.custom-file-label').html(img);
      });
    });
  }

  onResetForm() {
    this.contactForm.reset();
  }

  onSaveForm() {
    console.log(this.contactForm.value);
    this.activatedRoute.params.subscribe( params => {
      this.heroesService.addHeroe(this.contactForm.value).subscribe(data => {
        this.heroe = data['heroe'];
      });
    });
    console.log(this.heroe);
  }
}
