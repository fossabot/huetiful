var huetiful = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb4, mod2) => function() {
    return mod2 || (0, cb4[__getOwnPropNames(cb4)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: !0 });
  }, __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function")
      for (let key of __getOwnPropNames(from))
        !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: !0 }) : target,
    mod2
  )), __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod2);

  // node_modules/ciebase-ts/lib/helpers.js
  var require_helpers = __commonJS({
    "node_modules/ciebase-ts/lib/helpers.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      exports.xyCoodinateToXYZTuple = function(_a) {
        var x = _a.x, y = _a.y;
        return [
          // X
          100 * (x / y),
          // Y
          100,
          // Z
          100 * (1 - x - y) / y
        ];
      };
      exports.sign = function(n3) {
        return isNaN(n3) ? NaN : n3 > 0 ? 1 : n3 < 0 ? -1 : 0;
      };
      exports.helpers = { xyCoodinateToXYZTuple: exports.xyCoodinateToXYZTuple, sign: exports.sign };
    }
  });

  // node_modules/ciebase-ts/lib/illuminant.js
  var require_illuminant = __commonJS({
    "node_modules/ciebase-ts/lib/illuminant.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var helpers_1 = require_helpers();
      exports.coordinates = {
        A: { x: 0.44758, y: 0.40745 },
        C: { x: 0.31006, y: 0.31616 },
        D50: { x: 0.34567, y: 0.35851 },
        D55: { x: 0.33243, y: 0.34744 },
        D65: { x: 0.31272, y: 0.32903 },
        D75: { x: 0.29903, y: 0.31488 }
      };
      exports.illuminants = {
        A: helpers_1.xyCoodinateToXYZTuple(exports.coordinates.A),
        C: helpers_1.xyCoodinateToXYZTuple(exports.coordinates.C),
        D50: helpers_1.xyCoodinateToXYZTuple(exports.coordinates.D50),
        D55: helpers_1.xyCoodinateToXYZTuple(exports.coordinates.D55),
        D65: helpers_1.xyCoodinateToXYZTuple(exports.coordinates.D65),
        D75: helpers_1.xyCoodinateToXYZTuple(exports.coordinates.D75)
      };
    }
  });

  // node_modules/ciebase-ts/lib/workspace.js
  var require_workspace = __commonJS({
    "node_modules/ciebase-ts/lib/workspace.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var helpers_1 = require_helpers(), abs4 = Math.abs, pow2 = Math.pow;
      exports.sRgbGamma = {
        decode: function(v) {
          return v <= 0.04045 ? v / 12.92 : pow2((v + 0.055) / 1.055, 2.4);
        },
        encode: function(v) {
          return v <= 31308e-7 ? 12.92 * v : 1.055 * pow2(v, 1 / 2.4) - 0.055;
        }
      };
      exports.proPhotoGamma = {
        decode: function(v) {
          return v < 16 * 1953125e-9 ? v / 16 : pow2(v, 1.8);
        },
        encode: function(v) {
          return v < 1953125e-9 ? 16 * v : pow2(v, 1 / 1.8);
        }
      };
      exports.simpleGamma = function(g) {
        return {
          decode: function(v) {
            return helpers_1.sign(v) * pow2(abs4(v), g);
          },
          encode: function(v) {
            return helpers_1.sign(v) * pow2(abs4(v), 1 / g);
          }
        };
      };
      exports.workspaces = {
        sRGB: {
          r: { x: 0.64, y: 0.33 },
          g: { x: 0.3, y: 0.6 },
          b: { x: 0.15, y: 0.06 },
          gamma: exports.sRgbGamma
        },
        AdobeRGB: {
          r: { x: 0.64, y: 0.33 },
          g: { x: 0.21, y: 0.71 },
          b: { x: 0.15, y: 0.06 },
          gamma: exports.simpleGamma(2.2)
        },
        WideGamutRGB: {
          r: { x: 0.7347, y: 0.2653 },
          g: { x: 0.1152, y: 0.8264 },
          b: { x: 0.1566, y: 0.0177 },
          gamma: exports.simpleGamma(563 / 256)
        },
        ProPhotoRGB: {
          r: { x: 0.7347, y: 0.2653 },
          g: { x: 0.1596, y: 0.8404 },
          b: { x: 0.0366, y: 1e-4 },
          gamma: exports.proPhotoGamma
        }
      };
    }
  });

  // node_modules/ciebase-ts/lib/matrix.js
  var require_matrix = __commonJS({
    "node_modules/ciebase-ts/lib/matrix.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var transpose = function(M2) {
        return [
          [M2[0][0], M2[1][0], M2[2][0]],
          [M2[0][1], M2[1][1], M2[2][1]],
          [M2[0][2], M2[1][2], M2[2][2]]
        ];
      }, determinant = function(M2) {
        return M2[0][0] * (M2[2][2] * M2[1][1] - M2[2][1] * M2[1][2]) + M2[1][0] * (M2[2][1] * M2[0][2] - M2[2][2] * M2[0][1]) + M2[2][0] * (M2[1][2] * M2[0][1] - M2[1][1] * M2[0][2]);
      }, inverse = function(M2) {
        var c4 = 1 / determinant(M2);
        return [
          [(M2[2][2] * M2[1][1] - M2[2][1] * M2[1][2]) * c4, (M2[2][1] * M2[0][2] - M2[2][2] * M2[0][1]) * c4, (M2[1][2] * M2[0][1] - M2[1][1] * M2[0][2]) * c4],
          [(M2[2][0] * M2[1][2] - M2[2][2] * M2[1][0]) * c4, (M2[2][2] * M2[0][0] - M2[2][0] * M2[0][2]) * c4, (M2[1][0] * M2[0][2] - M2[1][2] * M2[0][0]) * c4],
          [(M2[2][1] * M2[1][0] - M2[2][0] * M2[1][1]) * c4, (M2[2][0] * M2[0][1] - M2[2][1] * M2[0][0]) * c4, (M2[1][1] * M2[0][0] - M2[1][0] * M2[0][1]) * c4]
        ];
      }, multiply = function(M2, v) {
        return [
          M2[0][0] * v[0] + M2[0][1] * v[1] + M2[0][2] * v[2],
          M2[1][0] * v[0] + M2[1][1] * v[1] + M2[1][2] * v[2],
          M2[2][0] * v[0] + M2[2][1] * v[1] + M2[2][2] * v[2]
        ];
      }, scalar = function(M2, v) {
        return [
          [M2[0][0] * v[0], M2[0][1] * v[1], M2[0][2] * v[2]],
          [M2[1][0] * v[0], M2[1][1] * v[1], M2[1][2] * v[2]],
          [M2[2][0] * v[0], M2[2][1] * v[1], M2[2][2] * v[2]]
        ];
      }, product = function(M2, N) {
        return [
          [M2[0][0] * N[0][0] + M2[0][1] * N[1][0] + M2[0][2] * N[2][0], M2[0][0] * N[0][1] + M2[0][1] * N[1][1] + M2[0][2] * N[2][1], M2[0][0] * N[0][2] + M2[0][1] * N[1][2] + M2[0][2] * N[2][2]],
          [M2[1][0] * N[0][0] + M2[1][1] * N[1][0] + M2[1][2] * N[2][0], M2[1][0] * N[0][1] + M2[1][1] * N[1][1] + M2[1][2] * N[2][1], M2[1][0] * N[0][2] + M2[1][1] * N[1][2] + M2[1][2] * N[2][2]],
          [M2[2][0] * N[0][0] + M2[2][1] * N[1][0] + M2[2][2] * N[2][0], M2[2][0] * N[0][1] + M2[2][1] * N[1][1] + M2[2][2] * N[2][1], M2[2][0] * N[0][2] + M2[2][1] * N[1][2] + M2[2][2] * N[2][2]]
        ];
      };
      exports.matrix = {
        determinant,
        inverse,
        multiply,
        product,
        scalar,
        transpose
      };
    }
  });

  // node_modules/ciebase-ts/lib/xyz.js
  var require_xyz = __commonJS({
    "node_modules/ciebase-ts/lib/xyz.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var illuminant_1 = require_illuminant(), matrix_1 = require_matrix(), workspace_1 = require_workspace();
      function Converter(rgbSpace, whitePoint) {
        rgbSpace === void 0 && (rgbSpace = workspace_1.workspaces.sRGB), whitePoint === void 0 && (whitePoint = illuminant_1.illuminants.D65);
        var primaries = [rgbSpace.r, rgbSpace.g, rgbSpace.b], M_P = matrix_1.matrix.transpose(primaries.map(function(_a) {
          var x = _a.x, y = _a.y;
          return [
            // X
            x / y,
            // Y
            1,
            // Z
            (1 - x - y) / y
          ];
        })), gamma5 = rgbSpace.gamma, M_S = matrix_1.matrix.multiply(matrix_1.matrix.inverse(M_P), whitePoint), M_RGB_XYZ = matrix_1.matrix.scalar(M_P, M_S), M_XYZ_RGB = matrix_1.matrix.inverse(M_RGB_XYZ);
        return {
          fromRgb: function(RGB) {
            return matrix_1.matrix.multiply(M_RGB_XYZ, RGB.map(gamma5.decode));
          },
          toRgb: function(XYZ) {
            return matrix_1.matrix.multiply(M_XYZ_RGB, XYZ).map(gamma5.encode);
          }
        };
      }
      exports.Converter = Converter;
    }
  });

  // node_modules/ciebase-ts/lib/degree.js
  var require_degree = __commonJS({
    "node_modules/ciebase-ts/lib/degree.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var PI = Math.PI;
      function fromRadian(r2) {
        for (var d = r2 * 180 / PI; d < 0; )
          d += 360;
        for (; d > 360; )
          d -= 360;
        return d;
      }
      exports.fromRadian = fromRadian;
      function toRadian(d) {
        for (var r2 = PI * d / 180; r2 < 0; )
          r2 += 2 * PI;
        for (; r2 > 2 * PI; )
          r2 -= 2 * PI;
        return r2;
      }
      exports.toRadian = toRadian;
      exports.degree = { fromRadian, toRadian };
    }
  });

  // node_modules/ciebase-ts/lib/rgb.js
  var require_rgb = __commonJS({
    "node_modules/ciebase-ts/lib/rgb.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var round2 = Math.round;
      function fromHex(hex2) {
        return hex2[0] === "#" && (hex2 = hex2.slice(1)), hex2.length < 6 && (hex2 = hex2.split("").map(function(v) {
          return v + v;
        }).join("")), hex2.match(/../g).map(function(v) {
          return parseInt(v, 16) / 255;
        });
      }
      exports.fromHex = fromHex;
      function toHex2(RGB) {
        var hex2 = RGB.map(function(v) {
          var vString = round2(255 * v).toString(16);
          return vString.length < 2 ? "0" + vString : vString;
        }).join("");
        return "#" + hex2;
      }
      exports.toHex = toHex2;
      exports.rgb = { fromHex, toHex: toHex2 };
    }
  });

  // node_modules/ciebase-ts/lib/index.js
  var require_lib = __commonJS({
    "node_modules/ciebase-ts/lib/index.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var illuminant_1 = require_illuminant();
      exports.illuminant = illuminant_1.illuminants;
      var workspace_1 = require_workspace();
      exports.workspace = workspace_1.workspaces;
      var xyz_1 = require_xyz();
      exports.xyz = xyz_1.Converter;
      var degree_1 = require_degree();
      exports.degree = degree_1.degree;
      var matrix_1 = require_matrix();
      exports.matrix = matrix_1.matrix;
      var rgb_1 = require_rgb();
      exports.rgb = rgb_1.rgb;
      var helpers_1 = require_helpers();
      exports.helpers = helpers_1.helpers;
    }
  });

  // node_modules/ciecam02-ts/lib/helpers.js
  var require_helpers2 = __commonJS({
    "node_modules/ciecam02-ts/lib/helpers.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var abs4 = Math.abs, pow2 = Math.pow, sqrt = Math.sqrt;
      function corLerp(a, b, t, cor) {
        var m = cor === "h" ? 360 : cor === "H" ? 400 : void 0;
        if (m) {
          var d = abs4(a - b);
          d > m / 2 && (a > b ? b += m : a += m);
        }
        return ((1 - t) * a + t * b) % (m || 1 / 0);
      }
      exports.corLerp = corLerp;
      function lerp2(start, end, t) {
        for (var res = {}, _i2 = 0, _a = Object.keys(start); _i2 < _a.length; _i2++) {
          var cor = _a[_i2];
          res[cor] = corLerp(start[cor], end[cor], t, cor);
        }
        return res;
      }
      exports.lerp = lerp2;
      function distance(start, end) {
        for (var d = 0, _i2 = 0, _a = Object.keys(start); _i2 < _a.length; _i2++) {
          var cor = _a[_i2];
          d += pow2(start[cor] - end[cor], 2);
        }
        return sqrt(d);
      }
      exports.distance = distance;
      function cfs2(str) {
        var res = {};
        return str.split("").forEach(function(key) {
          res[key] = !0;
        }), res;
      }
      exports.cfs = cfs2;
    }
  });

  // node_modules/ciecam02-ts/lib/hq.js
  var require_hq = __commonJS({
    "node_modules/ciecam02-ts/lib/hq.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var helpers_1 = require_helpers2(), floor2 = Math.floor, uniqueHues = [
        { s: "R", h: 20.14, e: 0.8, H: 0 },
        { s: "Y", h: 90, e: 0.7, H: 100 },
        { s: "G", h: 164.25, e: 1, H: 200 },
        { s: "B", h: 237.53, e: 1.2, H: 300 },
        { s: "R", h: 380.14, e: 0.8, H: 400 }
      ], hueSymbols = uniqueHues.map(function(v) {
        return v.s;
      }).slice(0, -1).join("");
      function fromHue(h) {
        h < uniqueHues[0].h && (h += 360);
        for (var j = 0; uniqueHues[j + 1].h < h; )
          j++;
        var d_j = (h - uniqueHues[j].h) / uniqueHues[j].e, d_k = (uniqueHues[j + 1].h - h) / uniqueHues[j + 1].e, H_j = uniqueHues[j].H;
        return H_j + 100 * d_j / (d_j + d_k);
      }
      exports.fromHue = fromHue;
      function toHue(H) {
        var j = floor2(H / 100), amt = H % 100, _a = uniqueHues.slice(j, j + 2), _b = _a[0], e_j = _b.e, h_j = _b.h, _c = _a[1], e_k = _c.e, h_k = _c.h, h = (amt * (e_k * h_j - e_j * h_k) - 100 * h_j * e_k) / (amt * (e_k - e_j) - 100 * e_k);
        return h;
      }
      exports.toHue = toHue;
      var shortcuts = {
        O: "RY",
        S: "YG",
        T: "G25B",
        C: "GB",
        A: "B25G",
        V: "B25R",
        M: "BR",
        P: "R25B"
      };
      function fromNotation(N) {
        var a = N.match(/^([a-z])(?:(.+)?([a-z]))?$/i), H1 = a[1], P = a[2] || "50", H2 = a[3] || H1, extractHue = function(v) {
          v = v.toUpperCase();
          var sc = shortcuts[v];
          return sc ? fromNotation(sc) : 100 * hueSymbols.indexOf(v);
        }, nH1 = extractHue(H1), nH2 = extractHue(H2), nP = parseFloat(P) / 100;
        return helpers_1.corLerp(nH1, nH2, nP, "H");
      }
      exports.fromNotation = fromNotation;
      function toNotation(H) {
        var _a, i = floor2(H / 100), j = (i + 1) % hueSymbols.length, p4 = H - i * 100;
        return p4 > 50 && (_a = [j, i], i = _a[0], j = _a[1], p4 = 100 - p4), p4 < 1 ? hueSymbols[i] : hueSymbols[i] + p4.toFixed() + hueSymbols[j];
      }
      exports.toNotation = toNotation;
      exports.default = {
        fromHue,
        toHue,
        fromNotation,
        toNotation
      };
    }
  });

  // node_modules/ciecam02-ts/lib/cam.js
  var require_cam = __commonJS({
    "node_modules/ciecam02-ts/lib/cam.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || Object.assign || function(t) {
        for (var s, i = 1, n3 = arguments.length; i < n3; i++) {
          s = arguments[i];
          for (var p4 in s)
            Object.prototype.hasOwnProperty.call(s, p4) && (t[p4] = s[p4]);
        }
        return t;
      };
      exports.__esModule = !0;
      var ciebase_ts_1 = require_lib(), sign = ciebase_ts_1.helpers.sign, helpers_1 = require_helpers2(), hq = require_hq(), pow2 = Math.pow, sqrt = Math.sqrt, exp = Math.exp, abs4 = Math.abs, sin = Math.sin, cos = Math.cos, atan2 = Math.atan2, surrounds = {
        average: { F: 1, c: 0.69, N_c: 1 },
        dim: { F: 0.9, c: 0.59, N_c: 0.9 },
        // tslint:disable-next-line:object-literal-sort-keys
        dark: { F: 0.8, c: 0.535, N_c: 0.8 }
      }, M_CAT02 = [
        [0.7328, 0.4296, -0.1624],
        [-0.7036, 1.6975, 61e-4],
        [3e-3, 0.0136, 0.9834]
      ], M_HPE = [
        [0.38971, 0.68898, -0.07868],
        [-0.22981, 1.1834, 0.04641],
        [0, 0, 1]
      ], XYZ_to_CAT02 = M_CAT02, CAT02_to_XYZ = ciebase_ts_1.matrix.inverse(M_CAT02), CAT02_to_HPE = ciebase_ts_1.matrix.product(M_HPE, ciebase_ts_1.matrix.inverse(M_CAT02)), HPE_to_CAT02 = ciebase_ts_1.matrix.product(M_CAT02, ciebase_ts_1.matrix.inverse(M_HPE)), defaultViewingConditions = {
        adaptingLuminance: 40,
        backgroundLuminance: 20,
        discounting: !1,
        surroundType: "average",
        whitePoint: ciebase_ts_1.illuminant.D65
      }, defaultCorrelates = helpers_1.cfs("QJMCshH"), vitalCorrelates = helpers_1.cfs("JCh");
      function Converter(viewingConditions, correlates) {
        viewingConditions === void 0 && (viewingConditions = {}), correlates === void 0 && (correlates = defaultCorrelates), viewingConditions = __assign({}, defaultViewingConditions, viewingConditions);
        var XYZ_w = viewingConditions.whitePoint, L_A = viewingConditions.adaptingLuminance, Y_b = viewingConditions.backgroundLuminance, _a = surrounds[viewingConditions.surroundType], F = _a.F, c4 = _a.c, N_c = _a.N_c, Y_w = XYZ_w[1], k4 = 1 / (5 * L_A + 1), F_L = 0.2 * pow2(k4, 4) * 5 * L_A + 0.1 * pow2(1 - pow2(k4, 4), 2) * pow2(5 * L_A, 1 / 3), n3 = Y_b / Y_w, N_bb = 0.725 * pow2(1 / n3, 0.2), N_cb = N_bb, z = 1.48 + sqrt(n3), D = viewingConditions.discounting ? 1 : F * (1 - 1 / 3.6 * exp(-(L_A + 42) / 92)), RGB_w = ciebase_ts_1.matrix.multiply(M_CAT02, XYZ_w), _b = RGB_w.map(function(v) {
          return D * Y_w / v + 1 - D;
        }), D_R = _b[0], D_G = _b[1], D_B = _b[2], RGB_cw = correspondingColors(XYZ_w), RGB_aw = adaptedResponses(RGB_cw), A_w = achromaticResponse(RGB_aw);
        function correspondingColors(XYZ) {
          var _a2 = ciebase_ts_1.matrix.multiply(XYZ_to_CAT02, XYZ), R = _a2[0], G = _a2[1], B = _a2[2];
          return [D_R * R, D_G * G, D_B * B];
        }
        function reverseCorrespondingColors(RGB_c) {
          var R_c = RGB_c[0], G_c = RGB_c[1], B_c = RGB_c[2];
          return ciebase_ts_1.matrix.multiply(CAT02_to_XYZ, [R_c / D_R, G_c / D_G, B_c / D_B]);
        }
        function adaptedResponses(RGB_c) {
          return ciebase_ts_1.matrix.multiply(CAT02_to_HPE, RGB_c).map(function(v) {
            var x = pow2(F_L * abs4(v) / 100, 0.42);
            return sign(v) * 400 * x / (27.13 + x) + 0.1;
          });
        }
        function reverseAdaptedResponses(RGB_a) {
          return ciebase_ts_1.matrix.multiply(HPE_to_CAT02, RGB_a.map(function(v) {
            var x = v - 0.1;
            return sign(x) * 100 / F_L * pow2(27.13 * abs4(x) / (400 - abs4(x)), 1 / 0.42);
          }));
        }
        function achromaticResponse(RGB_a) {
          var R_a = RGB_a[0], G_a = RGB_a[1], B_a = RGB_a[2];
          return (R_a * 2 + G_a + B_a / 20 - 0.305) * N_bb;
        }
        function brightness(J) {
          return 4 / c4 * sqrt(J / 100) * (A_w + 4) * pow2(F_L, 0.25);
        }
        function lightness2(Q) {
          return 6.25 * pow2(c4 * Q / ((A_w + 4) * pow2(F_L, 0.25)), 2);
        }
        function colorfulness(C) {
          return C * pow2(F_L, 0.25);
        }
        function chromaFromSaturationBrightness(s, Q) {
          return pow2(s / 100, 2) * Q / pow2(F_L, 0.25);
        }
        function chromaFromColorfulness(M2) {
          return M2 / pow2(F_L, 0.25);
        }
        function saturation(M2, Q) {
          return 100 * sqrt(M2 / Q);
        }
        function fillOut(someCorrelates, inputs) {
          var J = inputs.J, C = inputs.C, s = inputs.s, h = inputs.h, H = inputs.H, M2 = inputs.M, Q = inputs.Q, outputs = {};
          return someCorrelates.J && (outputs.J = isNaN(J) ? lightness2(Q) : J), someCorrelates.C && (isNaN(C) ? isNaN(M2) ? (Q = isNaN(Q) ? brightness(J) : Q, outputs.C = chromaFromSaturationBrightness(s, Q)) : outputs.C = chromaFromColorfulness(M2) : outputs.C = inputs.C), someCorrelates.h && (outputs.h = isNaN(h) ? hq.toHue(H) : h), someCorrelates.Q && (outputs.Q = isNaN(Q) ? brightness(J) : Q), someCorrelates.M && (outputs.M = isNaN(M2) ? colorfulness(C) : M2), someCorrelates.s && (isNaN(s) ? (Q = isNaN(Q) ? brightness(J) : Q, M2 = isNaN(M2) ? colorfulness(C) : M2, outputs.s = saturation(M2, Q)) : outputs.s = s), someCorrelates.H && (outputs.H = isNaN(H) ? hq.fromHue(h) : H), outputs;
        }
        function fromXyz(XYZ) {
          var RGB_c = correspondingColors(XYZ), RGB_a = adaptedResponses(RGB_c), R_a = RGB_a[0], G_a = RGB_a[1], B_a = RGB_a[2], a = R_a - G_a * 12 / 11 + B_a / 11, b = (R_a + G_a - 2 * B_a) / 9, h_rad = atan2(b, a), h = ciebase_ts_1.degree.fromRadian(h_rad), e_t = 1 / 4 * (cos(h_rad + 2) + 3.8), A = achromaticResponse(RGB_a), J = 100 * pow2(A / A_w, c4 * z), t = 5e4 / 13 * N_c * N_cb * e_t * sqrt(a * a + b * b) / (R_a + G_a + 21 / 20 * B_a), C = pow2(t, 0.9) * sqrt(J / 100) * pow2(1.64 - pow2(0.29, n3), 0.73);
          return fillOut(correlates, { J, C, h });
        }
        function toXyz(CAM) {
          var _a2 = fillOut(vitalCorrelates, CAM), J = _a2.J, C = _a2.C, h = _a2.h, h_rad = ciebase_ts_1.degree.toRadian(h), t = pow2(C / (sqrt(J / 100) * pow2(1.64 - pow2(0.29, n3), 0.73)), 10 / 9), e_t = 1 / 4 * (cos(h_rad + 2) + 3.8), A = A_w * pow2(J / 100, 1 / c4 / z), p_1 = 5e4 / 13 * N_c * N_cb * e_t / t, p_2 = A / N_bb + 0.305, q_1 = p_2 * 61 / 20 * 460 / 1403, q_2 = 61 / 20 * 220 / 1403, q_3 = 21 / 20 * 6300 / 1403 - 27 / 1403, sin_h = sin(h_rad), cos_h = cos(h_rad), a, b;
          t === 0 || isNaN(t) ? a = b = 0 : abs4(sin_h) >= abs4(cos_h) ? (b = q_1 / (p_1 / sin_h + q_2 * cos_h / sin_h + q_3), a = b * cos_h / sin_h) : (a = q_1 / (p_1 / cos_h + q_2 + q_3 * sin_h / cos_h), b = a * sin_h / cos_h);
          var RGB_a = [
            20 / 61 * p_2 + 451 / 1403 * a + 288 / 1403 * b,
            20 / 61 * p_2 - 891 / 1403 * a - 261 / 1403 * b,
            20 / 61 * p_2 - 220 / 1403 * a - 6300 / 1403 * b
          ], RGB_c = reverseAdaptedResponses(RGB_a), XYZ = reverseCorrespondingColors(RGB_c);
          return XYZ;
        }
        return { fromXyz, toXyz, fillOut };
      }
      exports.default = Converter;
    }
  });

  // node_modules/ciecam02-ts/lib/gamut.js
  var require_gamut = __commonJS({
    "node_modules/ciecam02-ts/lib/gamut.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var ciebase_ts_1 = require_lib(), helpers_1 = require_helpers2();
      function Gamut(xyz2, cam2, epsilon) {
        epsilon === void 0 && (epsilon = 1e-6);
        var ZERO = -epsilon, ONE = 1 + epsilon, min3 = Math.min, max2 = Math.max, _a = ["000", "fff"].map(function(hex2) {
          return cam2.fromXyz(xyz2.fromRgb(ciebase_ts_1.rgb.fromHex(hex2)));
        }), camBlack = _a[0], camWhite = _a[1];
        function contains(CAM) {
          var RGB = xyz2.toRgb(cam2.toXyz(CAM)), isInside = RGB.map(function(v) {
            return v >= ZERO && v <= ONE;
          }).reduce(function(a, b) {
            return a && b;
          }, !0);
          return [isInside, RGB];
        }
        function limit(camIn, camOut, prec) {
          for (prec === void 0 && (prec = 1e-3); helpers_1.distance(camIn, camOut) > prec; ) {
            var camMid = helpers_1.lerp(camIn, camOut, 0.5), isInside = contains(camMid)[0];
            isInside ? camIn = camMid : camOut = camMid;
          }
          return camIn;
        }
        function spine(t) {
          return helpers_1.lerp(camBlack, camWhite, t);
        }
        function crop(RGB) {
          return RGB.map(function(v) {
            return max2(ZERO, min3(ONE, v));
          });
        }
        return { contains, limit, spine, crop };
      }
      exports.default = Gamut;
    }
  });

  // node_modules/ciecam02-ts/lib/ucs.js
  var require_ucs = __commonJS({
    "node_modules/ciecam02-ts/lib/ucs.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var ciebase_ts_1 = require_lib(), sqrt = Math.sqrt, pow2 = Math.pow, exp = Math.exp, log = Math.log, cos = Math.cos, sin = Math.sin, atan2 = Math.atan2, uniformSpaces = {
        LCD: { K_L: 0.77, c_1: 7e-3, c_2: 53e-4 },
        SCD: { K_L: 1.24, c_1: 7e-3, c_2: 0.0363 },
        UCS: { K_L: 1, c_1: 7e-3, c_2: 0.0228 }
      };
      function Converter(name) {
        name === void 0 && (name = "UCS");
        var _a = uniformSpaces[name], K_L = _a.K_L, c_1 = _a.c_1, c_2 = _a.c_2;
        function fromCam(CAM) {
          var J = CAM.J, M2 = CAM.M, h = CAM.h, h_rad = ciebase_ts_1.degree.toRadian(h), J_p = (1 + 100 * c_1) * J / (1 + c_1 * J), M_p = 1 / c_2 * log(1 + c_2 * M2), a_p = M_p * cos(h_rad), b_p = M_p * sin(h_rad);
          return { J_p, a_p, b_p };
        }
        function toCam(UCS) {
          var J_p = UCS.J_p, a_p = UCS.a_p, b_p = UCS.b_p, J = -J_p / (c_1 * J_p - 100 * c_1 - 1), M_p = sqrt(pow2(a_p, 2) + pow2(b_p, 2)), M2 = (exp(c_2 * M_p) - 1) / c_2, h_rad = atan2(b_p, a_p), h = ciebase_ts_1.degree.fromRadian(h_rad);
          return { J, M: M2, h };
        }
        function distance(UCS1, UCS2) {
          return sqrt(pow2((UCS1.J_p - UCS2.J_p) / K_L, 2) + pow2(UCS1.a_p - UCS2.a_p, 2) + pow2(UCS1.b_p - UCS2.b_p, 2));
        }
        return { fromCam, toCam, distance };
      }
      exports.Converter = Converter;
      exports.default = Converter;
    }
  });

  // node_modules/ciecam02-ts/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/ciecam02-ts/lib/index.js"(exports) {
      "use strict";
      exports.__esModule = !0;
      var cam_1 = require_cam();
      exports.cam = cam_1.default;
      var gamut_1 = require_gamut();
      exports.gamut = gamut_1.default;
      var helpers_1 = require_helpers2();
      exports.cfs = helpers_1.cfs;
      exports.lerp = helpers_1.lerp;
      var hq_1 = require_hq();
      exports.hq = hq_1.default;
      var ucs_1 = require_ucs();
      exports.ucs = ucs_1.default;
    }
  });

  // index.ts
  var source_exports = {};
  __export(source_exports, {
    ColorArray: () => ColorArray,
    IColor: () => IColor,
    adjustHue: () => adjustHue,
    alpha: () => alpha,
    baseCieCam: () => baseCieCam,
    brighten: () => brighten,
    camToColor: () => camToColor,
    channelDifference: () => channelDifference,
    checkArg: () => checkArg,
    color: () => color,
    colorDeficiency: () => colorDeficiency,
    colorObj: () => colorObj,
    colorObjArr: () => colorObjArr,
    colorToCam: () => colorToCam,
    colors: () => colors,
    customConcat: () => customConcat,
    customFindKey: () => customFindKey,
    customSort: () => customSort,
    darken: () => darken,
    discoverPalettes: () => discoverPalettes,
    diverging: () => diverging,
    earthtone: () => earthtone,
    eq: () => eq,
    expressionParser: () => expressionParser,
    filterByContrast: () => filterByContrast,
    filterByDistance: () => filterByDistance,
    filterByHue: () => filterByHue,
    filterByLightness: () => filterByLightness,
    filterByLuminance: () => filterByLuminance,
    filterBySaturation: () => filterBySaturation,
    filteredArr: () => filteredArr,
    floorCeil: () => floorCeil,
    getChannel: () => getChannel,
    getComplimentaryHue: () => getComplimentaryHue,
    getContrast: () => getContrast,
    getFarthestChroma: () => getFarthestChroma,
    getFarthestContrast: () => getFarthestContrast,
    getFarthestHue: () => getFarthestHue,
    getFarthestLightness: () => getFarthestLightness,
    getHueFamily: () => getHueFamily,
    getLuminance: () => getLuminance,
    getModeChannel: () => getModeChannel,
    getNearestChroma: () => getNearestChroma,
    getNearestContrast: () => getNearestContrast,
    getNearestHue: () => getNearestHue,
    getNearestLightness: () => getNearestLightness,
    gt: () => gt,
    gte: () => gte,
    hueShift: () => hueShift,
    inRange: () => inRange,
    interpolateSpline: () => interpolateSpline,
    isAchromatic: () => isAchromatic,
    isCool: () => isCool,
    isInteger: () => isInteger,
    isWarm: () => isWarm,
    load: () => load,
    lt: () => lt,
    lte: () => lte,
    matchChromaChannel: () => matchChromaChannel,
    matchLightnessChannel: () => matchLightnessChannel,
    max: () => max,
    min: () => min2,
    normalize: () => normalize,
    num2rgb: () => num2rgb,
    overtone: () => overtone,
    pairedScheme: () => pairedScheme,
    pastel: () => pastel,
    qualitative: () => qualitative,
    random: () => random,
    rgb2num: () => rgb2num,
    scheme: () => scheme,
    sequential: () => sequential,
    setChannel: () => setChannel,
    setLuminance: () => setLuminance,
    sortByContrast: () => sortByContrast,
    sortByDistance: () => sortByDistance,
    sortByHue: () => sortByHue,
    sortByLightness: () => sortByLightness,
    sortByLuminance: () => sortByLuminance,
    sortBySaturation: () => sortBySaturation,
    sortedArr: () => sortedArr,
    tailwindColors: () => tailwindColors,
    temp2Color: () => temp2Color,
    toHex: () => toHex
  });

  // colors/colorBrewer.ts
  var cb = (str) => str.toLowerCase(), schemeMapper = (scheme2, schemesObject) => {
    let { keys: keys2 } = Object, schemeOptions = keys2(schemesObject).map(cb);
    if (scheme2 = cb(scheme2), schemeOptions.indexOf(scheme2) > -1)
      return schemesObject[scheme2];
    throw Error(`${scheme2} is an invalid scheme option.`);
  }, sequential = (scheme2) => schemeMapper(scheme2, {
    OrRd: [
      "#fff7ec",
      "#fee8c8",
      "#fdd49e",
      "#fdbb84",
      "#fc8d59",
      "#ef6548",
      "#d7301f",
      "#b30000",
      "#7f0000"
    ],
    PuBu: [
      "#fff7fb",
      "#ece7f2",
      "#d0d1e6",
      "#a6bddb",
      "#74a9cf",
      "#3690c0",
      "#0570b0",
      "#045a8d",
      "#023858"
    ],
    BuPu: [
      "#f7fcfd",
      "#e0ecf4",
      "#bfd3e6",
      "#9ebcda",
      "#8c96c6",
      "#8c6bb1",
      "#88419d",
      "#810f7c",
      "#4d004b"
    ],
    Oranges: [
      "#fff5eb",
      "#fee6ce",
      "#fdd0a2",
      "#fdae6b",
      "#fd8d3c",
      "#f16913",
      "#d94801",
      "#a63603",
      "#7f2704"
    ],
    BuGn: [
      "#f7fcfd",
      "#e5f5f9",
      "#ccece6",
      "#99d8c9",
      "#66c2a4",
      "#41ae76",
      "#238b45",
      "#006d2c",
      "#00441b"
    ],
    YlOrBr: [
      "#ffffe5",
      "#fff7bc",
      "#fee391",
      "#fec44f",
      "#fe9929",
      "#ec7014",
      "#cc4c02",
      "#993404",
      "#662506"
    ],
    YlGn: [
      "#ffffe5",
      "#f7fcb9",
      "#d9f0a3",
      "#addd8e",
      "#78c679",
      "#41ab5d",
      "#238443",
      "#006837",
      "#004529"
    ],
    Reds: [
      "#fff5f0",
      "#fee0d2",
      "#fcbba1",
      "#fc9272",
      "#fb6a4a",
      "#ef3b2c",
      "#cb181d",
      "#a50f15",
      "#67000d"
    ],
    RdPu: [
      "#fff7f3",
      "#fde0dd",
      "#fcc5c0",
      "#fa9fb5",
      "#f768a1",
      "#dd3497",
      "#ae017e",
      "#7a0177",
      "#49006a"
    ],
    Greens: [
      "#f7fcf5",
      "#e5f5e0",
      "#c7e9c0",
      "#a1d99b",
      "#74c476",
      "#41ab5d",
      "#238b45",
      "#006d2c",
      "#00441b"
    ],
    YlGnBu: [
      "#ffffd9",
      "#edf8b1",
      "#c7e9b4",
      "#7fcdbb",
      "#41b6c4",
      "#1d91c0",
      "#225ea8",
      "#253494",
      "#081d58"
    ],
    Purples: [
      "#fcfbfd",
      "#efedf5",
      "#dadaeb",
      "#bcbddc",
      "#9e9ac8",
      "#807dba",
      "#6a51a3",
      "#54278f",
      "#3f007d"
    ],
    GnBu: [
      "#f7fcf0",
      "#e0f3db",
      "#ccebc5",
      "#a8ddb5",
      "#7bccc4",
      "#4eb3d3",
      "#2b8cbe",
      "#0868ac",
      "#084081"
    ],
    Greys: [
      "#ffffff",
      "#f0f0f0",
      "#d9d9d9",
      "#bdbdbd",
      "#969696",
      "#737373",
      "#525252",
      "#252525",
      "#000000"
    ],
    YlOrRd: [
      "#ffffcc",
      "#ffeda0",
      "#fed976",
      "#feb24c",
      "#fd8d3c",
      "#fc4e2a",
      "#e31a1c",
      "#bd0026",
      "#800026"
    ],
    PuRd: [
      "#f7f4f9",
      "#e7e1ef",
      "#d4b9da",
      "#c994c7",
      "#df65b0",
      "#e7298a",
      "#ce1256",
      "#980043",
      "#67001f"
    ],
    Blues: [
      "#f7fbff",
      "#deebf7",
      "#c6dbef",
      "#9ecae1",
      "#6baed6",
      "#4292c6",
      "#2171b5",
      "#08519c",
      "#08306b"
    ],
    PuBuGn: [
      "#fff7fb",
      "#ece2f0",
      "#d0d1e6",
      "#a6bddb",
      "#67a9cf",
      "#3690c0",
      "#02818a",
      "#016c59",
      "#014636"
    ],
    Viridis: [
      "#440154",
      "#482777",
      "#3f4a8a",
      "#31678e",
      "#26838f",
      "#1f9d8a",
      "#6cce5a",
      "#b6de2b",
      "#fee825"
    ]
  }), diverging = (scheme2) => schemeMapper(scheme2, {
    Spectral: [
      "#9e0142",
      "#d53e4f",
      "#f46d43",
      "#fdae61",
      "#fee08b",
      "#ffffbf",
      "#e6f598",
      "#abdda4",
      "#66c2a5",
      "#3288bd",
      "#5e4fa2"
    ],
    RdYlGn: [
      "#a50026",
      "#d73027",
      "#f46d43",
      "#fdae61",
      "#fee08b",
      "#ffffbf",
      "#d9ef8b",
      "#a6d96a",
      "#66bd63",
      "#1a9850",
      "#006837"
    ],
    RdBu: [
      "#67001f",
      "#b2182b",
      "#d6604d",
      "#f4a582",
      "#fddbc7",
      "#f7f7f7",
      "#d1e5f0",
      "#92c5de",
      "#4393c3",
      "#2166ac",
      "#053061"
    ],
    PiYG: [
      "#8e0152",
      "#c51b7d",
      "#de77ae",
      "#f1b6da",
      "#fde0ef",
      "#f7f7f7",
      "#e6f5d0",
      "#b8e186",
      "#7fbc41",
      "#4d9221",
      "#276419"
    ],
    PRGn: [
      "#40004b",
      "#762a83",
      "#9970ab",
      "#c2a5cf",
      "#e7d4e8",
      "#f7f7f7",
      "#d9f0d3",
      "#a6dba0",
      "#5aae61",
      "#1b7837",
      "#00441b"
    ],
    RdYlBu: [
      "#a50026",
      "#d73027",
      "#f46d43",
      "#fdae61",
      "#fee090",
      "#ffffbf",
      "#e0f3f8",
      "#abd9e9",
      "#74add1",
      "#4575b4",
      "#313695"
    ],
    BrBG: [
      "#543005",
      "#8c510a",
      "#bf812d",
      "#dfc27d",
      "#f6e8c3",
      "#f5f5f5",
      "#c7eae5",
      "#80cdc1",
      "#35978f",
      "#01665e",
      "#003c30"
    ],
    RdGy: [
      "#67001f",
      "#b2182b",
      "#d6604d",
      "#f4a582",
      "#fddbc7",
      "#ffffff",
      "#e0e0e0",
      "#bababa",
      "#878787",
      "#4d4d4d",
      "#1a1a1a"
    ],
    PuOr: [
      "#7f3b08",
      "#b35806",
      "#e08214",
      "#fdb863",
      "#fee0b6",
      "#f7f7f7",
      "#d8daeb",
      "#b2abd2",
      "#8073ac",
      "#542788",
      "#2d004b"
    ]
  }), qualitative = (scheme2) => schemeMapper(scheme2, {
    Set2: [
      "#66c2a5",
      "#fc8d62",
      "#8da0cb",
      "#e78ac3",
      "#a6d854",
      "#ffd92f",
      "#e5c494",
      "#b3b3b3"
    ],
    Accent: [
      "#7fc97f",
      "#beaed4",
      "#fdc086",
      "#ffff99",
      "#386cb0",
      "#f0027f",
      "#bf5b17",
      "#666666"
    ],
    Set1: [
      "#e41a1c",
      "#377eb8",
      "#4daf4a",
      "#984ea3",
      "#ff7f00",
      "#ffff33",
      "#a65628",
      "#f781bf",
      "#999999"
    ],
    Set3: [
      "#8dd3c7",
      "#ffffb3",
      "#bebada",
      "#fb8072",
      "#80b1d3",
      "#fdb462",
      "#b3de69",
      "#fccde5",
      "#d9d9d9",
      "#bc80bd",
      "#ccebc5",
      "#ffed6f"
    ],
    Dark2: [
      "#1b9e77",
      "#d95f02",
      "#7570b3",
      "#e7298a",
      "#66a61e",
      "#e6ab02",
      "#a6761d",
      "#666666"
    ],
    Paired: [
      "#a6cee3",
      "#1f78b4",
      "#b2df8a",
      "#33a02c",
      "#fb9a99",
      "#e31a1c",
      "#fdbf6f",
      "#ff7f00",
      "#cab2d6",
      "#6a3d9a",
      "#ffff99",
      "#b15928"
    ],
    Pastel2: [
      "#b3e2cd",
      "#fdcdac",
      "#cbd5e8",
      "#f4cae4",
      "#e6f5c9",
      "#fff2ae",
      "#f1e2cc",
      "#cccccc"
    ],
    Pastel1: [
      "#fbb4ae",
      "#b3cde3",
      "#ccebc5",
      "#decbe4",
      "#fed9a6",
      "#ffffcc",
      "#e5d8bd",
      "#fddaec",
      "#f2f2f2"
    ]
  });

  // color-maps/swatches/tailwind.ts
  var tailwind_default = {
    /*     black: '#000',
          white: '#fff', */
    indigo: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a"
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827"
    },
    zinc: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b"
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717"
    },
    stone: {
      50: "#fafaf9",
      100: "#f5f5f4",
      200: "#e7e5e4",
      300: "#d6d3d1",
      400: "#a8a29e",
      500: "#78716c",
      600: "#57534e",
      700: "#44403c",
      800: "#292524",
      900: "#1c1917"
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d"
    },
    orange: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12"
    },
    amber: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f"
    },
    yellow: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12"
    },
    lime: {
      50: "#f7fee7",
      100: "#ecfccb",
      200: "#d9f99d",
      300: "#bef264",
      400: "#a3e635",
      500: "#84cc16",
      600: "#65a30d",
      700: "#4d7c0f",
      800: "#3f6212",
      900: "#365314"
    },
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d"
    },
    emerald: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b"
    },
    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a"
    },
    sky: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e"
    },
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a"
    },
    violet: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95"
    },
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87"
    },
    fuchsia: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef",
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75"
    },
    pink: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843"
    },
    rose: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337"
    }
  };

  // colors/colors.ts
  var colors = (shade, val) => {
    let { keys: keys2 } = Object, defaultHue = "all", hueKeys = keys2(tailwind_default);
    if (shade = shade.toLowerCase(), shade === defaultHue)
      return hueKeys.map((color2) => tailwind_default[color2][val || "500"]);
    if (hueKeys.some((hue3) => hue3 === shade) && val)
      return tailwind_default[shade][val];
    if (shade && typeof val > "u")
      return keys2(tailwind_default[shade]).map((key) => tailwind_default[shade][key]);
    if (typeof val > "u")
      throw Error("Both shade and value cannot be undefined");
  };

  // node_modules/culori/src/rgb/parseNumber.js
  var parseNumber = (color2, len) => {
    if (typeof color2 == "number") {
      if (len === 3)
        return {
          mode: "rgb",
          r: (color2 >> 8 & 15 | color2 >> 4 & 240) / 255,
          g: (color2 >> 4 & 15 | color2 & 240) / 255,
          b: (color2 & 15 | color2 << 4 & 240) / 255
        };
      if (len === 4)
        return {
          mode: "rgb",
          r: (color2 >> 12 & 15 | color2 >> 8 & 240) / 255,
          g: (color2 >> 8 & 15 | color2 >> 4 & 240) / 255,
          b: (color2 >> 4 & 15 | color2 & 240) / 255,
          alpha: (color2 & 15 | color2 << 4 & 240) / 255
        };
      if (len === 6)
        return {
          mode: "rgb",
          r: (color2 >> 16 & 255) / 255,
          g: (color2 >> 8 & 255) / 255,
          b: (color2 & 255) / 255
        };
      if (len === 8)
        return {
          mode: "rgb",
          r: (color2 >> 24 & 255) / 255,
          g: (color2 >> 16 & 255) / 255,
          b: (color2 >> 8 & 255) / 255,
          alpha: (color2 & 255) / 255
        };
    }
  }, parseNumber_default = parseNumber;

  // node_modules/culori/src/colors/named.js
  var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    // Added in CSS Colors Level 4:
    // https://drafts.csswg.org/css-color/#changes-from-3
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  }, named_default = named;

  // node_modules/culori/src/rgb/parseNamed.js
  var parseNamed = (color2) => parseNumber_default(named_default[color2.toLowerCase()], 6), parseNamed_default = parseNamed;

  // node_modules/culori/src/rgb/parseHex.js
  var hex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i, parseHex = (color2) => {
    let match;
    return (match = color2.match(hex)) ? parseNumber_default(parseInt(match[1], 16), match[1].length) : void 0;
  }, parseHex_default = parseHex;

  // node_modules/culori/src/util/regex.js
  var num = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)", num_none = `(?:${num}|none)`, per = `${num}%`, per_none = `(?:${num}%|none)`, num_per = `(?:${num}%|${num})`, num_per_none = `(?:${num}%|${num}|none)`, hue = `(?:${num}(deg|grad|rad|turn)|${num})`, hue_none = `(?:${num}(deg|grad|rad|turn)|${num}|none)`, c = "\\s*,\\s*";
  var rx_num_per_none = new RegExp("^" + num_per_none + "$");

  // node_modules/culori/src/rgb/parseRgbLegacy.js
  var rgb_num_old = new RegExp(
    `^rgba?\\(\\s*${num}${c}${num}${c}${num}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
  ), rgb_per_old = new RegExp(
    `^rgba?\\(\\s*${per}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
  ), parseRgbLegacy = (color2) => {
    let res = { mode: "rgb" }, match;
    if (match = color2.match(rgb_num_old))
      match[1] !== void 0 && (res.r = match[1] / 255), match[2] !== void 0 && (res.g = match[2] / 255), match[3] !== void 0 && (res.b = match[3] / 255);
    else if (match = color2.match(rgb_per_old))
      match[1] !== void 0 && (res.r = match[1] / 100), match[2] !== void 0 && (res.g = match[2] / 100), match[3] !== void 0 && (res.b = match[3] / 100);
    else
      return;
    return match[4] !== void 0 ? res.alpha = match[4] / 100 : match[5] !== void 0 && (res.alpha = +match[5]), res;
  }, parseRgbLegacy_default = parseRgbLegacy;

  // node_modules/culori/src/_prepare.js
  var prepare = (color2, mode2) => color2 === void 0 ? void 0 : typeof color2 != "object" ? parse_default(color2) : color2.mode !== void 0 ? color2 : mode2 ? { ...color2, mode: mode2 } : void 0, prepare_default = prepare;

  // node_modules/culori/src/converter.js
  var converter = (target_mode = "rgb") => (color2) => (color2 = prepare_default(color2, target_mode)) !== void 0 ? (
    // if the color's mode corresponds to our target mode
    color2.mode === target_mode ? (
      // then just return the color
      color2
    ) : (
      // otherwise check to see if we have a dedicated
      // converter for the target mode
      converters[color2.mode][target_mode] ? (
        // and return its result...
        converters[color2.mode][target_mode](color2)
      ) : (
        // ...otherwise pass through RGB as an intermediary step.
        // if the target mode is RGB...
        target_mode === "rgb" ? (
          // just return the RGB
          converters[color2.mode].rgb(color2)
        ) : (
          // otherwise convert color.mode -> RGB -> target_mode
          converters.rgb[target_mode](converters[color2.mode].rgb(color2))
        )
      )
    )
  ) : void 0, converter_default = converter;

  // node_modules/culori/src/modes.js
  var converters = {}, modes = {}, parsers = [], colorProfiles = {}, identity = (v) => v, useMode = (definition28) => (converters[definition28.mode] = {
    ...converters[definition28.mode],
    ...definition28.toMode
  }, Object.keys(definition28.fromMode || {}).forEach((k4) => {
    converters[k4] || (converters[k4] = {}), converters[k4][definition28.mode] = definition28.fromMode[k4];
  }), definition28.ranges || (definition28.ranges = {}), definition28.difference || (definition28.difference = {}), definition28.channels.forEach((channel) => {
    if (definition28.ranges[channel] === void 0 && (definition28.ranges[channel] = [0, 1]), !definition28.interpolate[channel])
      throw new Error(`Missing interpolator for: ${channel}`);
    typeof definition28.interpolate[channel] == "function" && (definition28.interpolate[channel] = {
      use: definition28.interpolate[channel]
    }), definition28.interpolate[channel].fixup || (definition28.interpolate[channel].fixup = identity);
  }), modes[definition28.mode] = definition28, (definition28.parse || []).forEach((parser) => {
    useParser(parser, definition28.mode);
  }), converter_default(definition28.mode)), getMode = (mode2) => modes[mode2], useParser = (parser, mode2) => {
    if (typeof parser == "string") {
      if (!mode2)
        throw new Error("'mode' required when 'parser' is a string");
      colorProfiles[parser] = mode2;
    } else
      typeof parser == "function" && parsers.indexOf(parser) < 0 && parsers.push(parser);
  };

  // node_modules/culori/src/parse.js
  var IdentStartCodePoint = /[^\x00-\x7F]|[a-zA-Z_]/, IdentCodePoint = /[^\x00-\x7F]|[-\w]/, Tok = {
    Function: "function",
    Ident: "ident",
    Number: "number",
    Percentage: "percentage",
    ParenClose: ")",
    None: "none",
    Hue: "hue",
    Alpha: "alpha"
  }, _i = 0;
  function is_num(chars) {
    let ch = chars[_i], ch1 = chars[_i + 1];
    return ch === "-" || ch === "+" ? /\d/.test(ch1) || ch1 === "." && /\d/.test(chars[_i + 2]) : ch === "." ? /\d/.test(ch1) : /\d/.test(ch);
  }
  function is_ident(chars) {
    if (_i >= chars.length)
      return !1;
    let ch = chars[_i];
    if (IdentStartCodePoint.test(ch))
      return !0;
    if (ch === "-") {
      if (chars.length - _i < 2)
        return !1;
      let ch1 = chars[_i + 1];
      return !!(ch1 === "-" || IdentStartCodePoint.test(ch1));
    }
    return !1;
  }
  var huenits = {
    deg: 1,
    rad: 180 / Math.PI,
    grad: 9 / 10,
    turn: 360
  };
  function num2(chars) {
    let value = "";
    if ((chars[_i] === "-" || chars[_i] === "+") && (value += chars[_i++]), value += digits(chars), chars[_i] === "." && /\d/.test(chars[_i + 1]) && (value += chars[_i++] + digits(chars)), (chars[_i] === "e" || chars[_i] === "E") && ((chars[_i + 1] === "-" || chars[_i + 1] === "+") && /\d/.test(chars[_i + 2]) ? value += chars[_i++] + chars[_i++] + digits(chars) : /\d/.test(chars[_i + 1]) && (value += chars[_i++] + digits(chars))), is_ident(chars)) {
      let id = ident(chars);
      return id === "deg" || id === "rad" || id === "turn" || id === "grad" ? { type: Tok.Hue, value: value * huenits[id] } : void 0;
    }
    return chars[_i] === "%" ? (_i++, { type: Tok.Percentage, value: +value }) : { type: Tok.Number, value: +value };
  }
  function digits(chars) {
    let v = "";
    for (; /\d/.test(chars[_i]); )
      v += chars[_i++];
    return v;
  }
  function ident(chars) {
    let v = "";
    for (; _i < chars.length && IdentCodePoint.test(chars[_i]); )
      v += chars[_i++];
    return v;
  }
  function identlike(chars) {
    let v = ident(chars);
    return chars[_i] === "(" ? (_i++, { type: Tok.Function, value: v }) : v === "none" ? { type: Tok.None, value: void 0 } : { type: Tok.Ident, value: v };
  }
  function tokenize(str = "") {
    let chars = str.trim(), tokens = [], ch;
    for (_i = 0; _i < chars.length; ) {
      if (ch = chars[_i++], ch === `
` || ch === "	" || ch === " ") {
        for (; _i < chars.length && (chars[_i] === `
` || chars[_i] === "	" || chars[_i] === " "); )
          _i++;
        continue;
      }
      if (ch === ",")
        return;
      if (ch === ")") {
        tokens.push({ type: Tok.ParenClose });
        continue;
      }
      if (ch === "+") {
        if (_i--, is_num(chars)) {
          tokens.push(num2(chars));
          continue;
        }
        return;
      }
      if (ch === "-") {
        if (_i--, is_num(chars)) {
          tokens.push(num2(chars));
          continue;
        }
        if (is_ident(chars)) {
          tokens.push({ type: Tok.Ident, value: ident(chars) });
          continue;
        }
        return;
      }
      if (ch === ".") {
        if (_i--, is_num(chars)) {
          tokens.push(num2(chars));
          continue;
        }
        return;
      }
      if (ch === "/") {
        for (; _i < chars.length && (chars[_i] === `
` || chars[_i] === "	" || chars[_i] === " "); )
          _i++;
        let alpha2;
        if (is_num(chars) && (alpha2 = num2(chars), alpha2.type !== Tok.Hue)) {
          tokens.push({ type: Tok.Alpha, value: alpha2 });
          continue;
        }
        if (is_ident(chars) && ident(chars) === "none") {
          tokens.push({
            type: Tok.Alpha,
            value: { type: Tok.None, value: void 0 }
          });
          continue;
        }
        return;
      }
      if (/\d/.test(ch)) {
        _i--, tokens.push(num2(chars));
        continue;
      }
      if (IdentStartCodePoint.test(ch)) {
        _i--, tokens.push(identlike(chars));
        continue;
      }
      return;
    }
    return tokens;
  }
  function parseColorSyntax(tokens) {
    tokens._i = 0;
    let token = tokens[tokens._i++];
    if (!token || token.type !== Tok.Function || token.value !== "color" || (token = tokens[tokens._i++], token.type !== Tok.Ident))
      return;
    let mode2 = colorProfiles[token.value];
    if (!mode2)
      return;
    let res = { mode: mode2 }, coords = consumeCoords(tokens, !1);
    if (!coords)
      return;
    let channels = getMode(mode2).channels;
    for (let ii = 0, c4; ii < channels.length; ii++)
      c4 = coords[ii], c4.type !== Tok.None && (res[channels[ii]] = c4.type === Tok.Number ? c4.value : c4.value / 100);
    return res;
  }
  function consumeCoords(tokens, includeHue) {
    let coords = [], token;
    for (; tokens._i < tokens.length; ) {
      if (token = tokens[tokens._i++], token.type === Tok.None || token.type === Tok.Number || token.type === Tok.Alpha || token.type === Tok.Percentage || includeHue && token.type === Tok.Hue) {
        coords.push(token);
        continue;
      }
      if (token.type === Tok.ParenClose) {
        if (tokens._i < tokens.length)
          return;
        continue;
      }
      return;
    }
    if (!(coords.length < 3 || coords.length > 4)) {
      if (coords.length === 4) {
        if (coords[3].type !== Tok.Alpha)
          return;
        coords[3] = coords[3].value;
      }
      return coords.length === 3 && coords.push({ type: Tok.None, value: void 0 }), coords.every((c4) => c4.type !== Tok.Alpha) ? coords : void 0;
    }
  }
  function parseModernSyntax(tokens, includeHue) {
    tokens._i = 0;
    let token = tokens[tokens._i++];
    if (!token || token.type !== Tok.Function)
      return;
    let coords = consumeCoords(tokens, includeHue);
    if (coords)
      return coords.unshift(token.value), coords;
  }
  var parse = (color2) => {
    if (typeof color2 != "string")
      return;
    let tokens = tokenize(color2), parsed = tokens ? parseModernSyntax(tokens, !0) : void 0, result, i = 0, len = parsers.length;
    for (; i < len; )
      if ((result = parsers[i++](color2, parsed)) !== void 0)
        return result;
    return tokens ? parseColorSyntax(tokens) : void 0;
  }, parse_default = parse;

  // node_modules/culori/src/rgb/parseRgb.js
  function parseRgb(color2, parsed) {
    if (!parsed || parsed[0] !== "rgb" && parsed[0] !== "rgba")
      return;
    let res = { mode: "rgb" }, [, r2, g, b, alpha2] = parsed;
    if (!(r2.type === Tok.Hue || g.type === Tok.Hue || b.type === Tok.Hue))
      return r2.type !== Tok.None && (res.r = r2.type === Tok.Number ? r2.value / 255 : r2.value / 100), g.type !== Tok.None && (res.g = g.type === Tok.Number ? g.value / 255 : g.value / 100), b.type !== Tok.None && (res.b = b.type === Tok.Number ? b.value / 255 : b.value / 100), alpha2.type !== Tok.None && (res.alpha = alpha2.type === Tok.Number ? alpha2.value : alpha2.value / 100), res;
  }
  var parseRgb_default = parseRgb;

  // node_modules/culori/src/rgb/parseTransparent.js
  var parseTransparent = (c4) => c4 === "transparent" ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 } : void 0, parseTransparent_default = parseTransparent;

  // node_modules/culori/src/interpolate/lerp.js
  var lerp = (a, b, t) => a + t * (b - a);

  // node_modules/culori/src/interpolate/piecewise.js
  var get_classes = (arr) => {
    let classes = [];
    for (let i = 0; i < arr.length - 1; i++) {
      let a = arr[i], b = arr[i + 1];
      a === void 0 && b === void 0 ? classes.push(void 0) : a !== void 0 && b !== void 0 ? classes.push([a, b]) : classes.push(a !== void 0 ? [a, a] : [b, b]);
    }
    return classes;
  }, interpolatorPiecewise = (interpolator2) => (arr) => {
    let classes = get_classes(arr);
    return (t) => {
      let cls = t * classes.length, idx = t >= 1 ? classes.length - 1 : Math.max(Math.floor(cls), 0), pair = classes[idx];
      return pair === void 0 ? void 0 : interpolator2(pair[0], pair[1], cls - idx);
    };
  };

  // node_modules/culori/src/interpolate/linear.js
  var interpolatorLinear = interpolatorPiecewise(lerp);

  // node_modules/culori/src/fixup/alpha.js
  var fixupAlpha = (arr) => {
    let some_defined = !1, res = arr.map((v) => v !== void 0 ? (some_defined = !0, v) : 1);
    return some_defined ? res : arr;
  };

  // node_modules/culori/src/rgb/definition.js
  var definition = {
    mode: "rgb",
    channels: ["r", "g", "b", "alpha"],
    parse: [
      parseRgb_default,
      parseHex_default,
      parseRgbLegacy_default,
      parseNamed_default,
      parseTransparent_default,
      "srgb"
    ],
    serialize: "srgb",
    interpolate: {
      r: interpolatorLinear,
      g: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    gamut: !0
  }, definition_default = definition;

  // node_modules/culori/src/a98/convertA98ToXyz65.js
  var linearize = (v) => Math.pow(Math.abs(v), 2.19921875) * Math.sign(v), convertA98ToXyz65 = (a983) => {
    let r2 = linearize(a983.r), g = linearize(a983.g), b = linearize(a983.b), res = {
      mode: "xyz65",
      x: 0.5766690429101305 * r2 + 0.1855582379065463 * g + 0.1882286462349947 * b,
      y: 0.297344975250536 * r2 + 0.6273635662554661 * g + 0.0752914584939979 * b,
      z: 0.0270313613864123 * r2 + 0.0706888525358272 * g + 0.9913375368376386 * b
    };
    return a983.alpha !== void 0 && (res.alpha = a983.alpha), res;
  }, convertA98ToXyz65_default = convertA98ToXyz65;

  // node_modules/culori/src/a98/convertXyz65ToA98.js
  var gamma = (v) => Math.pow(Math.abs(v), 0.4547069271758437) * Math.sign(v), convertXyz65ToA98 = ({ x, y, z, alpha: alpha2 }) => {
    let res = {
      mode: "a98",
      r: gamma(
        x * 2.0415879038107465 - y * 0.5650069742788597 - 0.3447313507783297 * z
      ),
      g: gamma(
        x * -0.9692436362808798 + y * 1.8759675015077206 + 0.0415550574071756 * z
      ),
      b: gamma(
        x * 0.0134442806320312 - y * 0.1183623922310184 + 1.0151749943912058 * z
      )
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz65ToA98_default = convertXyz65ToA98;

  // node_modules/culori/src/lrgb/convertRgbToLrgb.js
  var fn = (c4) => {
    let abs4 = Math.abs(c4);
    return abs4 <= 0.04045 ? c4 / 12.92 : (Math.sign(c4) || 1) * Math.pow((abs4 + 0.055) / 1.055, 2.4);
  }, convertRgbToLrgb = ({ r: r2, g, b, alpha: alpha2 }) => {
    let res = {
      mode: "lrgb",
      r: fn(r2),
      g: fn(g),
      b: fn(b)
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertRgbToLrgb_default = convertRgbToLrgb;

  // node_modules/culori/src/xyz65/convertRgbToXyz65.js
  var convertRgbToXyz65 = (rgb5) => {
    let { r: r2, g, b, alpha: alpha2 } = convertRgbToLrgb_default(rgb5), res = {
      mode: "xyz65",
      x: 0.4123907992659593 * r2 + 0.357584339383878 * g + 0.1804807884018343 * b,
      y: 0.2126390058715102 * r2 + 0.715168678767756 * g + 0.0721923153607337 * b,
      z: 0.0193308187155918 * r2 + 0.119194779794626 * g + 0.9505321522496607 * b
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertRgbToXyz65_default = convertRgbToXyz65;

  // node_modules/culori/src/lrgb/convertLrgbToRgb.js
  var fn2 = (c4) => {
    let abs4 = Math.abs(c4);
    return abs4 > 31308e-7 ? (Math.sign(c4) || 1) * (1.055 * Math.pow(abs4, 0.4166666666666667) - 0.055) : c4 * 12.92;
  }, convertLrgbToRgb = ({ r: r2, g, b, alpha: alpha2 }, mode2 = "rgb") => {
    let res = {
      mode: mode2,
      r: fn2(r2),
      g: fn2(g),
      b: fn2(b)
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertLrgbToRgb_default = convertLrgbToRgb;

  // node_modules/culori/src/xyz65/convertXyz65ToRgb.js
  var convertXyz65ToRgb = ({ x, y, z, alpha: alpha2 }) => {
    let res = convertLrgbToRgb_default({
      r: x * 3.2409699419045226 - y * 1.537383177570094 - 0.4986107602930034 * z,
      g: x * -0.9692436362808796 + y * 1.8759675015077204 + 0.0415550574071756 * z,
      b: x * 0.0556300796969936 - y * 0.2039769588889765 + 1.0569715142428784 * z
    });
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz65ToRgb_default = convertXyz65ToRgb;

  // node_modules/culori/src/a98/definition.js
  var definition2 = {
    ...definition_default,
    mode: "a98",
    parse: ["a98-rgb"],
    serialize: "a98-rgb",
    fromMode: {
      rgb: (color2) => convertXyz65ToA98_default(convertRgbToXyz65_default(color2)),
      xyz65: convertXyz65ToA98_default
    },
    toMode: {
      rgb: (color2) => convertXyz65ToRgb_default(convertA98ToXyz65_default(color2)),
      xyz65: convertA98ToXyz65_default
    }
  }, definition_default2 = definition2;

  // node_modules/culori/src/util/normalizeHue.js
  var normalizeHue = (hue3) => (hue3 = hue3 % 360) < 0 ? hue3 + 360 : hue3, normalizeHue_default = normalizeHue;

  // node_modules/culori/src/fixup/hue.js
  var hue2 = (hues, fn5) => hues.map((hue3, idx, arr) => {
    if (hue3 === void 0)
      return hue3;
    let normalized = normalizeHue_default(hue3);
    return idx === 0 || hues[idx - 1] === void 0 ? normalized : fn5(normalized - normalizeHue_default(arr[idx - 1]));
  }).reduce((acc, curr) => !acc.length || curr === void 0 || acc[acc.length - 1] === void 0 ? (acc.push(curr), acc) : (acc.push(curr + acc[acc.length - 1]), acc), []), fixupHueShorter = (arr) => hue2(arr, (d) => Math.abs(d) <= 180 ? d : d - 360 * Math.sign(d));

  // node_modules/culori/src/cubehelix/constants.js
  var M = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0], degToRad = Math.PI / 180, radToDeg = 180 / Math.PI;

  // node_modules/culori/src/cubehelix/convertRgbToCubehelix.js
  var DE = M[3] * M[4], BE = M[1] * M[4], BCAD = M[1] * M[2] - M[0] * M[3], convertRgbToCubehelix = ({ r: r2, g, b, alpha: alpha2 }) => {
    let l = (BCAD * b + r2 * DE - g * BE) / (BCAD + DE - BE), x = b - l, y = (M[4] * (g - l) - M[2] * x) / M[3], res = {
      mode: "cubehelix",
      l,
      s: l === 0 || l === 1 ? void 0 : Math.sqrt(x * x + y * y) / (M[4] * l * (1 - l))
    };
    return res.s && (res.h = Math.atan2(y, x) * radToDeg - 120), alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertRgbToCubehelix_default = convertRgbToCubehelix;

  // node_modules/culori/src/cubehelix/convertCubehelixToRgb.js
  var convertCubehelixToRgb = ({ h, s, l, alpha: alpha2 }) => {
    let res = { mode: "rgb" };
    h = (h === void 0 ? 0 : h + 120) * degToRad;
    let amp = s === void 0 ? 0 : s * l * (1 - l), cosh = Math.cos(h), sinh = Math.sin(h);
    return res.r = l + amp * (M[0] * cosh + M[1] * sinh), res.g = l + amp * (M[2] * cosh + M[3] * sinh), res.b = l + amp * (M[4] * cosh + M[5] * sinh), alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertCubehelixToRgb_default = convertCubehelixToRgb;

  // node_modules/culori/src/difference.js
  var differenceHueSaturation = (std, smp) => {
    if (std.h === void 0 || smp.h === void 0 || !std.s || !smp.s)
      return 0;
    let std_h = normalizeHue_default(std.h), smp_h = normalizeHue_default(smp.h), dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
    return 2 * Math.sqrt(std.s * smp.s) * dH;
  }, differenceHueNaive = (std, smp) => {
    if (std.h === void 0 || smp.h === void 0)
      return 0;
    let std_h = normalizeHue_default(std.h), smp_h = normalizeHue_default(smp.h);
    return Math.abs(smp_h - std_h) > 180 ? std_h - (smp_h - 360 * Math.sign(smp_h - std_h)) : smp_h - std_h;
  }, differenceHueChroma = (std, smp) => {
    if (std.h === void 0 || smp.h === void 0 || !std.c || !smp.c)
      return 0;
    let std_h = normalizeHue_default(std.h), smp_h = normalizeHue_default(smp.h), dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
    return 2 * Math.sqrt(std.c * smp.c) * dH;
  }, differenceEuclidean = (mode2 = "rgb", weights = [1, 1, 1, 0]) => {
    let def = getMode(mode2), channels = def.channels, diffs = def.difference, conv = converter_default(mode2);
    return (std, smp) => {
      let ConvStd = conv(std), ConvSmp = conv(smp);
      return Math.sqrt(
        channels.reduce((sum, k4, idx) => {
          let delta = diffs[k4] ? diffs[k4](ConvStd, ConvSmp) : ConvStd[k4] - ConvSmp[k4];
          return sum + (weights[idx] || 0) * Math.pow(isNaN(delta) ? 0 : delta, 2);
        }, 0)
      );
    };
  };

  // node_modules/culori/src/average.js
  var averageAngle = (val) => {
    let sum = val.reduce(
      (sum2, val2) => {
        if (val2 !== void 0) {
          let rad = val2 * Math.PI / 180;
          sum2.sin += Math.sin(rad), sum2.cos += Math.cos(rad);
        }
        return sum2;
      },
      { sin: 0, cos: 0 }
    );
    return Math.atan2(sum.sin, sum.cos) * 180 / Math.PI;
  }, averageNumber = (val) => {
    let a = val.filter((v) => v !== void 0);
    return a.length ? a.reduce((sum, v) => sum + v, 0) / a.length : void 0;
  };

  // node_modules/culori/src/cubehelix/definition.js
  var definition3 = {
    mode: "cubehelix",
    channels: ["h", "s", "l", "alpha"],
    parse: ["--cubehelix"],
    serialize: "--cubehelix",
    ranges: {
      h: [0, 360],
      s: [0, 4.614],
      l: [0, 1]
    },
    fromMode: {
      rgb: convertRgbToCubehelix_default
    },
    toMode: {
      rgb: convertCubehelixToRgb_default
    },
    interpolate: {
      h: {
        use: interpolatorLinear,
        fixup: fixupHueShorter
      },
      s: interpolatorLinear,
      l: interpolatorLinear,
      alpha: {
        use: interpolatorLinear,
        fixup: fixupAlpha
      }
    },
    difference: {
      h: differenceHueSaturation
    },
    average: {
      h: averageAngle
    }
  }, definition_default3 = definition3;

  // node_modules/culori/src/lch/convertLabToLch.js
  var convertLabToLch = ({ l, a, b, alpha: alpha2 }, mode2 = "lch") => {
    let c4 = Math.sqrt(a * a + b * b), res = { mode: mode2, l, c: c4 };
    return c4 && (res.h = normalizeHue_default(Math.atan2(b, a) * 180 / Math.PI)), alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertLabToLch_default = convertLabToLch;

  // node_modules/culori/src/lch/convertLchToLab.js
  var convertLchToLab = ({ l, c: c4, h, alpha: alpha2 }, mode2 = "lab") => {
    let res = {
      mode: mode2,
      l,
      a: c4 ? c4 * Math.cos(h / 180 * Math.PI) : 0,
      b: c4 ? c4 * Math.sin(h / 180 * Math.PI) : 0
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertLchToLab_default = convertLchToLab;

  // node_modules/culori/src/xyz65/constants.js
  var k = Math.pow(29, 3) / Math.pow(3, 3), e = Math.pow(6, 3) / Math.pow(29, 3);

  // node_modules/culori/src/constants.js
  var D50 = {
    X: 0.9642956764295677,
    Y: 1,
    Z: 0.8251046025104602
  }, D65 = {
    X: 0.3127 / 0.329,
    Y: 1,
    Z: (1 - 0.3127 - 0.329) / 0.329
  }, k2 = Math.pow(29, 3) / Math.pow(3, 3), e2 = Math.pow(6, 3) / Math.pow(29, 3);

  // node_modules/culori/src/lab65/convertLab65ToXyz65.js
  var fn3 = (v) => Math.pow(v, 3) > e ? Math.pow(v, 3) : (116 * v - 16) / k, convertLab65ToXyz65 = ({ l, a, b, alpha: alpha2 }) => {
    let fy = (l + 16) / 116, fx = a / 500 + fy, fz = fy - b / 200, res = {
      mode: "xyz65",
      x: fn3(fx) * D65.X,
      y: fn3(fy) * D65.Y,
      z: fn3(fz) * D65.Z
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertLab65ToXyz65_default = convertLab65ToXyz65;

  // node_modules/culori/src/lab65/convertLab65ToRgb.js
  var convertLab65ToRgb = (lab3) => convertXyz65ToRgb_default(convertLab65ToXyz65_default(lab3)), convertLab65ToRgb_default = convertLab65ToRgb;

  // node_modules/culori/src/lab65/convertXyz65ToLab65.js
  var f = (value) => value > e ? Math.cbrt(value) : (k * value + 16) / 116, convertXyz65ToLab65 = ({ x, y, z, alpha: alpha2 }) => {
    let f0 = f(x / D65.X), f1 = f(y / D65.Y), f22 = f(z / D65.Z), res = {
      mode: "lab65",
      l: 116 * f1 - 16,
      a: 500 * (f0 - f1),
      b: 200 * (f1 - f22)
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz65ToLab65_default = convertXyz65ToLab65;

  // node_modules/culori/src/lab65/convertRgbToLab65.js
  var convertRgbToLab65 = (rgb5) => {
    let res = convertXyz65ToLab65_default(convertRgbToXyz65_default(rgb5));
    return rgb5.r === rgb5.b && rgb5.b === rgb5.g && (res.a = res.b = 0), res;
  }, convertRgbToLab65_default = convertRgbToLab65;

  // node_modules/culori/src/dlch/constants.js
  var \u03B8 = 0.14444444444444443 * Math.PI, cos\u03B8 = Math.cos(\u03B8), sin\u03B8 = Math.sin(\u03B8), factor = 100 / Math.log(139 / 100);

  // node_modules/culori/src/dlch/convertDlchToLab65.js
  var convertDlchToLab65 = ({ l, c: c4, h, alpha: alpha2 }) => {
    let res = {
      mode: "lab65",
      l: (Math.exp(l * 1 / factor) - 1) / 39e-4
    };
    if (h === void 0)
      res.a = res.b = 0;
    else {
      let G = (Math.exp(0.0435 * c4 * 1 * 1) - 1) / 0.075, e4 = G * Math.cos(h / 180 * Math.PI - \u03B8), f3 = G * Math.sin(h / 180 * Math.PI - \u03B8);
      res.a = e4 * cos\u03B8 - f3 / 0.83 * sin\u03B8, res.b = e4 * sin\u03B8 + f3 / 0.83 * cos\u03B8;
    }
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertDlchToLab65_default = convertDlchToLab65;

  // node_modules/culori/src/dlch/convertLab65ToDlch.js
  var convertLab65ToDlch = ({ l, a, b, alpha: alpha2 }) => {
    let e4 = a * cos\u03B8 + b * sin\u03B8, f3 = 0.83 * (b * cos\u03B8 - a * sin\u03B8), G = Math.sqrt(e4 * e4 + f3 * f3), res = {
      mode: "dlch",
      l: factor / 1 * Math.log(1 + 39e-4 * l),
      c: Math.log(1 + 0.075 * G) / (0.0435 * 1 * 1)
    };
    return res.c && (res.h = normalizeHue_default((Math.atan2(f3, e4) + \u03B8) / Math.PI * 180)), alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertLab65ToDlch_default = convertLab65ToDlch;

  // node_modules/culori/src/dlab/definition.js
  var convertDlabToLab65 = (c4) => convertDlchToLab65_default(convertLabToLch_default(c4, "dlch")), convertLab65ToDlab = (c4) => convertLchToLab_default(convertLab65ToDlch_default(c4), "dlab"), definition4 = {
    mode: "dlab",
    parse: ["--din99o-lab"],
    serialize: "--din99o-lab",
    toMode: {
      lab65: convertDlabToLab65,
      rgb: (c4) => convertLab65ToRgb_default(convertDlabToLab65(c4))
    },
    fromMode: {
      lab65: convertLab65ToDlab,
      rgb: (c4) => convertLab65ToDlab(convertRgbToLab65_default(c4))
    },
    channels: ["l", "a", "b", "alpha"],
    ranges: {
      l: [0, 100],
      a: [-40.09, 45.501],
      b: [-40.469, 44.344]
    },
    interpolate: {
      l: interpolatorLinear,
      a: interpolatorLinear,
      b: interpolatorLinear,
      alpha: {
        use: interpolatorLinear,
        fixup: fixupAlpha
      }
    }
  }, definition_default4 = definition4;

  // node_modules/culori/src/dlch/definition.js
  var definition5 = {
    mode: "dlch",
    parse: ["--din99o-lch"],
    serialize: "--din99o-lch",
    toMode: {
      lab65: convertDlchToLab65_default,
      dlab: (c4) => convertLchToLab_default(c4, "dlab"),
      rgb: (c4) => convertLab65ToRgb_default(convertDlchToLab65_default(c4))
    },
    fromMode: {
      lab65: convertLab65ToDlch_default,
      dlab: (c4) => convertLabToLch_default(c4, "dlch"),
      rgb: (c4) => convertLab65ToDlch_default(convertRgbToLab65_default(c4))
    },
    channels: ["l", "c", "h", "alpha"],
    ranges: {
      l: [0, 100],
      c: [0, 51.484],
      h: [0, 360]
    },
    interpolate: {
      l: interpolatorLinear,
      c: interpolatorLinear,
      h: {
        use: interpolatorLinear,
        fixup: fixupHueShorter
      },
      alpha: {
        use: interpolatorLinear,
        fixup: fixupAlpha
      }
    },
    difference: {
      h: differenceHueChroma
    },
    average: {
      h: averageAngle
    }
  }, definition_default5 = definition5;

  // node_modules/culori/src/hsi/convertHsiToRgb.js
  function convertHsiToRgb({ h, s, i, alpha: alpha2 }) {
    h = normalizeHue_default(h);
    let f3 = Math.abs(h / 60 % 2 - 1), res;
    switch (Math.floor(h / 60)) {
      case 0:
        res = {
          r: i * (1 + s * (3 / (2 - f3) - 1)),
          g: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
          b: i * (1 - s)
        };
        break;
      case 1:
        res = {
          r: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
          g: i * (1 + s * (3 / (2 - f3) - 1)),
          b: i * (1 - s)
        };
        break;
      case 2:
        res = {
          r: i * (1 - s),
          g: i * (1 + s * (3 / (2 - f3) - 1)),
          b: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1))
        };
        break;
      case 3:
        res = {
          r: i * (1 - s),
          g: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
          b: i * (1 + s * (3 / (2 - f3) - 1))
        };
        break;
      case 4:
        res = {
          r: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
          g: i * (1 - s),
          b: i * (1 + s * (3 / (2 - f3) - 1))
        };
        break;
      case 5:
        res = {
          r: i * (1 + s * (3 / (2 - f3) - 1)),
          g: i * (1 - s),
          b: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1))
        };
        break;
      default:
        res = { r: i * (1 - s), g: i * (1 - s), b: i * (1 - s) };
    }
    return res.mode = "rgb", alpha2 !== void 0 && (res.alpha = alpha2), res;
  }

  // node_modules/culori/src/hsi/convertRgbToHsi.js
  function convertRgbToHsi({ r: r2, g, b, alpha: alpha2 }) {
    let M2 = Math.max(r2, g, b), m = Math.min(r2, g, b), res = {
      mode: "hsi",
      s: r2 + g + b === 0 ? 0 : 1 - 3 * m / (r2 + g + b),
      i: (r2 + g + b) / 3
    };
    return M2 - m !== 0 && (res.h = (M2 === r2 ? (g - b) / (M2 - m) + (g < b) * 6 : M2 === g ? (b - r2) / (M2 - m) + 2 : (r2 - g) / (M2 - m) + 4) * 60), alpha2 !== void 0 && (res.alpha = alpha2), res;
  }

  // node_modules/culori/src/hsi/definition.js
  var definition6 = {
    mode: "hsi",
    toMode: {
      rgb: convertHsiToRgb
    },
    parse: ["--hsi"],
    serialize: "--hsi",
    fromMode: {
      rgb: convertRgbToHsi
    },
    channels: ["h", "s", "i", "alpha"],
    ranges: {
      h: [0, 360]
    },
    gamut: "rgb",
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      s: interpolatorLinear,
      i: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueSaturation
    },
    average: {
      h: averageAngle
    }
  }, definition_default6 = definition6;

  // node_modules/culori/src/hsl/convertHslToRgb.js
  function convertHslToRgb({ h, s, l, alpha: alpha2 }) {
    h = normalizeHue_default(h);
    let m1 = l + s * (l < 0.5 ? l : 1 - l), m2 = m1 - (m1 - l) * 2 * Math.abs(h / 60 % 2 - 1), res;
    switch (Math.floor(h / 60)) {
      case 0:
        res = { r: m1, g: m2, b: 2 * l - m1 };
        break;
      case 1:
        res = { r: m2, g: m1, b: 2 * l - m1 };
        break;
      case 2:
        res = { r: 2 * l - m1, g: m1, b: m2 };
        break;
      case 3:
        res = { r: 2 * l - m1, g: m2, b: m1 };
        break;
      case 4:
        res = { r: m2, g: 2 * l - m1, b: m1 };
        break;
      case 5:
        res = { r: m1, g: 2 * l - m1, b: m2 };
        break;
      default:
        res = { r: 2 * l - m1, g: 2 * l - m1, b: 2 * l - m1 };
    }
    return res.mode = "rgb", alpha2 !== void 0 && (res.alpha = alpha2), res;
  }

  // node_modules/culori/src/hsl/convertRgbToHsl.js
  function convertRgbToHsl({ r: r2, g, b, alpha: alpha2 }) {
    let M2 = Math.max(r2, g, b), m = Math.min(r2, g, b), res = {
      mode: "hsl",
      s: M2 === m ? 0 : (M2 - m) / (1 - Math.abs(M2 + m - 1)),
      l: 0.5 * (M2 + m)
    };
    return M2 - m !== 0 && (res.h = (M2 === r2 ? (g - b) / (M2 - m) + (g < b) * 6 : M2 === g ? (b - r2) / (M2 - m) + 2 : (r2 - g) / (M2 - m) + 4) * 60), alpha2 !== void 0 && (res.alpha = alpha2), res;
  }

  // node_modules/culori/src/util/hue.js
  var hueToDeg = (val, unit) => {
    switch (unit) {
      case "deg":
        return +val;
      case "rad":
        return val / Math.PI * 180;
      case "grad":
        return val / 10 * 9;
      case "turn":
        return val * 360;
    }
  }, hue_default = hueToDeg;

  // node_modules/culori/src/hsl/parseHslLegacy.js
  var hsl_old = new RegExp(
    `^hsla?\\(\\s*${hue}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
  ), parseHslLegacy = (color2) => {
    let match = color2.match(hsl_old);
    if (!match)
      return;
    let res = { mode: "hsl" };
    return match[3] !== void 0 ? res.h = +match[3] : match[1] !== void 0 && match[2] !== void 0 && (res.h = hue_default(match[1], match[2])), match[4] !== void 0 && (res.s = Math.min(Math.max(0, match[4] / 100), 1)), match[5] !== void 0 && (res.l = Math.min(Math.max(0, match[5] / 100), 1)), match[6] !== void 0 ? res.alpha = match[6] / 100 : match[7] !== void 0 && (res.alpha = +match[7]), res;
  }, parseHslLegacy_default = parseHslLegacy;

  // node_modules/culori/src/hsl/parseHsl.js
  function parseHsl(color2, parsed) {
    if (!parsed || parsed[0] !== "hsl" && parsed[0] !== "hsla")
      return;
    let res = { mode: "hsl" }, [, h, s, l, alpha2] = parsed;
    if (h.type !== Tok.None) {
      if (h.type === Tok.Percentage)
        return;
      res.h = h.value;
    }
    if (s.type !== Tok.None) {
      if (s.type === Tok.Hue)
        return;
      res.s = s.type === Tok.Number ? s.value : s.value / 100;
    }
    if (l.type !== Tok.None) {
      if (l.type === Tok.Hue)
        return;
      res.l = l.type === Tok.Number ? l.value : l.value / 100;
    }
    return alpha2.type !== Tok.None && (res.alpha = alpha2.type === Tok.Number ? alpha2.value : alpha2.value / 100), res;
  }
  var parseHsl_default = parseHsl;

  // node_modules/culori/src/hsl/definition.js
  var definition7 = {
    mode: "hsl",
    toMode: {
      rgb: convertHslToRgb
    },
    fromMode: {
      rgb: convertRgbToHsl
    },
    channels: ["h", "s", "l", "alpha"],
    ranges: {
      h: [0, 360]
    },
    gamut: "rgb",
    parse: [parseHsl_default, parseHslLegacy_default],
    serialize: (c4) => `hsl(${c4.h || 0} ${c4.s !== void 0 ? c4.s * 100 + "%" : "none"} ${c4.l !== void 0 ? c4.l * 100 + "%" : "none"}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      s: interpolatorLinear,
      l: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueSaturation
    },
    average: {
      h: averageAngle
    }
  }, definition_default7 = definition7;

  // node_modules/culori/src/hsv/convertHsvToRgb.js
  function convertHsvToRgb({ h, s, v, alpha: alpha2 }) {
    h = normalizeHue_default(h);
    let f3 = Math.abs(h / 60 % 2 - 1), res;
    switch (Math.floor(h / 60)) {
      case 0:
        res = { r: v, g: v * (1 - s * f3), b: v * (1 - s) };
        break;
      case 1:
        res = { r: v * (1 - s * f3), g: v, b: v * (1 - s) };
        break;
      case 2:
        res = { r: v * (1 - s), g: v, b: v * (1 - s * f3) };
        break;
      case 3:
        res = { r: v * (1 - s), g: v * (1 - s * f3), b: v };
        break;
      case 4:
        res = { r: v * (1 - s * f3), g: v * (1 - s), b: v };
        break;
      case 5:
        res = { r: v, g: v * (1 - s), b: v * (1 - s * f3) };
        break;
      default:
        res = { r: v * (1 - s), g: v * (1 - s), b: v * (1 - s) };
    }
    return res.mode = "rgb", alpha2 !== void 0 && (res.alpha = alpha2), res;
  }

  // node_modules/culori/src/hsv/convertRgbToHsv.js
  function convertRgbToHsv({ r: r2, g, b, alpha: alpha2 }) {
    let M2 = Math.max(r2, g, b), m = Math.min(r2, g, b), res = {
      mode: "hsv",
      s: M2 === 0 ? 0 : 1 - m / M2,
      v: M2
    };
    return M2 - m !== 0 && (res.h = (M2 === r2 ? (g - b) / (M2 - m) + (g < b) * 6 : M2 === g ? (b - r2) / (M2 - m) + 2 : (r2 - g) / (M2 - m) + 4) * 60), alpha2 !== void 0 && (res.alpha = alpha2), res;
  }

  // node_modules/culori/src/hsv/definition.js
  var definition8 = {
    mode: "hsv",
    toMode: {
      rgb: convertHsvToRgb
    },
    parse: ["--hsv"],
    serialize: "--hsv",
    fromMode: {
      rgb: convertRgbToHsv
    },
    channels: ["h", "s", "v", "alpha"],
    ranges: {
      h: [0, 360]
    },
    gamut: "rgb",
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      s: interpolatorLinear,
      v: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueSaturation
    },
    average: {
      h: averageAngle
    }
  }, definition_default8 = definition8;

  // node_modules/culori/src/hwb/convertHwbToRgb.js
  function convertHwbToRgb({ h, w, b, alpha: alpha2 }) {
    if (w + b > 1) {
      let s = w + b;
      w /= s, b /= s;
    }
    return convertHsvToRgb({
      h,
      s: b === 1 ? 1 : 1 - w / (1 - b),
      v: 1 - b,
      alpha: alpha2
    });
  }

  // node_modules/culori/src/hwb/convertRgbToHwb.js
  function convertRgbToHwb(rgba) {
    let hsv3 = convertRgbToHsv(rgba);
    if (hsv3 === void 0)
      return;
    let res = {
      mode: "hwb",
      w: (1 - hsv3.s) * hsv3.v,
      b: 1 - hsv3.v
    };
    return hsv3.h !== void 0 && (res.h = hsv3.h), hsv3.alpha !== void 0 && (res.alpha = hsv3.alpha), res;
  }

  // node_modules/culori/src/hwb/parseHwb.js
  function ParseHwb(color2, parsed) {
    if (!parsed || parsed[0] !== "hwb")
      return;
    let res = { mode: "hwb" }, [, h, w, b, alpha2] = parsed;
    if (h.type !== Tok.None) {
      if (h.type === Tok.Percentage)
        return;
      res.h = h.value;
    }
    if (w.type !== Tok.None) {
      if (w.type === Tok.Hue)
        return;
      res.w = w.type === Tok.Number ? w.value : w.value / 100;
    }
    if (b.type !== Tok.None) {
      if (b.type === Tok.Hue)
        return;
      res.b = b.type === Tok.Number ? b.value : b.value / 100;
    }
    return alpha2.type !== Tok.None && (res.alpha = alpha2.type === Tok.Number ? alpha2.value : alpha2.value / 100), res;
  }
  var parseHwb_default = ParseHwb;

  // node_modules/culori/src/hwb/definition.js
  var definition9 = {
    mode: "hwb",
    toMode: {
      rgb: convertHwbToRgb
    },
    fromMode: {
      rgb: convertRgbToHwb
    },
    channels: ["h", "w", "b", "alpha"],
    ranges: {
      h: [0, 360]
    },
    gamut: "rgb",
    parse: [parseHwb_default],
    serialize: (c4) => `hwb(${c4.h || 0} ${c4.w * 100}% ${c4.b * 100}%${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      w: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueNaive
    },
    average: {
      h: averageAngle
    }
  }, definition_default9 = definition9;

  // node_modules/culori/src/jab/convertXyz65ToJab.js
  var n = 0.1593017578125, p = 134.03437499999998, c1 = 0.8359375, c2 = 18.8515625, c3 = 18.6875, d0 = 16295499532821565e-27, pq = (v) => {
    let vn3 = Math.pow(v / 1e4, n);
    return Math.pow((c1 + c2 * vn3) / (1 + c3 * vn3), p) || 0;
  }, abs = (v) => Math.max(v * 203, 0), convertXyz65ToJab = ({ x, y, z, alpha: alpha2 }) => {
    x = abs(x), y = abs(y), z = abs(z);
    let xp = 1.15 * x - 0.15 * z, yp = 0.66 * y + 0.34 * x, l = pq(0.41478972 * xp + 0.579999 * yp + 0.014648 * z), m = pq(-0.20151 * xp + 1.120649 * yp + 0.0531008 * z), s = pq(-0.0166008 * xp + 0.2648 * yp + 0.6684799 * z), i = (l + m) / 2, res = {
      mode: "jab",
      j: 0.44 * i / (1 - 0.56 * i) - d0,
      a: 3.524 * l - 4.066708 * m + 0.542708 * s,
      b: 0.199076 * l + 1.096799 * m - 1.295875 * s
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz65ToJab_default = convertXyz65ToJab;

  // node_modules/culori/src/jab/convertJabToXyz65.js
  var n2 = 0.1593017578125, p2 = 134.03437499999998, c12 = 0.8359375, c22 = 18.8515625, c32 = 18.6875, d02 = 16295499532821565e-27, pq_inv = (v) => {
    let vp = Math.pow(v, 1 / p2);
    return 1e4 * Math.pow((c12 - vp) / (c32 * vp - c22), 1 / n2) || 0;
  }, rel = (v) => v / 203, convertJabToXyz65 = ({ j, a, b, alpha: alpha2 }) => {
    let i = (j + d02) / (0.44 + 0.56 * (j + d02)), l = pq_inv(i + 0.13860504 * a + 0.058047316 * b), m = pq_inv(i - 0.13860504 * a - 0.058047316 * b), s = pq_inv(i - 0.096019242 * a - 0.8118919 * b), res = {
      mode: "xyz65",
      x: rel(
        1.661373024652174 * l - 0.914523081304348 * m + 0.23136208173913045 * s
      ),
      y: rel(
        -0.3250758611844533 * l + 1.571847026732543 * m - 0.21825383453227928 * s
      ),
      z: rel(-0.090982811 * l - 0.31272829 * m + 1.5227666 * s)
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertJabToXyz65_default = convertJabToXyz65;

  // node_modules/culori/src/jab/convertRgbToJab.js
  var convertRgbToJab = (rgb5) => {
    let res = convertXyz65ToJab_default(convertRgbToXyz65_default(rgb5));
    return rgb5.r === rgb5.b && rgb5.b === rgb5.g && (res.a = res.b = 0), res;
  }, convertRgbToJab_default = convertRgbToJab;

  // node_modules/culori/src/jab/convertJabToRgb.js
  var convertJabToRgb = (color2) => convertXyz65ToRgb_default(convertJabToXyz65_default(color2)), convertJabToRgb_default = convertJabToRgb;

  // node_modules/culori/src/jab/definition.js
  var definition10 = {
    mode: "jab",
    channels: ["j", "a", "b", "alpha"],
    parse: ["--jzazbz"],
    serialize: "--jzazbz",
    fromMode: {
      rgb: convertRgbToJab_default,
      xyz65: convertXyz65ToJab_default
    },
    toMode: {
      rgb: convertJabToRgb_default,
      xyz65: convertJabToXyz65_default
    },
    ranges: {
      j: [0, 0.222],
      a: [-0.109, 0.129],
      b: [-0.185, 0.134]
    },
    interpolate: {
      j: interpolatorLinear,
      a: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  }, definition_default10 = definition10;

  // node_modules/culori/src/jch/convertJabToJch.js
  var convertJabToJch = ({ j, a, b, alpha: alpha2 }) => {
    let c4 = Math.sqrt(a * a + b * b), res = {
      mode: "jch",
      j,
      c: c4
    };
    return c4 && (res.h = normalizeHue_default(Math.atan2(b, a) * 180 / Math.PI)), alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertJabToJch_default = convertJabToJch;

  // node_modules/culori/src/jch/convertJchToJab.js
  var convertJchToJab = ({ j, c: c4, h, alpha: alpha2 }) => {
    let res = {
      mode: "jab",
      j,
      a: c4 ? c4 * Math.cos(h / 180 * Math.PI) : 0,
      b: c4 ? c4 * Math.sin(h / 180 * Math.PI) : 0
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertJchToJab_default = convertJchToJab;

  // node_modules/culori/src/jch/definition.js
  var definition11 = {
    mode: "jch",
    parse: ["--jzczhz"],
    serialize: "--jzczhz",
    toMode: {
      jab: convertJchToJab_default,
      rgb: (c4) => convertJabToRgb_default(convertJchToJab_default(c4))
    },
    fromMode: {
      rgb: (c4) => convertJabToJch_default(convertRgbToJab_default(c4)),
      jab: convertJabToJch_default
    },
    channels: ["j", "c", "h", "alpha"],
    ranges: {
      j: [0, 0.221],
      c: [0, 0.19],
      h: [0, 360]
    },
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      c: interpolatorLinear,
      j: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueChroma
    },
    average: {
      h: averageAngle
    }
  }, definition_default11 = definition11;

  // node_modules/culori/src/xyz50/constants.js
  var k3 = Math.pow(29, 3) / Math.pow(3, 3), e3 = Math.pow(6, 3) / Math.pow(29, 3);

  // node_modules/culori/src/lab/convertLabToXyz50.js
  var fn4 = (v) => Math.pow(v, 3) > e3 ? Math.pow(v, 3) : (116 * v - 16) / k3, convertLabToXyz50 = ({ l, a, b, alpha: alpha2 }) => {
    let fy = (l + 16) / 116, fx = a / 500 + fy, fz = fy - b / 200, res = {
      mode: "xyz50",
      x: fn4(fx) * D50.X,
      y: fn4(fy) * D50.Y,
      z: fn4(fz) * D50.Z
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertLabToXyz50_default = convertLabToXyz50;

  // node_modules/culori/src/xyz50/convertXyz50ToRgb.js
  var convertXyz50ToRgb = ({ x, y, z, alpha: alpha2 }) => {
    let res = convertLrgbToRgb_default({
      r: x * 3.1341359569958707 - y * 1.6173863321612538 - 0.4906619460083532 * z,
      g: x * -0.978795502912089 + y * 1.916254567259524 + 0.03344273116131949 * z,
      b: x * 0.07195537988411677 - y * 0.2289768264158322 + 1.405386058324125 * z
    });
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz50ToRgb_default = convertXyz50ToRgb;

  // node_modules/culori/src/lab/convertLabToRgb.js
  var convertLabToRgb = (lab3) => convertXyz50ToRgb_default(convertLabToXyz50_default(lab3)), convertLabToRgb_default = convertLabToRgb;

  // node_modules/culori/src/xyz50/convertRgbToXyz50.js
  var convertRgbToXyz50 = (rgb5) => {
    let { r: r2, g, b, alpha: alpha2 } = convertRgbToLrgb_default(rgb5), res = {
      mode: "xyz50",
      x: 0.436065742824811 * r2 + 0.3851514688337912 * g + 0.14307845442264197 * b,
      y: 0.22249319175623702 * r2 + 0.7168870538238823 * g + 0.06061979053616537 * b,
      z: 0.013923904500943465 * r2 + 0.09708128566574634 * g + 0.7140993584005155 * b
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertRgbToXyz50_default = convertRgbToXyz50;

  // node_modules/culori/src/lab/convertXyz50ToLab.js
  var f2 = (value) => value > e3 ? Math.cbrt(value) : (k3 * value + 16) / 116, convertXyz50ToLab = ({ x, y, z, alpha: alpha2 }) => {
    let f0 = f2(x / D50.X), f1 = f2(y / D50.Y), f22 = f2(z / D50.Z), res = {
      mode: "lab",
      l: 116 * f1 - 16,
      a: 500 * (f0 - f1),
      b: 200 * (f1 - f22)
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz50ToLab_default = convertXyz50ToLab;

  // node_modules/culori/src/lab/convertRgbToLab.js
  var convertRgbToLab = (rgb5) => {
    let res = convertXyz50ToLab_default(convertRgbToXyz50_default(rgb5));
    return rgb5.r === rgb5.b && rgb5.b === rgb5.g && (res.a = res.b = 0), res;
  }, convertRgbToLab_default = convertRgbToLab;

  // node_modules/culori/src/lab/parseLab.js
  function parseLab(color2, parsed) {
    if (!parsed || parsed[0] !== "lab")
      return;
    let res = { mode: "lab" }, [, l, a, b, alpha2] = parsed;
    if (!(l.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue))
      return l.type !== Tok.None && (res.l = l.value), a.type !== Tok.None && (res.a = a.type === Tok.Number ? a.value : a.value * 125 / 100), b.type !== Tok.None && (res.b = b.type === Tok.Number ? b.value : b.value * 125 / 100), alpha2.type !== Tok.None && (res.alpha = alpha2.type === Tok.Number ? alpha2.value : alpha2.value / 100), res;
  }
  var parseLab_default = parseLab;

  // node_modules/culori/src/lab/definition.js
  var definition12 = {
    mode: "lab",
    toMode: {
      xyz50: convertLabToXyz50_default,
      rgb: convertLabToRgb_default
    },
    fromMode: {
      xyz50: convertXyz50ToLab_default,
      rgb: convertRgbToLab_default
    },
    channels: ["l", "a", "b", "alpha"],
    ranges: {
      l: [0, 100],
      a: [-100, 100],
      b: [-100, 100]
    },
    parse: [parseLab_default],
    serialize: (c4) => `lab(${c4.l !== void 0 ? c4.l : "none"} ${c4.a !== void 0 ? c4.a : "none"} ${c4.b !== void 0 ? c4.b : "none"}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
    interpolate: {
      l: interpolatorLinear,
      a: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  }, definition_default12 = definition12;

  // node_modules/culori/src/lab65/definition.js
  var definition13 = {
    ...definition_default12,
    mode: "lab65",
    parse: ["--lab-d65"],
    serialize: "--lab-d65",
    toMode: {
      xyz65: convertLab65ToXyz65_default,
      rgb: convertLab65ToRgb_default
    },
    fromMode: {
      xyz65: convertXyz65ToLab65_default,
      rgb: convertRgbToLab65_default
    },
    ranges: {
      l: [0, 100],
      a: [-86.182, 98.234],
      b: [-107.86, 94.477]
    }
  }, definition_default13 = definition13;

  // node_modules/culori/src/lch/parseLch.js
  function parseLch(color2, parsed) {
    if (!parsed || parsed[0] !== "lch")
      return;
    let res = { mode: "lch" }, [, l, c4, h, alpha2] = parsed;
    if (l.type !== Tok.None) {
      if (l.type === Tok.Hue)
        return;
      res.l = l.value;
    }
    if (c4.type !== Tok.None && (res.c = Math.max(
      0,
      c4.type === Tok.Number ? c4.value : c4.value * 150 / 100
    )), h.type !== Tok.None) {
      if (h.type === Tok.Percentage)
        return;
      res.h = h.value;
    }
    return alpha2.type !== Tok.None && (res.alpha = alpha2.type === Tok.Number ? alpha2.value : alpha2.value / 100), res;
  }
  var parseLch_default = parseLch;

  // node_modules/culori/src/lch/definition.js
  var definition14 = {
    mode: "lch",
    toMode: {
      lab: convertLchToLab_default,
      rgb: (c4) => convertLabToRgb_default(convertLchToLab_default(c4))
    },
    fromMode: {
      rgb: (c4) => convertLabToLch_default(convertRgbToLab_default(c4)),
      lab: convertLabToLch_default
    },
    channels: ["l", "c", "h", "alpha"],
    ranges: {
      l: [0, 100],
      c: [0, 150],
      h: [0, 360]
    },
    parse: [parseLch_default],
    serialize: (c4) => `lch(${c4.l !== void 0 ? c4.l : "none"} ${c4.c !== void 0 ? c4.c : "none"} ${c4.h || 0}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      c: interpolatorLinear,
      l: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueChroma
    },
    average: {
      h: averageAngle
    }
  }, definition_default14 = definition14;

  // node_modules/culori/src/lch65/definition.js
  var definition15 = {
    ...definition_default14,
    mode: "lch65",
    parse: ["--lch-d65"],
    serialize: "--lch-d65",
    toMode: {
      lab65: (c4) => convertLchToLab_default(c4, "lab65"),
      rgb: (c4) => convertLab65ToRgb_default(convertLchToLab_default(c4, "lab65"))
    },
    fromMode: {
      rgb: (c4) => convertLabToLch_default(convertRgbToLab65_default(c4), "lch65"),
      lab65: (c4) => convertLabToLch_default(c4, "lch65")
    },
    ranges: {
      l: [0, 100],
      c: [0, 133.807],
      h: [0, 360]
    }
  }, definition_default15 = definition15;

  // node_modules/culori/src/lchuv/convertLuvToLchuv.js
  var convertLuvToLchuv = ({ l, u, v, alpha: alpha2 }) => {
    let c4 = Math.sqrt(u * u + v * v), res = {
      mode: "lchuv",
      l,
      c: c4
    };
    return c4 && (res.h = normalizeHue_default(Math.atan2(v, u) * 180 / Math.PI)), alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertLuvToLchuv_default = convertLuvToLchuv;

  // node_modules/culori/src/lchuv/convertLchuvToLuv.js
  var convertLchuvToLuv = ({ l, c: c4, h, alpha: alpha2 }) => {
    let res = {
      mode: "luv",
      l,
      u: c4 ? c4 * Math.cos(h / 180 * Math.PI) : 0,
      v: c4 ? c4 * Math.sin(h / 180 * Math.PI) : 0
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertLchuvToLuv_default = convertLchuvToLuv;

  // node_modules/culori/src/luv/convertXyz50ToLuv.js
  var u_fn = (x, y, z) => 4 * x / (x + 15 * y + 3 * z), v_fn = (x, y, z) => 9 * y / (x + 15 * y + 3 * z), un = u_fn(D50.X, D50.Y, D50.Z), vn = v_fn(D50.X, D50.Y, D50.Z), l_fn = (value) => value <= e3 ? k3 * value : 116 * Math.cbrt(value) - 16, convertXyz50ToLuv = ({ x, y, z, alpha: alpha2 }) => {
    let l = l_fn(y / D50.Y), u = u_fn(x, y, z), v = v_fn(x, y, z);
    !isFinite(u) || !isFinite(v) ? l = u = v = 0 : (u = 13 * l * (u - un), v = 13 * l * (v - vn));
    let res = {
      mode: "luv",
      l,
      u,
      v
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz50ToLuv_default = convertXyz50ToLuv;

  // node_modules/culori/src/luv/convertLuvToXyz50.js
  var u_fn2 = (x, y, z) => 4 * x / (x + 15 * y + 3 * z), v_fn2 = (x, y, z) => 9 * y / (x + 15 * y + 3 * z), un2 = u_fn2(D50.X, D50.Y, D50.Z), vn2 = v_fn2(D50.X, D50.Y, D50.Z), convertLuvToXyz50 = ({ l, u, v, alpha: alpha2 }) => {
    let up = u / (13 * l) + un2, vp = v / (13 * l) + vn2, y = D50.Y * (l <= 8 ? l / k3 : Math.pow((l + 16) / 116, 3)), x = y * (9 * up) / (4 * vp), z = y * (12 - 3 * up - 20 * vp) / (4 * vp), res = { mode: "xyz50", x, y, z };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertLuvToXyz50_default = convertLuvToXyz50;

  // node_modules/culori/src/lchuv/definition.js
  var convertRgbToLchuv = (rgb5) => convertLuvToLchuv_default(convertXyz50ToLuv_default(convertRgbToXyz50_default(rgb5))), convertLchuvToRgb = (lchuv2) => convertXyz50ToRgb_default(convertLuvToXyz50_default(convertLchuvToLuv_default(lchuv2))), definition16 = {
    mode: "lchuv",
    toMode: {
      luv: convertLchuvToLuv_default,
      rgb: convertLchuvToRgb
    },
    fromMode: {
      rgb: convertRgbToLchuv,
      luv: convertLuvToLchuv_default
    },
    channels: ["l", "c", "h", "alpha"],
    parse: ["--lchuv"],
    serialize: "--lchuv",
    ranges: {
      l: [0, 100],
      c: [0, 176.956],
      h: [0, 360]
    },
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      c: interpolatorLinear,
      l: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueChroma
    },
    average: {
      h: averageAngle
    }
  }, definition_default16 = definition16;

  // node_modules/culori/src/lrgb/definition.js
  var definition17 = {
    ...definition_default,
    mode: "lrgb",
    toMode: {
      rgb: convertLrgbToRgb_default
    },
    fromMode: {
      rgb: convertRgbToLrgb_default
    },
    parse: ["srgb-linear"],
    serialize: "srgb-linear"
  }, definition_default17 = definition17;

  // node_modules/culori/src/luv/definition.js
  var definition18 = {
    mode: "luv",
    toMode: {
      xyz50: convertLuvToXyz50_default,
      rgb: (luv2) => convertXyz50ToRgb_default(convertLuvToXyz50_default(luv2))
    },
    fromMode: {
      xyz50: convertXyz50ToLuv_default,
      rgb: (rgb5) => convertXyz50ToLuv_default(convertRgbToXyz50_default(rgb5))
    },
    channels: ["l", "u", "v", "alpha"],
    parse: ["--luv"],
    serialize: "--luv",
    ranges: {
      l: [0, 100],
      u: [-84.936, 175.042],
      v: [-125.882, 87.243]
    },
    interpolate: {
      l: interpolatorLinear,
      u: interpolatorLinear,
      v: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  }, definition_default18 = definition18;

  // node_modules/culori/src/oklab/convertLrgbToOklab.js
  var convertLrgbToOklab = ({ r: r2, g, b, alpha: alpha2 }) => {
    let L = Math.cbrt(
      0.41222147079999993 * r2 + 0.5363325363 * g + 0.0514459929 * b
    ), M2 = Math.cbrt(
      0.2119034981999999 * r2 + 0.6806995450999999 * g + 0.1073969566 * b
    ), S = Math.cbrt(
      0.08830246189999998 * r2 + 0.2817188376 * g + 0.6299787005000002 * b
    ), res = {
      mode: "oklab",
      l: 0.2104542553 * L + 0.793617785 * M2 - 0.0040720468 * S,
      a: 1.9779984951 * L - 2.428592205 * M2 + 0.4505937099 * S,
      b: 0.0259040371 * L + 0.7827717662 * M2 - 0.808675766 * S
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertLrgbToOklab_default = convertLrgbToOklab;

  // node_modules/culori/src/oklab/convertRgbToOklab.js
  var convertRgbToOklab = (rgb5) => {
    let res = convertLrgbToOklab_default(convertRgbToLrgb_default(rgb5));
    return rgb5.r === rgb5.b && rgb5.b === rgb5.g && (res.a = res.b = 0), res;
  }, convertRgbToOklab_default = convertRgbToOklab;

  // node_modules/culori/src/oklab/convertOklabToLrgb.js
  var convertOklabToLrgb = ({ l, a, b, alpha: alpha2 }) => {
    let L = Math.pow(
      l * 0.9999999984505198 + 0.39633779217376786 * a + 0.2158037580607588 * b,
      3
    ), M2 = Math.pow(
      l * 1.0000000088817609 - 0.10556134232365635 * a - 0.06385417477170591 * b,
      3
    ), S = Math.pow(
      l * 1.0000000546724108 - 0.08948418209496575 * a - 1.2914855378640917 * b,
      3
    ), res = {
      mode: "lrgb",
      r: 4.076741661347994 * L - 3.307711590408193 * M2 + 0.230969928729428 * S,
      g: -1.2684380040921763 * L + 2.6097574006633715 * M2 - 0.3413193963102197 * S,
      b: -0.004196086541837188 * L - 0.7034186144594493 * M2 + 1.7076147009309444 * S
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertOklabToLrgb_default = convertOklabToLrgb;

  // node_modules/culori/src/oklab/convertOklabToRgb.js
  var convertOklabToRgb = (c4) => convertLrgbToRgb_default(convertOklabToLrgb_default(c4)), convertOklabToRgb_default = convertOklabToRgb;

  // node_modules/culori/src/okhsl/helpers.js
  function toe(x) {
    let k_3 = 1.170873786407767;
    return 0.5 * (k_3 * x - 0.206 + Math.sqrt((k_3 * x - 0.206) * (k_3 * x - 0.206) + 4 * 0.03 * k_3 * x));
  }
  function toe_inv(x) {
    let k_3 = 1.170873786407767;
    return (x * x + 0.206 * x) / (k_3 * (x + 0.03));
  }
  function compute_max_saturation(a, b) {
    let k0, k1, k22, k32, k4, wl, wm, ws;
    -1.88170328 * a - 0.80936493 * b > 1 ? (k0 = 1.19086277, k1 = 1.76576728, k22 = 0.59662641, k32 = 0.75515197, k4 = 0.56771245, wl = 4.0767416621, wm = -3.3077115913, ws = 0.2309699292) : 1.81444104 * a - 1.19445276 * b > 1 ? (k0 = 0.73956515, k1 = -0.45954404, k22 = 0.08285427, k32 = 0.1254107, k4 = 0.14503204, wl = -1.2684380046, wm = 2.6097574011, ws = -0.3413193965) : (k0 = 1.35733652, k1 = -915799e-8, k22 = -1.1513021, k32 = -0.50559606, k4 = 692167e-8, wl = -0.0041960863, wm = -0.7034186147, ws = 1.707614701);
    let S = k0 + k1 * a + k22 * b + k32 * a * a + k4 * a * b, k_l = 0.3963377774 * a + 0.2158037573 * b, k_m = -0.1055613458 * a - 0.0638541728 * b, k_s = -0.0894841775 * a - 1.291485548 * b;
    {
      let l_ = 1 + S * k_l, m_ = 1 + S * k_m, s_ = 1 + S * k_s, l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_, l_dS = 3 * k_l * l_ * l_, m_dS = 3 * k_m * m_ * m_, s_dS = 3 * k_s * s_ * s_, l_dS2 = 6 * k_l * k_l * l_, m_dS2 = 6 * k_m * k_m * m_, s_dS2 = 6 * k_s * k_s * s_, f3 = wl * l + wm * m + ws * s, f1 = wl * l_dS + wm * m_dS + ws * s_dS, f22 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2;
      S = S - f3 * f1 / (f1 * f1 - 0.5 * f3 * f22);
    }
    return S;
  }
  function find_cusp(a, b) {
    let S_cusp = compute_max_saturation(a, b), rgb5 = convertOklabToLrgb_default({ l: 1, a: S_cusp * a, b: S_cusp * b }), L_cusp = Math.cbrt(1 / Math.max(rgb5.r, rgb5.g, rgb5.b)), C_cusp = L_cusp * S_cusp;
    return [L_cusp, C_cusp];
  }
  function find_gamut_intersection(a, b, L1, C1, L0, cusp = null) {
    cusp || (cusp = find_cusp(a, b));
    let t;
    if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C1 <= 0)
      t = cusp[1] * L0 / (C1 * cusp[0] + cusp[1] * (L0 - L1));
    else {
      t = cusp[1] * (L0 - 1) / (C1 * (cusp[0] - 1) + cusp[1] * (L0 - L1));
      {
        let dL = L1 - L0, dC = C1, k_l = 0.3963377774 * a + 0.2158037573 * b, k_m = -0.1055613458 * a - 0.0638541728 * b, k_s = -0.0894841775 * a - 1.291485548 * b, l_dt = dL + dC * k_l, m_dt = dL + dC * k_m, s_dt = dL + dC * k_s;
        {
          let L = L0 * (1 - t) + t * L1, C = t * C1, l_ = L + C * k_l, m_ = L + C * k_m, s_ = L + C * k_s, l = l_ * l_ * l_, m = m_ * m_ * m_, s = s_ * s_ * s_, ldt = 3 * l_dt * l_ * l_, mdt = 3 * m_dt * m_ * m_, sdt = 3 * s_dt * s_ * s_, ldt2 = 6 * l_dt * l_dt * l_, mdt2 = 6 * m_dt * m_dt * m_, sdt2 = 6 * s_dt * s_dt * s_, r2 = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s - 1, r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt, r22 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2, u_r = r1 / (r1 * r1 - 0.5 * r2 * r22), t_r = -r2 * u_r, g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s - 1, g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt, g2 = -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2, u_g = g1 / (g1 * g1 - 0.5 * g * g2), t_g = -g * u_g, b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s - 1, b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.707614701 * sdt, b22 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.707614701 * sdt2, u_b = b1 / (b1 * b1 - 0.5 * b2 * b22), t_b = -b2 * u_b;
          t_r = u_r >= 0 ? t_r : 1e6, t_g = u_g >= 0 ? t_g : 1e6, t_b = u_b >= 0 ? t_b : 1e6, t += Math.min(t_r, Math.min(t_g, t_b));
        }
      }
    }
    return t;
  }
  function get_ST_max(a_, b_, cusp = null) {
    cusp || (cusp = find_cusp(a_, b_));
    let L = cusp[0], C = cusp[1];
    return [C / L, C / (1 - L)];
  }
  function get_Cs(L, a_, b_) {
    let cusp = find_cusp(a_, b_), C_max = find_gamut_intersection(a_, b_, L, 1, L, cusp), ST_max = get_ST_max(a_, b_, cusp), S_mid = 0.11516993 + 1 / (7.4477897 + 4.1590124 * b_ + a_ * (-2.19557347 + 1.75198401 * b_ + a_ * (-2.13704948 - 10.02301043 * b_ + a_ * (-4.24894561 + 5.38770819 * b_ + 4.69891013 * a_)))), T_mid = 0.11239642 + 1 / (1.6132032 - 0.68124379 * b_ + a_ * (0.40370612 + 0.90148123 * b_ + a_ * (-0.27087943 + 0.6122399 * b_ + a_ * (299215e-8 - 0.45399568 * b_ - 0.14661872 * a_)))), k4 = C_max / Math.min(L * ST_max[0], (1 - L) * ST_max[1]), C_a = L * S_mid, C_b = (1 - L) * T_mid, C_mid = 0.9 * k4 * Math.sqrt(
      Math.sqrt(
        1 / (1 / (C_a * C_a * C_a * C_a) + 1 / (C_b * C_b * C_b * C_b))
      )
    );
    return C_a = L * 0.4, C_b = (1 - L) * 0.8, [Math.sqrt(1 / (1 / (C_a * C_a) + 1 / (C_b * C_b))), C_mid, C_max];
  }

  // node_modules/culori/src/okhsl/convertOklabToOkhsl.js
  function convertOklabToOkhsl(lab3) {
    let ret = { mode: "okhsl", l: toe(lab3.l) };
    lab3.alpha !== void 0 && (ret.alpha = lab3.alpha);
    let c4 = Math.sqrt(lab3.a * lab3.a + lab3.b * lab3.b);
    if (!c4)
      return ret.s = 0, ret;
    let [C_0, C_mid, C_max] = get_Cs(lab3.l, lab3.a / c4, lab3.b / c4), s;
    if (c4 < C_mid) {
      let k_0 = 0, k_1 = 0.8 * C_0, k_2 = 1 - k_1 / C_mid;
      s = (c4 - k_0) / (k_1 + k_2 * (c4 - k_0)) * 0.8;
    } else {
      let k_0 = C_mid, k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0, k_2 = 1 - k_1 / (C_max - C_mid);
      s = 0.8 + 0.2 * ((c4 - k_0) / (k_1 + k_2 * (c4 - k_0)));
    }
    return s && (ret.s = s, ret.h = normalizeHue_default(Math.atan2(lab3.b, lab3.a) * 180 / Math.PI)), ret;
  }

  // node_modules/culori/src/okhsl/convertOkhslToOklab.js
  function convertOkhslToOklab(hsl3) {
    let l = toe_inv(hsl3.l), ret = { mode: "oklab", l };
    if (hsl3.alpha !== void 0 && (ret.alpha = hsl3.alpha), !hsl3.s || hsl3.l === 1)
      return ret.a = ret.b = 0, ret;
    let a_ = Math.cos(hsl3.h / 180 * Math.PI), b_ = Math.sin(hsl3.h / 180 * Math.PI), [C_0, C_mid, C_max] = get_Cs(l, a_, b_), t, k_0, k_1, k_2;
    hsl3.s < 0.8 ? (t = 1.25 * hsl3.s, k_0 = 0, k_1 = 0.8 * C_0, k_2 = 1 - k_1 / C_mid) : (t = 5 * (hsl3.s - 0.8), k_0 = C_mid, k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0, k_2 = 1 - k_1 / (C_max - C_mid));
    let C = k_0 + t * k_1 / (1 - k_2 * t);
    return ret.a = C * a_, ret.b = C * b_, ret;
  }

  // node_modules/culori/src/okhsl/modeOkhsl.js
  var modeOkhsl = {
    ...definition_default7,
    mode: "okhsl",
    channels: ["h", "s", "l", "alpha"],
    parse: ["--okhsl"],
    serialize: "--okhsl",
    fromMode: {
      oklab: convertOklabToOkhsl,
      rgb: (c4) => convertOklabToOkhsl(convertRgbToOklab_default(c4))
    },
    toMode: {
      oklab: convertOkhslToOklab,
      rgb: (c4) => convertOklabToRgb_default(convertOkhslToOklab(c4))
    }
  }, modeOkhsl_default = modeOkhsl;

  // node_modules/culori/src/okhsv/convertOklabToOkhsv.js
  function convertOklabToOkhsv(lab3) {
    let c4 = Math.sqrt(lab3.a * lab3.a + lab3.b * lab3.b), l = lab3.l, a_ = c4 ? lab3.a / c4 : 1, b_ = c4 ? lab3.b / c4 : 1, [S_max, T] = get_ST_max(a_, b_), S_0 = 0.5, k4 = 1 - S_0 / S_max, t = T / (c4 + l * T), L_v = t * l, C_v = t * c4, L_vt = toe_inv(L_v), C_vt = C_v * L_vt / L_v, rgb_scale = convertOklabToLrgb_default({ l: L_vt, a: a_ * C_vt, b: b_ * C_vt }), scale_L = Math.cbrt(
      1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
    );
    l = l / scale_L, c4 = c4 / scale_L * toe(l) / l, l = toe(l);
    let ret = {
      mode: "okhsv",
      s: c4 ? (S_0 + T) * C_v / (T * S_0 + T * k4 * C_v) : 0,
      v: l ? l / L_v : 0
    };
    return ret.s && (ret.h = normalizeHue_default(Math.atan2(lab3.b, lab3.a) * 180 / Math.PI)), lab3.alpha !== void 0 && (ret.alpha = lab3.alpha), ret;
  }

  // node_modules/culori/src/okhsv/convertOkhsvToOklab.js
  function convertOkhsvToOklab(hsv3) {
    let ret = { mode: "oklab" };
    hsv3.alpha !== void 0 && (ret.alpha = hsv3.alpha);
    let h = hsv3.h || 0, a_ = Math.cos(h / 180 * Math.PI), b_ = Math.sin(h / 180 * Math.PI), [S_max, T] = get_ST_max(a_, b_), S_0 = 0.5, k4 = 1 - S_0 / S_max, L_v = 1 - hsv3.s * S_0 / (S_0 + T - T * k4 * hsv3.s), C_v = hsv3.s * T * S_0 / (S_0 + T - T * k4 * hsv3.s), L_vt = toe_inv(L_v), C_vt = C_v * L_vt / L_v, rgb_scale = convertOklabToLrgb_default({
      l: L_vt,
      a: a_ * C_vt,
      b: b_ * C_vt
    }), scale_L = Math.cbrt(
      1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
    ), L_new = toe_inv(hsv3.v * L_v), C = C_v * L_new / L_v;
    return ret.l = L_new * scale_L, ret.a = C * a_ * scale_L, ret.b = C * b_ * scale_L, ret;
  }

  // node_modules/culori/src/okhsv/modeOkhsv.js
  var modeOkhsv = {
    ...definition_default8,
    mode: "okhsv",
    channels: ["h", "s", "v", "alpha"],
    parse: ["--okhsv"],
    serialize: "--okhsv",
    fromMode: {
      oklab: convertOklabToOkhsv,
      rgb: (c4) => convertOklabToOkhsv(convertRgbToOklab_default(c4))
    },
    toMode: {
      oklab: convertOkhsvToOklab,
      rgb: (c4) => convertOklabToRgb_default(convertOkhsvToOklab(c4))
    }
  }, modeOkhsv_default = modeOkhsv;

  // node_modules/culori/src/oklab/parseOklab.js
  function parseOklab(color2, parsed) {
    if (!parsed || parsed[0] !== "oklab")
      return;
    let res = { mode: "oklab" }, [, l, a, b, alpha2] = parsed;
    if (!(l.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue))
      return l.type !== Tok.None && (res.l = l.type === Tok.Number ? l.value : l.value / 100), a.type !== Tok.None && (res.a = a.type === Tok.Number ? a.value : a.value * 0.4 / 100), b.type !== Tok.None && (res.b = b.type === Tok.Number ? b.value : b.value * 0.4 / 100), alpha2.type !== Tok.None && (res.alpha = alpha2.type === Tok.Number ? alpha2.value : alpha2.value / 100), res;
  }
  var parseOklab_default = parseOklab;

  // node_modules/culori/src/oklab/definition.js
  var definition19 = {
    ...definition_default12,
    mode: "oklab",
    toMode: {
      lrgb: convertOklabToLrgb_default,
      rgb: convertOklabToRgb_default
    },
    fromMode: {
      lrgb: convertLrgbToOklab_default,
      rgb: convertRgbToOklab_default
    },
    ranges: {
      l: [0, 1],
      a: [-0.4, 0.4],
      b: [-0.4, 0.4]
    },
    parse: [parseOklab_default],
    serialize: (c4) => `oklab(${c4.l !== void 0 ? c4.l : "none"} ${c4.a !== void 0 ? c4.a : "none"} ${c4.b !== void 0 ? c4.b : "none"}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`
  }, definition_default19 = definition19;

  // node_modules/culori/src/oklch/parseOklch.js
  function parseOklch(color2, parsed) {
    if (!parsed || parsed[0] !== "oklch")
      return;
    let res = { mode: "oklch" }, [, l, c4, h, alpha2] = parsed;
    if (l.type !== Tok.None) {
      if (l.type === Tok.Hue)
        return;
      res.l = l.type === Tok.Number ? l.value : l.value / 100;
    }
    if (c4.type !== Tok.None && (res.c = Math.max(
      0,
      c4.type === Tok.Number ? c4.value : c4.value * 0.4 / 100
    )), h.type !== Tok.None) {
      if (h.type === Tok.Percentage)
        return;
      res.h = h.value;
    }
    return alpha2.type !== Tok.None && (res.alpha = alpha2.type === Tok.Number ? alpha2.value : alpha2.value / 100), res;
  }
  var parseOklch_default = parseOklch;

  // node_modules/culori/src/oklch/definition.js
  var definition20 = {
    ...definition_default14,
    mode: "oklch",
    toMode: {
      oklab: (c4) => convertLchToLab_default(c4, "oklab"),
      rgb: (c4) => convertOklabToRgb_default(convertLchToLab_default(c4, "oklab"))
    },
    fromMode: {
      rgb: (c4) => convertLabToLch_default(convertRgbToOklab_default(c4), "oklch"),
      oklab: (c4) => convertLabToLch_default(c4, "oklch")
    },
    parse: [parseOklch_default],
    serialize: (c4) => `oklch(${c4.l !== void 0 ? c4.l : "none"} ${c4.c !== void 0 ? c4.c : "none"} ${c4.h || 0}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
    ranges: {
      l: [0, 1],
      c: [0, 0.4],
      h: [0, 360]
    }
  }, definition_default20 = definition20;

  // node_modules/culori/src/p3/convertP3ToXyz65.js
  var convertP3ToXyz65 = (rgb5) => {
    let { r: r2, g, b, alpha: alpha2 } = convertRgbToLrgb_default(rgb5), res = {
      mode: "xyz65",
      x: 0.486570948648216 * r2 + 0.265667693169093 * g + 0.1982172852343625 * b,
      y: 0.2289745640697487 * r2 + 0.6917385218365062 * g + 0.079286914093745 * b,
      z: 0 * r2 + 0.0451133818589026 * g + 1.043944368900976 * b
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertP3ToXyz65_default = convertP3ToXyz65;

  // node_modules/culori/src/p3/convertXyz65ToP3.js
  var convertXyz65ToP3 = ({ x, y, z, alpha: alpha2 }) => {
    let res = convertLrgbToRgb_default(
      {
        r: x * 2.4934969119414263 - y * 0.9313836179191242 - 0.402710784450717 * z,
        g: x * -0.8294889695615749 + y * 1.7626640603183465 + 0.0236246858419436 * z,
        b: x * 0.0358458302437845 - y * 0.0761723892680418 + 0.9568845240076871 * z
      },
      "p3"
    );
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz65ToP3_default = convertXyz65ToP3;

  // node_modules/culori/src/p3/definition.js
  var definition21 = {
    ...definition_default,
    mode: "p3",
    parse: ["display-p3"],
    serialize: "display-p3",
    fromMode: {
      rgb: (color2) => convertXyz65ToP3_default(convertRgbToXyz65_default(color2)),
      xyz65: convertXyz65ToP3_default
    },
    toMode: {
      rgb: (color2) => convertXyz65ToRgb_default(convertP3ToXyz65_default(color2)),
      xyz65: convertP3ToXyz65_default
    }
  }, definition_default21 = definition21;

  // node_modules/culori/src/prophoto/convertXyz50ToProphoto.js
  var gamma2 = (v) => {
    let abs4 = Math.abs(v);
    return abs4 >= 1953125e-9 ? Math.sign(v) * Math.pow(abs4, 0.5555555555555556) : 16 * v;
  }, convertXyz50ToProphoto = ({ x, y, z, alpha: alpha2 }) => {
    let res = {
      mode: "prophoto",
      r: gamma2(
        x * 1.3457868816471585 - y * 0.2555720873797946 - 0.0511018649755453 * z
      ),
      g: gamma2(
        x * -0.5446307051249019 + y * 1.5082477428451466 + 0.0205274474364214 * z
      ),
      b: gamma2(x * 0 + y * 0 + 1.2119675456389452 * z)
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz50ToProphoto_default = convertXyz50ToProphoto;

  // node_modules/culori/src/prophoto/convertProphotoToXyz50.js
  var linearize2 = (v) => {
    let abs4 = Math.abs(v);
    return abs4 >= 0.03125 ? Math.sign(v) * Math.pow(abs4, 1.8) : v / 16;
  }, convertProphotoToXyz50 = (prophoto3) => {
    let r2 = linearize2(prophoto3.r), g = linearize2(prophoto3.g), b = linearize2(prophoto3.b), res = {
      mode: "xyz50",
      x: 0.7977666449006423 * r2 + 0.1351812974005331 * g + 0.0313477341283922 * b,
      y: 0.2880748288194013 * r2 + 0.7118352342418731 * g + 899369387256e-16 * b,
      z: 0 * r2 + 0 * g + 0.8251046025104602 * b
    };
    return prophoto3.alpha !== void 0 && (res.alpha = prophoto3.alpha), res;
  }, convertProphotoToXyz50_default = convertProphotoToXyz50;

  // node_modules/culori/src/prophoto/definition.js
  var definition22 = {
    ...definition_default,
    mode: "prophoto",
    parse: ["prophoto-rgb"],
    serialize: "prophoto-rgb",
    fromMode: {
      xyz50: convertXyz50ToProphoto_default,
      rgb: (color2) => convertXyz50ToProphoto_default(convertRgbToXyz50_default(color2))
    },
    toMode: {
      xyz50: convertProphotoToXyz50_default,
      rgb: (color2) => convertXyz50ToRgb_default(convertProphotoToXyz50_default(color2))
    }
  }, definition_default22 = definition22;

  // node_modules/culori/src/rec2020/convertXyz65ToRec2020.js
  var \u03B1 = 1.09929682680944, \u03B2 = 0.018053968510807, gamma3 = (v) => {
    let abs4 = Math.abs(v);
    return abs4 > \u03B2 ? (Math.sign(v) || 1) * (\u03B1 * Math.pow(abs4, 0.45) - (\u03B1 - 1)) : 4.5 * v;
  }, convertXyz65ToRec2020 = ({ x, y, z, alpha: alpha2 }) => {
    let res = {
      mode: "rec2020",
      r: gamma3(
        x * 1.7166511879712683 - y * 0.3556707837763925 - 0.2533662813736599 * z
      ),
      g: gamma3(
        x * -0.6666843518324893 + y * 1.6164812366349395 + 0.0157685458139111 * z
      ),
      b: gamma3(
        x * 0.0176398574453108 - y * 0.0427706132578085 + 0.9421031212354739 * z
      )
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz65ToRec2020_default = convertXyz65ToRec2020;

  // node_modules/culori/src/rec2020/convertRec2020ToXyz65.js
  var \u03B12 = 1.09929682680944, \u03B22 = 0.018053968510807, linearize3 = (v) => {
    let abs4 = Math.abs(v);
    return abs4 < \u03B22 * 4.5 ? v / 4.5 : (Math.sign(v) || 1) * Math.pow((abs4 + \u03B12 - 1) / \u03B12, 1 / 0.45);
  }, convertRec2020ToXyz65 = (rec20203) => {
    let r2 = linearize3(rec20203.r), g = linearize3(rec20203.g), b = linearize3(rec20203.b), res = {
      mode: "xyz65",
      x: 0.6369580483012911 * r2 + 0.1446169035862083 * g + 0.1688809751641721 * b,
      y: 0.262700212011267 * r2 + 0.6779980715188708 * g + 0.059301716469862 * b,
      z: 0 * r2 + 0.0280726930490874 * g + 1.0609850577107909 * b
    };
    return rec20203.alpha !== void 0 && (res.alpha = rec20203.alpha), res;
  }, convertRec2020ToXyz65_default = convertRec2020ToXyz65;

  // node_modules/culori/src/rec2020/definition.js
  var definition23 = {
    ...definition_default,
    mode: "rec2020",
    fromMode: {
      xyz65: convertXyz65ToRec2020_default,
      rgb: (color2) => convertXyz65ToRec2020_default(convertRgbToXyz65_default(color2))
    },
    toMode: {
      xyz65: convertRec2020ToXyz65_default,
      rgb: (color2) => convertXyz65ToRgb_default(convertRec2020ToXyz65_default(color2))
    },
    parse: ["rec2020"],
    serialize: "rec2020"
  }, definition_default23 = definition23;

  // node_modules/culori/src/xyb/constants.js
  var bias = 0.0037930732552754493, bias_cbrt = Math.cbrt(bias);

  // node_modules/culori/src/xyb/convertRgbToXyb.js
  var transfer = (v) => Math.cbrt(v) - bias_cbrt, convertRgbToXyb = (color2) => {
    let { r: r2, g, b, alpha: alpha2 } = convertRgbToLrgb_default(color2), l = transfer(0.3 * r2 + 0.622 * g + 0.078 * b + bias), m = transfer(0.23 * r2 + 0.692 * g + 0.078 * b + bias), s = transfer(
      0.2434226892454782 * r2 + 0.2047674442449682 * g + 0.5518098665095535 * b + bias
    ), res = {
      mode: "xyb",
      x: (l - m) / 2,
      y: (l + m) / 2,
      /* Apply default chroma from luma (subtract Y from B) */
      b: s - (l + m) / 2
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertRgbToXyb_default = convertRgbToXyb;

  // node_modules/culori/src/xyb/convertXybToRgb.js
  var transfer2 = (v) => Math.pow(v + bias_cbrt, 3), convertXybToRgb = ({ x, y, b, alpha: alpha2 }) => {
    let l = transfer2(x + y) - bias, m = transfer2(y - x) - bias, s = transfer2(b + y) - bias, res = convertLrgbToRgb_default({
      r: 11.031566904639861 * l - 9.866943908131562 * m - 0.16462299650829934 * s,
      g: -3.2541473810744237 * l + 4.418770377582723 * m - 0.16462299650829934 * s,
      b: -3.6588512867136815 * l + 2.7129230459360922 * m + 1.9459282407775895 * s
    });
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXybToRgb_default = convertXybToRgb;

  // node_modules/culori/src/xyb/definition.js
  var definition24 = {
    mode: "xyb",
    channels: ["x", "y", "b", "alpha"],
    parse: ["--xyb"],
    serialize: "--xyb",
    toMode: {
      rgb: convertXybToRgb_default
    },
    fromMode: {
      rgb: convertRgbToXyb_default
    },
    ranges: {
      x: [-0.0154, 0.0281],
      y: [0, 0.8453],
      b: [-0.2778, 0.388]
    },
    interpolate: {
      x: interpolatorLinear,
      y: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  }, definition_default24 = definition24;

  // node_modules/culori/src/xyz50/definition.js
  var definition25 = {
    mode: "xyz50",
    parse: ["xyz-d50"],
    serialize: "xyz-d50",
    toMode: {
      rgb: convertXyz50ToRgb_default,
      lab: convertXyz50ToLab_default
    },
    fromMode: {
      rgb: convertRgbToXyz50_default,
      lab: convertLabToXyz50_default
    },
    channels: ["x", "y", "z", "alpha"],
    ranges: {
      x: [0, 0.964],
      y: [0, 0.999],
      z: [0, 0.825]
    },
    interpolate: {
      x: interpolatorLinear,
      y: interpolatorLinear,
      z: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  }, definition_default25 = definition25;

  // node_modules/culori/src/xyz65/convertXyz65ToXyz50.js
  var convertXyz65ToXyz50 = (xyz653) => {
    let { x, y, z, alpha: alpha2 } = xyz653, res = {
      mode: "xyz50",
      x: 1.0479298208405488 * x + 0.0229467933410191 * y - 0.0501922295431356 * z,
      y: 0.0296278156881593 * x + 0.990434484573249 * y - 0.0170738250293851 * z,
      z: -0.0092430581525912 * x + 0.0150551448965779 * y + 0.7518742899580008 * z
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz65ToXyz50_default = convertXyz65ToXyz50;

  // node_modules/culori/src/xyz65/convertXyz50ToXyz65.js
  var convertXyz50ToXyz65 = (xyz503) => {
    let { x, y, z, alpha: alpha2 } = xyz503, res = {
      mode: "xyz65",
      x: 0.9554734527042182 * x - 0.0230985368742614 * y + 0.0632593086610217 * z,
      y: -0.0283697069632081 * x + 1.0099954580058226 * y + 0.021041398966943 * z,
      z: 0.0123140016883199 * x - 0.0205076964334779 * y + 1.3303659366080753 * z
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertXyz50ToXyz65_default = convertXyz50ToXyz65;

  // node_modules/culori/src/xyz65/definition.js
  var definition26 = {
    mode: "xyz65",
    toMode: {
      rgb: convertXyz65ToRgb_default,
      xyz50: convertXyz65ToXyz50_default
    },
    fromMode: {
      rgb: convertRgbToXyz65_default,
      xyz50: convertXyz50ToXyz65_default
    },
    ranges: {
      x: [0, 0.95],
      y: [0, 1],
      z: [0, 1.088]
    },
    channels: ["x", "y", "z", "alpha"],
    parse: ["xyz", "xyz-d65"],
    serialize: "xyz-d65",
    interpolate: {
      x: interpolatorLinear,
      y: interpolatorLinear,
      z: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  }, definition_default26 = definition26;

  // node_modules/culori/src/yiq/convertRgbToYiq.js
  var convertRgbToYiq = ({ r: r2, g, b, alpha: alpha2 }) => {
    let res = {
      mode: "yiq",
      y: 0.29889531 * r2 + 0.58662247 * g + 0.11448223 * b,
      i: 0.59597799 * r2 - 0.2741761 * g - 0.32180189 * b,
      q: 0.21147017 * r2 - 0.52261711 * g + 0.31114694 * b
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertRgbToYiq_default = convertRgbToYiq;

  // node_modules/culori/src/yiq/convertYiqToRgb.js
  var convertYiqToRgb = ({ y, i, q, alpha: alpha2 }) => {
    let res = {
      mode: "rgb",
      r: y + 0.95608445 * i + 0.6208885 * q,
      g: y - 0.27137664 * i - 0.6486059 * q,
      b: y - 1.10561724 * i + 1.70250126 * q
    };
    return alpha2 !== void 0 && (res.alpha = alpha2), res;
  }, convertYiqToRgb_default = convertYiqToRgb;

  // node_modules/culori/src/yiq/definition.js
  var definition27 = {
    mode: "yiq",
    toMode: {
      rgb: convertYiqToRgb_default
    },
    fromMode: {
      rgb: convertRgbToYiq_default
    },
    channels: ["y", "i", "q", "alpha"],
    parse: ["--yiq"],
    serialize: "--yiq",
    ranges: {
      i: [-0.595, 0.595],
      q: [-0.522, 0.522]
    },
    interpolate: {
      y: interpolatorLinear,
      i: interpolatorLinear,
      q: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  }, definition_default27 = definition27;

  // node_modules/culori/src/round.js
  var r = (value, precision) => Math.round(value * (precision = Math.pow(10, precision))) / precision, round = (precision = 4) => (value) => typeof value == "number" ? r(value, precision) : value, round_default = round;

  // node_modules/culori/src/formatter.js
  var twoDecimals = round_default(2), clamp = (value) => Math.max(0, Math.min(1, value)), fixup = (value) => Math.round(clamp(value) * 255), serializeHex = (color2) => {
    if (color2 === void 0)
      return;
    let r2 = fixup(color2.r), g = fixup(color2.g), b = fixup(color2.b);
    return "#" + (1 << 24 | r2 << 16 | g << 8 | b).toString(16).slice(1);
  }, serializeHex8 = (color2) => {
    if (color2 === void 0)
      return;
    let a = fixup(color2.alpha !== void 0 ? color2.alpha : 1);
    return serializeHex(color2) + (256 | a).toString(16).slice(1);
  };
  var formatHex = (c4) => serializeHex(converter_default("rgb")(c4)), formatHex8 = (c4) => serializeHex8(converter_default("rgb")(c4));

  // node_modules/culori/src/map.js
  var mapper = (fn5, mode2 = "rgb", preserve_mode = !1) => {
    let channels = mode2 ? getMode(mode2).channels : null, conv = mode2 ? converter_default(mode2) : prepare_default;
    return (color2) => {
      let conv_color = conv(color2);
      if (!conv_color)
        return;
      let res = (channels || getMode(conv_color.mode).channels).reduce(
        (res2, ch) => {
          let v = fn5(conv_color[ch], ch, conv_color, mode2);
          return v !== void 0 && !isNaN(v) && (res2[ch] = v), res2;
        },
        { mode: conv_color.mode }
      );
      if (!preserve_mode)
        return res;
      let prep = prepare_default(color2);
      return prep && prep.mode !== res.mode ? converter_default(prep.mode)(res) : res;
    };
  }, mapAlphaMultiply = (v, ch, c4) => ch !== "alpha" ? (v || 0) * (c4.alpha !== void 0 ? c4.alpha : 1) : v, mapAlphaDivide = (v, ch, c4) => ch !== "alpha" && c4.alpha !== 0 ? (v || 0) / (c4.alpha !== void 0 ? c4.alpha : 1) : v;

  // node_modules/culori/src/util/normalizePositions.js
  var normalizePositions = (arr) => {
    arr[0] === void 0 && (arr[0] = 0), arr[arr.length - 1] === void 0 && (arr[arr.length - 1] = 1);
    let i = 1, j, from_idx, from_pos, inc;
    for (; i < arr.length; ) {
      if (arr[i] === void 0) {
        for (from_idx = i, from_pos = arr[i - 1], j = i; arr[j] === void 0; )
          j++;
        for (inc = (arr[j] - from_pos) / (j - i + 1); i < j; )
          arr[i] = from_pos + (i + 1 - from_idx) * inc, i++;
      } else
        arr[i] < arr[i - 1] && (arr[i] = arr[i - 1]);
      i++;
    }
    return arr;
  }, normalizePositions_default = normalizePositions;

  // node_modules/culori/src/easing/midpoint.js
  var midpoint = (H = 0.5) => (t) => H <= 0 ? 1 : H >= 1 ? 0 : Math.pow(t, Math.log(0.5) / Math.log(H)), midpoint_default = midpoint;

  // node_modules/culori/src/interpolate/interpolate.js
  var isfn = (o) => typeof o == "function", isobj = (o) => o && typeof o == "object", isnum = (o) => typeof o == "number", interpolate_fn = (colors2, mode2 = "rgb", overrides, premap) => {
    let def = getMode(mode2), conv = converter_default(mode2), conv_colors = [], positions = [], fns = {};
    colors2.forEach((val) => {
      Array.isArray(val) ? (conv_colors.push(conv(val[0])), positions.push(val[1])) : isnum(val) || isfn(val) ? fns[positions.length] = val : (conv_colors.push(conv(val)), positions.push(void 0));
    }), normalizePositions_default(positions);
    let fixed = def.channels.reduce((res, ch) => {
      let ffn;
      return isobj(overrides) && isobj(overrides[ch]) && overrides[ch].fixup ? ffn = overrides[ch].fixup : isobj(def.interpolate[ch]) && def.interpolate[ch].fixup ? ffn = def.interpolate[ch].fixup : ffn = (v) => v, res[ch] = ffn(conv_colors.map((color2) => color2[ch])), res;
    }, {});
    if (premap) {
      let ccolors = conv_colors.map((color2, idx) => def.channels.reduce(
        (c4, ch) => (c4[ch] = fixed[ch][idx], c4),
        { mode: mode2 }
      ));
      fixed = def.channels.reduce((res, ch) => (res[ch] = ccolors.map((c4) => {
        let v = premap(c4[ch], ch, c4, mode2);
        return isNaN(v) ? void 0 : v;
      }), res), {});
    }
    let interpolators = def.channels.reduce((res, ch) => {
      let ifn;
      return isfn(overrides) ? ifn = overrides : isobj(overrides) && isfn(overrides[ch]) ? ifn = overrides[ch] : isobj(overrides) && isobj(overrides[ch]) && overrides[ch].use ? ifn = overrides[ch].use : isfn(def.interpolate[ch]) ? ifn = def.interpolate[ch] : isobj(def.interpolate[ch]) && (ifn = def.interpolate[ch].use), res[ch] = ifn(fixed[ch]), res;
    }, {}), n3 = conv_colors.length - 1;
    return (t) => {
      if (t = Math.min(Math.max(0, t), 1), t <= positions[0])
        return conv_colors[0];
      if (t > positions[n3])
        return conv_colors[n3];
      let idx = 0;
      for (; positions[idx] < t; )
        idx++;
      let start = positions[idx - 1], delta = positions[idx] - start, P = (t - start) / delta, fn5 = fns[idx] || fns[0];
      fn5 !== void 0 && (isnum(fn5) && (fn5 = midpoint_default((fn5 - start) / delta)), P = fn5(P));
      let t0 = (idx - 1 + P) / n3;
      return def.channels.reduce(
        (res, channel) => {
          let val = interpolators[channel](t0);
          return val !== void 0 && (res[channel] = val), res;
        },
        { mode: mode2 }
      );
    };
  }, interpolate = (colors2, mode2 = "rgb", overrides) => interpolate_fn(colors2, mode2, overrides), interpolateWith = (premap, postmap) => (colors2, mode2 = "rgb", overrides) => {
    let post = postmap ? mapper(postmap, mode2) : void 0, it = interpolate_fn(colors2, mode2, overrides, premap);
    return post ? (t) => post(it(t)) : it;
  }, interpolateWithPremultipliedAlpha = interpolateWith(
    mapAlphaMultiply,
    mapAlphaDivide
  );

  // node_modules/culori/src/interpolate/splineBasis.js
  var mod = (v, l) => (v + l) % l, bspline = (Vim2, Vim1, Vi, Vip1, t) => {
    let t2 = t * t, t3 = t2 * t;
    return ((1 - 3 * t + 3 * t2 - t3) * Vim2 + (4 - 6 * t2 + 3 * t3) * Vim1 + (1 + 3 * t + 3 * t2 - 3 * t3) * Vi + t3 * Vip1) / 6;
  }, interpolatorSplineBasis = (arr) => (t) => {
    let classes = arr.length - 1, i = t >= 1 ? classes - 1 : Math.max(0, Math.floor(t * classes));
    return bspline(
      i > 0 ? arr[i - 1] : 2 * arr[i] - arr[i + 1],
      arr[i],
      arr[i + 1],
      i < classes - 1 ? arr[i + 2] : 2 * arr[i + 1] - arr[i],
      (t - i / classes) * classes
    );
  }, interpolatorSplineBasisClosed = (arr) => (t) => {
    let classes = arr.length - 1, i = Math.floor(t * classes);
    return bspline(
      arr[mod(i - 1, arr.length)],
      arr[mod(i, arr.length)],
      arr[mod(i + 1, arr.length)],
      arr[mod(i + 2, arr.length)],
      (t - i / classes) * classes
    );
  };

  // node_modules/culori/src/interpolate/splineNatural.js
  var solve = (v) => {
    let i, n3 = v.length - 1, c4 = new Array(n3), _v = new Array(n3), sol = new Array(n3);
    for (c4[1] = 1 / 4, _v[1] = (6 * v[1] - v[0]) / 4, i = 2; i < n3; ++i)
      c4[i] = 1 / (4 - c4[i - 1]), _v[i] = (6 * v[i] - (i == n3 - 1 ? v[n3] : 0) - _v[i - 1]) * c4[i];
    for (sol[0] = v[0], sol[n3] = v[n3], n3 - 1 > 0 && (sol[n3 - 1] = _v[n3 - 1]), i = n3 - 2; i > 0; --i)
      sol[i] = _v[i] - c4[i] * sol[i + 1];
    return sol;
  }, interpolatorSplineNatural = (arr) => interpolatorSplineBasis(solve(arr)), interpolatorSplineNaturalClosed = (arr) => interpolatorSplineBasisClosed(solve(arr));

  // node_modules/culori/src/interpolate/splineMonotone.js
  var sgn = Math.sign, min = Math.min, abs2 = Math.abs, mono = (arr) => {
    let n3 = arr.length - 1, s = [], p4 = [], yp = [];
    for (let i = 0; i < n3; i++)
      s.push((arr[i + 1] - arr[i]) * n3), p4.push(i > 0 ? 0.5 * (arr[i + 1] - arr[i - 1]) * n3 : void 0), yp.push(
        i > 0 ? (sgn(s[i - 1]) + sgn(s[i])) * min(abs2(s[i - 1]), abs2(s[i]), 0.5 * abs2(p4[i])) : void 0
      );
    return [s, p4, yp];
  }, interpolator = (arr, yp, s) => {
    let n3 = arr.length - 1, n22 = n3 * n3;
    return (t) => {
      let i;
      t >= 1 ? i = n3 - 1 : i = Math.max(0, Math.floor(t * n3));
      let t1 = t - i / n3, t2 = t1 * t1, t3 = t2 * t1;
      return (yp[i] + yp[i + 1] - 2 * s[i]) * n22 * t3 + (3 * s[i] - 2 * yp[i] - yp[i + 1]) * n3 * t2 + yp[i] * t1 + arr[i];
    };
  }, interpolatorSplineMonotone = (arr) => {
    if (arr.length < 3)
      return interpolatorLinear(arr);
    let n3 = arr.length - 1, [s, , yp] = mono(arr);
    return yp[0] = s[0], yp[n3] = s[n3 - 1], interpolator(arr, yp, s);
  };
  var interpolatorSplineMonotoneClosed = (arr) => {
    let n3 = arr.length - 1, [s, p4, yp] = mono(arr);
    p4[0] = 0.5 * (arr[1] - arr[n3]) * n3, p4[n3] = 0.5 * (arr[0] - arr[n3 - 1]) * n3;
    let s_m1 = (arr[0] - arr[n3]) * n3, s_n = s_m1;
    return yp[0] = (sgn(s_m1) + sgn(s[0])) * min(abs2(s_m1), abs2(s[0]), 0.5 * abs2(p4[0])), yp[n3] = (sgn(s[n3 - 1]) + sgn(s_n)) * min(abs2(s[n3 - 1]), abs2(s_n), 0.5 * abs2(p4[n3])), interpolator(arr, yp, s);
  };

  // node_modules/culori/src/easing/gamma.js
  var gamma4 = (\u03B3 = 1) => \u03B3 === 1 ? (t) => t : (t) => Math.pow(t, \u03B3), gamma_default = gamma4;

  // node_modules/culori/src/samples.js
  var samples = (n3 = 2, \u03B3 = 1) => {
    let ease = gamma_default(\u03B3);
    if (n3 < 2)
      return n3 < 1 ? [] : [ease(0.5)];
    let res = [];
    for (let i = 0; i < n3; i++)
      res.push(ease(i / (n3 - 1)));
    return res;
  }, samples_default = samples;

  // node_modules/culori/src/nearest.js
  var nearest = (colors2, metric = differenceEuclidean(), accessor = (d) => d) => {
    let arr = colors2.map((c4, idx) => ({ color: accessor(c4), i: idx }));
    return (color2, n3 = 1, \u03C4 = 1 / 0) => (isFinite(n3) && (n3 = Math.max(1, Math.min(n3, arr.length - 1))), arr.forEach((c4) => {
      c4.d = metric(color2, c4.color);
    }), arr.sort((a, b) => a.d - b.d).slice(0, n3).filter((c4) => c4.d < \u03C4).map((c4) => colors2[c4.i]));
  }, nearest_default = nearest;

  // node_modules/culori/src/filter.js
  var clamp2 = (v) => Math.max(Math.min(v, 1), 0);
  var matrixGrayscale = (amount) => {
    let a = 1 - clamp2(amount);
    return [
      0.2126 + 0.7874 * a,
      0.7152 - 0.7152 * a,
      0.0722 - 0.0722 * a,
      0,
      0.2126 - 0.2126 * a,
      0.7152 + 0.2848 * a,
      0.0722 - 0.0722 * a,
      0,
      0.2126 - 0.2126 * a,
      0.7152 - 0.7152 * a,
      0.0722 + 0.9278 * a,
      0,
      0,
      0,
      0,
      1
    ];
  };
  var matrix = (values, mode2, preserve_mode = !1) => {
    let conv = converter_default(mode2), channels = getMode(mode2).channels;
    return (color2) => {
      let c4 = conv(color2);
      if (!c4)
        return;
      let res = { mode: mode2 }, ch, count = channels.length;
      for (let i = 0; i < values.length; i++)
        ch = channels[Math.floor(i / count)], c4[ch] !== void 0 && (res[ch] = (res[ch] || 0) + values[i] * (c4[channels[i % count]] || 0));
      if (!preserve_mode)
        return res;
      let prep = prepare_default(color2);
      return prep && res.mode !== prep.mode ? converter_default(prep.mode)(res) : res;
    };
  };
  var filterGrayscale = (amt = 1, mode2 = "rgb") => matrix(matrixGrayscale(amt), mode2, !0);

  // node_modules/culori/src/deficiency.js
  var rgb = converter_default("rgb"), PROT = [
    [1, 0, -0, 0, 1, 0, -0, -0, 1],
    [
      0.856167,
      0.182038,
      -0.038205,
      0.029342,
      0.955115,
      0.015544,
      -288e-5,
      -1563e-6,
      1.004443
    ],
    [
      0.734766,
      0.334872,
      -0.069637,
      0.05184,
      0.919198,
      0.028963,
      -4928e-6,
      -4209e-6,
      1.009137
    ],
    [
      0.630323,
      0.465641,
      -0.095964,
      0.069181,
      0.890046,
      0.040773,
      -6308e-6,
      -7724e-6,
      1.014032
    ],
    [
      0.539009,
      0.579343,
      -0.118352,
      0.082546,
      0.866121,
      0.051332,
      -7136e-6,
      -0.011959,
      1.019095
    ],
    [
      0.458064,
      0.679578,
      -0.137642,
      0.092785,
      0.846313,
      0.060902,
      -7494e-6,
      -0.016807,
      1.024301
    ],
    [
      0.38545,
      0.769005,
      -0.154455,
      0.100526,
      0.829802,
      0.069673,
      -7442e-6,
      -0.02219,
      1.029632
    ],
    [
      0.319627,
      0.849633,
      -0.169261,
      0.106241,
      0.815969,
      0.07779,
      -7025e-6,
      -0.028051,
      1.035076
    ],
    [
      0.259411,
      0.923008,
      -0.18242,
      0.110296,
      0.80434,
      0.085364,
      -6276e-6,
      -0.034346,
      1.040622
    ],
    [
      0.203876,
      0.990338,
      -0.194214,
      0.112975,
      0.794542,
      0.092483,
      -5222e-6,
      -0.041043,
      1.046265
    ],
    [
      0.152286,
      1.052583,
      -0.204868,
      0.114503,
      0.786281,
      0.099216,
      -3882e-6,
      -0.048116,
      1.051998
    ]
  ], DEUTER = [
    [1, 0, -0, 0, 1, 0, -0, -0, 1],
    [
      0.866435,
      0.177704,
      -0.044139,
      0.049567,
      0.939063,
      0.01137,
      -3453e-6,
      7233e-6,
      0.99622
    ],
    [
      0.760729,
      0.319078,
      -0.079807,
      0.090568,
      0.889315,
      0.020117,
      -6027e-6,
      0.013325,
      0.992702
    ],
    [
      0.675425,
      0.43385,
      -0.109275,
      0.125303,
      0.847755,
      0.026942,
      -795e-5,
      0.018572,
      0.989378
    ],
    [
      0.605511,
      0.52856,
      -0.134071,
      0.155318,
      0.812366,
      0.032316,
      -9376e-6,
      0.023176,
      0.9862
    ],
    [
      0.547494,
      0.607765,
      -0.155259,
      0.181692,
      0.781742,
      0.036566,
      -0.01041,
      0.027275,
      0.983136
    ],
    [
      0.498864,
      0.674741,
      -0.173604,
      0.205199,
      0.754872,
      0.039929,
      -0.011131,
      0.030969,
      0.980162
    ],
    [
      0.457771,
      0.731899,
      -0.18967,
      0.226409,
      0.731012,
      0.042579,
      -0.011595,
      0.034333,
      0.977261
    ],
    [
      0.422823,
      0.781057,
      -0.203881,
      0.245752,
      0.709602,
      0.044646,
      -0.011843,
      0.037423,
      0.974421
    ],
    [
      0.392952,
      0.82361,
      -0.216562,
      0.263559,
      0.69021,
      0.046232,
      -0.01191,
      0.040281,
      0.97163
    ],
    [
      0.367322,
      0.860646,
      -0.227968,
      0.280085,
      0.672501,
      0.047413,
      -0.01182,
      0.04294,
      0.968881
    ]
  ], TRIT = [
    [1, 0, -0, 0, 1, 0, -0, -0, 1],
    [
      0.92667,
      0.092514,
      -0.019184,
      0.021191,
      0.964503,
      0.014306,
      8437e-6,
      0.054813,
      0.93675
    ],
    [
      0.89572,
      0.13333,
      -0.02905,
      0.029997,
      0.9454,
      0.024603,
      0.013027,
      0.104707,
      0.882266
    ],
    [
      0.905871,
      0.127791,
      -0.033662,
      0.026856,
      0.941251,
      0.031893,
      0.01341,
      0.148296,
      0.838294
    ],
    [
      0.948035,
      0.08949,
      -0.037526,
      0.014364,
      0.946792,
      0.038844,
      0.010853,
      0.193991,
      0.795156
    ],
    [
      1.017277,
      0.027029,
      -0.044306,
      -6113e-6,
      0.958479,
      0.047634,
      6379e-6,
      0.248708,
      0.744913
    ],
    [
      1.104996,
      -0.046633,
      -0.058363,
      -0.032137,
      0.971635,
      0.060503,
      1336e-6,
      0.317922,
      0.680742
    ],
    [
      1.193214,
      -0.109812,
      -0.083402,
      -0.058496,
      0.97941,
      0.079086,
      -2346e-6,
      0.403492,
      0.598854
    ],
    [
      1.257728,
      -0.139648,
      -0.118081,
      -0.078003,
      0.975409,
      0.102594,
      -3316e-6,
      0.501214,
      0.502102
    ],
    [
      1.278864,
      -0.125333,
      -0.153531,
      -0.084748,
      0.957674,
      0.127074,
      -989e-6,
      0.601151,
      0.399838
    ],
    [
      1.255528,
      -0.076749,
      -0.178779,
      -0.078411,
      0.930809,
      0.147602,
      4733e-6,
      0.691367,
      0.3039
    ]
  ], deficiency = (lut, t) => {
    let tt = Math.max(0, Math.min(1, t)), i = Math.round(tt / 0.1), w = Math.round(tt % 0.1), arr = lut[i];
    if (w > 0 && i < lut.length - 1) {
      let arr_2 = lut[i + 1];
      arr = arr.map((v, idx) => lerp(arr[idx], arr_2[idx], w));
    }
    return (color2) => {
      let c4 = prepare_default(color2);
      if (c4 === void 0)
        return;
      let { r: r2, g, b } = rgb(c4), ret = {
        mode: "rgb",
        r: arr[0] * r2 + arr[1] * g + arr[2] * b,
        g: arr[3] * r2 + arr[4] * g + arr[5] * b,
        b: arr[6] * r2 + arr[7] * g + arr[8] * b
      };
      return c4.alpha !== void 0 && (ret.alpha = c4.alpha), converter_default(c4.mode)(ret);
    };
  }, filterDeficiencyProt = (severity = 1) => deficiency(PROT, severity), filterDeficiencyDeuter = (severity = 1) => deficiency(DEUTER, severity), filterDeficiencyTrit = (severity = 1) => deficiency(TRIT, severity);

  // node_modules/culori/src/easing/smoothstep.js
  var easingSmoothstep = (t) => t * t * (3 - 2 * t);

  // node_modules/culori/src/easing/smootherstep.js
  var smootherstep = (t) => t * t * t * (t * (t * 6 - 15) + 10), smootherstep_default = smootherstep;

  // node_modules/culori/src/wcag.js
  function luminance(color2) {
    let c4 = converter_default("lrgb")(color2);
    return 0.2126 * c4.r + 0.7152 * c4.g + 0.0722 * c4.b;
  }
  function contrast(a, b) {
    let L1 = luminance(a), L2 = luminance(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }

  // node_modules/culori/src/bootstrap/css.js
  var a98 = useMode(definition_default2), hsl = useMode(definition_default7), hsv = useMode(definition_default8), hwb = useMode(definition_default9), lab = useMode(definition_default12), lab65 = useMode(definition_default13), lch = useMode(definition_default14), lch65 = useMode(definition_default15), lrgb = useMode(definition_default17), oklab = useMode(definition_default19), oklch = useMode(definition_default20), p3 = useMode(definition_default21), prophoto = useMode(definition_default22), rec2020 = useMode(definition_default23), rgb2 = useMode(definition_default), xyz50 = useMode(definition_default25), xyz65 = useMode(definition_default26);

  // converters/num2rgb.ts
  var num2rgb = (num3, hex2 = !1) => {
    if (typeof num3 == "number" && num3 >= 0 && num3 <= 16777215) {
      let r2 = num3 >> 16, g = num3 >> 8 & 255, b = num3 & 255, output = {
        r: r2 / 255,
        g: g / 255,
        b: b / 255,
        mode: "rgb"
      };
      return hex2 ? toHex(output) : output;
    } else
      throw Error("unknown num color: " + num3);
  };

  // fp/misc.ts
  var checkArg = (arg, def) => arg || def, getModeChannel = (mode2, key) => mode2.charAt(key);

  // converters/toHex.ts
  var toHex = (color2) => {
    let src = {};
    if (typeof color2 == "string" && !Object.keys(named_default).some((el) => el === color2))
      return color2;
    if (Array.isArray(color2)) {
      let mode2 = color2[0], modeChannels = mode2.substring(mode2.length - 3), channels = (src2, colorArr) => (colorArr.shift(), colorArr.length === 4 && (colorArr = colorArr.slice(0, 3)), colorArr), channelMapper = (src2 = {}, mode3, colorArr) => (src2.mode = mode3, src2.mode === "rgb" ? colorArr.some((ch) => Math.abs(ch) > 1) && colorArr.map(
        (ch, key) => src2[getModeChannel(mode3, key)] = ch / 255
      ) : colorArr.map((ch, key) => src2[getModeChannel(mode3, key)] = ch), src2);
      src.alpha = color2[4] || 1, src = channelMapper(src, modeChannels, channels(src, color2)), src = src.alpha < 1 && formatHex8(src) || formatHex(src);
    } else
      typeof color2 == "number" ? src = num2rgb(color2, !0) : src = formatHex8(color2);
    return src;
  };

  // getters_and_setters/get.ts
  var getChannel = (mc) => (color2) => {
    let [mode2, channel] = mc.split("."), src = converter_default(mode2)(toHex(color2));
    if (channel)
      return src[channel];
    throw Error(`unknown channel ${channel} in mode ${mode2}`);
  };

  // color-maps/samples/hueTemperature.ts
  var hueTemperature_default = {
    "red-purple": {
      warm: [343, 359],
      cool: [321, 342]
    },
    red: {
      warm: [21, 40],
      cool: [0, 20]
    },
    "yellow-red": {
      warm: [41, 54],
      cool: [55, 70]
    },
    yellow: {
      warm: [71, 90],
      cool: [91, 109]
    },
    "green-yellow": {
      warm: [110, 124],
      cool: [125, 140]
    },
    green: {
      warm: [141, 160],
      cool: [161, 180]
    },
    "blue-green": {
      warm: [181, 200],
      cool: [201, 220]
    },
    blue: {
      warm: [221, 235],
      cool: [236, 250]
    },
    "purple-blue": {
      warm: [271, 290],
      cool: [251, 270]
    },
    purple: {
      warm: [316, 320],
      cool: [291, 315]
    }
  };

  // fp/number/comparison.ts
  var gt = (x, y) => x > y, lt = (x, y) => x < y, gte = (x, y) => x >= y, lte = (x, y) => x <= y, eq = (x, y) => x === y;

  // fp/number/random.ts
  var random = (min3, max2) => {
    if (min3 > max2) {
      let mn = min3, mx = max2;
      max2 = mn, min3 = mx;
    } else
      return Math.random() * (max2 - min3) + min3;
  };

  // fp/number/isInteger.ts
  var isInteger = (num3) => /^-?[0-9]+$/.test(num3.toString());

  // fp/number/inRange.ts
  var inRange = (number, start, end) => number >= Math.min(start, end) && number < Math.max(start, end);

  // color-maps/samples/modeRanges.ts
  var modeRanges_default = {
    cubehelix: {
      s: [0, 4.614],
      l: [0, 1]
    },
    lab: {
      l: [0, 100]
    },
    dlch: { l: [0, 100], c: [0, 51.484] },
    jab: {
      j: [0, 0.222]
    },
    jch: {
      j: [0, 0.221],
      c: [0, 0.19]
    },
    lch: { l: [0, 100], c: [0, 150] },
    lch65: { l: [0, 100], c: [0, 133.807] },
    lchuv: { l: [0, 100], c: [0, 176.956] },
    luv: { l: [0, 100] },
    oklab: { l: [0, 1] },
    oklch: { l: [0, 1], c: [0, 0.4] }
  };

  // fp/number/normalize.ts
  var normalize = (value, modeChannel) => {
    let [mode2, channel] = modeChannel.split("."), [start, end] = modeRanges_default[mode2][channel];
    if (!inRange(value, start, end))
      if (inRange(value, 0, 1))
        value = end * value;
      else if (inRange(value, 1))
        value = end * (value / 100);
      else
        throw Error(
          `The value ${value} is out of range for channel ${channel} of colorspace ${mode2} can only accept a value between [0,1] or [0,100] with 0.5 or 50 being half of the channel range.`
        );
    return value;
  };

  // fp/number/floorCeil.ts
  var { ceil, floor } = Math, floorCeil = (num3) => {
    if (!isInteger(num3)) {
      let float = num3.toString().split(".")[1];
      ((float2) => /^[0-4]$/.test(float2.charAt(0)))(float) ? num3 = floor(num3) : num3 = ceil(num3);
    }
    return num3;
  };

  // fp/number/adjustHue.ts
  var adjustHue = (value = 0) => value > 0 ? value += Math.ceil(-value / 360) * 360 : value % 360;

  // fp/number/channelDifference.ts
  var channelDifference = (color2, modeChannel) => (subtrahend) => {
    let cb4 = (color3) => getChannel(modeChannel)(color3);
    return cb4(color2) < cb4(subtrahend) ? cb4(subtrahend) - cb4(color2) : cb4(color2) - cb4(subtrahend);
  };

  // fp/array/min_max.ts
  var identity2 = (value) => value, baseExtremum = (array, iteratee, comparator) => {
    for (var index = -1, length = array.length; ++index < length; ) {
      var value = array[index], current = iteratee(value);
      if (current != null && (computed === void 0 ? current === current : comparator(current, computed)))
        var computed = current, result = value;
    }
    return result;
  }, min2 = (array) => array && array.length ? baseExtremum(array, identity2, lt) : void 0, max = (array) => array && array.length ? baseExtremum(array, identity2, gt) : void 0;

  // fp/object/colorObj.ts
  var colorObj = (factor4, callback) => (color2) => ({ [factor4]: callback(color2), color: color2 });

  // fp/array/colorObjArr.ts
  var colorObjArr = (factor4, callback) => (colors2) => {
    let cb4 = colorObj(factor4, callback);
    return colors2.map((color2) => cb4(color2));
  };

  // fp/array/customSort.ts
  var customSort = (order, factor4) => (factor4 = factor4 || "factor", (a, b) => {
    if (order === "asc")
      return a[factor4] - b[factor4];
    if (order === "desc")
      return b[factor4] - a[factor4];
  });

  // fp/array/filteredArr.ts
  var filteredArr = (factor4, cb4) => (colors2, start, end) => {
    let result;
    if (typeof start == "number")
      result = colorObjArr(
        factor4,
        cb4
      )(colors2).filter((color2) => inRange(color2[factor4], start, end)).map((color2) => color2.color);
    else if (typeof start == "string") {
      let reOperator = /^(>=|<=|<|>)/, val = /[0-9]*\.?[0-9]+/.exec(start)[0], op = reOperator.exec(start)[0], mapFilter = (test) => colorObjArr(
        factor4,
        cb4
      )(colors2).filter((el) => test(el[factor4], parseFloat(val))).map((el) => el.color);
      switch (op) {
        case "<":
          result = mapFilter(lt);
          break;
        case ">":
          result = mapFilter(gt);
          break;
        case "<=":
          result = mapFilter(lte);
          break;
        case ">=":
          result = mapFilter(gte);
          break;
      }
    }
    return result;
  };

  // fp/array/sortedArr.ts
  var sortedArr = (factor4, callback, order, colorObj2 = !1) => (colors2) => {
    let results = colorObjArr(factor4, callback)(colors2);
    return results.sort(customSort(order, factor4)), colorObj2 ? results : results.map((color2) => color2.color);
  };

  // palettes/hueShift.ts
  var lightnessMapper = (n3) => (start1, end1) => (start2, end2) => (n3 - start1) / (end1 - start1) * (end2 - start2) + start2, hueShift = (color2, options) => {
    color2 = useMode(definition_default14)(toHex(color2));
    let { iterations, hueStep, minLightness, maxLightness, easingFunc } = options || {};
    easingFunc = checkArg(easingFunc, easingSmoothstep), iterations = checkArg(iterations, 6) + 1, hueStep = checkArg(hueStep, 5), minLightness = checkArg(minLightness, 10), maxLightness = checkArg(maxLightness, 90);
    let tValues = samples_default(iterations), palette = [color2];
    for (let i = 1; i < iterations; i++) {
      let hueDark = adjustHue(color2.h - hueStep * i), hueLight = adjustHue(color2.h + hueStep * i), lightnessDark = lightnessMapper(easingFunc(tValues[i - 1]))(
        0.1,
        iterations
      )(color2.l, minLightness), lightnessLight = lightnessMapper(easingFunc(tValues[i - 1]))(
        0.05,
        iterations
      )(color2.l, maxLightness);
      palette.push({
        l: lightnessDark,
        c: color2.c,
        h: hueDark,
        mode: "lch"
      }), palette.unshift({
        l: lightnessLight,
        c: color2.c,
        h: hueLight,
        mode: "lch"
      });
    }
    return palette.map(toHex);
  };

  // palettes/base.ts
  var cb2 = (iterations, distance, color2) => samples_default(iterations).map(
    (val) => adjustHue((color2.h + distance) * (val * easingSmoothstep(val)))
  ), scheme = (schemeType) => (color2, easingFunc) => {
    schemeType = schemeType.toLowerCase(), easingFunc = checkArg(easingFunc, easingSmoothstep), color2 = useMode(definition_default14)(color2);
    let lowMin = 0.05, lowMax = 0.495, highMin = 0.5, highMax = 0.995, targetHueSteps = {
      analogous: cb2(3, 12, color2),
      triadic: cb2(3, 120, color2),
      tetradic: cb2(4, 90, color2),
      complementary: cb2(2, 180, color2)
    };
    for (let scheme2 of Object.keys(targetHueSteps))
      targetHueSteps[scheme2].map(
        (step) => random(step * lowMax, step * lowMin) + random(step * highMax, step * highMin) / 2
      );
    return targetHueSteps[schemeType].map((step) => ({
      l: color2.l,
      c: color2.c,
      h: step * easingFunc(1 / targetHueSteps[schemeType].length),
      mode: "lch"
    })).map(toHex);
  };

  // palettes/discoverPalettes.ts
  var { keys } = Object, isColorEqual = (c13, c23) => c13.h === c23.h && c13.l === c23.l && c13.c === c23.c, discoverPalettes = (colors2, schemeType) => {
    let toLch = useMode(definition_default14);
    colors2 = colors2.map((color2) => toLch(toHex(color2)));
    let palettes = {}, schemeKeys = ["analogous", "triadic", "tetradic", "complementary"], targetPalettes = {};
    for (let color2 of colors2) {
      schemeKeys.forEach((s) => targetPalettes[s] = scheme(s)(color2));
      for (let paletteType of keys(targetPalettes)) {
        let palette = [], variance = 0;
        for (let targetColor of targetPalettes[paletteType]) {
          let availableColors = colors2.filter(
            (color1) => !palette.some((color22) => isColorEqual(color1, color22))
          ), match = nearest_default(
            availableColors,
            differenceEuclidean("lch")
          )(targetColor)[0];
          variance += differenceEuclidean("lch")(targetColor, match), palette.push(match);
        }
        (!palettes[paletteType] || variance < palettes[paletteType].variance) && (palettes[paletteType] = palette.map(toHex));
      }
    }
    if (typeof schemeType == "string")
      return palettes[schemeType.toLowerCase()];
    if (typeof schemeType > "u")
      return palettes;
    throw Error(
      `${schemeType} is not a valid scheme. The schemes are triadic | tetradic | analogous | complementary`
    );
  };

  // node_modules/culori/src/index.js
  var a982 = useMode(definition_default2), cubehelix = useMode(definition_default3), dlab = useMode(definition_default4), dlch = useMode(definition_default5), hsi = useMode(definition_default6), hsl2 = useMode(definition_default7), hsv2 = useMode(definition_default8), hwb2 = useMode(definition_default9), jab = useMode(definition_default10), jch = useMode(definition_default11), lab2 = useMode(definition_default12), lab652 = useMode(definition_default13), lch2 = useMode(definition_default14), lch652 = useMode(definition_default15), lchuv = useMode(definition_default16), lrgb2 = useMode(definition_default17), luv = useMode(definition_default18), okhsl = useMode(modeOkhsl_default), okhsv = useMode(modeOkhsv_default), oklab2 = useMode(definition_default19), oklch2 = useMode(definition_default20), p32 = useMode(definition_default21), prophoto2 = useMode(definition_default22), rec20202 = useMode(definition_default23), rgb3 = useMode(definition_default), xyb = useMode(definition_default24), xyz502 = useMode(definition_default25), xyz652 = useMode(definition_default26), yiq = useMode(definition_default27);

  // fp/defaults.ts
  var {
    chromaInterpolator,
    hueFixup,
    hueInterpolator,
    lightnessInterpolator
  } = {};
  chromaInterpolator = interpolatorSplineNatural;
  hueFixup = fixupHueShorter;
  hueInterpolator = interpolatorSplineBasisClosed;
  lightnessInterpolator = interpolatorSplineMonotone;
  var interpolatorConfig = {
    chromaInterpolator,
    hueFixup,
    hueInterpolator,
    lightnessInterpolator
  };

  // palettes/earthtone.ts
  var earthtone = (color2, options) => {
    let { iterations, earthtones, easingFunc } = options || {};
    iterations = checkArg(iterations, 1), earthtones = checkArg(earthtones, "dark");
    let base = {
      "light-gray": "#e5e5e5",
      silver: "#f5f5f5",
      sand: "#c2b2a4",
      tupe: "#a79e8a",
      mahogany: "#958c7c",
      "brick-red": "#7d7065",
      clay: "#6a5c52",
      cocoa: "#584a3e",
      "dark-brown": "#473b31",
      dark: "#352a21"
    }[earthtones.toLowerCase()], f3 = interpolate(
      [base, toHex(color2), easingFunc],
      "lch",
      checkArg(options, interpolatorConfig)
    );
    return iterations === 1 ? toHex(f3(0.5)) : samples_default(terations).map((t) => toHex(f3(t)));
  };

  // fp/string/expressionParser.ts
  function expressionParser(src, channel, value) {
    let reOperator = /^(\*|\+|\-|\/)/, reValue = /[0-9]*\.?[0-9]+/, sign = reOperator.exec(value)[0], amt = reValue.exec(value)[0], cb4 = (value2) => parseFloat(value2);
    switch (sign) {
      case "+":
        src[channel] += +cb4(amt);
        break;
      case "-":
        src[channel] -= +cb4(amt);
        break;
      case "*":
        src[channel] *= +cb4(amt);
        break;
      case "/":
        src[channel] /= +cb4(amt);
        break;
      default:
        src[channel] = +cb4(amt);
    }
    return src;
  }

  // getters_and_setters/set.ts
  var setChannel = (mc) => (color2, value) => {
    let [mode2, channel] = mc.split("."), src = converter_default(mode2)(toHex(color2));
    if (channel) {
      if (typeof value == "number")
        src[channel] = value;
      else if (typeof value == "string")
        expressionParser(src, channel, value);
      else
        throw new Error("unsupported value for setChannel");
      return src;
    } else
      throw new Error(`unknown channel ${channel} in mode ${mode2}`);
  };

  // palettes/paired.ts
  var pairedScheme = (color2, options) => {
    let { iterations, via, hueStep, easingFunc } = options || {};
    iterations = checkArg(iterations, 1), easingFunc = checkArg(easingFunc, easingSmoothstep), via = checkArg(via, "light"), hueStep = checkArg(hueStep, 5), color2 = useMode(definition_default14)(toHex(color2));
    let derivedHue = setChannel("lch.h")(color2, color2.h + hueStep), scale = interpolate(
      [color2, {
        dark: { l: 0, c: 0, h: 0, mode: "lch65" },
        light: { l: 100, c: 0, h: 0, mode: "lch65" }
      }[via], derivedHue, easingFunc],
      "lch",
      checkArg(options, interpolatorConfig)
    );
    if (iterations <= 1)
      return toHex(scale(0.5));
    {
      let results = samples_default(iterations * 2).map((t) => toHex(scale(easingFunc(t))));
      return results.slice(0, results.length / 2);
    }
  };

  // palettes/pastel.ts
  var samplePastelObj = [
    {
      color: "#fea3aa",
      saturation: 0.35826771653543305,
      value: 0.996078431372549
    },
    {
      color: "#f8b88b",
      saturation: 0.43951612903225806,
      value: 0.9725490196078431
    },
    { color: "#faf884", saturation: 0.472, value: 0.9803921568627451 },
    {
      color: "#f2a2e8",
      saturation: 0.3305785123966942,
      value: 0.9490196078431372
    },
    {
      color: "#b2cefe",
      saturation: 0.2992125984251969,
      value: 0.996078431372549
    },
    {
      color: "#baed91",
      saturation: 0.3881856540084388,
      value: 0.9294117647058824
    }
  ], sampleSaturation = samplePastelObj.map((el) => el.saturation), sampleValues = samplePastelObj.map((el) => el.value), pastelSample = {
    averageSaturation: averageNumber(sampleValues),
    averageValue: averageNumber(sampleSaturation),
    minSampleSaturation: min2(sampleSaturation),
    maxSampleSaturation: max(sampleSaturation),
    minSampleValue: min2(sampleValues),
    maxSampleValue: max(sampleValues)
  }, pastel = (color2) => (color2 = useMode(definition_default8)(toHex(color2)), toHex({
    h: color2.h,
    s: pastelSample.averageSaturation,
    v: random(pastelSample.minSampleValue, pastelSample.maxSampleValue),
    mode: "hsv"
  }));

  // converters/temp2Color.ts
  var temp2Color = (kelvin, hex2 = !1) => {
    let { log } = Math, temp = kelvin / 100, r2, g, b;
    temp < 66 ? (r2 = 255, g = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g), b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b)) : (r2 = 351.97690566805693 + 0.114206453784165 * (r2 = temp - 55) - 40.25366309332127 * log(r2), g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g), b = 255);
    let result = {
      r: r2 / 255,
      g: g / 255,
      b: b / 255,
      mode: "rgb"
    };
    return hex2 ? toHex(result) : result;
  };

  // converters/rgb2num.ts
  var rgb2num = (color2) => {
    let rgb5 = useMode(definition_default)(toHex(color2));
    return (255 * rgb5.r << 16) + (255 * rgb5.g << 8) + 255 * rgb5.b;
  };

  // converters/ciecam.ts
  var import_ciebase_ts = __toESM(require_lib(), 1), import_ciecam02_ts = __toESM(require_lib2(), 1);
  var baseCieCam = (0, import_ciecam02_ts.cam)(
    {
      whitePoint: import_ciebase_ts.illuminant.D65,
      adaptingLuminance: 40,
      backgroundLuminance: 20,
      surroundType: "average",
      discounting: !1
    },
    (0, import_ciecam02_ts.cfs)("JCh")
  ), xyzConverter = (0, import_ciebase_ts.xyz)(import_ciebase_ts.workspace.WideGamutRGB, import_ciebase_ts.illuminant.D65), colorToCam = (color2) => baseCieCam.fromXyz(
    xyzConverter.fromRgb(import_ciebase_ts.rgb.fromHex(toHex(color2)))
  ), camToColor = (CAM) => import_ciebase_ts.rgb.toHex(xyzConverter.toRgb(baseCieCam.toXyz(CAM)));

  // palettes/interpolator.ts
  var interpolateSpline = (colors2, mode2, samples2, kind, closed = !1, options) => {
    let {
      chromaInterpolator: chromaInterpolator2,
      hueFixup: hueFixup2,
      hueInterpolator: hueInterpolator2,
      lightnessInterpolator: lightnessInterpolator2,
      easingFunc
    } = checkArg(options, {});
    easingFunc = checkArg(easingFunc, easingSmoothstep), kind = checkArg(kind, "basis");
    let func;
    switch (kind) {
      case "basis":
        func = closed ? interpolatorSplineBasisClosed : interpolatorSplineBasis;
        break;
      case "monotone":
        func = closed ? interpolatorSplineMonotoneClosed : interpolatorSplineMonotone;
        break;
      case "natural":
        func = closed ? interpolatorSplineNaturalClosed : interpolatorSplineNatural;
        break;
    }
    let f3 = interpolate([...colors2, easingFunc], mode2, {
      h: {
        //@ts-ignore
        fixup: hueFixup2,
        use: checkArg(hueInterpolator2, func)
      },
      [matchChromaChannel(mode2)]: {
        use: checkArg(chromaInterpolator2, func)
      },
      [matchLightnessChannel(mode2)]: {
        use: checkArg(lightnessInterpolator2, func)
      }
    });
    samples2 = typeof samples2 == "number" && samples2 >= 1 ? samples2 : Math.ceil(Math.abs(samples2));
    let result;
    return samples2 > 1 ? result = samples_default(samples2).map((s) => toHex(f3(s))) : result = result.push(toHex(f3(0.5))), result;
  };

  // filterBy/filterBySaturation.ts
  var filterBySaturation = (colors2, startSaturation = 0.05, endSaturation = 1, mode2) => {
    let factor4 = "saturation";
    if (matchChromaChannel(mode2)) {
      mode2 = checkArg(mode2, "jch");
      let modeChannel = `${mode2}.${matchChromaChannel(mode2)}`, cb4 = getChannel(`${mode2}.${modeChannel}`), reDigits = /([0-9])/g.exec(startSaturation)[0];
      return filteredArr(factor4, cb4)(
        colors2,
        normalize(reDigits, modeChannel),
        normalize(endSaturation, modeChannel)
      );
    } else
      throw Error(
        `The passed in color space ${mode2} has no chroma or saturation channel. Try 'jch'`
      );
  };

  // getters_and_setters/luminance.ts
  var getLuminance = (color2) => luminance(toHex(color2)), { pow, abs: abs3 } = Math, toRgb = useMode(definition_default), setLuminance = (color2, lum) => {
    let white = "#ffffff", black = "#000000", MAX_ITER = 20;
    if (lum !== void 0 && typeof lum == "number") {
      lum == 0 && lum || black || lum == 1;
      let cur_lum = luminance(color2);
      color2 = toRgb(toHex(color2));
      let test = (low, high) => {
        let mid = interpolate([low, high])(0.5), lm = getLuminance(color2);
        return abs3(lum - lm > 1e-7) || !MAX_ITER-- ? mid : lm > lum ? test(low, mid) : test(mid, high);
      }, rgb5;
      return cur_lum > lum ? rgb5 = test(black, color2) : rgb5 = test(color2, white), color2 = rgb5, color2;
    }
    return rgb2luminance(color2);
  }, rgb2luminance = (color2) => (color2 = toRgb(toHex(color2)), 0.7152 * luminance_x(color2.g) + 0.2126 * luminance_x(color2.r) + 0.0722 * luminance_x(color2.b)), luminance_x = (x) => (x /= 255, x <= 0.03928 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4));

  // filterBy/filterByLuminance.ts
  var filterByLuminance = (colors2, startLuminance = 0.05, endLuminance = 1) => filteredArr("luminance", getLuminance)(colors2, startLuminance, endLuminance);

  // filterBy/filterByHue.ts
  var filterByHue = (colors2, startHue = 0, endHue = 360) => {
    let factor4 = "hue", cb4 = getChannel("lch.h");
    return filteredArr(factor4, cb4)(colors2, startHue, endHue);
  };

  // fp/string/matchLightnessChannel.ts
  var matchLightnessChannel = (colorSpace) => {
    let reLightness = /(j|l)/i, ch = reLightness.exec(colorSpace)[0];
    if (reLightness.test(colorSpace))
      return `${colorSpace}.${ch}`;
    throw Error(`The color space ${colorSpace} has no lightness channel.`);
  };

  // filterBy/filterByLightness.ts
  var filterByLightness = (colors2, startLightness = 5, endLightness = 100, mode2) => {
    let factor4 = "lightness", cb4 = getChannel(`${mode2}.${matchLightnessChannel(mode2)}`);
    return filteredArr(factor4, cb4)(colors2, startLightness, endLightness);
  };

  // filterBy/filterByDistance.ts
  var filterByDistance = (colors2, against, startDistance = 0.05, endDistance, mode2, weights) => {
    let factor4 = "distance";
    return against = toHex(against), filteredArr(factor4, ((against2, mode3) => (color2) => differenceEuclidean(mode3 || "lch", weights || [1, 1, 1, 0])(
      against2,
      color2
    ))(against, mode2))(
      colors2,
      startDistance,
      endDistance
    );
  };

  // getters_and_setters/contrast.ts
  var factor2 = "contrast", cb3 = (color2) => (against) => getContrast(color2, against), baseFunc = (against, order, colors2, colorObj2) => {
    let result = sortedArr(
      factor2,
      cb3(against),
      order,
      !0
    )(colors2), value;
    return gt(result.length, 0) && (colorObj2 ? value = result[0] : value = result[0][factor2]), value;
  }, getFarthestContrast = (colors2, against, colorObj2) => baseFunc(against, "desc", colors2, colorObj2), getNearestContrast = (colors2, against, colorObj2) => baseFunc(against, "asc", colors2, colorObj2), getContrast = (color2, against) => contrast(toHex(color2), toHex(against));

  // filterBy/filterByContrast.ts
  var filterByContrast = (colors2, against, startContrast = 0.05, endContrast) => filteredArr("contrast", ((against2) => (color2) => getContrast(color2, against2))(against))(colors2, startContrast, endContrast);

  // sortBy/sortByContrast.ts
  var sortByContrast = (colors2, against, order) => sortedArr("contrast", ((against2) => (color2) => contrast(color2, against2))(against), order)(colors2);

  // sortBy/sortByDistance.ts
  var sortByDistance = (colors2, against, order, options) => {
    let { mode: mode2, weights } = options || {};
    return mode2 = checkArg(mode2, "lchuv"), weights = checkArg(weights, [1, 1, 1, 0]), sortedArr("distance", ((against2, mode3) => (color2) => differenceEuclidean(mode3, weights)(against2, color2))(against, mode2), order)(colors2);
  };

  // sortBy/sortByHue.ts
  var sortByHue = (colors2, order, mode2 = "jch") => {
    let factor4 = "hue";
    if (/h/gi.test(mode2)) {
      let cb4 = getChannel(`${mode2}.h`);
      return sortedArr(factor4, cb4, order)(colors2);
    } else
      throw Error(`The color space ${mode2} has no hue channel try 'lch' instead`);
  };

  // sortBy/sortByLightness.ts
  var sortByLightness = (colors2, order, mode2) => {
    let factor4 = "lightness";
    mode2 = checkArg(mode2, "lch65");
    let cb4 = getChannel(`${mode2}.${matchLightnessChannel(mode2)}`);
    return sortedArr(factor4, cb4, order)(colors2);
  };

  // sortBy/sortByLuminance.ts
  var sortByLuminance = (colors2, order) => sortedArr("luminance", getLuminance, order)(colors2);

  // sortBy/sortBySaturation.ts
  var sortBySaturation = (colors2, order, mode2) => {
    let factor4 = "saturation";
    if (mode2 = checkArg(mode2, "jch"), matchChromaChannel(mode2)) {
      let chromaChannel = matchChromaChannel(mode2), cb4 = getChannel(`${mode2}.${chromaChannel}`);
      return sortedArr(factor4, cb4, order)(colors2);
    } else
      throw Error(
        `The passed in color space ${mode2} has no chroma channel. Try 'jch' instead.`
      );
  };

  // getters_and_setters/alpha.ts
  var alpha = (color2, value) => {
    color2 = color2 || "black";
    let channel = "alpha", src = useMode(definition_default14)(toHex(color2));
    return typeof value > "u" ? src[channel] : (typeof value == "number" ? inRange(value, 0, 1) ? src[channel] = value : src[channel] = value / 100 : typeof value == "string" && expressionParser(src, channel, value), toHex(src));
  };

  // getters_and_setters/darken.ts
  var toLab = useMode(definition_default12), darken = (color2, value) => {
    let channel = "l", src = toLab(toHex(color2));
    return typeof value == "number" ? src.l -= 18 * smootherstep_default(value / 100) : typeof value == "string" && expressionParser(src, channel, value || 1), toHex(src);
  }, brighten = (color2, value) => {
    let src = toLab(toHex(color2));
    return typeof value == "number" ? (value = Math.abs(value), src.l -= 18 * smootherstep_default(value / 100)) : typeof value == "string" && expressionParser(src, "l", value), toHex(src);
  };

  // fp/string/matchChromaChannel.ts
  var matchChromaChannel = (colorSpace) => {
    let reChroma = /(s|c)/i, ch = reChroma.exec(colorSpace)[0];
    if (reChroma.test(colorSpace))
      return `${colorSpace}.${ch}`;
    throw Error(
      `The color space ${colorSpace} has no chroma/saturation channel.`
    );
  };

  // getters_and_setters/chroma.ts
  var predicate = (colorSpace) => (color2) => getChannel(matchChromaChannel(colorSpace))(color2) || void 0, baseFunc2 = (colorSpace, colorObj2, colors2, order) => {
    let factor4 = "saturation", result = sortedArr(
      factor4,
      predicate(checkArg(colorSpace, "jch")),
      order,
      !0
    )(colors2).filter((el) => el[factor4] !== void 0), value;
    return result.length > 0 && (colorObj2 ? value = result[0] : value = result[0][factor4]), value;
  }, getNearestChroma = (colors2, colorSpace, colorObj2 = !1) => baseFunc2(colorSpace, colorObj2, colors2, "asc"), getFarthestChroma = (colors2, colorSpace, colorObj2 = !1) => baseFunc2(colorSpace, colorObj2, colors2, "desc");

  // getters_and_setters/lightness.ts
  var lightness = (mode2) => `${checkArg(mode2, "jch")}.${matchLightnessChannel(mode2)}`, factor3 = "lightness", baseFunc3 = (order, colors2, mode2, colorObj2) => {
    let cb4 = getChannel(lightness(mode2)), result = sortedArr(
      factor3,
      cb4,
      order,
      !0
    )(colors2), value;
    return gt(result.length, 0) && (colorObj2 ? value = result[0] : value = result[0][factor3]), value;
  }, getNearestLightness = (colors2, mode2, colorObj2 = !1) => baseFunc3("asc", colors2, mode2, colorObj2), getFarthestLightness = (colors2, mode2, colorObj2 = !1) => baseFunc3("desc", colors2, mode2, colorObj2);

  // getters_and_setters/temperature.ts
  var predicate2 = (factor4, temp) => !!Object.keys(hueTemperature_default).some(
    (val) => inRange(
      floorCeil(factor4),
      hueTemperature_default[val][temp][0],
      hueTemperature_default[val][temp][1]
    )
  ), isCool = (color2) => {
    let factor4 = getChannel("lch.h")(color2);
    return predicate2(factor4, "cool");
  }, isWarm = (color2) => {
    let factor4 = getChannel("lch.h")(color2);
    return predicate2(factor4, "cool");
  };

  // getters_and_setters/hue.ts
  var baseFunc22 = (factor4) => Object.keys(hueTemperature_default).map((hue3) => {
    let hueVals = customConcat(hueTemperature_default[hue3]), minVal = min2(hueVals), maxVal = max(hueVals);
    if (customConcat(hueTemperature_default[hue3]).some(
      () => inRange(factor4, minVal, maxVal)
    ))
      return hue3;
  }).filter((val) => typeof val == "string")[0], getComplimentaryHue = (color2, mode2, colorObj2 = !1) => {
    let modeChannel = `${mode2}.h`, complementaryHue = adjustHue(
      getChannel(modeChannel)(color2) + 180 * random(0.965, 1)
    ), result;
    return complementaryHue ? result = {
      hue: baseFunc22(complementaryHue),
      color: toHex(setChannel(modeChannel)(color2, complementaryHue))
    } : result = { hue: "gray", color: color2 }, colorObj2 && result || result.color;
  }, getHueFamily = (color2, mode2) => {
    let factor4 = getChannel(`${mode2}.h`)(color2);
    return baseFunc22(factor4);
  }, baseFunc4 = (colors2, colorSpace, colorObj2, order) => {
    let factor4 = "hue", result = sortedArr(
      factor4,
      predicate3(colorSpace),
      order,
      !0
    )(colors2).filter((el) => el[factor4] !== void 0), value;
    return result.length > 0 && (colorObj2 ? value = result[0] : value = result[0][factor4]), value;
  }, mode = (colorSpace) => `${checkArg(colorSpace, "jch")}.h`, predicate3 = (colorSpace) => (color2) => getChannel(mode(colorSpace))(color2) || void 0, getNearestHue = (colors2, colorSpace, colorObj2 = !1) => baseFunc4(colors2, colorSpace, colorObj2, "asc"), getFarthestHue = (colors2, colorSpace, colorObj2 = !1) => baseFunc4(colors2, colorSpace, colorObj2, "desc");

  // fp/array/colorArray.ts
  var ColorArray = class extends Array {
    // private _colors: ColorToken[];
    constructor(colors2) {
      super(), this.colors = Array(...colors2);
    }
    interpolateSpline(mode2, samples2, kind, closed, options) {
      return this.colors = interpolateSpline(
        this.colors,
        mode2,
        samples2,
        kind,
        closed,
        options
      ), this;
    }
    /**
     * @function
     * @description Takes an array of colors and finds the best matches for a set of predefined palettes. The function does not work on achromatic colors, you may use isAchromatic to filter grays from your collection before passing it to the function.
     * @param schemeType (Optional) The palette type you want to return.
     * @returns An array of colors if the scheme parameter is specified else it returns an object of all the palette types as keys and their values as an array of colors. If no colors are valid for the palette types it returns an empty array for the palette results.
     * @example
     * 
     * import { discoverPalettes } from 'huetiful-js'
    
    let sample = [
      "#ffff00",
      "#00ffdc",
      "#00ff78",
      "#00c000",
      "#007e00",
      "#164100",
      "#720000",
      "#600000",
      "#4e0000",
      "#3e0000",
      "#310000",
    ]
    
    console.log(discoverPalettes(sample, "tetradic"))
    // [ '#ffff00ff', '#00ffdcff', '#310000ff', '#720000ff' ]
     */
    discoverPalettes(schemeType) {
      return this.colors = discoverPalettes(this.colors, schemeType), this;
    }
    /**
     *@function
     * @description Gets the largest hue value from the passed in colors.
     * @param colorSpace The mode color space to perform the computation in.
     * @param colorObj Optional boolean that makes the function return a custom object with factor (hue) and name of the color as keys. Default is false.
     * @returns The largest hue value in the colors passed in or a custom object.
     * @example
     * 
     * import { maxHue } from 'huetiful-js'
    let sample = ['b2c3f1', '#a1bd2f', '#f3bac1']
    
    console.log(maxHue(sample, 'lch'))
    // 273.54920266436477
     */
    getFarthestHue(colorSpace, colorObj2 = !1) {
      return getFarthestHue(this.colors, colorSpace, colorObj2);
    }
    /**
     *@function
     * @description Gets the smallest hue value from the passed in colors.
     * @param colors The array of colors to query the color with the smallest hue value.
     * @param colorSpace The mode color space to perform the computation in.
     * @param colorObj Optional boolean that makes the function return a custom object with factor (hue) and name of the color as keys. Default is false.
     * @returns The smallest hue value in the colors passed in or a custom object.
     * @example
     * 
     * import { minHue } from 'huetiful-js'
    
    let sample = ['b2c3f1', '#a1bd2f', '#f3bac1']
    
    console.log(minHue(sample, 'lch'))
    // 12.462831644544274
     */
    getNearestHue(colorSpace, colorObj2 = !1) {
      return getNearestHue(this.colors, colorSpace, colorObj2);
    }
    /**
     *@function
     * @description Gets the smallest lightness value from the passed in colors.
     * @param colorObj Optional boolean that makes the function return a custom object with factor (lightness) and name of the color as keys. Default is false.
     * @returns The smallest lightness value in the colors passed in or a custom object.
     * @example
     * 
     * import { minLightness } from 'huetiful-js'
    
    let sample = ["b2c3f1", "#a1bd2f", "#f3bac1"]
    
    console.log(minLightness(sample, true))
    
    // { lightness: 72.61647882089876, name: '#a1bd2f' }
    
     */
    getNearestLightness(mode2, colorObj2 = !1) {
      return getFarthestLightness(this.colors, mode2, colorObj2);
    }
    /**
     *@function
     * @description Gets the largest lightness value from the passed in colors.
     * @param colors The array of colors to query the color with the largest lightness value.
     * @param colorObj Optional boolean that makes the function return a custom object with factor (lightness) and name of the color as keys. Default is false.
     * @returns The largest lightness value in the colors passed in or a custom object.
     * @example 
     * 
     * import { maxLightness } from 'huetiful-js'
    
    let sample = ["b2c3f1", "#a1bd2f", "#f3bac1"]
    
    console.log(maxLightness(sample, true))
    
    // { lightness: 80.94668903360088, name: '#f3bac1' }
    
     */
    getFarthestLightness(mode2, colorObj2 = !1) {
      return getNearestLightness(this.colors, mode2, colorObj2);
    }
    /**
     * @function
     * @description Returns an array of colors in the specified saturation range. The range is normalised to [0,1].
     * @param  startSaturation The minimum end of the saturation range.
     * @param  endSaturation The maximum end of the saturation range.
     * @param mode The color space to fetch the saturation value from. Any color space with a chroma channel e.g 'lch' or 'hsl' will do.
     * @returns Array of filtered colors.
     * @example
     * import { filterByContrast } from 'huetiful-js'
    
    let sample = [
      '#00ffdc',
      '#00ff78',
      '#00c000',
      '#007e00',
      '#164100',
      '#ffff00',
      '#310000',
      '#3e0000',
      '#4e0000',
      '#600000',
      '#720000',
    ]
    
    console.log(filterByContrast(sample, 'green', '>=3'))
    // [ '#00ffdc', '#00ff78', '#ffff00', '#310000', '#3e0000', '#4e0000' ]
     */
    filterBySaturation(startSaturation = 0.05, endSaturation = 1, mode2) {
      return this.colors = filterBySaturation(
        this.colors,
        startSaturation,
        endSaturation,
        mode2
      ), this;
    }
    /**
     * @function
     * @description Returns an array of colors in the specified lightness range. The range is between 0 and 100.
     * @param  startLightness The minimum end of the lightness range.
     * @param  endLightness The maximum end of the lightness range.
     * @returns Array of filtered colors.
     * @example
     * 
     * import { filterByLightness } from 'huetiful-js'
    let sample = [
      '#00ffdc',
      '#00ff78',
      '#00c000',
      '#007e00',
      '#164100',
      '#ffff00',
      '#310000',
      '#3e0000',
      '#4e0000',
      '#600000',
      '#720000',
    ]
    
    filterByLightness(sample, 20, 80)
    
    // [ '#00c000', '#007e00', '#164100', '#720000' ]
     */
    filterByLightness(startLightness = 5, endLightness = 100) {
      return this.colors = filterByLightness(
        this.colors,
        startLightness,
        endLightness
      ), this;
    }
    /**
     * @function
     * @description Returns an array of colors with the specified distance range. The distance is tested against a comparison color (the 'against' param) and the specified distance ranges.
     * @param  startDistance The minimum end of the distance range.
     * @param  endDistance The maximum end of the distance range.
     * @param weights The weighting values to pass to the Euclidean function. Default is [1,1,1,0].
     * @param mode The color space to calculate the distance in .
     * @returns Array of filtered colors.
     * @example
     * import { filterByDistance } from 'huetiful-js'
    
    let sample = [
      "#ffff00",
      "#00ffdc",
      "#00ff78",
      "#00c000",
      "#007e00",
      "#164100",
      "#720000",
      "#600000",
    ]
    
    console.log(filterByDistance(sample, "yellow", 0.1))
    // [ '#ffff00' ]
     */
    filterByDistance(against, startDistance = 0.05, endDistance, mode2, weights) {
      return this.colors = filterByDistance(
        this.colors,
        against,
        startDistance,
        endDistance,
        mode2,
        weights
      ), this;
    }
    /**
       * 
     * @function
     * @description Returns an array of colors with the specified contrast range. The contrast is tested against a comparison color (the 'against' param) and the specified contrast ranges.
     * @param  startContrast The minimum end of the contrast range.
     * @param  endContrast The maximum end of the contrast range.
     * @returns Array of filtered colors.
     * 
     * @example
     * 
     * import { filterByContrast } from 'huetiful-js'
    
    let sample = [
      '#00ffdc',
      '#00ff78',
      '#00c000',
      '#007e00',
      '#164100',
      '#ffff00',
      '#310000',
      '#3e0000',
      '#4e0000',
      '#600000',
      '#720000',
    ]
    
    console.log(filterByContrast(sample, 'green', '>=3'))
    // [ '#00ffdc', '#00ff78', '#ffff00', '#310000', '#3e0000', '#4e0000' ]
     */
    filterByContrast(against, startContrast = 0.05, endContrast) {
      return this.colors = filterByContrast(
        this.colors,
        against,
        startContrast,
        endContrast
      ), this;
    }
    /**
     * @function
     * @description Returns colors in the specified hue ranges between 0 to 360.
     * @param  startHue The minimum end of the hue range.
     * @param  endHue The maximum end of the hue range.
     * @returns  Array of the filtered colors.
     * @example
     * let sample = [
      '#00ffdc',
      '#00ff78',
      '#00c000',
      '#007e00',
      '#164100',
      '#ffff00',
      '#310000',
      '#3e0000',
      '#4e0000',
      '#600000',
      '#720000',
    ]
    
    filterByHue(sample, 20, 80)
    
    // [ '#310000', '#3e0000', '#4e0000', '#600000', '#720000' ]
     */
    filterByHue(startHue = 0, endHue = 360) {
      return this.colors = filterByHue(this.colors, startHue, endHue), this;
    }
    /**
     *  @function
     * @description Returns an array of colors in the specified luminance range. The range is normalised to [0,1].
     * @param  startLuminance The minimum end of the luminance range.
     * @param  endLuminance The maximum end of the luminance range.
     * @returns Array of filtered colors.
     * @example
     * 
     * import { filterByLuminance } from 'huetiful-js'
    let sample = [
      '#00ffdc',
      '#00ff78',
      '#00c000',
      '#007e00',
      '#164100',
      '#ffff00',
      '#310000',
      '#3e0000',
      '#4e0000',
      '#600000',
      '#720000',
    ]
    
    filterByLuminance(sample, 0.4, 0.9)
    
    // [ '#00ffdc', '#00ff78' ]
     */
    filterByLuminance(startLuminance = 0.05, endLuminance = 1) {
      return this.colors = filterByLuminance(
        this.colors,
        startLuminance,
        endLuminance
      ), this;
    }
    /**
     * @function
     * @description Sorts colors according to their lightness.
     * @param  colors The array of colors to sort
     * @param  order The expected order of arrangement. Either 'asc' or 'desc'. Default is ascending ('asc')
     * @returns An array of the sorted color values.
     * @example
     * import { sortByLightness } from "huetiful-js";
    
    let sample = [
      "#00ffdc",
      "#00ff78",
      "#00c000",
      "#007e00",
      "#164100",
      "#ffff00",
      "#310000",
      "#3e0000",
      "#4e0000",
      "#600000",
      "#720000",
    ]
    
    sortByLightness(sample)
    
    // [
      '#310000', '#3e0000',
      '#4e0000', '#600000',
      '#720000', '#164100',
      '#007e00', '#00c000',
      '#00ff78', '#00ffdc',
      '#ffff00'
    ]
    
    
    sortByLightness(sample,'desc')
    
    // [
      '#ffff00', '#00ffdc',
      '#00ff78', '#00c000',
      '#007e00', '#164100',
      '#720000', '#600000',
      '#4e0000', '#3e0000',
      '#310000'
    ]
    
     */
    sortByLightness(order) {
      return this.colors = sortByLightness(this.colors, order), this;
    }
    /**
     * @function
     * @description Sorts colors according to their Euclidean distance. The distance factor is determined by the color space used (some color spaces are not symmetrical meaning that the distance between colorA and colorB is not equal to the distance between colorB and colorA ). The distance is computed from against a color which is used for comparison for all the colors in the array i.e it sorts the colors against the dist
     * @param against The color to compare the distance with. All the distances are calculated between this color and the ones in the colors array.
     * @param  order The expected order of arrangement. Either 'asc' or 'desc'. Default is ascending ('asc')
     * @param weights The weighting values to pass to the Euclidean function. Default is [1,1,1,0].
     * @param mode The color space to calculate the distance in . The default is the cylindrical variant of the CIELUV colorspace ('lchuv')
     * @returns An array of the sorted color values.
     * @example
     * import { sortByDistance } from 'huetiful-js'
    
    let sample = ['purple', 'green', 'red', 'brown']
    console.log(
      sortByDistance(sample, 'yellow', 'asc', {
        mode: 'lch',
      })
    )
    
    // [ 'brown', 'red', 'green', 'purple' ]
    
    let sample = ['purple', 'green', 'red', 'brown']
    console.log(
      sortByDistance(sample, 'yellow', 'asc', {
        mode: 'lch',
      })
    )
    
    // [ 'green', 'brown', 'red', 'purple' ]
     */
    sortByDistance(against, order, options) {
      return this.colors = sortByDistance(
        this.colors,
        against,
        order,
        options
      ), this;
    }
    /**
     * @function
     * @description Sorts colors according to the relative brightness as defined by WCAG definition.
     * @param  colors The array of colors to sort
     * @param  order The expected order of arrangement. Either 'asc' or 'desc'. Default is ascending ('asc')
     * @returns An array of the sorted color values.
     * @example
     * import { sortByLuminance } from "huetiful-js";
    let sample = [
      "#00ffdc",
      "#00ff78",
      "#00c000",
      "#007e00",
      "#164100",
      "#ffff00",
      "#310000",
      "#3e0000",
      "#4e0000",
      "#600000",
      "#720000",
    ];
    
    
    
    let sorted = sortByLuminance(sample)
    console.log(sorted)
    // [
      '#310000', '#3e0000',
      '#4e0000', '#600000',
      '#720000', '#164100',
      '#007e00', '#00c000',
      '#00ff78', '#00ffdc',
      '#ffff00'
    ]
    
    let sortedDescending = sortByLuminance(sample, "desc");
    console.log(sortedDescending)
    // [
      '#ffff00', '#00ffdc',
      '#00ff78', '#00c000',
      '#007e00', '#164100',
      '#720000', '#600000',
      '#4e0000', '#3e0000',
      '#310000'
    ]
    
     
     */
    sortByLuminance(order) {
      return this.colors = sortByLuminance(this.colors, order), this;
    }
    /**
     * @function
     * @description Sorts colors according to their saturation.
     * @param  colors The array of colors to sort
     * @param  order The expected order of arrangement. Either 'asc' or 'desc'. Default is ascending ('asc')
     * @param mode The mode color space to compute the saturation value in. The default is jch .
     * @returns An array of the sorted color values.
     * @example
     * import { sortBySaturation } from "huetiful-js";
    let sample = [
      "#00ffdc",
      "#00ff78",
      "#00c000",
      "#007e00",
      "#164100",
      "#ffff00",
      "#310000",
      "#3e0000",
      "#4e0000",
      "#600000",
      "#720000",
    ];
    
    let sorted = sortBySaturation(sample);
    console.log(sorted);
    
    // [
      '#310000', '#3e0000',
      '#164100', '#4e0000',
      '#600000', '#720000',
      '#00ffdc', '#007e00',
      '#00ff78', '#00c000',
      '#ffff00'
    ]
    
    let sortedDescending = sortBySaturation(sample,'desc');
    console.log(sortedDescending)
    // [
      '#ffff00', '#00c000',
      '#00ff78', '#007e00',
      '#00ffdc', '#720000',
      '#600000', '#4e0000',
      '#164100', '#3e0000',
      '#310000'
    ]
    
     */
    sortBySaturation(order, mode2) {
      return this.colors = sortBySaturation(this.colors, order, mode2), this;
    }
    /**
     * @function
     * @description Sorts colors according to their contrast value as defined by WCAG. The contrast is tested against a comparison color (the 'against' param)
     * @param  colors The array of colors to sort
     * @param  order The expected order of arrangement. Either 'asc' or 'desc'. Default is ascending ('asc')
     * @returns An array of the sorted color values.
     * @example
     * 
     * import { sortByContrast } from 'huetiful-js'
    
    let sample = ['purple', 'green', 'red', 'brown']
    console.log(sortByContrast(sample, 'yellow'))
    // [ 'red', 'green', 'brown', 'purple' ]
    
    console.log(sortByContrast(sample, 'yellow', 'desc'))
    // [ 'purple', 'brown', 'green', 'red' ]
     
     */
    sortByContrast(against, order) {
      return this.colors = sortByContrast(this.colors, against, order), this;
    }
    /**
     * @function
     * @description Sorts colors according to hue values. It works with any color space with a hue channel. Note that hue values between HSL and Lch do not align. Achromatic colors are not supported
     * @param order The expected order of arrangement. Either 'asc' or 'desc'. Default is ascending ('asc')
    * @param mode The color space to compute the color distances in. All colors within the collection will be converted to mode. Also note that because differences in hue mapping certain color spaces such as HSL and LCH hue values do not align. Keep such quirks in mind to avoid weird results. 
    * @returns  An array of the sorted color values.
     * @example
     * let sample = [
      "#00ffdc",
      "#00ff78",
      "#00c000",
      "#007e00",
      "#164100",
      "#ffff00",
      "#310000",
      "#3e0000",
      "#4e0000",
      "#600000",
      "#720000",
    ];
    
    
    let sorted = sortByHue(sample);
    console.log(sorted)
    // [
      '#310000', '#3e0000',
      '#4e0000', '#600000',
      '#720000', '#ffff00',
      '#164100', '#00c000',
      '#007e00', '#00ff78',
      '#00ffdc'
    ]
    
    let sortedDescending = sortByHue(sample,'desc');
    console.log(sortedDescending)
    // [
      '#00ffdc', '#00ff78',
      '#007e00', '#00c000',
      '#164100', '#ffff00',
      '#720000', '#600000',
      '#4e0000', '#3e0000',
      '#310000'
    ]
    
     */
    // Todo: Add the mode param so that users can select mode to work with. The default is lch
    sortByHue(order, mode2 = "jch") {
      return this.colors = sortByHue(this.colors, order, mode2), this;
    }
    /**
     * @method
     * @returns Returns the result value from the chain.
     */
    output() {
      return this.colors;
    }
  }, load = (colors2) => new ColorArray(colors2);

  // fp/object/customConcat.ts
  var customConcat = (hue3) => {
    let res = [], { keys: keys2 } = Object;
    if (typeof hue3 == "object") {
      let hueKeys = keys2(hue3);
      res.push(...hueKeys.map((key) => hue3[key]));
    }
    return res.flat(1);
  };

  // fp/object/customFindKey.ts
  var customFindKey = (collection, factor4) => Object.keys(collection).filter((key) => {
    let hueVals = customConcat(collection[key]), minVal = min2(...hueVals), maxVal = max(...hueVals);
    return inRange(factor4, minVal, maxVal);
  }).toString();

  // colors/achromatic.ts
  var isAchromatic = (color2, mode2) => (mode2 = checkArg(mode2, "lch"), ((mode3) => getChannel(`${mode3}.${matchChromaChannel(mode3)}`)(color2))(mode2) != !1 || 0 || NaN);

  // colors/overtone.ts
  var overtone = (color2) => {
    let factor4 = getChannel("lch.h")(color2), hue3 = customFindKey(hueTemperature_default, factor4);
    return isAchromatic(color2) ? "gray" : /-/.test(hue3) ? (hue3 = hue3.split("-"), hue3[1]) : !1;
  };

  // colors/tailwindColors.ts
  var tailwindColors = (shade) => (val) => {
    shade = shade.toLowerCase();
    let { keys: keys2 } = Object, targetHue;
    if (keys2(tailwind_default).indexOf(shade) != -1)
      targetHue = tailwind_default[shade];
    else
      throw Error(
        `${shade} is not a valid shade in the default Tailwind palette`
      );
    if (typeof val > "u")
      return keys2(targetHue).map((value) => targetHue[value]);
    if (keys2(targetHue).indexOf(val) > -1)
      return targetHue[val];
    throw Error(
      `${val} is not a valid scale value. Values are in increments of 100 up to 900 e.g "200"`
    );
  };

  // colors/color.ts
  var IColor = class {
    constructor(c4, options) {
      let {
        illuminant: illuminant2,
        alpha: alpha2,
        colorspace,
        luminance: luminance2,
        saturation,
        lightMode,
        darkMode,
        lightness: lightness2
      } = checkArg(options, {});
      c4 = checkArg(c4, "#000"), this.illuminant = checkArg(illuminant2, "D65"), this.alpha = checkArg(alpha2, alpha(c4)), this._color = c4, this._luminance = checkArg(luminance2, getLuminance(c4)), this.lightness = checkArg(lightness2, getChannel("lch.l")(c4)), this.colorspace = checkArg(colorspace, "jch"), this._saturation = checkArg(
        saturation,
        getChannel(
          `${this.colorspace}.${matchChromaChannel(this.colorspace)}`
        )(c4)
      ), this.lightMode = checkArg(lightMode, colors("gray", "100")), this.darkMode = checkArg(darkMode, colors("gray", "800"));
    }
    alpha(amount) {
      return amount ? (this._color = alpha(this._color, amount), this) : alpha(this._color);
    }
    getChannel(channel) {
      return getChannel(`${this.colorspace}.${channel.toLowerCase()}`)(
        this._color
      );
    }
    setChannel(channel, value) {
      return this._color = setChannel(
        `${this.colorspace}.${channel.toLowerCase()}`
      )(this._color, value), this;
    }
    via(origin, t, options) {
      return toHex(((t2) => interpolate(
        [origin, this.color],
        this.colorspace,
        checkArg(options, interpolatorConfig)
      )(checkArg(t2, 0.5)))(t));
    }
    brighten(amount) {
      return this._color = brighten(this._color, amount), this;
    }
    darken(amount) {
      return this._color = darken(this._color, amount), this;
    }
    // Added viewing conditions options
    toCam() {
      return colorToCam(this._color);
    }
    toHex() {
      return this._color = toHex(this._color), this._color;
    }
    pastel() {
      return this._color = pastel(this._color), this;
    }
    pairedScheme(options) {
      return this.colors = pairedScheme(this._color, checkArg(options, {})), this.colors;
    }
    hueShift(options) {
      return options.iterations = checkArg(options.iterations, 1), options.iterations ? hueShift(this._color, options) : (this.colors = hueShift(this._color, checkArg(options, {})), this.colors);
    }
    getComplimentaryHue(mode2, colorObj2) {
      return this._color = getComplimentaryHue(this._color, mode2, colorObj2), this._color;
    }
    earthtone(options) {
      return options.iterations = checkArg(options.iterations, 1), this.colors = earthtone(this._color, checkArg(options, {})), this.colors;
    }
    contrast(against) {
      let result;
      switch (against) {
        case "lightMode":
          result = getContrast(this._color, this.background.lightMode);
          break;
        case "darkMode":
          result = getContrast(this._color, this.background.darkMode);
          break;
        default:
          result = getContrast(this._color, this.background.custom);
          break;
      }
      return result;
    }
    luminance(amount) {
      return amount ? (this._luminance = amount, this._color = setLuminance(this._color, this._color), this) : getLuminance(this._color);
    }
    output() {
      return this._color;
    }
    saturation(amount) {
      return this._saturation = getChannel(
        `${this.colorspace}.${matchChromaChannel(this.colorspace)}`
      )(this._color), amount ? (this._color = setChannel(
        `${this.colorspace}.${matchChromaChannel(this.colorspace)}`
      )(this._color, amount), this) : this._saturation;
    }
    isAchromatic() {
      return isAchromatic(this._color);
    }
    isWarm() {
      return isWarm(this._color);
    }
    isCool() {
      return isCool(this._color);
    }
    /**
     * @function
     * @description Returns the color as a simulation of the passed in type of color vision deficiency with the deficiency filter's intensity determined by the severity value.
     * @param deficiencyType The type of color vision deficiency. To avoid writing the long types, the expected parameters are simply the colors that are hard to perceive for the type of color blindness. For example those with 'tritanopia' are unable to perceive 'blue' light. Default is 'red' when the defeciency parameter is undefined or any falsy value.
     * @see For a deep dive on  color vision deficiency go to
     * @param color The color to return its deficiency simulated variant.
     * @param severity The intensity of the filter. The exepected value is between [0,1]. For example 0.5
     * @returns The color as its simulated variant as a hexadecimal string.
     * @example
     * 
     * import { colorDeficiency, toHex } from 'huetiful-js'
    
    // Here we are simulating color blindness of tritanomaly or we can't see 'blue'. 
    // We are passing in our color as an array of channel values in the mode "rgb". The severity is set to 0.1
    let tritanomaly = colorDeficiency('blue')
    console.log(tritanomaly(['rgb', 230, 100, 50, 0.5], 0.1))
    // #dd663680
    
    // Here we are simulating color blindness of tritanomaly or we can't see 'red'. The severity is not explicitly set so it defaults to 1
    let protanopia = colorDeficiency('red')
    console.log(protanopia({ h: 20, w: 50, b: 30, mode: 'hwb' }))
    // #9f9f9f
     */
    deficiency(deficiencyType, severity = 1) {
      return this._color = colorDeficiency(deficiencyType)(
        this._color,
        severity
      ), this;
    }
    getFarthestHue(colors2, colorObj2) {
      return getFarthestHue(colors2, this.colorspace, colorObj2);
    }
    getNearestHue(colors2, colorObj2) {
      return getNearestHue(colors2, this.colorspace, colorObj2);
    }
    getNearestChroma(colors2) {
      return getNearestChroma(colors2, this.colorspace);
    }
    getNearestLightness(colors2, colorObj2) {
      return getNearestLightness(colors2, this.colorspace, colorObj2);
    }
    getFarthestChroma(colors2, colorObj2) {
      return getFarthestChroma(colors2, this.colorspace, colorObj2);
    }
    getFarthestLightness(colors2, colorObj2) {
      return getFarthestLightness(colors2, this.colorspace, colorObj2);
    }
    ovetone() {
      return overtone(this._color);
    }
    getHue() {
      return getHueFamily(this._color);
    }
    scheme(scheme2, easingFunc) {
      return load(scheme(scheme2)(this._color, easingFunc));
    }
  }, color = (color2) => new IColor(color2);

  // accessibility/colorDeficiency.ts
  var baseColorDeficiency = (def, col, sev) => {
    let result;
    switch (col = toHex(col), def) {
      case "blue":
        result = filterDeficiencyTrit(sev)(col);
        break;
      case "red":
        result = filterDeficiencyProt(sev)(col);
        break;
      case "green":
        result = filterDeficiencyDeuter(sev)(col);
        break;
      case "monochromacy":
        result = filterGrayscale(sev, "lch")(col);
        break;
    }
    return toHex(result);
  }, colorDeficiency = (deficiencyType) => (color2, severity = 1) => {
    let deficiencies = ["red", "blue", "green", "monochromacy"];
    if (deficiencyType = checkArg(deficiencyType, "red"), typeof deficiencyType == "string" && deficiencies.some((el) => el === deficiencyType))
      return baseColorDeficiency(deficiencyType, color2, severity);
    throw Error(
      `Unknown color vision deficiency ${deficiencyType}. The options are the strings 'red' | 'blue' | 'green' | 'monochromacy'`
    );
  };
  return __toCommonJS(source_exports);
})();
