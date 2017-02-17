"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Store extends Map {
  constructor(backingObject) {
    super();
    this.backingObject = backingObject;
  }

  set(key, val) {
    super.set(key, val);
    this.backingObject[key] = val;
  }

  getBackingObject() {
    return this.backingObject;
  }
}
exports.default = Store;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdG9yZS5qcyJdLCJuYW1lcyI6WyJTdG9yZSIsIk1hcCIsImNvbnN0cnVjdG9yIiwiYmFja2luZ09iamVjdCIsInNldCIsImtleSIsInZhbCIsImdldEJhY2tpbmdPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQWUsTUFBTUEsS0FBTixTQUFvQkMsR0FBcEIsQ0FBd0I7QUFDckNDLGNBQVlDLGFBQVosRUFBMkI7QUFDekI7QUFDQSxTQUFLQSxhQUFMLEdBQXFCQSxhQUFyQjtBQUNEOztBQUVEQyxNQUFJQyxHQUFKLEVBQVNDLEdBQVQsRUFBYztBQUNaLFVBQU1GLEdBQU4sQ0FBVUMsR0FBVixFQUFlQyxHQUFmO0FBQ0EsU0FBS0gsYUFBTCxDQUFtQkUsR0FBbkIsSUFBMEJDLEdBQTFCO0FBQ0Q7O0FBRURDLHFCQUFtQjtBQUNqQixXQUFPLEtBQUtKLGFBQVo7QUFDRDtBQWJvQztrQkFBbEJILEsiLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZSBleHRlbmRzIE1hcCB7XG4gIGNvbnN0cnVjdG9yKGJhY2tpbmdPYmplY3QpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuYmFja2luZ09iamVjdCA9IGJhY2tpbmdPYmplY3Q7XG4gIH1cblxuICBzZXQoa2V5LCB2YWwpIHtcbiAgICBzdXBlci5zZXQoa2V5LCB2YWwpO1xuICAgIHRoaXMuYmFja2luZ09iamVjdFtrZXldID0gdmFsO1xuICB9XG5cbiAgZ2V0QmFja2luZ09iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5iYWNraW5nT2JqZWN0O1xuICB9XG59XG4iXX0=