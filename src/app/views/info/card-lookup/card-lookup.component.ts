import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {InfoService} from '../../../services/info-service/info.service';
import {LookupCard} from '../../../models/LookupCard';
import {GeneralUtil} from '../../../utils/Utilities';
import {InfoLookup} from '../../../utils/InfoLookup';

@Component({
  selector: 'app-card-lookup',
  templateUrl: './card-lookup.component.html',
  styleUrls: ['./card-lookup.component.scss']
})
export class CardLookupComponent implements OnInit {

  sub: Subscription;
  cardData: LookupCard;
  getImageFromS3 = InfoLookup.getImageFromS3;
  card: string = '';
  deprecatedCards: string[] = ['theDuelist:MiniPolymerization', 'theDuelist:CrystalEmeraldTortoise'];
  imageName: string = '';
  upgradeImageName: string = '';
  upgradeImageNames: string[] = [];
  counter: number = 0;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private infoService: InfoService) { }

  ngOnInit(): void {
    GeneralUtil.setPageTitle('Card Lookup');
    this.sub = this.route.params.subscribe(params => {
     this.card = params.card;
     if (this.card.startsWith('theDuelist:')) {
       this.imageName = 'theDuelist-' + this.card.substring(11);
     } else {
       this.imageName = this.card;
     }
      this.infoService.lookupCard(this.card).subscribe(data => {
        this.cardData = data;
        this.fillUpgradeImages();
        const newText = this.cardData.newLineText.replace(/ NL /gi, '\n');
        const next = newText.replace(/\*/gi, '');
        this.cardData.newLineText = next.replace(/\. /gi, '. \n');
      });
    });
  }

  incCounter(inc: number): void {
    this.counter += inc;
  }

  hideImage(): void {
    document.getElementById('image-preview-solo').style.display = 'none';
    document.getElementById('image-preview-double').style.display = 'none';
    document.getElementById('image-plus-preview').style.display = 'none';
  }

  fillUpgradeImages(): void {
    if (this.imageName) {
      const upgrades = this.cardData.maxUpgrades;
      if (upgrades && upgrades !== -1) {
        for (let i = 1; i < upgrades + 1; i++) {
          this.upgradeImageNames.push(this.imageName + 'Plus' + i.toString());
        }
      }
    }
  }

}
