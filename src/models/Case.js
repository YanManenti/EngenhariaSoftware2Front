
export class Case {
     id;
     Name;
     Manufacturer;
     Type;
     Color;
     Dimensions;
     Volume;
     Drive_Bays;
     Expansion_Slots;
     Front_Panel_USB;
     Maximum_Video_Card_Length;
     Motherboard_Form_Factor;
     Part_Numero;
     Power_Supply;
     Power_Supply_Shroud;
     Side_Panel;
     constructor(obj) {
          for(let key in obj) {
               this[key] = obj[key];
          }
     }
}
