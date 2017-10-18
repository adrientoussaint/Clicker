import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  score = 0;
  typehache = {"zero":
                {"power":0.001,
                "mat":"mousse",
                "price":0
                },
               "un":
                  {"power":0.05,
                   "mat":"bois",
                   "price":1
                  },
               "deux":
                  {"power":0.1,
                  "mat":"pierre",
                  "price":10
                  },
               "trois":
                  {"power":0.5,
                  "mat":"fer",
                  "price":50
                  }
              };
  diff = 0;
  hache = "zero";
  objectKeys = Object.keys;
  constructor(public navCtrl: NavController) {

  }
  clic(){
    this.score+=this.typehache[this.hache].power;
}
}

