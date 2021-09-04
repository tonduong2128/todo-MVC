import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }
  toggleAll(): void {
    this.todoService.toggleAll()
  }
}
