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
    fullName = fullName.trim();
    const parts = fullName.split(' ');
    if (parts.length === 1) {
      result = `${parts[0]}`;
    } else if (parts.length === 2) {
      result = `${parts[1]} ${parts[0].split('')[0]}.`;
    } else if (parts.length === 3) {
      result = `${parts[2]} ${parts[0].split('')[0]}. ${parts[1].split('')[0]}.`;
    } else {
      result = 'Invalid fullname';
    }
  } else {
    result = 'Invalid fullname';
  }
  res.send(result);
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
