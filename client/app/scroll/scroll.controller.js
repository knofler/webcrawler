'use strict';

angular.module('webcrawler')
  .controller('ScrollCtrl', function ($scope,uiGridConstants) {
   
  
  $scope.api_url     = '/api/scrolls/';
  $scope.api_model   = 'scroll'; 
  $scope.column_def  = [
          {field :'goalName',
              width :'10%',
              grouping: 
                { 
                  groupPriority : 10
                  }, 
              sort : 
                { 
                  priority  : 1, 
                  direction : 'asc' 
                },
              displayName     : 'Goal Name', 
              allowCellFocus  : true,
              headerCellClass : function (grid, row, col, rowRenderIndex, colRenderIndex) {
                  if (col.sort.direction === uiGridConstants.ASC) {
                    return 'red';
                  }
             }},
          {field:'goalDesc',cellTooltip: true,width:'15%',grouping: { groupPriority: 3 }, sort: { priority: 1, direction: 'asc' }},
          {field:'isTodo',width:'8%',grouping: { groupPriority: 3 }, sort: { priority: 1, direction: 'asc' },cellTooltip: 
            function( row, col ) {
              return 'field: ' + row.entity.field + ' isTodo: ' + row.entity.isTodo;
            } },
          {field:'isFav',width:'8%'},
          {field:'latitude',width:'10%'},
          {field:'longitude',width:'10%'},
          {field :'taskProgress',
              width :'8%',
              grouping: { 
                groupPriority : 3
                // aggregation   : uiGridGroupingConstants.aggregation.AVG 
              },
              groupingSuppressAggregationText: true},
          {field:'created',width:'20%'},
          {field:'created_by',width:'20%'},
          {field:'goal_completed',width:'20%'},
          {field:'isActive',width:'5%'}
          ];

  });
