
export class Storage {
    id;
    Name;
    Manufacturer;
    Capacity;
    Type;
    Cache;
    Interface;
    NVME;
    Form_Factor;
    Part_Numero;

    constructor(obj) {
        for(let key in obj) {
            this[key] = obj[key];
        }
    }
}
