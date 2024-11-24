
export class ThermalPaste {
      id;
      Name;
      Amount;

      constructor(obj) {
            for(let key in obj) {
                  this[key] = obj[key];
            }
      }
}
