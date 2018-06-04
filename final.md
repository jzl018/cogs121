~~~~~~~~~~~~~~~~~~~~~~~ TEAM MEMBERS ~~~~~~~~~~~~~~~~~~~~~~

1) Lee Tiger Liang
-

2) Jason Liu
- Helped Kenneth with creating SQLite database
- Figured out how to autocomplete location input-box on "agenda" page

3) Michelle Nhi Nguyen
- Figured out how to use Google Maps API on "home" page
	- Displaying map and search bar
	- Create marker from inputted location in search bar
		- Create route between current location and destination
- Worked on MD files
- Recorded demo video

4) Kenneth Truong
- Created SQLite database
- Figured out functions to add, delete, and display data
- Worked on Agenda page and helped display data dynamically from database
- Helped with MD files

~~~~~~~~~~~~~~~~~~~~~~~ SOURCE CODE FILES ~~~~~~~~~~~~~~~~~~~~~~~

******** HANDLEBARS ********

/views
1) login.handlebars
- Sets up forms for email and password

2) home.handlebars
- Allows users to sign out
- Sets up Google Maps API: displays map and search bar
- Shows the "next event" on the bottom
- Shows directions to inputted destination upon clicking the direction button
- Starts/stop tracking current location after clicking "play" button

3) agenda.handlebars
- Allows users to go back to home page
- Sets up forms to add an event to the agenda
	- Event location uses Google Map's autocomplete

******** JAVASCRIPT ********

1) app.js
- Defines GET methods for all of our handlebars
- Handles all SQLite database changes methods.


2) database.js
- Creates our SQLite database

/public/js

3) agenda.js
- Defines the insertion/deletion functions in agenda
- Allows for autocomplete in location input form

4) googleMaps.js
- Creates map, with the center at user's current location
- Creates path between current location and inputted destination
	- Route provided is assuming you are walking
- Tracks current location every 5 seconds after pressing triggering the function

5) login.js
- Toggles image/title between Philip Guo and Sean Kross upon clicking "Create
  New Account"

6) home.js
-Gets the first event from database and sends the data to display to div "eventTitle".

/routes

For the following .js files, functionality: GETS the respective page via app.js

6) agenda.js

7) home.js

8) login.js

******** CSS ********

public/css

1) agenda.css
- Formats sign out button to be upper left corner
- Centers event name/location forms
- Centers title

2) home.css
- Formats map to take up entire screen, with search bar to the right
- Puts directions over a white background after inputting location
- The "nextEvent" shown at the bottom is put over a white background, where
  the cursor is changed.
- Changes font

3) login.css
- Centers everything (forms and buttons)
- Makes image circular

~~~~~~~~~~~~~~~~~~~~~~~ DEMO VIDEO ~~~~~~~~~~~~~~~~~~~~~~~

Link: https://drive.google.com/file/d/1NHO-SRRA6wg_AWIjyjILCkVbZgp1bCfL/view?usp=sharing

