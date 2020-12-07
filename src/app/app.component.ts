import { Component, OnInit } from '@angular/core';
import * as xml2js from 'xml2js';
import {HttpClient, HttpHeaders} from '@angular/common/http';

export interface Wine  {
  name: string;
  img: string;
  price: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'aspose-wine';
  wines: Wine[] = [];
  storedWines: Wine[] = [];
  searchValue = '';
  isOpened = false;
  public xmlItems: any;
  constructor(private http: HttpClient) { this.loadXML(); }
  loadXML = () => {
    this.http.get('/assets/wines.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers',
          'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then((res: any) => {
            this.storedWines = res;
          });
      });
  }

  parseXML = (data: string) => {
    return new Promise(resolve => {
      const arr: Wine[] = [];
      const parser = new xml2js.Parser({ strict: false, trim: true });
      parser.parseString(data, (err: any, result: any) => {
        const { WINE } = result.WINES;
        for (const item of WINE) {
          arr.push({
            name: item.NAME[0],
            img: item.IMG[0],
            price: item.PRICE[0]
          });
        }
        resolve(arr);
      });
    });
  }

  keyUp = (e: any) => {
    const { value } = e.target;
    this.searchValue = value || '';
  }

  handleSearch = (e: any) => {
    e.preventDefault();
    this.wines = this.storedWines.filter((wine: Wine) => wine.name.toLowerCase().includes(this.searchValue.toLowerCase()));
  }
  openAside = () => {
    this.isOpened = !this.isOpened;
  }
}
