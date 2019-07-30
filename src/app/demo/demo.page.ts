import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
})
export class DemoPage implements OnInit {

  mySessionId = '';
  myUserName = '';


  constructor(public navCtrl: NavController, private route: ActivatedRoute,) { 

    //Recibir parametros de la cita seleccionada del modal
    this.route.queryParams.subscribe(params => {

        this.mySessionId = params["session"];
        this.myUserName = params["user"];    
      
   });



  }

  ngOnInit() {

    //alert("Parametros recibidos:\n Usuario: "+this.myUserName+" Session: "+this.mySessionId)

   //Enviar parametros recibidos de la cita seleccionada hacia la videoasistencia
   let navigationExtras: NavigationExtras = {
    queryParams: {
        user: this.myUserName,
        session: this.mySessionId
      }
    };

    //alert("Parametros a enviar:\n "+this.myUserName+" Session: "+this.mySessionId)

    this.navCtrl.navigateForward(['/VideoAsistencia'], navigationExtras);
  

  }

 /* 
  returnLogin(){
    this.navCtrl.navigateForward('/Login')
  }

  goVideo(){
    this.navCtrl.navigateForward('/VideoAsistencia')
  }
  */
  
}
