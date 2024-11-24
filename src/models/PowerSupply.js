
export class PowerSupply {
     id;
     Name;
     Manufacturer;
     Model;
     Type;
     Wattage;
     Length;
     Modular;
     Color;
     Fanless;
     ATX_4Pin_Connectors;
     EPS_8Pin_Connectors;
     Efficiency_Rating;
     Molex_4Pin_Connectors;
     PCIe_12Pin_Connectors;
     PCIe_12_4Pin_12VHPWR_Connectors;
     PCIe_6Pin_Connectors;
     PCIe_6_2Pin_Connectors;
     PCIe_8Pin_Connectors;
     Part_Numero;
     SATA_Connectors;
     Specs_Number;

     constructor(obj) {
          for(let key in obj) {
               this[key] = obj[key];
          }
     }
}
