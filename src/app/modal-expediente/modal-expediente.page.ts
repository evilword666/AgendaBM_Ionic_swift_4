import { Component, OnInit, Inject, Input } from '@angular/core';
import {Http, Headers } from '@angular/http';
import { AlertController,NavParams,ModalController,LoadingController,Platform,NavController} from '@ionic/angular';

import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-modal-expediente',
  templateUrl: './modal-expediente.page.html',
  styleUrls: ['./modal-expediente.page.scss'],
})
export class ModalExpedientePage implements OnInit {

    
  @Input() value: any;

  statusEliminarCita:boolean = false;
  statusmostrarBotonVideoAsistenia:boolean=false;
  statusBtnExp:boolean=false;
  data:any = {};
  fecha_consulta: String;
  hora_inicio:String;
  hora_fin:String;
  detalles_cita:any;
  tipo_servicio:any;
  link_token:any;
  checkRango:any;

  booking_id:any;
  edad_paciente:any;
  Sexo:any;
  padecimiento:any;
  nombre_completo_paciente:any;

  //constructor() { }
  constructor( private modalCtrl:ModalController, private navParams: NavParams, private http:Http, public alertController: AlertController, /*private datePicker: DatePicker,*/public plt: Platform, public navCtrl: NavController, /*@Inject(NavParams) private navParams: NavParams*/) {

    this.http = http;  
    this.data.hora_inicio = '';
    this.data.hora_fin = '';    
    this.data.detalles_cita = '';    
    this.data.tipo_servicio = '';  
    this.data.link_token_original = ''; 
    this.data.link_token = '';   
    this.data.fecha_consulta = '';
    this.data.checkRango = '';

    this.data.booking_id='';
    this.data.edad_paciente='';;
    this.data.Sexo='';;
    this.data.padecimiento='';;
    this.data.nombre_completo_paciente='';

    localStorage.setItem("statusEliminarCita","false");
  }

  ngOnInit() {

    
    const data = this.navParams.get('datos');   
    //alert(JSON.stringify(data))
    console.log("En el modal: "+JSON.stringify(data))

    //alert("En el modal-expediente: "+JSON.stringify(data))
    //console.log("En el modal: "+JSON.stringify(data))
    this.data.fecha_consulta = data.fecha_consulta;
    this.data.hora_inicio = data.hora_inicio;
    this.data.hora_fin  = data.hora_fin;
    this.data.detalles_cita = data.detalles_cita;
    this.data.tipo_servicio = data.tipo_servicio;
    this.data.link_token_original = data.link_token;  
    this.data.booking_id=data.booking_id;
    this.data.edad_paciente=data.edad_paciente;
    this.data.Sexo=data.Sexo;
    this.data.padecimiento=data.padecimiento;
    this.data.nombre_completo_paciente=data.nombre_completo_paciente;

    //alert(this.checkRango)

    this.statusmostrarBotonVideoAsistenia = (this.checkRango && (this.data.tipo_servicio == "video_consulta"))
    //alert("ResComp: "+this.statusmostrarBotonVideoAsistenia)
  }

  async eliminarCitaAler() {
    const alert = await this.alertController.create({
      header: 'Cancelar cita',
      message: 'Realmente desea cancelar esta cita de su agenda?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('No se realiza ninguna accion');
            //this.retrocederPagina()
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Confirm Okay');
            this.eliminarCitaDB()
            //this.view.dismiss();
            this.modalCtrl.dismiss();
            
          }
        }
      ]
    });

    await alert.present();
  }


  eliminarCitaDB(){
    //var link = 'https://topmedic.com.mx/accessDatabase/wp_DB/service/recibirDatos.php';            
    var link = 'https://vid.botonmedico.com/wp_DB/service/recibirDatos.php';    
    //var link = 'http://exp.botonmedico.com/wp_DB/service/recibirDatos.php';    
    var credentials = JSON.stringify({booking_key_delete : this.data.link_token_original});
    
    try {
    

    this.http.post(link, credentials)                  
    .subscribe(data => {
      

      this.data.response = data["_body"]; 

      var resp = JSON.parse(this.data.response);
      //alert(resp['id'])
      //alert(resp['response'])
      
          if(resp['response'] == "200"){
 
            this.statusEliminarCita = true; 

            //alert("statusEliminarCita: "+this.statusEliminarCita)

            localStorage.setItem("statusEliminarCita",this.statusEliminarCita+"")
          //alert( localStorage.getItem("statusEliminarCita") )
          console.log("Datos de regreso localstorage en el modal: "+localStorage.getItem("statusEliminarCita"));
            //this.closeModal(true)
            
            this.exitoEliminacionCita(); 
            

          }else{
            //this.closeModal(false)
            this.errorEliminacionCita();               
            //this.exitoLogin();
          }
      }, error => {
        console.log("Oooops!");
        alert("No se pudieron enviar los datos\nIntentelo mas tarde");          
      });

    } catch (error) {
      alert("Hay un error en el servidor")
    }
  }

  
  async exitoEliminacionCita(){
    const alert = await this.alertController.create({
      header: 'Cita cancelada',
      message: '<center>La cita ha sido cancelada exitosamente</center>',
      buttons: ['Aceptar']
    });
    //alert.present();
    await alert.present();    
  }


  async errorEliminacionCita(){
    let alert = await this.alertController.create({
      header: '<center><h4>Error</h4></center>',
      message: '<center>No se ha podido cancelar la cita</center>',
      buttons: ['Aceptar']
    });
    await alert.present();
  }


retrocederPagina(){
  this.navCtrl.pop();
}

async closeModal(){
  await this.modalCtrl.dismiss({
    "eliminado":this.statusEliminarCita
  })
}

editarCampos(){
  this.statusBtnExp=true;
}

aceptarCambiosExpediente(){
  this.statusBtnExp=false;
}

cancelarCambiosExpedeinte(){
  this.statusBtnExp=false;
}

verConsulta(){
  localStorage.setItem("linkAbierto","1")
  window.open('https://vid.botonmedico.com/expediente/#/pacientes/subSecuente', '_system', 'location=yes');

}

verEndoscopio(){

}

verEstetoscopio(){

}

verECG(){
  localStorage.setItem("linkAbierto","1")
  window.open('https://vid.botonmedico.com/expediente/#/monitoreo_ecg', '_system', 'location=yes');  
}

verTeleLab(){  
}


}
