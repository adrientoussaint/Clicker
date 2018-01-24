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
  typehache = {0:
                {"power":1,
                "mat":"mousse",
                "price":0
                },
              1:
                  {"power":10,
                   "mat":"bois",
                   "price":50
                  },
              2:
                  {"power":100,
                  "mat":"pierre",
                  "price":1000
                  },
              3:
                  {"power":1000,
                  "mat":"fer",
                  "price":10000
                  },
              4:
                  {"power":10000,
                  "mat":"acier",
                  "price":1000000
                  },
              5:
                  {"power":100000,
                  "mat":"uranium",
                  "price":10000000
                  }
              };
  diff = 0;
  rocks = 0;
  hache = 0;
  objectKeys = Object.keys;
  constructor(public navCtrl: NavController,public statusBar: StatusBar, private alertCtrl: AlertController,private storage: Storage) {

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
  }

  clic(){
    this.score+=this.typehache[this.hache].power;
    this.storage.set('wood', this.score);
    
  }
  pay(price:number){
    if(this.score>=price){
      this.score-=price;
      this.storage.set('wood',this.score);

      this.hache +=1;
      this.storage.set('hache', this.hache);
    }else{
      let alert = this.alertCtrl.create({
        title:'Vous êtes trop pauvre !',
        subTitle:'Il vous manque '+(price-this.score)+' rondins pour améliorer votre hache...',
        buttons:['Je retourne farmer']
      });
      alert.present();
    }
  }
}

