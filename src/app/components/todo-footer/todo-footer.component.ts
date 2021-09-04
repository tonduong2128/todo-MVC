import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit, OnDestroy {
  filterButtons: FilterButton[] =[
    {type: Filter.All, label: 'All', isActive: true},
    {type: Filter.Active, label: 'Active', isActive: false},
    {type: Filter.Completed, label: 'Completed', isActive: false},
  ]

  
  length=0;
  hasComplete$:Observable<boolean>;
  destroy$: Subject<null> = new Subject();

  constructor(private todoService:TodoService ) {
  }

  ngOnInit():void {
    this.hasComplete$=this.todoService.todo$.pipe(
      map(todos=>todos.some(t => t.isCompleted)),
      takeUntil(this.destroy$)
    );
      
    this.todoService.length$.pipe(takeUntil(this.destroy$)) 
      .subscribe(length=>{
        this.length = length;
      })
  }   

  filter(type:Filter){
    this.setActiveFilterBtn(type);    
    this.todoService.filterTodos(type);
  }
  setActiveFilterBtn(type:Filter){
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type     
    });
  }

  clearCompleted(){
   this.todoService.clearCompleted();
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
