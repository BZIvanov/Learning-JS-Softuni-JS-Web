## Workflow for session-cookies authentication

When the browser make request to the backend, the backend will create session. The session will be stored in the database, because if we use only in memory and have million of users we will run out of memory.

Then the backend will send cookie to the browser with which on every next request we will use it to identify which browser with which session is connected.
