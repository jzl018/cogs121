SCREENSHOTS:


![Screenshot of Home: current location](https://github.com/ltliang1/cogs121/blob/master/images/Milestone5/Screen%20Shot%202018-05-16%20at%203.36.28%20AM.png)



![Screenshot of Home: walkable route](https://github.com/ltliang1/cogs121/blob/master/images/Milestone5/Screen%20Shot%202018-05-16%20at%203.36.51%20AM.png)



![Screenshot of Home: tracking location](https://github.com/ltliang1/cogs121/blob/master/images/Milestone5/Screen%20Shot%202018-05-16%20at%203.37.03%20AM.png)



![Screenshot of Home: list of directions](https://github.com/ltliang1/cogs121/blob/master/images/Milestone5/Screen%20Shot%202018-05-16%20at%203.37.19%20AM.png)



![Screenshot of Agenda: delete button](https://github.com/ltliang1/cogs121/blob/master/images/Milestone5/Screen%20Shot%202018-05-16%20at%204.07.25%20AM.png)



![Screenshot of Agenda: added new events](https://github.com/ltliang1/cogs121/blob/master/images/Milestone5/Screen%20Shot%202018-05-16%20at%204.08.07%20AM.png)


HOW UI HAS IMPROVED SINCE MILESTONE 4:

Upon logging in, the map will recenter to the user's ACTUAL current location,
as opposed to the pre-defined location (HSS) we gave the user before this 
milestone.

Also, before, when the user inputted a destination, the app only created two 
markers:one at a pre-defined location (HSS) and the other at the inputted 
destination,then recentered the map based on these two markers. Now, when the 
user inputs a destination, the app connects the user's CURRENT LOCATION and 
this inputted destination with a walkable route.

The user can press the action button, which will make the app dynamically their
current location as they are walking.

Additionally, the list of directions will pop up when the user presses the 
"Next Event" division at the bottom of the screen.

Minor design change: we updated the current location marker to be a blue dot
that has a surrounding blue circle with a wider radius. (Before it was the same
red marker used for the destination marker.)


POSSIBLE USER ACTIONS:

Action #1:
When a user selects a destination, our app will produce a route that connects
their current location to that specified destination, providing the directions
they need to take to get to there.


Action #2:
Users can add and delete events in their agenda, and these changes will be
saved in the database.
