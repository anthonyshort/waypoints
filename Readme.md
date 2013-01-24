
# Waypoints

  Fire methods when points on the page are scrolled to for the first time. Useful for triggering animation to elements while scrolling down the page.

## Installation

    $ component install anthonyshort/waypoints

## Data API

Easiest way to use it is to use the create method. This assumes you want to add/remove classes and uses data attributes on the elements. This is the main purpose for this component but you can also use the standard API to do something different.

    Waypoints.create('.js-waypoint')

Now place these data attributes on each of the elements

`addClass`

A class to add to the element when it is reached

`removeClass`

A class to remove to the element when it is reached

`delay`

A delay, in milliseconds, for adding or removing the classes.

`offset`

Normally waypoints will use the scrollTop position of the element. You can adjust the point using this attribute to make it trigger earlier or later.

## Standard API

You can also use Waypoints to call methods at points on the page. This allows you to do things other than just add/remove classes from an element when scrolling to it.

    var waypoints = new Waypoints();

    waypoints.addPoint(100, {
      foo: "bar"
    });

    waypoints.on('point', function(point, data){
      console.log('Point reached');
    });

The `addPoint` method takes two arguments - a scroll point and data that will be sent through to the event when the point is reached.

## License

  MIT
