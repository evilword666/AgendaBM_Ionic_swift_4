import { Component, OnInit, Inject, Input } from '@angular/core';
import {Http, Headers } from '@angular/http';
import { AlertController,NavParams,ModalController,LoadingController,Platform,NavController} from '@ionic/angular';

import { NavigationExtras } from '@angular/router';

//import { DatePicker } from '@onic-native/date-picker/ngx';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() value: any;

  statusEliminarCita:boolean = false;
  statusmostrarBotonVideoAsistenia:boolean=false;
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

    //alert("En el modal: "+JSON.stringify(data))
    //console.log("En el modal: "+JSON.stringify(data))
    this.data.fecha_consulta = data.fecha_consulta;
    this.data.hora_inicio = data.hora;
    this.data.hora_fin  = data.horb;
    this.data.detalles_cita = data.descripcion;
    this.data.tipo_servicio = data.tipo_servicio;
    this.data.link_token = "https://topmeddr.com:3005/"+data.link_token+"/d";
    this.data.link_token_original = data.link_token;  

    this.data.booking_id=data.booking_id;
    this.data.edad_paciente=data.edad_paciente;
    this.data.Sexo=data.Sexo;
    this.data.padecimiento=data.padecimiento;
    this.data.nombre_completo_paciente=data.nombre_completo_paciente;
    this.checkRango = this.verificarRangoDeFechasPorCita(this.data.fecha_consulta,this.data.hora_inicio,this.data.hora_fin)
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

  verificarRangoDeFechasPorCita(fecha,startHour,endHour){


    var startTime;
    var endTime;
    
     //Formato de la base de datos de Saul
    startTime = fecha+" "+startHour;
    endTime = fecha+" "+endHour; 
    
    var fechaHoy = new Date();
    //Para android
    let inicio = new Date(startTime);
    let fin = new Date(endTime);
    
    //Para iOS tenemos que modificar el formato de fecha
    var startTimeMOD = startTime;
    var stm = new Date(startTimeMOD.replace(/-/g, '/'));

    var endTimeMOD = endTime;
    var stmf = new Date(endTimeMOD.replace(/-/g, '/'));

    if (this.plt.is('ios')) {
  
      if (fechaHoy >= stm && fechaHoy <= stmf) {
        console.log("Esta dentro del rango");
        return true;
      } 
      else {
        console.log("La videoasistencia no puede realizarse");
        return false;
      }

    }else if (this.plt.is('android')) {
  
      if (fechaHoy >= inicio && fechaHoy <= fin) {
        console.log("Esta dentro del rango");
        return true;
      } 
      else {
        console.log("La videoasistencia no puede realizarse");
        return false;
      }
    }
  }

  iniciarVideoconferencia(){    
    //alert(this.data.link_token )
    //this.iab.create(this.data.link_token,'_system');    
    //alert("Entrando a la funcion para redirigir a la videoconferencia")

  /*
    setTimeout(() => {
      this.modalCtrl.dismiss()
    }, 500);
  */

    this.modalCtrl.dismiss()




    let navigationExtras: NavigationExtras = {
      queryParams: {
          user: window.localStorage.getItem("nombre_doctor"),
          session: this.data.link_token_original
      }
  };
  //this.navCtrl.navigateForward(['/VideoAsistencia'], navigationExtras);

  if (this.plt.is('ios')) {
  
    this.navCtrl.navigateForward(['/Demo'], navigationExtras);

  }else if (this.plt.is('android')) {

//    this.navCtrl.navigateForward(['/VideoAsistencia'], navigationExtras);
    this.navCtrl.navigateForward(['/Demo'], navigationExtras);

  }


    
  }

  eliminarCita(){
    //alert("Entrando a eliminar la cita")
    this.eliminarCitaAler()

  }
/*
  reasignarCita(){
    //this.navCtrl.push(ModificarCitaPage); 

    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(date => {
      alert("Su cita ha sido reasignada")
      this.retrocederPagina()
    },
      err => {
        alert('Ha ocurrido un error al tratar de reasignar su cita '+ err)
      }
    );
}
*/

retrocederPagina(){
  this.navCtrl.pop();
}

async closeModal(){
  await this.modalCtrl.dismiss({
    "eliminado":this.statusEliminarCita
  })
}

}
