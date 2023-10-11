# Fullstack Part 0 - Exercises

I wrote here the exercises for the firts set of assignments at the open full-stack course from University of Helsinki. This file containes the three sequence diagrams for exercises 0.4, 0.5, and 0.6. At exercises 0.1, 0.2, 0.3, I have read the tutorials and marked them at the submission system.

<br><br>



## Ex-0.4: New note diagram

**Prompt:** Create a diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the Save button.

<br><br>



```mermaid

sequenceDiagram

    participant Browser

    participant Server



    Note right of Browser: The user adds the input and hits the Save button and the seqence starts.



    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note

    activate Server

    Server-->>Browser: A URL 302 Redirect

    deactivate Server

    

    Note left of Server: The server asks the browser to do a new GET request to another URL (the Location)

    

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes

    activate Server

    Server-->>Browser: HTML Document

    deactivate Server



    Note right of Browser: The browser will reload all the other elements (the CSS file, JavaScript file, and the JSON data file)



    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css

    activate Server

    Server-->>Browser: A CSS file

    deactivate Server



    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js

    activate Server

    Server-->>Browser: the JavaScript file

    deactivate Server



    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json

    activate Server

    Server-->>Browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]

    deactivate Server



    Note left of Server: The page will render the old notes + the new one added by the user form the JSON file

```

<br><br>

## Ex-0.5: Single page app diagram

**Prompt:** Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

<br>



```mermaid

sequenceDiagram

    participant Browser

    Participant Server



    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa



    Note left of Server: The server will process the request and compile the needed files into a single response.  



    activate Server

    Server-->>Browser: A Comprised HTML File

    deactivate Server

```

<br>



**Description:** It is clearly stated that, "SPA-style websites don't fetch all of their pages separately from the server like our sample application does, but instead comprise only one HTML page fetched from the server, the contents of which are manipulated with JavaScript that executes in the browser." This shows that the server will do most of the work and the browser will only get the final resutl as a single HTML file containing everything the browser needed. 

<br><br>



## Ex-0.6: New note in Single page app diagram

**Prompt:** Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

<br><br>



```mermaid

sequenceDiagram

    participant Browser

    participant Server



    Note right of Browser: The user adds the input and hits the Save button and the seqence starts.



    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa



    activate Server

    Server-->>Browser: 201 HTTP Response (Created) - Update the Current HTML File

    deactivate Server



    Note right of Browser: The page stays at the same page, yet sends the data to the server and updates the URL.

```

<br>



**Description:** Once the user hits the Save button, the browser will send a POST requset to the server where the JavaScript has created the data and pushed it to the server. Preventing the regular way of handling forms, the JavaScript file sends the data using the XMLHttpRequest method as a "application/json". This way, the server understands that the only thing that needs render is the JSON data and the all other things compiled into the HTML file would stay the same. The browser rerenderds the HTML page with the specified modifications.
