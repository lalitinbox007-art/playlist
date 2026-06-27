const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

// Path to your JSON file
const filePath = path.join(__dirname, 'songs.json');

app.get('/list', (req, res) => {
    // 1. Read the JSON file asynchronously
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('<h1>500 - Internal Server Error</h1><p>Could not read data file.</p>');
        }

        try {
            // 2. Parse the JSON string into a JavaScript object/array
            let jsonData = JSON.parse(data);
	    jsonData = jsonData.songs;
	    console.log('json data', jsonData);
            // 3. Build the HTML Unordered List
            let htmlResponse = '<h1>My Songs List</h1><ul>';

            // Scenario A: If the JSON is an array of items
            if (Array.isArray(jsonData)) {
                jsonData.forEach(item => {
                    // Adjust 'item.name' or 'item' depending on your JSON structure
                    const displayValue = typeof item === 'object' ? item.name : item;
                    htmlResponse += `<li>${displayValue}</li>`;
                });
            } 
            // Scenario B: If the JSON is a single object with key-value pairs
            else if (typeof jsonData === 'object' && jsonData !== null) {
                for (const [key, value] of Object.entries(jsonData)) {
                    const displayValue = typeof value === 'object' ? JSON.stringify(value) : value;
                    htmlResponse += `<li><strong>${key}:</strong> ${displayValue}</li>`;
                }
            }

            htmlResponse += '</ul>';

            // 4. Send the HTML response
            res.setHeader('Content-Type', 'text/html');
            res.send(htmlResponse);

        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('<h1>500 - Internal Server Error</h1><p>Invalid JSON format.</p>');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/list`);
});
