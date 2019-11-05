import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  @Input() 
  @ViewChild('newTodoInput', {static:false}) todoInput:any;

  public data: TodoListData;      //Current list
  private titre: String;          //Title
  private filter:String = 'all';  //Current filter: 'all', 'actives', 'completed'

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {

    //Loads the stored todolist
    this.loadTodoListLocal();

    //Save the initial state in the history list
    this.todoService.saveListInHistory();

    //Update data each time the todolist changes
    this.todoService.getTodoListDataObserver().subscribe(todolist=>{
      //Retrieve the todolist data
      this.data = todolist;
      this.titre = todolist.label;

      //Save the todolist in local storage
      this.saveTodoListLocal();
    });
  }

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

      //Save the state in the history list
      this.todoService.saveListInHistory();
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

    //Save the state in the history list
    this.todoService.saveListInHistory();
  }

  /**
   * Remove an item
   */
  removeItem(item: TodoItemData){
    this.todoService.removeItems(item);

    //Save the state in the history list
    this.todoService.saveListInHistory();
  }

  /**
   * Removes every item marked as completed
   */
  removeCheckedItems(){
    this.data.items.forEach(item=>{
      if(item.isDone){
        this.todoService.removeItems(item);
      }
    });

    //Save the state in the history list
    this.todoService.saveListInHistory();

  }

  /**
   * Remove every item
   */
  removeAllItems(){
    this.todoService.removeAllItems();

    //Save the state in the history list
    this.todoService.saveListInHistory();
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

  /**
   * Loads the todolist in localstorage
   */
  loadTodoListLocal(){
    if(localStorage.getItem('todolist')){
      let localList:TodoListData = JSON.parse(localStorage.getItem('todolist'));
      this.todoService.setItemsLabel(localList.label);
      localList.items.forEach(item=>{
        this.todoService.appendItems(item);
      });

      //Save the state in the history list
      this.todoService.saveListInHistory();  
    }
  }
  
  /**
   * Save the todolist in localstorage
   */
  saveTodoListLocal(){
    localStorage.setItem('todolist', JSON.stringify(this.data));
  }

  /**
   * Load the todolist from decoded qrcode
   * @param todolist 
   */
  loadTodoListQRCode(todolist:TodoListData){
    //Clear the current todolist
    this.todoService.removeAllItems();

    //Import the new one
    this.todoService.setItemsLabel(todolist.label);
    todolist.items.forEach(item=>{
      this.todoService.appendItems(item);
    });

    //Save the state in the history list
    this.todoService.saveListInHistory();
  }

  /**
   * Undo
   */
  undo(){
    this.todoService.undo();
  }

  /**
   * Redo
   */
  redo(){
    this.todoService.redo();
  }

  /**
   * Checks if user can undo
   * @returns boolean
   */
  canUndo():boolean{
    return this.todoService.canUndo();
  }

  /**
   * Checks if user can redo
   * @returns boolean
   */
  canRedo():boolean{
    return this.todoService.canRedo();
  }

  get label(): string {
    return this.data ? this.data.label : '';
  }

  get items(): TodoItemData[] {
    return this.data ? this.data.items : [];
  }

}
