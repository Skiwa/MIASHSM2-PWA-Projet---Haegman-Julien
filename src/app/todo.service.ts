import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: []} );  //Todolist
  private todoListHistory:TodoListData[] = [];  //States array of the todolist
  public undoCount:number=0;  //Nb of times user has clicked on undo

  constructor() {}

  /**
   * Returns the list as an Observable
   * @returns Observable
   */
  getTodoListDataObserver(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  /**
  * @param  {string} label
  * @param  {TodoItemData[]} ...items
  */
  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone}) )
    });
  }

  /**
   * @param  {boolean} isDone
   * @param  {TodoItemData[]} ...items
   */
  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone}) )
    });
  }
  
  /**
   * @param  {TodoItemData[]} ...items
   */
  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: [...tdl.items, ...items]
    });
  }
  
  /**
   * @param  {TodoItemData[]} ...items
   */
  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
  }

  /**
   * Remove every item of the list
   */
  removeAllItems(){
    this.todoListSubject.getValue().items.forEach(item=>{
      this.removeItems(item);
    });
  }  

  /**
   * undo
   */
  undo(){
    //Checks if there is an history first
    if(this.todoListHistory.length !== 0){

      //Clears the list
      this.removeAllItems();

      //Retrieves the corresponding history state and restores it
      this.todoListHistory[this.todoListHistory.length-2-this.undoCount].items.forEach((item)=>{
          this.appendItems(item);
      });

      //Increments the undoCount
      this.undoCount++;
    }
  }

  /**
   * redo
   */
  redo(){
    //Check if user has done an undo first
    if(this.undoCount>0){
      //Decrements the count
      this.undoCount--;

      //Clears the list
      this.removeAllItems();

      //Retrieves the corresponding history state and restores it
      this.todoListHistory[this.todoListHistory.length-1-this.undoCount].items.forEach((item)=>{
        this.appendItems(item);
      });
    }    
  }

  
  /**
   * Checks if user can undo
   * @returns boolean
   */
  canUndo():boolean{
    return this.todoListHistory.length-this.undoCount>2;
  }

  /**
   * Checks if user can redo
   * @returns boolean
   */
  canRedo():boolean{
    return this.undoCount>0;
  }

  /**
   * Clear the corresponding states when user overwrites undoed actions 
   */
  clearHistory(){
    for(let i=0; i<this.undoCount;i++){
      this.todoListHistory.pop();
    }
    this.undoCount = 0;
  }

  /**
   * Save state in history
   */
  saveListInHistory(){ 
    //Removes unwanted undoed actions
    this.clearHistory();
    //Save the state
    this.todoListHistory.push(this.todoListSubject.getValue());
  }
}
