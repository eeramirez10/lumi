import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreRE'
})
export class NombreREPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultguardia = [];
    for ( const guardia of value){
      if (guardia.Nombre.toLowerCase().indexOf(arg.toLowerCase()) > - 1) {
        console.log('sii');
        resultguardia.push(guardia);
      }
    }
    return resultguardia;
  }

}
