var Emitter = require('emitter');
var each = require('each');
var bind = require('bind');
var $ = require('jquery');

/**
 * Waypoints object takes points on the page and binds a scroll event
 * to the window. When these points are reached it will add or remove 
 * a class from the element
 */
function Waypoints() {
  this.waypoints = [];
  this._onScroll = _.throttle(bind(this, this._onScroll), 200);
}

/**
 * Mixin an event emitter so we can emit and bind to events
 */
Emitter(Waypoints.prototype);

/**
 * Add a waypoint.
 * @param {Number} point
 * @param {Object} data Any data associated with this point
 */
Waypoints.prototype.addPoint = function(point, data) {
  this.points.push({ y: point, data: data });
};

/**
 * Start the waypoints. Binds events to the window so they waypoints
 * will trigger when they are reached
 */
Waypoints.prototype.start = function() {
  if( this.points.length === 0 ) return;
  $(window).on('scroll', this._onScroll).trigger('scroll');
  this.emit('start');
};

/**
 * Method that is fired when scrolling. Checks to see if any of
 * the points is matched and if it is it will add or remove a class
 * from the elment
 */
Waypoints.prototype._onScroll = function() {
  var $window = $(window);
  var scrollPoint = $window.scrollTop();
  var newPoints = [];
  var wHeight = $window.height();
  var self = this;

  each(this.points, function(point){
    if( (scrollPoint + wHeight) >= point.y ) {
      self.emit('point', point.y, point.data);
    }
    else {
      newPoints.push(point);
    }
  });

  this.points = newPoints;

  if(this.points.length === 0 ) {
    this.stop();
  }
};

/**
 * Disable the waypoints by removing the scroll events
 */
Waypoints.prototype.stop = function() {
  $(window).off('scroll', this._onScroll);
  this.emit('stop');
};

/**
 * Easy way to setup waypoints on a page. Takes a selector
 * to match points on the page. Then we can use a data-API
 * to create waypoints on the page.
 * @param  {String} selector CSS selector to match elements on the page which will be used as Waypoints
 * @return {Waypoints}
 */
Waypoints.create = function(selector) {
  var waypoints = new Waypoints();

  $(selector).each(function(){
    var el = $(this);
    var y = el.scrollTop() + (el.attr('data-scroll-offset') || 0);
    waypoints.addPoint(y, { 
      el: el,
      addClass: el.attr('data-scroll-add-class') || null,
      removeClass: el.attr('data-scroll-remove-class') || null,
      delay: Number(data.attr('data-scroll-class-delay')) || 0
    });
  });

  waypoints.on('point', function(point, data){
    setTimeout(function(){
      data.el.addClass(data.addClass).removeClass(data.removeClass);
    }, data.delay);
  });

  waypoints.start();
  return waypoints;
};

module.exports = Waypoints;