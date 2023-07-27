import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'

@Pipe({ name: 'image' })
export class ImagePipe implements PipeTransform {
  defaultImage: string =
    'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';

  constructor(private http: HttpClient) {}

  transform(url: string): any {

  }
}
