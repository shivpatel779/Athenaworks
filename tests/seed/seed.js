const {ObjectID} = require('mongodb');

import Demographics from './../../models/demographics';
import Allergies from './../../models/allergies';

Demographics.find({}).removeAsync().then(() =>{
  Demographics.create({
    _id: new ObjectID(),
    firstname:'Ellen',
    lastname: 'Ross',
    gender: 'Female',
    martialstatus: 'Married',
    religiousaffiliation: 'Christian',
    ethnicity: 'Asian',
    languagespoken: 'English',
    address: '17 Daws Road, Portland, OR 97006',
    telephone: '4155551229',
    birthday: 'March 7, 1960'  
  })
})
  
