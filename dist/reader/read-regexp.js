'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readRegExp;

var _readtable = require('readtable');

var _tokens = require('../tokens');

var _utils = require('./utils');

function readRegExp(stream) {
  let value = stream.readString(),
      char = stream.peek(),
      idx = 0,
      classMarker = false,
      terminated = false;

  const UNTERMINATED_REGEXP_MSG = 'Invalid regular expression: missing /';

  while (!(0, _readtable.isEOS)(char)) {
    if (char === '\\') {
      value += char;
      ++idx;
      char = stream.peek(idx);

      if ((0, _utils.isLineTerminator)(char.charCodeAt(0))) {
        throw this.createError(UNTERMINATED_REGEXP_MSG);
      }
      value += char;
      ++idx;
    } else if ((0, _utils.isLineTerminator)(char.charCodeAt(0))) {
      throw this.createError(UNTERMINATED_REGEXP_MSG);
    } else {
      if (classMarker) {
        if (char === ']') {
          classMarker = false;
        }
      } else {
        if (char === '/') {
          terminated = true;
          value += char;
          ++idx;
          char = stream.peek(idx);
          break;
        } else if (char === '[') {
          classMarker = true;
        }
      }
      value += char;
      ++idx;
    }
    char = stream.peek(idx);
  }

  if (!terminated) {
    throw this.createError(UNTERMINATED_REGEXP_MSG);
  }

  while (!(0, _readtable.isEOS)(char)) {
    if (char === '\\') {
      throw this.createError('Invalid regular expression flags');
    }
    if (!(0, _utils.isIdentifierPart)(char.charCodeAt(0))) {
      break;
    }
    value += char;
    ++idx;
    char = stream.peek(idx);
  }

  stream.readString(idx);

  return new _tokens.RegExpToken({
    value
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZWFkZXIvcmVhZC1yZWdleHAuanMiXSwibmFtZXMiOlsicmVhZFJlZ0V4cCIsInN0cmVhbSIsInZhbHVlIiwicmVhZFN0cmluZyIsImNoYXIiLCJwZWVrIiwiaWR4IiwiY2xhc3NNYXJrZXIiLCJ0ZXJtaW5hdGVkIiwiVU5URVJNSU5BVEVEX1JFR0VYUF9NU0ciLCJjaGFyQ29kZUF0IiwiY3JlYXRlRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQU93QkEsVTs7QUFKeEI7O0FBQ0E7O0FBQ0E7O0FBRWUsU0FBU0EsVUFBVCxDQUFvQkMsTUFBcEIsRUFBd0M7QUFDckQsTUFBSUMsUUFBUUQsT0FBT0UsVUFBUCxFQUFaO0FBQUEsTUFBaUNDLE9BQU9ILE9BQU9JLElBQVAsRUFBeEM7QUFBQSxNQUF1REMsTUFBTSxDQUE3RDtBQUFBLE1BQWdFQyxjQUFjLEtBQTlFO0FBQUEsTUFBcUZDLGFBQWEsS0FBbEc7O0FBRUEsUUFBTUMsMEJBQTBCLHVDQUFoQzs7QUFFQSxTQUFPLENBQUMsc0JBQU1MLElBQU4sQ0FBUixFQUFxQjtBQUNuQixRQUFJQSxTQUFTLElBQWIsRUFBbUI7QUFDakJGLGVBQVNFLElBQVQ7QUFDQSxRQUFFRSxHQUFGO0FBQ0FGLGFBQU9ILE9BQU9JLElBQVAsQ0FBWUMsR0FBWixDQUFQOztBQUVBLFVBQUksNkJBQWlCRixLQUFLTSxVQUFMLENBQWdCLENBQWhCLENBQWpCLENBQUosRUFBMEM7QUFDeEMsY0FBTSxLQUFLQyxXQUFMLENBQWlCRix1QkFBakIsQ0FBTjtBQUNEO0FBQ0RQLGVBQVNFLElBQVQ7QUFDQSxRQUFFRSxHQUFGO0FBQ0QsS0FWRCxNQVVPLElBQUksNkJBQWlCRixLQUFLTSxVQUFMLENBQWdCLENBQWhCLENBQWpCLENBQUosRUFBMEM7QUFDL0MsWUFBTSxLQUFLQyxXQUFMLENBQWlCRix1QkFBakIsQ0FBTjtBQUNELEtBRk0sTUFFQTtBQUNMLFVBQUlGLFdBQUosRUFBaUI7QUFDZixZQUFJSCxTQUFTLEdBQWIsRUFBa0I7QUFDaEJHLHdCQUFjLEtBQWQ7QUFDRDtBQUNGLE9BSkQsTUFJTztBQUNMLFlBQUlILFNBQVMsR0FBYixFQUFrQjtBQUNoQkksdUJBQWEsSUFBYjtBQUNBTixtQkFBU0UsSUFBVDtBQUNBLFlBQUVFLEdBQUY7QUFDQUYsaUJBQU9ILE9BQU9JLElBQVAsQ0FBWUMsR0FBWixDQUFQO0FBQ0E7QUFDRCxTQU5ELE1BTU8sSUFBSUYsU0FBUyxHQUFiLEVBQWtCO0FBQ3ZCRyx3QkFBYyxJQUFkO0FBQ0Q7QUFDRjtBQUNETCxlQUFTRSxJQUFUO0FBQ0EsUUFBRUUsR0FBRjtBQUNEO0FBQ0RGLFdBQU9ILE9BQU9JLElBQVAsQ0FBWUMsR0FBWixDQUFQO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDRSxVQUFMLEVBQWlCO0FBQ2YsVUFBTSxLQUFLRyxXQUFMLENBQWlCRix1QkFBakIsQ0FBTjtBQUNEOztBQUVELFNBQU8sQ0FBQyxzQkFBTUwsSUFBTixDQUFSLEVBQXFCO0FBQ25CLFFBQUlBLFNBQVMsSUFBYixFQUFtQjtBQUNqQixZQUFNLEtBQUtPLFdBQUwsQ0FBaUIsa0NBQWpCLENBQU47QUFDRDtBQUNELFFBQUksQ0FBQyw2QkFBaUJQLEtBQUtNLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBakIsQ0FBTCxFQUEyQztBQUN6QztBQUNEO0FBQ0RSLGFBQVNFLElBQVQ7QUFDQSxNQUFFRSxHQUFGO0FBQ0FGLFdBQU9ILE9BQU9JLElBQVAsQ0FBWUMsR0FBWixDQUFQO0FBQ0Q7O0FBRURMLFNBQU9FLFVBQVAsQ0FBa0JHLEdBQWxCOztBQUVBLFNBQU8sd0JBQWdCO0FBQ3JCSjtBQURxQixHQUFoQixDQUFQO0FBR0QiLCJmaWxlIjoicmVhZC1yZWdleHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuaW1wb3J0IHR5cGUgeyBDaGFyU3RyZWFtIH0gZnJvbSAncmVhZHRhYmxlJztcblxuaW1wb3J0IHsgaXNFT1MgfSBmcm9tICdyZWFkdGFibGUnO1xuaW1wb3J0IHsgUmVnRXhwVG9rZW4gfSBmcm9tICcuLi90b2tlbnMnO1xuaW1wb3J0IHsgaXNMaW5lVGVybWluYXRvciwgaXNJZGVudGlmaWVyUGFydCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWFkUmVnRXhwKHN0cmVhbTogQ2hhclN0cmVhbSkge1xuICBsZXQgdmFsdWUgPSBzdHJlYW0ucmVhZFN0cmluZygpLCBjaGFyID0gc3RyZWFtLnBlZWsoKSwgaWR4ID0gMCwgY2xhc3NNYXJrZXIgPSBmYWxzZSwgdGVybWluYXRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0IFVOVEVSTUlOQVRFRF9SRUdFWFBfTVNHID0gJ0ludmFsaWQgcmVndWxhciBleHByZXNzaW9uOiBtaXNzaW5nIC8nO1xuXG4gIHdoaWxlICghaXNFT1MoY2hhcikpIHtcbiAgICBpZiAoY2hhciA9PT0gJ1xcXFwnKSB7XG4gICAgICB2YWx1ZSArPSBjaGFyO1xuICAgICAgKytpZHg7XG4gICAgICBjaGFyID0gc3RyZWFtLnBlZWsoaWR4KTtcblxuICAgICAgaWYgKGlzTGluZVRlcm1pbmF0b3IoY2hhci5jaGFyQ29kZUF0KDApKSkge1xuICAgICAgICB0aHJvdyB0aGlzLmNyZWF0ZUVycm9yKFVOVEVSTUlOQVRFRF9SRUdFWFBfTVNHKTtcbiAgICAgIH1cbiAgICAgIHZhbHVlICs9IGNoYXI7XG4gICAgICArK2lkeDtcbiAgICB9IGVsc2UgaWYgKGlzTGluZVRlcm1pbmF0b3IoY2hhci5jaGFyQ29kZUF0KDApKSkge1xuICAgICAgdGhyb3cgdGhpcy5jcmVhdGVFcnJvcihVTlRFUk1JTkFURURfUkVHRVhQX01TRyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjbGFzc01hcmtlcikge1xuICAgICAgICBpZiAoY2hhciA9PT0gJ10nKSB7XG4gICAgICAgICAgY2xhc3NNYXJrZXIgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNoYXIgPT09ICcvJykge1xuICAgICAgICAgIHRlcm1pbmF0ZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlICs9IGNoYXI7XG4gICAgICAgICAgKytpZHg7XG4gICAgICAgICAgY2hhciA9IHN0cmVhbS5wZWVrKGlkeCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gJ1snKSB7XG4gICAgICAgICAgY2xhc3NNYXJrZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YWx1ZSArPSBjaGFyO1xuICAgICAgKytpZHg7XG4gICAgfVxuICAgIGNoYXIgPSBzdHJlYW0ucGVlayhpZHgpO1xuICB9XG5cbiAgaWYgKCF0ZXJtaW5hdGVkKSB7XG4gICAgdGhyb3cgdGhpcy5jcmVhdGVFcnJvcihVTlRFUk1JTkFURURfUkVHRVhQX01TRyk7XG4gIH1cblxuICB3aGlsZSAoIWlzRU9TKGNoYXIpKSB7XG4gICAgaWYgKGNoYXIgPT09ICdcXFxcJykge1xuICAgICAgdGhyb3cgdGhpcy5jcmVhdGVFcnJvcignSW52YWxpZCByZWd1bGFyIGV4cHJlc3Npb24gZmxhZ3MnKTtcbiAgICB9XG4gICAgaWYgKCFpc0lkZW50aWZpZXJQYXJ0KGNoYXIuY2hhckNvZGVBdCgwKSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2YWx1ZSArPSBjaGFyO1xuICAgICsraWR4O1xuICAgIGNoYXIgPSBzdHJlYW0ucGVlayhpZHgpO1xuICB9XG5cbiAgc3RyZWFtLnJlYWRTdHJpbmcoaWR4KTtcblxuICByZXR1cm4gbmV3IFJlZ0V4cFRva2VuKHtcbiAgICB2YWx1ZVxuICB9KTtcbn1cbiJdfQ==