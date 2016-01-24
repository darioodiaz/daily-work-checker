# daily-work-checker
A simple ionic application to do checkin and checkout of your daily work, and calculate how many hours did you work

# How to install?
Clone this repo and run `npm install`, `bower install` and `cordova plugin add https://github.com/VitaliiBlagodir/cordova-plugin-datepicker.git` then `ionic serve`

# How it works?
When you start your work day, go to checkin tab and adjust the date and time (if you do it late) and do a checkin. At the end of the day, go to checkout tab (if the hour differs of your work checkout adjust it) and do a checkout.

In the summary tab you will see how many hours you work in that month

# Addon
Now when you do a checkout its add on your custom spreadsheet in google drive, its possible because I do a google script that insert rows in a spreadsheet, so when you install/run the app for first time, it'll need access to your google account to authorize that function. In `googleSpreadSheet.service.js` file you'll find the constant `SHEET_ID`, replace that with your sheet id.

TODO list:

- Finish summary tab
- Test some checkin and checkout 'cheats'
- Browse between months to edit or complete your worked days
- Add localStorage option if no internet access or no google authorization

