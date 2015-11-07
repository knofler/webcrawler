'use strict';

angular.module('webcrawler')
  .controller('MonadCtrl', function ($scope) {
   
    // #################### **** MONAD ***** ###################### 
  	$scope.MONAD = function () {
      var prototype = Object.create(null);
    		//Constructor
    		function unit (value){
    			var monad = Object.create(prototype);
      			monad.bind =  function (func) {
      				return func(value);
      			};
      		return monad ;
    		 };

  		//Monad Method 
  		unit.lift = function (name,func) {
  			prototype[name] = function(args){
  				return unit(this.bind(func,args));
  			};
  			return unit;
  		 };
  		console.log("prototype is : ", prototype)
  		return unit ;
     };

  	// Alternative initialization
    // var ajax = $scope.MONAD()("hello world").bind(alert);

    //Instantiate MONAD with lift function for future method binding with name
    var sayIt = function (data) {
      console.log(data);
     };
 
    var ajax  = $scope.MONAD().lift('showMe',sayIt);
    console.log("ajax is :", ajax.prototype)
   

    //Instantiate binding constructor with value
    var monad = ajax("publish this value as argument");
    console.log("monad is : ", monad);
    
    //Access Monad methods directly by name
    monad.showMe();

  	//function inside function
  	function getData(val){
  	 	return function(val1){
  	 		return function(val2){
  	 			return val+val1+val2
  	 		}

  	 	}
  	  };
  	console.log(getData(12)(3)(4));

    // #################### ****RAMDA***** ###################### 
    
    console.log("lodash is :" , _);
    console.log("Ramda is :" , R);

    //Lets play with Ramda
    console.log(R.add(89,11));

    // #################### *** Currying *** ######################     
    console.log("This is classic example of currying :==>", R.curry(R.concat("h"))("ello"));

    var addR    = R.add(5);
    var list    = [5,9,89,88]
    var newlist = [1,2,3]

    console.log(addR);
    console.log(addR(11));
    console.log(addR(159));
    console.log(R.map(addR,list));

    var get = R.curry(function(x,obj){
      return obj[x];
     });

    // ############# Closure ################

    var closure = function () {
          var x = 10;
          return function(f){
            return function (fn,list){
              var sum = f(x);
               console.log("addR result sum is : ", sum);
               console.log("f is ", f);
               console.log("list is ", list);
               console.log('reduce func on list with sum is', fn(f,10,list));
           }
          }
         };

    var tryClose = closure();
    var reduce = tryClose(addR);
    reduce(R.reduce,newlist);
    console.log("tryClose now lauching ouside and made closure func a closure", tryClose);  

    // ############# Compose ################
    var add    = function(a,b){
        return a+b;
       } 
    var triple = function(x){return x*3;};
    var double = function(x){return x*2;};
    var square = function(x){return x*x;};

    var squareThenDoubleThenTriple = R.compose(triple,double,square);
    console.log(squareThenDoubleThenTriple(23));

    var articles = [
      {
        title:"this is good",
        url:"http://this.is.com",
        author:{
          name:'Debbie Dowrer',
          email:'debbie@do.com'
        }
      },
       {
        title:"book bust",
        url:"http://that.data.net",
        author:{
          name:'Rumman Ahmed',
          email:'rumman@test.com'
        }
      }
     ]

    var names = R.map(
                  R.compose(
                    get('name'),get('author')
                    )
                 );
    console.log("names are: ", names)
   
    var isAuthor = function(name,articles) {
        return R.compose(
          R.contains(name),names
          )(articles);
       }
    console.log(isAuthor('Rumman Ahmed',articles));

    var search = function(data){
      console.log("data from map is", data.author);
     }

    console.log(R.map(triple,list));
    console.log(R.map(search,articles));
    console.log(R.reduce(add,10,R.map(triple,list)));

    var getList = R.curry(function (list) {
      return list;
     });

    // console.log("IO is ", IO())

    var name = ["Rumman"];
    console.log(R.map(R.compose(R.head,R.reverse),name));
    var getComposed = R.compose(R.map(triple),R.map(square),getList);

    console.log("getComposed result is ",  getComposed(list))

    // ############# Maybe functor ################

    var Maybe = R.curry(function (value,fn){
      console.log("I have got the value now " + value);
        return value === null || value === undefined || value === ""? Maybe(null) : fn(value) ;
     });

    // console.log("Maybe is ", Maybe("catss")(R.match(/cat/g)))

    var getFirst = R.compose(R.map(R.head),Maybe("catsuop"),R.match(/cat/g));
    console.log(getFirst());


    });
