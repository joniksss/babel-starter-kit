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
  const { username } = req.query;
  const noEmpty = username !== '';
  const noUndefined = username !== undefined;
  const re = new RegExp('@?(https?:)?(//)?(([a-zA-Z0-9.]*)[^/]*/)?([a-zA-Z0-9.]*)', 'i');
  let result;
  if (noEmpty && noUndefined) {
    result = `@${username.match(re)[5]}`;
  } else {
    result = 'Invalid username';
  }
  res.send(result);
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
