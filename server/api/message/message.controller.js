 'use strict';

 import _ from 'lodash';
 import Product from '../product/product.model';
 function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
    .spread(updated => {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
      .then(() => {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}


/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
 function updateMessage(input, response) {
   console.log("In update message")

   var responseText = null;
   var id = null;

   if ( !response.output ) {
    response.output = {};
  } else {
    // if ( logs ) {
    //   // If the logs db is set, then we want to record all input and responses
    //   id = uuid.v4();
    //   logs.insert( {'_id': id, 'request': input, 'response': response, 'time': new Date()});
    // }
    return response;
  }

  console.log("Response: " + response)

  if ( response.intents && response.intents[0] ) {
    var intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if ( intent.confidence >= 0.75 ) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if ( intent.confidence >= 0.5 ) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }

  response.output.text = responseText;
  // if ( logs ) {
  //   // If the logs db is set, then we want to record all input and responses
  //   id = uuid.v4();
  //   logs.insert( {'_id': id, 'request': input, 'response': response, 'time': new Date()});
  // }
  return response;
}

export function index(req, res) {
  console.log("In index ...");

  var Watson = require( 'watson-developer-cloud/conversation/v1' );  // watson sdk

  //===============WATSON::CONVERSTATION===============

  // Create the service wrapper
  var conversation = new Watson( {
    url: 'https://gateway.watsonplatform.net/conversation/api',
    username: process.env.CONVERSATION_USERNAME || '<username>',
    password: process.env.CONVERSATION_PASSWORD || '<password>',
    version_date: '2016-09-20',
    version: 'v1'
  } );

  var context = { 
    conversation_id: '8060cdf4-3690-4bcb-a071-391ecc69fbca',
    system: 
    { dialog_stack: [ [Object] ],
     dialog_turn_counter: 1,
     dialog_request_counter: 1 },
     default_counter: 0 }


     var workspace = process.env.WORKSPACE_ID || '8cacc055-ecd1-47ab-946b-6241c2210fa2';
     console.log("workspaceID: " + workspace)

     var payload = {
      workspace_id: workspace,
      context: {context},
      input: {}
    }

    console.log("Payload:" + payload)
    if ( req.body ) {

     if ( req.body.input ) {
      payload.input = req.body.input;
    }
    if ( req.body.context ) {
      // The client must maintain context/state
      payload.context = req.body.context;
    }
    console.log("Payload Context:" + payload.context)

// Send the input to the conversation service
conversation.message( payload, function(err, data) {
 if ( err ) {
   return res.status( err.code || 500 ).json( err );
 }
 return res.json( updateMessage( payload, data ) );
} );

if ( !workspace ) {
  return res.json( {
    'output': {
      'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
      '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' +
      'Once a workspace has been defined the intents may be imported from ' +
      '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
    }
  } );

} else {
  return res.json( {
    'output': {
      'text': 'The app has been correctly configured with a <b>WORKSPACE_ID</b> environment variable.'
    }
  } );

}



}
}

export function sendTwilio(req, res) {
  console.log('In console arrived at /api/message/twilio')

    var Watson = require( 'watson-developer-cloud/conversation/v1' );  // watson sdk

  //===============WATSON::CONVERSTATION===============

  // Create the service wrapper
  var conversation = new Watson( {
    url: 'https://gateway.watsonplatform.net/conversation/api',
    username: process.env.CONVERSATION_USERNAME || '<username>',
    password: process.env.CONVERSATION_PASSWORD || '<password>',
    version_date: '2016-09-20',
    version: 'v1'
  } );

  var context = { 
    conversation_id: '8060cdf4-3690-4bcb-a071-391ecc69fbca',
    system: 
    { dialog_stack: [ [Object] ],
     dialog_turn_counter: 1,
     dialog_request_counter: 1 },
     default_counter: 0 }


  //===============TWILIO===============

  var twilio = require("twilio");

  var twilioSid = process.env.TWILIO_SID || '<twilio-sid>'; 
  var twilioToken= process.env.TWILIO_TOKEN ||'<twilio-token>';


  var client = new twilio.RestClient(twilioSid, twilioToken);
  console.log('Created Twilio client')
  /* ?input=:input */
  req.body.From = "+16176101988"

  console.log(req.body.Body);
  console.log(req.body.From);  

  var workspace = process.env.WORKSPACE_ID || '<workspace-id>';

  var payload = {
    workspace_id: workspace,
    context: context,
    input: {'text': 'Hi'}
  };

  if ( req.body ) {
    if ( req.body.Body ) {
      payload.input = {'text': req.body.Body};
    }
    // if ( req.query.context ) {
    //   // The client must maintain context/state
    //   payload.context = req.query.context;
    // }
  }

  conversation.message( payload, function(err, data) {
    if (err){
      console.log('error:', err);
    }
    else{
      var response = updateMessage( payload, data )
      var text = response.output.text
      console.log('Response:', text);
      context = response.context
      console.log('Context:', context);
      console.log("Sent to:", req.body.From);  

      client.sendMessage({
        to: req.body.From,
        from:'+14152132673',
        body: text
      }, function(err, message) {
        //res.send('Message sent! ID: '+message.sid);
      });
    }
  });
  console.log('Sent! ')

}

