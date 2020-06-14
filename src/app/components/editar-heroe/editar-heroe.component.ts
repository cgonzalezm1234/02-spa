import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { HeroesService, Heroe } from "../../services/heroes.service";
import { ActivatedRoute } from "@angular/router";
import * as jQuery from "jquery";

@Component({
  selector: 'app-editar-heroe',
  templateUrl: './editar-heroe.component.html'
})
export class EditarHeroeComponent implements OnInit {

  contactForm: FormGroup
  heroe: any = {}
  uploadedFile: File = null
  submitted: Boolean = false
  success: Boolean = false
  idHeroe: string = null
  
  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(3)]),
      bio: new FormControl("", [Validators.required]),
      img: new FormControl("", [Validators.required]),
      aparicion: new FormControl("", [Validators.required]),
      casa: new FormControl("", [Validators.required])
    })
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.createFormGroup();
    this.activatedRoute.params.subscribe( params => {
      this.idHeroe = params['id']
      this.heroesService.getHeroe(this.idHeroe).subscribe(data => {
        this.heroe = data['heroe'];
        this.callingFunction()
      });
    });
  }

  callingFunction() {
    this.nombre.setValue(this.heroe.nombre);
    this.bio.setValue(this.heroe.bio);
    this.aparicion.setValue(this.heroe.aparicion);
    this.casa.setValue(this.heroe.casa);
   }

  ngOnInit(): void {
    $(document).ready(e => {
      $("#customFileLang").on("change", function() {
        const img: string = $(this)
          .val()
          .toString()
          .toLowerCase()
          .split("c:\\fakepath\\")
          .join("");
        $(this)
          .next(".custom-file-label")
          .html(img);
      });
    });
  }
  
  onResetForm() {
    this.contactForm.reset();
  }

  onSaveForm() {
    this.submitted = true;

    if (this.contactForm.valid) {
      const formData = new FormData()
      formData.append('file', this.uploadedFile, this.uploadedFile.name);
      formData.append('nombre', this.nombre.value)
      formData.append('bio', this.bio.value)
      formData.append('img', this.uploadedFile.name)
      formData.append('aparicion', this.aparicion.value)
      formData.append('casa', this.casa.value)
      formData.append('id', this.idHeroe)
      console.log(formData)
      this.activatedRoute.params.subscribe( params => {
        this.heroesService.updateHeroe(formData)
        .subscribe(data => {
          this.heroe = data['heroe']
        },
        error => {
          console.log(error)
        });
      });
      this.success = true
    }
    else return
  }

  onFileSelect(event) {
    this.uploadedFile = event.target.files[0]
  }

  get nombre(): any {
    return this.contactForm.get('nombre');
  }

  get aparicion(): any {
    return this.contactForm.get('aparicion');
  }

  get bio(): any {
    return this.contactForm.get('bio');
  }

  get img(): any {
    return this.contactForm.get('img');
  }

  get casa(): any {
    return this.contactForm.get('casa');
  }
}