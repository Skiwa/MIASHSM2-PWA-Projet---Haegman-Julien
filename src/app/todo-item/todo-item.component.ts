import {ChangeDetectionStrategy, Component, OnInit, Input, Output} from '@angular/core';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

@Input() item:TodoItemData;                   //curent item
@Output() checkAction = new EventEmitter();   //event emitted when item is checked
@Output() removeAction = new EventEmitter();  //event emitted when item is deleted
@Output() renameAction = new EventEmitter();  //event emitted when item is renamed

public showEdit:boolean = false;  //true: show the edit input

  constructor() { }

  ngOnInit() {
  }
}
