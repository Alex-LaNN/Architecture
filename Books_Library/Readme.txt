The following actions with the database are implemented and configured in the application:
- primary initialization of the database is carried out from the corresponding '.sql' files
- implemented the ability to add and remove books from the database
- books marked for deletion are deleted no earlier than after 24 hours
- it is possible to cancel the action of deleting a book during this time
- implemented automatic deletion of marked books for which the deferred deletion time has expired, every 5 minutes
- database 'backup' is provided at the beginning of the 2nd minute of every hour
- database 'update' is provided at the beginning of the 4th minute of every hour

To run the application you need:
- go to the project folder "Books_Library"
- in the console run the command "npm run s"
- in the browser go to the address "localhost:3000"

When running an application using Docker, you must:
  - go to the project folder "Books_Library"
  - in the ".env" file:
    - comment out line 11: DB_HOST = localhost
    - uncomment line 12: DB_HOST = host.docker.internal
    - run the command to create a Docker image: "docker build . -t books_library"
    - execute the command to launch a container from the specified Docker image: "docker run --rm -p 3000:3000 -d books_library"
    - in the browser go to the address "localhost:3000"

To log in to the administrator page: login - 'admin', password - 'pass'.
