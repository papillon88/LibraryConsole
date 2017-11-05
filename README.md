# LibraryConsole

This is a functional library management GUI web app made using html,css,angularJS,Spring BOOT,Java,JDBC and MySQL.

**Following functions can be performed on this web app :**

- Search window - To search for a book enter either ISBN  ,Book Title or Author then click on Submit button. Results will show the number of copies available for that book in different branches.

- Checkin  window - In order to check in a book enter either ISBN  ,Card_no or Borrower name then click on Submit button.
Click on the left side of the panel to select the record that needs to be checked in and click on Checkin button.
Enter all the mandatory field values for the -ISBN,Branch ID & Card # to be able to search a record.Click on the left side of the displayed result  to select the particular record after that click on Checkout button to checkout that book from the system.

- Checkout  window - Enter all the mandatory field values for the -ISBN,Branch ID & Card # to be able to search a record.Click on the left side of the displayed result  to select the particular record after that click on Checkout button to checkout that book from the system.

- Add borrower window - In order to add a Borrower add all the mandatory fields values for First Name ,Last Name ,SSN & Address then click on Add Borrower to add a new Borrower to the System.

- Fines window - Enter the Borrowerd’s Card# and the fine Amount in order to pay the fines on that card. Click on search button. Click on the left side of the displayed result  to select the particular record after that click on Pay button to submit the fine.


**Steps to build and run the webapp :**

1) Download the code or import  it into a java IDE. Then do a build. If this is the first time building, internet connection is needed to download the dependencies.
2) Artifact LibraryConsole.war will be created. Copy this onto your desktop(windows) or some location(unix/mac)
3) Then get the fully qualified path to the file. example : C:\workspace\LibraryConsole\build\libs\LibraryConsole.war
4) Run this file using the following command : java -jar C:\workspace\LibraryConsole\build\libs\LibraryConsole.war
5) Rhe webserver uses port 8080 for its webpage. So pls make sure this port is available.
6) After running the application, go to this URL in any web browser and hit enter : http://localhost:8080/library/ahome.html


