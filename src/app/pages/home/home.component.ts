import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogHeader } from 'src/app/shared/models/components.interface';
import { HeroeModel } from 'src/app/shared/models/heroe.model';
import { HeroesService } from 'src/app/shared/services/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  heroes: HeroeModel[] = [];
  errorImg =
    'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
  loading: boolean = true;
  addHeroeDialog: boolean = false;
  editHeroeDialog: boolean = false;
  dialogHeader: DialogHeader = { id: 0, title: '' };
  heroe: any;
  selectedHeroes: any[] | null;
  submitted: boolean = false;

  constructor(
    private heroesService: HeroesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initTable();
    this.initForm();
  }

  searchHero(value: any) {
    let text = value;
    if (text.length === 0) {
      console.log('entra');
      this.heroesService.getHeroes().subscribe((resp: any) => {
        this.heroes = resp;
      });
    } else {
      this.heroes = this.heroes.filter((x) =>
        x.name.includes(text.toLowerCase())
      );
    }
  }
  deleteSelectedHeroes() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected heroes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedHeroes?.forEach(
          async (x) => await this.heroesService.deleteHeroe(x.id)
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Heroes have been deleted',
          life: 2000,
        });
      },
    });
  }
  removeHero(heroe: HeroeModel) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + heroe.name.toUpperCase() + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this.heroesService.deleteHeroe(heroe.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: heroe.name.toUpperCase() + ' has been deleted',
          life: 2000,
        });
      },
    });
  }
  async addHero(hero: HeroeModel) {
    if (this.form.valid) {
      this.form = this.fb.group({
        name: hero.name.toLowerCase(),
        img: hero.img,
        strength: hero.strength,
        power: hero.power,
        description: hero.description,
      });

      await this.heroesService.insertHeroe(this.form.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Hero has been saved',
        life: 2000,
      });
      this.submitted = false;
      this.addHeroeDialog = false;
      this.form.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong. Please contact with administration',
        life: 2000,
      });
      this.submitted = false;
      this.addHeroeDialog = false;
      this.form.reset();
    }
  }
  async editHero(hero: HeroeModel) {
    console.log(hero);

    try {
      if (!this.form.invalid) {
        const id = hero.id;
        const response = await this.heroesService.updateHeroe(id, hero);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Hero has been modified',
          life: 2000,
        });
        this.submitted = false;
        this.editHeroeDialog = false;
        this.form.reset();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong. Please contact with administration',
          life: 2000,
        });
        this.submitted = false;
        this.editHeroeDialog = false;
        this.form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getHero(id: string) {
    console.log(id);
    const hero = (await this.heroesService.getHero(id)).data();
    console.log(hero);
    return hero;
  }

  /*PRIVATE*/
  initTable() {
    this.heroesService.getHeroes().subscribe((resp: any) => {
      this.heroes = resp;
      this.loading = false;
    });
  }
  openNew() {
    this.dialogHeader = { id: 1, title: 'Add a new superhero' };
    this.form.reset();
    this.heroe = {};
    this.submitted = false;
    this.addHeroeDialog = true;
  }
  hideDialog() {
    this.addHeroeDialog = false;
    this.editHeroeDialog = false;

    this.submitted = false;
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].id === id) {
        index = i;
      }
    }

    return index;
  }
  async openEdit(heroe: any) {
    this.dialogHeader = {
      id: 2,
      title: 'Would you like to modify ' + heroe.name + '?',
    };
    const oldForm = heroe;
    this.form = this.fb.group({
      name: [oldForm.name],
      img: oldForm.img,
      strength: [oldForm.strength],
      power: [oldForm.power],
      description: [oldForm.description],
      id: [oldForm.id],
    });

    this.heroe = {};
    this.submitted = false;
    this.editHeroeDialog = true;
  }
  initForm(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      img: new FormControl('', []),
      strength: new FormControl('', [Validators.required]),
      power: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });
  }
}
