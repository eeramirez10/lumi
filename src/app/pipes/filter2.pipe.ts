import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {

  vista = 0;

  transform(value: any, arg: any): any {
    const restarea = [];
    for (const tarea of value) {
      if (tarea.Nombre_Empresa.toLowerCase().indexOf(arg.toLowerCase()) > - 1) {
        restarea.push(tarea);
      }
    }
    return restarea;
  }

}
