A carousel photoApp that consumes Instagram API for photo consumption, written in vanilla JavaScript using the MVC pattern,

Hosted @: http://choreographer-violet-73727.bitballoon.com/

***********Test account credentials**************

Username: slackapp

Password: slackdemo
 
Playing with the app should be self-explanatory, in case:

1. Click a picture, opens in lightbox, 
2. ESC closes lightbox
3. Arrow keys allow for slideshow navigation

Design decisions:

The App is essentially broken into a couple of components, the main App as the controller/entry point, a view layer to manipulate the DOM and display data and a general utility belt with functions available all across. 

Why no Model? 

I chose not to create a separate model object/class. Primarily because the app  reads data from the server (API) and has no
create, update or delete operations. Given this scope, I do not think a model would apply. It's also designed in such a way 
that if in the future there is a need for operations on the data, I can easily pluck this out and create a new model object
with next to negligible refactor for the current app.




