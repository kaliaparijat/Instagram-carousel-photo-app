# slack
A photo app for slack, written in pure javascript.  

Please Note:

Instagram does not allow an app to be made visible to the general public until it has been reviewed. Only sandbox users can be allowed to checkout an APP in sandbox mode. You can send me a request to add you as a sandbox user or use the test account to actually play with the app. 

To be able to view this app with a test account, use following credentials:

***********Test account credentials**************

Username: slackapp

Password: slackdemo

and the subsequent URL: 

http://choreographer-violet-73727.bitballoon.com/

Playing with the app:

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

All in all, I had a great experience building this using pure Javascript. Thank you! 



