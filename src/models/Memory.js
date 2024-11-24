
export class Memory {
     id;
     Name;
     Manufacturer;
     Speed;
     Modules;
     Color;
     Voltage;
     Timing;
     CAS_Latency;
     ECC_Registered;
     First_Word_Latency;
     Form_Factor;
     Heat_Spreader;
     Part_Numero;
     Specs_Number;

     constructor(obj) {
          for(let key in obj) {
               this[key] = obj[key];
          }
     }
}
