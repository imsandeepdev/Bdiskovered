import * as React from 'react';
import {PixelRatio, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const scale = width / 414;

export function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const fontSize = {
  Size1: normalize(1),
  Size2: normalize(2),
  Size4: normalize(4),
  Size8: normalize(8),
  Size5: normalize(5),
  Size6: normalize(6),
  Size10: normalize(10),
  Size12: normalize(12),
  Size14: normalize(14),
  Size16: normalize(16),
  Size18: normalize(18),
  Size20: normalize(20),
  Size22: normalize(22),
  Size24: normalize(24),
  Size26: normalize(26),
  Size28: normalize(28),
  Size30: normalize(30),

  extraSmall: normalize(10),
  small: normalize(12),
  medium: normalize(14),
  Size15: normalize(15),
  large: normalize(16),
  XLarge: normalize(18),
  XXLarge: normalize(20),
  XXXLarge: normalize(22),
  EXLarge: normalize(24),
  Size25: normalize(25),
  EXXLarge: normalize(26),
  EXXXLarge: normalize(28),
  UltraXLarge: normalize(30),
  Size32: normalize(32),

  Size35: normalize(35),
  Size40: normalize(40),
  Size45: normalize(45),
  Size50: normalize(50),
  Size55: normalize(55),
  Size60: normalize(60),
  Size65: normalize(65),
  Size70: normalize(70),
  Size80: normalize(80),

  Size90: normalize(90),
  Size100: normalize(100),
  Size110: normalize(110),
  Size120: normalize(120),
  Size130: normalize(130),
  Size140: normalize(140),
  Size150: normalize(150),
  Size155: normalize(155),
  Size160: normalize(160),
  Size170: normalize(170),
  Size179: normalize(179),
  Size178: normalize(178),

  Size174: normalize(174),
  Size177: normalize(177),
  Size180: normalize(180),
  Size190: normalize(190),
  Size200: normalize(200),
  Size210: normalize(210),
  Size220: normalize(220),
  Size240: normalize(240),
  Size238: normalize(238),
  Size236: normalize(236),
  Size242: normalize(242),
  Size244: normalize(244),

  Size230: normalize(230),
  Size249: normalize(249),
  Size248: normalize(248),
  Size246: normalize(246),

  Size250: normalize(250),
  Size252: normalize(252),
  Size254: normalize(254),
  Size255: normalize(255),
  Size256: normalize(256),
  Size257: normalize(257),

  Size260: normalize(260),
  Size270: normalize(270),
  Size276: normalize(276),
  Size277: normalize(277),

  Size278: normalize(278),
  Size279: normalize(279),
  Size280: normalize(280),
  Size281: normalize(281),
  Size282: normalize(282),
  Size284: normalize(284),
  Size285: normalize(285),
  Size286: normalize(286),

  Size290: normalize(290),
  Size300: normalize(300),
  Size320: normalize(320),
  Size380: normalize(380),

  Size500: normalize(500),
};

export default fontSize;
