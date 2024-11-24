
export class Motherboard {
     id;
     Name;
     Manufacturer;
     Chipset;
     Color;
     M;
     Form_Factor;
     Half_Mini_PCIe_Slots;
     Memory_Max;
     Memory_Slots;
     Memory_Speed;
     Memory_Type;
     Mini_PCI_mSATA_Slots;
     Mini_PCIe_Slots;
     Onboard_Ethernet;
     Onboard_Video;
     PCI_Slots;
     PCIe_x16_Slots;
     PCIe_x1_Slots;
     PCIe_x4_Slots;
     PCIe_x8_Slots;
     Part_Numero;
     RAID_Support;
     SATA_6;
     Socket_CPU;
     Supports_ECC;
     USB_2;
     USB_3;
     Wireless_Networking;
     mSATA_Slots;

     constructor(obj) {
          for(let key in obj) {
               this[key] = obj[key];
          }
     }
}