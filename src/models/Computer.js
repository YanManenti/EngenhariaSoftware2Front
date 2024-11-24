import {Case} from "./Case";
import {Cpu} from "./Cpu";
import {CpuCooler} from "./CpuCooler";
import {Fan} from "./Fan";
import {Memory} from "./Memory";
import {PowerSupply} from "./PowerSupply";
import {ThermalPaste} from "./ThermalPaste";
import {Motherboard} from "./Motherboard";
import {Gpu} from "./Gpu";
import {Storage} from "./Storage";

export class Computer {
     case;
     cpu;
     cpucooler;
     fan;
     gpu;
     memory;
     motherboard;
     powersupply;
     storage;
     thermalpaste;
     constructor(obj) {
          for(let key in obj) {
               this[key] = obj[key];
          }
     }
}
