import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {InfoService} from '../../../services/info-service/info.service';
import {LookupCard} from '../../../models/LookupCard';

@Component({
  selector: 'app-card-lookup',
  templateUrl: './card-lookup.component.html',
  styleUrls: ['./card-lookup.component.scss']
})
export class CardLookupComponent implements OnInit {

  sub: Subscription;
  cardData: LookupCard;
  card: string;
  deprecatedCards: string[] = ['theDuelist:MiniPolymerization', 'theDuelist:CrystalEmeraldTortoise'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private infoService: InfoService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
     this.card = params.card;
      this.infoService.lookupCard(this.card).subscribe(data => {
        this.cardData = data;
        const newText = this.cardData.newLineText.replace(/ NL /gi, '\n');
        const next = newText.replace(/\*/gi, '');
        this.cardData.newLineText = next.replace(/\. /gi, '. \n');
      });
    });
  }


}
