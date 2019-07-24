import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { OpenVidu, Publisher, Session, StreamEvent, StreamManager, Subscriber } from 'openvidu-browser';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';


declare var cordova;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent implements OnDestroy {
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }



    //rootPage:any = OpenviduVideoAsistenciaComponent;

    constructor(private statusBar: StatusBar, private platform: Platform,/*private push: Push*/){

      this.statusBar.backgroundColorByHexString('#989aa2');
      this.statusBar.overlaysWebView(false);

        this.platform.ready().then(() => {

          //this.pushSetup()
       
          });
        
        
    }


/*
    pushSetup(){

      // to check if we have permission
      this.push.hasPermission()
        .then((res: any) => {
  
          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }
  
        });
  
      // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
      this.push.createChannel({
      id: "testchannel1",
      description: "My first test channel",
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 3
      }).then(() => console.log('Channel created'));
  
      // Delete a channel (Android O and above)
      this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
  
      // Return a list of currently configured channels
      this.push.listChannels().then((channels) => console.log('List of channels', channels))
  
      // to initialize push notifications
  
      const options: PushOptions = {
        android: {
          senderID:'1056846874683'
        },
        ios: {
            alert: 'true',
            badge: 'true',
            sound: 'true'
        },
        windows: {},
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
      }
  
      const pushObject: PushObject = this.push.init(options);
      //pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));                           
  
      pushObject.on('notification').subscribe((notification: any) => {
        
        //console.log('Notificacion recibida: '+JSON.stringify(notification))
        //alert('Notificacion recibida: '+JSON.stringify(notification))
        //alert('Titulo: '+JSON.stringify(notification.title+'\nMensaje: '+notification.message))
        localStorage.setItem("TitleNotification",notification.title)
        localStorage.setItem("MessageNotification",notification.message)            
  
        localStorage.setItem("NotificacionRecibida","1");
        console.log("Notificacion recibida, status: "+localStorage.getItem("NotificacionRecibida"))
        //this.varHome.imprimirSaludo();
        //HomePage.consultarHorariosBDremota2();
        
      });
  
      //pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
  
      pushObject.on('registration').subscribe((registration: any) =>{
        
        //Guardaremos el token del dispositivo para registrarlo en la BD junto con el ID del medico
        console.log('Device registered', JSON.stringify(registration));
        localStorage.setItem("phoneToken",registration.registrationId);
        //alert(localStorage.getItem("phoneToken"))
        console.log("Token de notificaciones push: "+localStorage.getItem("phoneToken"))
        //alert("ID DE REGISTRO XD: "+localStorage.getItem("phoneToken"));
      })  
      
  
      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  
  }
    
  */
  



}
