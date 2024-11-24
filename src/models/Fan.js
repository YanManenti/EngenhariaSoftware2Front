
export class Fan {
     id;
     Airflow;
     Color;
     Name;
     Noise_Level;
     PWM;
     Rpm;
     Size;

     constructor(obj) {
          for(let key in obj) {
               this[key] = obj[key];
          }
     }
}
