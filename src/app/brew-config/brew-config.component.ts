import { Component, OnInit } from '@angular/core';
import { BrewConfigService } from './brew-config.service';

@Component({
  selector: 'app-brew-config',
  templateUrl: './brew-config.component.html',
  styleUrls: ['./brew-config.component.css']
})
export class BrewConfigComponent implements OnInit {

  constructor(public configService: BrewConfigService) { }

  ngOnInit() {
  }

}
