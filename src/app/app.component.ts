import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TodoService} from './todo.service';
import {TodoListData} from './dataTypes/TodoListData';
import {TodoItemData} from './dataTypes/TodoItemData';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDrN9OrZ9U7ru-r6juygQ38OS-vmRdQkNY",
      authDomain: "todolist-78c74.firebaseapp.com",
      databaseURL: "https://todolist-78c74.firebaseio.com",
      projectId: "todolist-78c74",
      storageBucket: "todolist-78c74.appspot.com",
      messagingSenderId: "120059639977",
      appId: "1:120059639977:web:5b5f521ade8f3b93dd11b8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
