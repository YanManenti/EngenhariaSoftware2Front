
export class Cpu {
     id;
     Name;
     Manufacturer;
     Series;
     Microarchitecture;
     Socket;
     TDP;
     Packaging;
     Lithography;
     Core_Count;
     Core_Family;
     ECC_Support;
     Includes_CPU_Cooler;
     Integrated_Graphics;
     L2_Cache;
     L3_Cache;
     Maximum_Supported_Memory;
     Part_Numero;
     Performance_Core_Boost_Clock;
     Performance_Core_Clock;
     Simultaneous_Multithreading;
     constructor(obj) {
          for(let key in obj) {
               this[key] = obj[key];
          }
     }
}

