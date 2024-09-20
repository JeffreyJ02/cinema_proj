In order to run this demo, first navigate to the correct directory that the files are located in
the starting directory will look sort of like \Github\cinema_proj, to change to the correct directory,
type "cd .\backtofront\" this will change to the parent folder that the demo files are located.
Then type "cd .\demo\" and this will take you to the correct folder where the files are located.
If you want to check the contents of the directory you are in type "ls" and that will list all the files in that directory.

Now once you're in the \demo directory, type "mvn clean spring-boot:run", this should establish the backend server using spring-boot,
Next you want to right click on "index.html" and open with live server (if you do not have this option go to extensions in vscode and download "Live server by Ritwick Dey")
Once you've downloaded it, try right clicking again, if it still doesn't appear, try reopening vscode and it should appear.

Once the sample web page opens, there should be a button that appears in the middle of the page that says "fetch message from backend", go ahead and click it and a message should
appear at the bottom of that button, if a message does appear, good job!, you just demonstrated how a call from the front end to the back end will work, if not, then the backend server might
have had an issue establishing, in that case message me for troubleshooting.


This is a very simple and barebones example of how the front end sends requests to the backend.
In the real project we of course want the back end to handle things such as, if the user types in the name of a movie they're looking for, then the backend
will communicate with the database to find a matching name for that movie, or if the user wishes to create an account then the front end will send the filled out form to
the backend server to process that information (securely) and then the back end will send that information to the database to store the user's information.

So yes this demo is a far cry to what we're looking for, but at least for now it shows up how we can get things running quickly.