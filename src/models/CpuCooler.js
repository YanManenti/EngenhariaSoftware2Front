
export class CpuCooler {
     id;
     Name;
     Manufacturer;
     Model;
     Color;
     Height;
     Fanless;
     CPU_Socket;
     Fan_RPM;
     Noise_Level;
     Part_Numero;
     Specs_Number;
     Water_Cooled;

     constructor(obj) {
          for(let key in obj) {
               this[key] = obj[key];
          }
     }
}
