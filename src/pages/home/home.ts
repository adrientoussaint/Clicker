import { Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  score = 0;
  rocks = 0;
  hache = 0;
  task = 0;
  objectKeys = Object.keys;
  typehache = {0:
                {"power":1,
                "mat":"mousse",
                "price":0,
                "item":"hache"
                },
              1:
                  {"power":10,
                   "mat":"bois",
                   "price":50,
                   "item":"hache"
                  },
              2:
                  {"power":100,
                  "mat":"pierre",
                  "price":1000,
                  "item":"hache"
                  },
              3:
                  {"power":1000,
                  "mat":"fer",
                  "price":10000,
                  "item":"hache"
                  },
              4:
                  {"power":10000,
                  "mat":"acier",
                  "price":1000000,
                  "item":"hache"
                  },
              5:
                  {"power":100000,
                  "mat":"uranium",
                  "price":10000000,
                  "item":"hache"
                  }
              };
 
              outilbois={0:
                {"power":0.01,
                "price":15,
                "name":"Tronçonneuse électrique",
                "item":"outil",
                "quantite":0
                },1:
                {"power":0.1,
                "price":35,
                "name":"Tronçonneuse à essence",
                "item":"outil",
                "quantite":0
                }
              };
  constructor(public navCtrl: NavController,public statusBar: StatusBar, private alertCtrl: AlertController,private storage: Storage) {

  }
  
  autoincrement(val:number){
    this.score+=val;
    this.storage.set("wood",this.score);
  }

  ionViewDidLoad(){
    this.task = setInterval( () => {
      for(let outil in this.outilbois){
        this.autoincrement(this.outilbois[outil].power*this.outilbois[outil].quantite);
      }
    }, 1000); 
  }

  ionViewDidLeave(){
    this.task = setInterval( () => {
      for(let outil in this.outilbois){
        this.autoincrement(this.outilbois[outil].power*this.outilbois[outil].quantite);
      }
    }, 1000); 
  }

  ionViewDidEnter(){
    this.storage.get('wood').then((val) => {
      if(val!=null){
        this.score = val;
      }else{
        this.score = 0;
      }
    }); 
    this.storage.get('rock').then((val) => {
      if(val!=null){
        this.rocks = val;
      }else{
        this.rocks = 0;
      }
    });
    this.storage.get('hache').then((val) => {
      if(val!=null){
        this.hache = val;
      }else{
        this.hache = 0;
      }
    });
    for(let outil in this.outilbois){
      this.storage.get('outil'+outil).then((val) => {
        if(val!=null){
          this.outilbois[outil].quantite = val;
        }else{
          this.outilbois[outil].quantite  = 0;
        }
      });
    }
   
  }

  clic(){
    this.score+=(this.typehache[this.hache].power*1.15);
    this.storage.set('wood', this.score);
  }

  pay(price:number,typeachat:string){
    if(this.score>=price){
      this.score-=price;
      this.storage.set('wood',this.score);
      if(typeachat=="hache"){
        this.hache +=1;
        this.storage.set('hache', this.hache);  
      }else{
        this.outilbois[typeachat].quantite+=1;
        this.storage.set('outil'+typeachat, this.outilbois[typeachat].quantite);
      }
      }else{
      let alert = this.alertCtrl.create({
        title:'Vous êtes trop pauvre !',
        subTitle:'Il vous manque '+(price-this.score)+' rondins pour acheter cette amélioration...',
        buttons:['Je retourne farmer']
      });
      alert.present();
    }
  }
 
}

