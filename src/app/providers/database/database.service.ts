
import { Injectable, ɵConsole } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  contador:any = 0;
  private db: SQLiteObject;
  private isOpen: boolean;


  constructor(public storage: SQLite) { 
    console.log('Hello DatabaseProvider Provider');

    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "topmedic02.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS horarios (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha_consulta text, hora text, horb text, descripcion text, link_token text, tipo_servicio text, booking_id text,edad_paciente text,Sexo text,padecimiento text, nombre_completo_paciente text)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  /***********************************************************************************************************/
/***************************** Funciones para almacenar datos la primera vez *******************************/
/***********************************************************************************************************/
almacenarCitasEnBD(fecha_consulta: string, hora:string, horb:string, descripcion: string, link_token: string,tipo_servicio:string, booking_id:string, edad_paciente: string, Sexo:string, padecimiento: string,nombre_completo_paciente:string, numCitas:number ){
  console.log("Desde funcion de almacenamiento: \nFecha: "+fecha_consulta+" \nHora: "+hora+" "+" \nHora Fin: "+horb+" \nDescripcion: "+descripcion+" \nlink_token: "+link_token+"\ntipo_servicio: "+tipo_servicio+"booking_id: "+booking_id+" edad_paciente: "+edad_paciente+" Sexo: "+Sexo+" padecimiento: "+padecimiento+" nombre_completo_paciente: "+nombre_completo_paciente)

  return new Promise ((resolve, reject) => {
                                
    let sql = "INSERT INTO horarios (fecha_consulta, hora, horb, descripcion, link_token,tipo_servicio,booking_id,edad_paciente,Sexo,padecimiento,nombre_completo_paciente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    this.db.executeSql(sql, [fecha_consulta, hora, horb, descripcion, link_token,tipo_servicio, booking_id, edad_paciente, Sexo, padecimiento, nombre_completo_paciente]).then((data) =>{
    //Aqui iba el resolve  
      //alert("Duda: "+data)
      //console.log("Duda CONVERTIDA: "+JSON.stringify(data))
    }, (error) => {
      alert("Insert db function: "+JSON.stringify(error))
      reject(error);
    });
    this.contador++; 
    resolve(this.contador);   
    
    if(this.contador == numCitas){
      //alert("Contador local: "+this.contador+" \nParametro: "+numCitas)        
      //alert("Se reiniciara el contador a 0")
      this.contador = 0;
    }else{
      
    }
//      resolve(this.contador);     
  });
}
 
obtenerCitas(){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("SELECT * FROM horarios", []).then((data) => {
      //alert("Numero de filas de consulta: "+data.rows.length)
      let arrayUsers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          arrayUsers.push({
            id: data.rows.item(i).id,
            fecha_consulta: data.rows.item(i).fecha_consulta,
            hora: data.rows.item(i).hora,
            horb: data.rows.item(i).horb,
            descripcion: data.rows.item(i).descripcion,
          });            
        }          
      }
      //alert("Desde obtenerCitas() en el provider: "+JSON.stringify(arrayUsers))
      resolve(arrayUsers);
    }, (error) => {
      console.log("Error al obtener citas!!: "+error)
      alert(JSON.stringify(error))
      reject(error);
    })
  })
}



/***********************************************************************************************************/
/********************************** Obtener todos los campos de la cita seleccionada ***********************/
/***********************************************************************************************************/
obtenerCamposCitaSeleccionada(fechaCitaSeleccionada,horaInicioCitaSeleccionada,horaFinCitaSeleccionada){
return new Promise ((resolve, reject) => {
  //fecha_consulta text, hora text, horb text, descripcion text, link_token text
  let query = "SELECT * FROM horarios WHERE fecha_consulta = ? AND hora = ? AND horb = ? ";
  //alert(query)
    this.db.executeSql(query, [fechaCitaSeleccionada,horaInicioCitaSeleccionada,horaFinCitaSeleccionada]).then((data) => {
      
    //this.db.executeSql("SELECT * FROM horarios", []).then((data) => {
    //alert("Numero de filas de consulta: "+data.rows.length)
    let arrayCamposCitaSeleccionada = [];
    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
        arrayCamposCitaSeleccionada.push({
          id: data.rows.item(i).id,
          fecha_consulta: data.rows.item(i).fecha_consulta,
          hora: data.rows.item(i).hora,
          horb: data.rows.item(i).horb,
          descripcion: data.rows.item(i).descripcion,
          link_token: data.rows.item(i).link_token,
          tipo_servicio:data.rows.item(i).tipo_servicio,
          booking_id: data.rows.item(i).booking_id,
          edad_paciente: data.rows.item(i).edad_paciente,
          Sexo: data.rows.item(i).Sexo,
          padecimiento: data.rows.item(i).padecimiento,
          nombre_completo_paciente: data.rows.item(i).nombre_completo_paciente
        });            
      }          
    }
//      alert(JSON.stringify(arrayUsers))
    resolve(arrayCamposCitaSeleccionada);
  }, (error) => {
//      alert(JSON.stringify(error))
    reject(error);
  })
})
}
/***********************************************************************************************************/
/***********************************************************************************************************/
limpiarTabla(){
  return new Promise ((resolve, reject) => {
    this.db.executeSql("DELETE FROM horarios", []).then((data) => {
      let arrayUsers = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          arrayUsers.push({
            id: data.rows.item(i).id,
            fecha_consulta: data.rows.item(i).fecha_consulta,
            hora: data.rows.item(i).hora,
            horb: data.rows.item(i).horb,
            descripcion: data.rows.item(i).descripcion,
            link_token: data.rows.item(i).link_token,
            tipo_servicio:data.rows.item(i).tipo_servicio,
            booking_id: data.rows.item(i).booking_id,
            edad_paciente: data.rows.item(i).edad_paciente,
            Sexo: data.rows.item(i).Sexo,
            padecimiento: data.rows.item(i).padecimiento,
            nombre_completo_paciente: data.rows.item(i).nombre_completo_paciente
          });            
        }          
      }
      resolve(arrayUsers);
    }, (error) => {
      alert(error)
      console.log(error)
      reject(error);
    })
  })
}
/***********************************************************************************************************/
/***********************************************************************************************************/  

/***********************************************************************************************************/
/***********************************************************************************************************/


}
