import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TopService {
  public API = environment.localhost ? 'http://localhost:8080/' : 'https://sts-duelist-metrics.herokuapp.com/';
  constructor(public http: HttpClient) {}
}
