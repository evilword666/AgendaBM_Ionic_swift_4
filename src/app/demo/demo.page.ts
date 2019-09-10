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

  fecha_consulta= '';
  hora_inicio= '';
  hora_fin= '';
  detalles_cita= '';
  tipo_servicio= '';
  link_token_original= '';
  booking_id= '';
  edad_paciente= '';
  Sexo= '';
  padecimiento= '';
  nombre_completo_paciente= '';

  constructor(public navCtrl: NavController, private route: ActivatedRoute,) { 

    //Recibir parametros de la cita seleccionada del modal
    //Llegan bien los datos  desde Modal
    this.route.queryParams.subscribe(params => {

        this.mySessionId = params["session"];
        this.myUserName = params["user"];  
        
        

        this.fecha_consulta = params["fecha_consulta"];
        this.hora_inicio =  params["hora_inicio"];
        this.hora_fin = params["hora_fin"];
        this.detalles_cita = params["detalles_cita"];
        this.tipo_servicio = params["tipo_servicio"];
        this.link_token_original = params["link_token_original"];
        this.booking_id = params["booking_id"];
        this.edad_paciente = params["edad_paciente"];
        this.Sexo = params["Sexo"];
        this.padecimiento = params["padecimiento"];
        this.nombre_completo_paciente = params["nombre_completo_paciente"];

      
   });



  }

  ngOnInit() {

    //alert("Parametros recibidos:\n Usuario: "+this.myUserName+" Session: "+this.mySessionId)
/*    
let parametrosDemoClass = {
  user: this.myUserName,
  session: this.mySessionId,



  fecha_consulta:this.fecha_consulta,
  hora_inicio: this.hora_inicio,
  hora_fin:this.hora_fin,
  detalles_cita:this.detalles_cita,
  tipo_servicio:this.tipo_servicio,
  link_token_original:this.link_token_original,
  booking_id:this.booking_id,
  edad_paciente:this.edad_paciente,
  Sexo:this.Sexo,
  padecimiento:this.padecimiento,
  nombre_completo_paciente:this.nombre_completo_paciente

}

alert("Datos a enviar de Demo a Videoasistencia: \n"+JSON.stringify(parametrosDemoClass))
*/
   //Enviar parametros recibidos de la cita seleccionada hacia la videoasistencia
   let navigationExtras: NavigationExtras = {
    queryParams: {
        user: this.myUserName,
        session: this.mySessionId,



        fecha_consulta:this.fecha_consulta,
        hora_inicio: this.hora_inicio,
        hora_fin:this.hora_fin,
        detalles_cita:this.detalles_cita,
        tipo_servicio:this.tipo_servicio,
        link_token_original:this.link_token_original,
        booking_id:this.booking_id,
        edad_paciente:this.edad_paciente,
        Sexo:this.Sexo,
        padecimiento:this.padecimiento,
        nombre_completo_paciente:this.nombre_completo_paciente
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
