var Datastore = require('nedb')
var userData = app.getAppPath('userData');
db = new Datastore({ filename: userData + '/db/persons.db', autoload: true });


