const express = require('express');

const app = express();

app.get('/', (request, response) => {
   response.json({serverStaus: 'on'});
})

console.log('Server is on');
app.listen(3333);
