'use strict';

angular.module('webcrawler')
  .factory('Display', function () {
    // Service logic

    // Define Default Variables here
     var defaults   = {
                        padding_x: 10,
                        padding_y: 10,
                        no_columns: 3,
                        margin_bottom: 50,
                        single_column_breakpoint: 700
                      },
          columns,
          $article,
          article_width;
    
    //Define Display class    
    function Display(element, options,DisplayName) {
      this.element   = element;
      this.options   = $.extend({}, defaults, options) ;
      this._defaults = defaults;
      this._name     = DisplayName;
      this.init();
     };

    //Define Display prototype methods 
    Display.prototype.init               = function () {
      var self = this,
          resize_finish;

      $(window).resize(function() {
          clearTimeout(resize_finish);
          resize_finish = setTimeout( function () {
              self.make_layout_change(self);
          }, 11);
      });

      self.make_layout_change(self);

      setTimeout(function() {
          $(window).resize();
      }, 500);
      };
    Display.prototype.calculate          = function (single_column_mode) {
      var self = this,
          tallest = 0,
          row = 0,
          $container = $(this.element),
          container_width = $container.width();
          $article = $(this.element).children();

      if(single_column_mode === true) {
          article_width = $container.width() - self.options.padding_x;
      } else {
          article_width = ($container.width() - self.options.padding_x * self.options.no_columns) / self.options.no_columns;
      }

      $article.each(function() {
          $(this).css('width', article_width);
      });

      columns = self.options.no_columns;

      $article.each(function(index) {
          var current_column,
              left_out = 0,
              top = 0,
              $this = $(this),
              prevAll = $this.prevAll(),
              tallest = 0;

          if(single_column_mode === false) {
              current_column = (index % columns);
          } else {
              current_column = 0;
          }

          for(var t = 0; t < columns; t++) {
              $this.removeClass('c'+t);
          }

          if(index % columns === 0) {
              row++;
          }

          $this.addClass('c' + current_column);
          $this.addClass('r' + row);

          prevAll.each(function(index) {
              if($(this).hasClass('c' + current_column)) {
                  top += $(this).outerHeight() + self.options.padding_y;
              }
          });

          if(single_column_mode === true) {
              left_out = 0;
          } else {
              left_out = (index % columns) * (article_width + self.options.padding_x);
          }

          $this.css({
              'left': left_out,
              'top' : top
          });
      });

      this.tallest($container);
      // $(window).resize();
     };
    Display.prototype.tallest            = function (_container) {
      var column_heights = [],
          largest = 0;

      for(var z = 0; z < columns; z++) {
          var temp_height = 0;
          _container.find('.c'+z).each(function() {
              temp_height += $(this).outerHeight();
          });
          column_heights[z] = temp_height;
      }

      largest = Math.max.apply(Math, column_heights);
      _container.css('height', largest + (this.options.padding_y + this.options.margin_bottom));
     };
    Display.prototype.make_layout_change = function (_self) {
      if($(window).width() < _self.options.single_column_breakpoint) {
          _self.calculate(true);
      } else {
          _self.calculate(false);
      }
     };


    // Public API here
    return Display;

  });
