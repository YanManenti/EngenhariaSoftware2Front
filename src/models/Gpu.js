export class Gpu {
     id;
     Name;
     Manufacturer;
     Chipset;
     Memory;
     Interface;
     Color;
     Length;
     TDP;
     Cooling;
     Boost_Clock;
     Case_Expansion_Slot_Width;
     Core_Clock;
     DVIprivate_D_Dual_Link_Outputs;
     DisplayPort_1;
     DisplayPort_2;
     DisplayPort_Outputs;
     Effective_Memory_Clock;
     External_Power;
     Frame_Sync;
     HDMI_2;
     HDMI_Outputs;
     Memory_Type;
     Part_Numero;
     SLI_CrossFire;
     Total_Slot_Width;

    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key];
        }
    }
}
