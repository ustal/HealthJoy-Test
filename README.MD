# TEST TASK

- Setup and run dev environment localy

- Extend environment with other node modules(if needed)

- Build 'Users List' angular application that:

    1) Stands on AMD approach using Requre.js

    2) App retrieves users list data from ./app/data.json

    3) App displays paginated/filtered list inside viewport(div.viewport of index.html)

        Limitations:

            - Users list loaded one time;
            - Number of users in the list can be up to 100 000(more or less no limitations);
            - Viewport allows to show only limited number of items(can be set: 10, 25, 50, 100);
            - On scrolling viewport one should see next/prev set of users(if available) in some kind of endless scroll,
                EG: in the case no filters applied if user set scroll position right in the middle he will see only current page in viewport
                    Performance - rules.

            - Singe item height can be fixed(predefined);

    4) Available filters:

        - By any property of address field
        - By Company
        - Age

    5) Search by:

        - Name
        - Phone
        - Email


Nice to:

    - Prevent any memory leaks.
    - Use UI-router.
    - Use Almond, output App is compressed and optimized to single JS file.


===============================================================================================

Time average:
3-8 hours