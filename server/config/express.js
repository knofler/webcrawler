/**
 * Express configuration
 */

'use strict';

var express         = require('express');
var fs              = require('fs');
var os              = require('os');
var favicon         = require('serve-favicon');
var morgan          = require('morgan');
var compression     = require('compression');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var cookieParser    = require('cookie-parser');
var errorHandler    = require('errorhandler');
var path            = require('path');
var config          = require('./environment');
var passport        = require('passport');
var session         = require('express-session');
var mongoStore      = require('connect-mongo')(session);
var mongoose        = require('mongoose');
var multer          = require('multer');
var nodemailer      = require('nodemailer');
var Upload          = require('../api/upload/upload.model');
var cloudinary      = require('cloudinary');
var R               = require('ramda');
var stripe          = require('stripe')('sk_test_oNypfa81MJDU92I4No33y1ji');
var twilio          = require('twilio');
var elasticsearch   = require('elasticsearch');
var request         = require('request');
var mysql           = require('mysql');

//######### request example for crawling ################
// request('http://www.booking.com').pipe(process.stdout)
var writefilePath = path.join(__dirname, '../../client/assets/dataDir/test.html'),
    myFile = fs.createWriteStream(writefilePath);

request('http://www.asos.com').pipe(myFile);

//########## fs module example use #####################
var getfilePath = path.join(__dirname, '../../client/assets/dataDir/102-24.csv');

fs.readFile(getfilePath,function (err, data) {
  if (err) throw err;
  console.log(data.toString());
 });

//########## OS module uses ########
console.log("Network Interfaces ==>> ", os.networkInterfaces());
console.log("HOSTNAME :: ===> ", os.hostname());
console.log("CPUS ::: ====> ",os.cpus());


// ############## ELASTIC SEARCH FOR INDEXING AND SEARCH DATA #################
var connectionString = process.env.SEARCHBOX_SSL_URL;
var Eclient = new elasticsearch.Client({
  host: connectionString,
  log: 'trace'
 });
Eclient.ping({
  // ping usually has a 3000ms timeout 
  requestTimeout: Infinity,
 
  // undocumented params are appended to the query string 
  hello: "elasticsearch!"
 }, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
 });
// Index a document
Eclient.index({
  index: 'sample',
  type: 'document',
  id: '1',
  body: {
      name: 'Reliability',
      text: 'Reliability is improved if multiple redundant sites are used, which makes well-designed cloud computing suitable for business continuity.'
  }
 }, function (error, response) {
  console.log(response);
 });
// search indexed document
Eclient.search({
  index: 'sample',
  type: 'document',
  body: {
      query: {
          match: {
             text: "Reliability"
          }
      }
  }
 }).then(function (resp) {
    console.log(resp);
 }, function (err) {
    console.log(err.message);
 });

// ############## MYSQL SETUP FOR TRANSACTION DATA #################
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'it5u_113',
  db:'my_db'
 });
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
 
  console.log('The solution coming from mysql is: ', rows[0].solution);
 });
connection.end();

//######### Twilio configuration (Create a new REST API client to make authenticated requests against the) ###########
var Tclient = new twilio.RestClient('AC984937fcdd9126f28a09827021aa62e1', '8d52c738b758d3406b4b30d72d883035'); 
//######### Cloudinary configuration ############
cloudinary.config({ 
  cloud_name: 'hwzu6pqt4', 
  api_key: '469579163551915', 
  api_secret: 'wPlhzHcSrHYgvTGldlhqK8FbZlo' 
  });
////######### nodemailer Configuration (create reusable transporter object using SMTP transport) ###################
var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'example@gmail.com',
      pass: 'password'
  }
 });

module.exports = function(app) {
  var env = app.get('env');
  
  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  //check express version of nodejs data rendering on html
  app.get('/nodepage',function(req,res){
    res.render('nodepage');
   });


  /*Configure the multer for drag and drop file upload, this includes cloudinary for file upload to CDN*/
  var done=false;
  var rand = Math.random();

  app.use(multer({ 

   // ************enable this one for Development***********
    dest: './client/assets/images/uploads/',
    // dest: './client/assets/img/uploads/',

    rename: function (fieldname, filename) {
      console.log("initial file name is ",filename);
      // get rid of space
      var noSpaceFileName = filename.replace(/\s/g, '')
      console.log('file name after space removal is ', noSpaceFileName)
      return noSpaceFileName;
     },
    limits: {
      fieldNameSize: 100,
      files: 20,
      fields: 5
     },
    onFileUploadStart: function (file) {
      console.log("file.original :: ", file.originalname + ' is starting ...');
      console.log("file new after name change :: ", file + ' is uploading ...');
     },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path)
      // adjust image name
      var image_name = file.name.slice(0,-4);
      // Initiate cloudinary
      cloudinary.uploader.upload(file.path,function(result){ 
            // Write Image information to database
            Upload.create({
              etag:result.etag,
              signature:result.signature,
              original_name:result.originalname,
              new_name:file.name,
              mimeType:file.mimetype,
              path:result.url,
              ext:file.extension,
              size:file.size,
              upload_date:result.created_at
              // uploaded_by:req.body.user_id  
            });
            console.log("after file upload data is ", result); 
        },
        {
          public_id:image_name, 
          crop: 'limit',
          width: 2000,
          height: 2000,
          eager: [
            { width: 200, height: 200, crop: 'thumb', gravity: 'face',
              radius: 20, effect: 'sepia' },
            { width: 100, height: 150, crop: 'fit', format: 'png' }
          ],                                     
          tags: ['special', 'for_homepage']
        }
        )
    }
    }));
  
  //########### Configure stripe route ######################
  app.post('/charge',function(req,res){
    // Get the credit card details submitted by the form

    console.log("req.body is :: ",req.body);
    stripe.customers.create({
      //custom stripe forms
      source: req.body.token,
      description:req.body.name,
      email:req.body.email

      // basic stripe forms
      // source: req.body.stripeToken,
      // description:req.body.name,
      // email:req.body.stripeEmail

     }).then(function(customer) {
      return stripe.charges.create({
        amount: req.body.amount, // amount in cents, again
        currency: "aud",
        customer: customer.id
      });
     }).then(function(charge) {
      // saveStripeCustomerId(user, charge.customer);
     });
    // Later...
    // var customerId = getStripeCustomerId(user);
    // stripe.charges.create({
    //   amount: 1500, // amount in cents, again
    //   currency: "aud",
    //   customer: customerId
    //  });
    })
  
  // Pass in parameters to the REST API using an object literal notation. The
  // REST client will handle authentication and response serialzation for you.

  //########### Make Phone calls ######################
  app.post('/makecall',function(req,res){
    console.log("req from phone call is :: ", req.body.phone)
    Tclient.calls.create({
      url:"http://demo.twilio.com/docs/voice.xml",
      // url:"http://www.rummanahmed.com/getTwiml",
      to: req.body.phone,
      from:'+61412649744',//this is twilio test account
      body:'ahoy hoy! Testing Twilio and node.js',
      method: "GET",  
      fallbackMethod: "GET",  
      statusCallbackMethod: "GET",    
      record: "false" 
     }, function(error, call) {
      // The HTTP request to Twilio will run asynchronously. This callback
      // function will be called when a response is received from Twilio
      // The "error" variable will contain error information, if any.
      // If the request was successful, this value will be "falsy"
      if (!error) {
          // The second argument to the callback will contain the information
          // sent back by Twilio for the request. In this case, it is the
          // information about the text messsage you just sent:
          console.log('Success! The SID for this Call is:');
          console.log(call.sid);

          console.log('Message sent on:');
          console.log(call.dateCreated);
      } else {
          console.log('Oops! There was an error.',error);
      }
     }); 
   });
  //########### Generate Twiml xml ######################
  app.post('/getTwiml',function(req,res){
    //Create TwiML response
    var twiml = new twilio.TwimlResponse();
    twiml.say('This is Mr Rumman Ahmed, This script is created using Twiml from Nodejs');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
   });
  //########### Send SMS ######################
  app.post('/sendsms',function(req,res){
    console.log("req inside sendsms is ", req);
    Tclient.sms.messages.create({
      to:'+61412649744',
      from:'+15005550006',//this is twilio test account
      body:'ahoy hoy! Testing Twilio and node.js'
     }, function(error, message) {
      // The HTTP request to Twilio will run asynchronously. This callback
      // function will be called when a response is received from Twilio
      // The "error" variable will contain error information, if any.
      // If the request was successful, this value will be "falsy"
      if (!error) {
          // The second argument to the callback will contain the information
          // sent back by Twilio for the request. In this case, it is the
          // information about the text messsage you just sent:
          console.log('Success! The SID for this SMS message is:');
          console.log(message.sid);

          console.log('Message sent on:');
          console.log(message.dateCreated);
      } else {
          console.log('Oops! There was an error.',error);
      }
     }); 
   });
  
  //Recieve email from nodemailer service to this restful api, then smtpTransport send emails
  app.post('/api/emails/',function(req,res){
    console.log("req received from email service is : ", req.body.to);
    var toMail = req.body.to;
    var fromMail = req.body.from;
    var subjectMail = req.body.subject;
    var textMail = req.body.text;
    console.log(" tomail is : ",toMail, " fromMail is : ", fromMail , " subject Mail is ", subjectMail , " bodyMail is : ", textMail);
    // Your NodeMailer logic comes here
      smtpTransport.sendMail({
         from: fromMail, // sender address
         to: toMail, // comma separated list of receivers
         subject: subjectMail, // Subject line
         text: textMail // plaintext body
      }, function(error, response){
         if(error){
             console.log(error);
         }else{
             console.log("Message sent: " + response.message);
         }
      });
   });
  
  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongoose_connection: mongoose.connection })
   }));
  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
   }
  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
   }

 };