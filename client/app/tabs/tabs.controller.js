'use strict';

angular.module('webcrawler')
  .controller('TabsCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.data = {
    	fields:[ 
              {'name':'faculty_ref','header':'Ref','type':'text','title':'faculty_ref','subtitle':'entry_date','subtitle_header':'Entry Date'},
              {'name':'entry_date','header':'Entry','type':'date'},
      			  {'name':'dept','header':'Department','type':'select','options':['HOT','MEDIUM','SWEET']},
              {'name':'supplier','header':'Supplier','type':'select','options':['HOT','MEDIUM','SWEET']},
              {'name':'description','header':'Description','type':'text'},
      			  {'name':'value_excluding_GST','header':'Amount','type':'number'},
              {'name':'userName','header':'Name','type':'text'},
      			  {'name':'user','header':'OneID','type':'text'},
      			  {'name':'requisition_number','header':'Requisition','type':'text'},
              {'name':'purchase_order','header':'PO Number','type':'text'},
      			  {'name':'invoice_number','header':'Invoice','type':'text'},
      			  {'name':'delivery_date','header':'Delivery','type':'date'}
      			  ],
    	url:'/api/purchases',
    	model:"purchase",
    	modal:"purchases"
    }
  });
