0. # Caveats

As of right now, the backend API is hosted on Heroku, but the URIs in the API fetches in the clinet app do not reflect this. Also the frontend is not hosted. It will be in the future. This means that in order to run the app localy, you need to set up your own Mongo database to be connected to the server API.

1. # Installation

Download this repo and the one titled [presentplaneraren-back].
run `npm i` to install dependencies and packages and `npm start` to start app. Make sure the backend is running.

2. # Known issues and future fixes

    1. There are still a lot of css left to be done, mainly in terms of responsivity. The navbar buttons need to be styled correctly. Balloons to be added to the elephant.
    2. Right now the js media query function is being used to trigger css changes, this should be changed to use Tailwind's own media query functionality.
    3. Accepting/rejecting invites removes the invite prompt only through a hack. This needs to be fixed and involves moving a bunch of state around.
    4. There is a prepared Google OAuth function that is disabled for now due to conflicts with local login. This is however more of a backend issue.
    5. When creating a user, there is only choice for email and password. Username or the like should be added.
    6. The repeat password input in register has no functionality tied to it.
    7. When displaying users in a group, the mongodb object id is shown instead of email/username. Fixing it requires restructuring the database.
    8. There is no settings functionality.
    9. The placements of API calls need to be reviewd. They could perhaps be restructured to yield better responsivity, showing certain updates without requiring a site reload.
    10. There needs to be more graphic variety: much looks the same. More detail colors that pop are needed to display buttons and updates and such.
    11. The invite prompt should probably be moved from groups to dashboard.
    12. The group selector when creating a new list is not functional.
    13. Since site is mobile first, not much responsivity on buttons and such for desktop is implemented. Hover and click states are needed.

3. # User test

The app in its current form was tested by one user and the following points were made.
1. Settings and logout button should not be in dashboad, since they draw attention away from the actual content. Should be moved elsewhere.
2. "Bjud in" as stated when creating a group makes the user think that they can invite people without an account, since this is how it's usually done. Either implement such a function or change "bjud in" to something else that makes it clear that the user must already be on the app.
3. When creating an item, "namn" is a strange label for what to call the item. Perhaps "önskemål" would be better.

This is all legitimate critizism and will be reviewed. Further, I noticed that the user struggled with understandig the user flow. The way the app works and its purpose need to highlighted somehow, perhaps with popups in each section for new users.
