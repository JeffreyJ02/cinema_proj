In order to run this program, first navigate to the correct directory that the files are located in
the starting directory will look sort of like \Github\cinema_proj, to change to the correct directory,
type "cd .\backtofront\" this will change to the parent folder that the demo files are located.
Then type "cd .\demo\" and this will take you to the correct folder where the files are located.
If you want to check the contents of the directory you are in type "ls" and that will list all the files in that directory.

Now once you're in the \demo directory, type "mvn clean spring-boot:run", this should establish the backend server using spring-boot,
Next you want to right click on "index.html" and open with live server (if you do not have this option go to extensions in vscode and download "Live server by Ritwick Dey")
Once you've downloaded it, try right clicking again, if it still doesn't appear, try reopening vscode and it should appear.

09/22/2024:
Ok so after spending nearly 10 hour straight on this demo, I finally have a good demo as to how our cinema booking will work.
There aren't many functions currently, HOWEVER, I have implemented a search function, that will allow any user to look up a movie,
PROVIDED that movie exists within the database. In addition to that I have also implemented an add/delete movie function that should work well with
with the example data base I have set up. So all in all I think this will suffice for the demo, of course it's definitely in it's early stages,
however the foundation we currently have are, in my opinion, perfect for moving forward. Now im not entirely sure if this will seamlessly flow with
with our frontend engineers web design, I really hope it does, but even so we know what we need now to pull entries from the database and how to add
them and delete them from it.

Admin credentials:
User:admin
password:adminPassword
