import { Pipe, PipeTransform } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  vista=0;

  transform(value: any, arg: any): any {
    const restarea = [];
    for ( const tarea of value){
      if (tarea.Nombre.toLowerCase().indexOf(arg.toLowerCase()) > - 1) {
        restarea.push(tarea);
      }
    }
    return restarea;
  }

}
