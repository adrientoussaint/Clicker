import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  score = 0;
  typepioche = {0:
                {"power":1,
                "mat":"mousse",
                "price":0,
                "pricebois":20000
                },
              1:
                  {"power":10,
                   "mat":"bois",
                   "price":50,
                   "pricebois":200000
                  },
              2:
                  {"power":100,
                  "mat":"pierre",
                  "price":1000,
                  "pricebois":2000000
                  },
              3:
                  {"power":1000,
                  "mat":"fer",
                  "price":10000,
                  "pricebois":3000000
                  },
              4:
                  {"power":10000,
                  "mat":"acier",
                  "price":1000000,
                  "pricebois":10000000
                  },
              5:
                  {"power":100000,
                  "mat":"uranium",
                  "price":1000000000000,
                  "pricebois":350000000000
                  }
              };
  diff = 0;
  pioche = -1;
  woods = 0;
  objectKeys = Object.keys;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private storage: Storage) {

  }
  
  ionViewDidEnter(){
    this.storage.get('rock').then((val) => {
      if(val!=null){
        this.score = val;
      }else{
        this.score = 0;
      }
    });    
    this.storage.get('wood').then((val) => {
      if(val!=null){
        this.woods = val;
      }else{
        this.woods = 0;
      }
    }); 
    this.storage.get('pioche').then((val) => {
      if(val!=null){
        this.pioche = val;
      }else{
        this.pioche = -1;
      }
    });       
  }
  ionViewDidLeave(){
    this.storage.set('wood',this.woods);
  }

  clic(){
    if(this.pioche!=-1){
      this.score+=this.typepioche[this.pioche].power;
      this.storage.set('rock', this.score);
    }  
  }

  pay(price:number,pricebois:number){
    if(this.score>=price && this.woods>=pricebois){
      this.score-=price;
      this.storage.set('rock', this.score);

      this.woods-=pricebois;
      this.storage.set('wood', this.woods);
      
      this.pioche +=1;
      this.storage.set('pioche', this.pioche);
    }else{
      let alert = this.alertCtrl.create({
        title:'Vous êtes trop pauvre !',
        subTitle:'Il vous manque '+(price-this.score)+' tas et '+(pricebois-this.woods)+' pour améliorer votre pioche...',
        buttons:['Je retourne farmer']
      });
      alert.present();
    }
  }
}