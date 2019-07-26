import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  returnLogin(){
    //alert("Fui presionado ")
    //console.log("Fui presionado ")
    this.navCtrl.navigateForward('/Login')
  }

  goVideo(){
    this.navCtrl.navigateForward('/VideoAsistencia')
  }
  
}
