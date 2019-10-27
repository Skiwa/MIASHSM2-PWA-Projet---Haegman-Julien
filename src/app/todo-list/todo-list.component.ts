import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  @Input() 
  @ViewChild('newTodoInput', {static:false}) todoInput:any;

  private data: TodoListData;     //Current list
  private titre: String;          //Title
  private filter:String = 'all';  //Current filter: 'all', 'actives', 'completed'

  constructor(private todoService: TodoService) {
    //Update data each time the todolist changes
    todoService.getTodoListDataObserver().subscribe(todolist=>{
      this.data = todolist;
      this.titre = todolist.label;
      console.log("updated todolist : ", todolist);
    });
  }

  ngOnInit() {}

  /**
   * Adds a new item to the list
   * @param value Item label
   */
  appendItem(value:string){
    if(value!==''){
      //Add a new item to the list
      this.todoService.appendItems({label: value, isDone:false});

      //Clear the input
      this.clearInput();
    }
  }

  /**
   * Clears the input
   */
  clearInput(){
    this.todoInput.nativeElement.value = "";
  }

  /**
   * Change the state of an item
   * @param item 
   */
  checkItem(item: TodoItemData){
    this.todoService.setItemsDone(!item.isDone, item);
  }

  /**
   * Remove an item
   */
  removeItem(item: TodoItemData){
    this.todoService.removeItems(item);
  }

  /**
   * Removes every item marked as completed
   */
  removeCheckedItems(){
    this.data.items.forEach(item=>{
      if(item.isDone){
        this.todoService.removeItems(item);
      }
    })
  }

  /**
   * Returns the number of items left todo
   * @returns number count
   */
  countItemsLeft():number{
    return (this.data.items.length - this.data.items.filter(item=>item.isDone).length);
  }

  /**
   * Changes the filter value
   * @param value filter value
   */
  setFilter(value){
    this.filter = value;
  }

  /**
   * Checks if an item is in the filters
   * @param item
   */
  isItemShown(item){
    if(this.filter==='all'){
      return true;
    }
    
    if(this.filter==='actives' && !item.isDone){
      return true;
    }

    if(this.filter==='completed' && item.isDone){
      return true;
    }

    return false;
  }

  
  get label(): string {
    return this.data ? this.data.label : '';
  }

  get items(): TodoItemData[] {
    return this.data ? this.data.items : [];
  }

}
