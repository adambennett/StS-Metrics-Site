import { Component } from '@angular/core';
import {TopService} from "./services/topservice/top.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'frontend';
  characters: Array<any>;
  constructor(private topService: TopService) {
    this.topService.getCharacters().subscribe(data => {
      this.characters = data;
    });
  }

}


