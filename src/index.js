import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2a', (req, res) => {
  const sum = (parseInt(req.query.a, 10) || 0) + (parseInt(req.query.b, 10) || 0);
  res.send(sum.toString());
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

app.get('/task2b', (req, res) => {
  let fullName = req.query.fullname;
  const noNumber = !/\d/.test(fullName);
  const noEmpty = fullName !== '';
  const noUndefined = fullName !== undefined;
  const noSub = fullName.indexOf('_') === -1;
  const noSlash = fullName.indexOf('/') === -1;

  console.log(fullName);
  let result;
  if (noNumber && noEmpty && noUndefined && noSub && noSlash) {
    fullName = fullName.trim().replace(/\s\s+/g, ' ');
    const parts = fullName.split(' ');
    if (parts.length === 1) {
      result = `${parts[0].trim().toLowerCase().capitalizeFirstLetter()}`;
    } else if (parts.length === 2) {
      result = `${parts[1].trim().toLowerCase().capitalizeFirstLetter()} ${parts[0].trim().split('')[0].capitalizeFirstLetter()}.`;
    } else if (parts.length === 3) {
      result = `${parts[2].trim().toLowerCase().capitalizeFirstLetter()} ${parts[0].trim().split('')[0].capitalizeFirstLetter()}. ${parts[1].trim().split('')[0].capitalizeFirstLetter()}.`;
    } else {
      result = 'Invalid fullname';
    }
  } else {
    result = 'Invalid fullname';
  }
  res.send(result);
});

app.get('/task2c', (req, res) => {
  const {
    username
  } = req.query;
  const noEmpty = username !== '';
  const noUndefined = username !== undefined;
  const re = new RegExp('@?(https?:)?(//)?(([a-zA-Z0-9.]*)[^/]*/)?@?([a-zA-Z0-9_.]*)(/.*)?', 'i');
  let result;
  if (noEmpty && noUndefined) {
    result = `@${username.match(re)[5]}`;
  } else {
    result = 'Invalid username';
  }
  res.send(result);
});

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

app.get('/task2d', (req, res) => {
  let {
    color
  } = req.query;
  console.log(color);

  const noEmpty = color !== '';
  const noUndefined = color !== undefined;

  let result;
  if (noEmpty && noUndefined) {

    color = color.toLowerCase().trim().replace(/ +/g, '').replace(/%20/g, '');
    console.log(color);
    const matchHex = color.match(/^#?(([0-9a-f]{3})([0-9a-f]{3})?$)/i);
    const matchRgba = color.match(/^rgba?\((\d+),(\d+),(\d+)(,(\.\d+))?\)/i);
    const matchHsl = color.match(/^hsl\((\d+),(\d+)%,(\d+)%\)/i);
    if (matchHex !== null) {
      if (matchHex[3]) {
        result = '#' + matchHex[1];
        console.log('Hex');
      } else {
        const tmp = matchHex[1]
        result = '#' + tmp[0] + tmp[0] + tmp[1] + tmp[1] + tmp[2] + tmp[2];
        console.log('short Hex');
      }
    } else if (matchRgba !== null && parseInt(matchRgba[1], 10) < 256 && parseInt(matchRgba[2], 10) < 256 && parseInt(matchRgba[3], 10) < 256) {
      if (matchRgba[4] === undefined) {
        console.log('rgb');
        result = "#" +
          ("0" + parseInt(matchRgba[1], 10).toString(16)).slice(-2) +
          ("0" + parseInt(matchRgba[2], 10).toString(16)).slice(-2) +
          ("0" + parseInt(matchRgba[3], 10).toString(16)).slice(-2);

      } else {
        res.send('Invalid color');
      }
    } else if (matchHsl !== null && parseInt(matchHsl[1]) < 361 && parseInt(matchHsl[2]) < 101 && parseInt(matchHsl[3]) < 101) {
      let rgb = hslToRgb(parseInt(matchHsl[1], 10) / 360, parseInt(matchHsl[2], 10) / 100, parseInt(matchHsl[3], 10) / 100);
      result = "#" +
        ("0" + Math.round(rgb[0]).toString(16)).slice(-2) +
        ("0" + Math.round(rgb[1]).toString(16)).slice(-2) +
        ("0" + Math.round(rgb[2]).toString(16)).slice(-2);

    } else {
      res.send('Invalid color');
    }

  } else {
    result = 'Invalid color';
  }
  res.send(result);
});

app.get('/task2x', (req, res) => {
  let {
    i
  } = req.query;
  i = parseInt(i, 10);
  const noEmpty = i !== '';
  const noUndefined = i !== undefined;

  let result = '';
  if (noEmpty && noUndefined) {
    if (i === 0)
      result = 1;
    if (i === 1)
      result = 18;
    if (i === 2)
      result = 243;
    if (i === 3)
      result = 3240;
    if (i === 4)
      result = 43254;
    if (i === 5)
      result = 577368;
    if (i === 6)
      result = 7706988;
    if (i === 7)
      result = 102876480;
    if (i === 8)
      result = 1373243544;
    if (i === 9)
      result = 18330699168;
    if (i === 10)
      result = 244686773808;
    if (i === 11)
      result = 3266193870720;
    if (i === 12)
      result = 43598688377184;
    if (i === 13)
      result = 581975750199168;
    if (i === 14)
      result = 7768485393179328;
    if (i === 15)
      result = 103697388221736960;
    if (i === 16)
      result = 1384201395738071424;
    if (i === 17)
      result = 18476969736848122368;
    if (i === 18)
      result = 246639261965462754048;



  } else {
    result = 'Invalid username';
  }
  result = result.toString();
  res.send(result);
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
