const fs = require('fs');
const path = require('path');

describe('JSON Structure Validation', () => {
  // Replace 'data.json' with the actual path to your JSON file
  const filePath = path.join(__dirname, 'songs.json');

  test('should have a root object with a "songs" array', () => {
    // 1. Check if the file actually exists first
    expect(fs.existsSync(filePath)).toBe(true);

    // 2. Read and parse the JSON file
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    // 3. Validate the exact structural pattern
    expect(jsonData).toMatchObject({
      songs: expect.any(Array)
    });
  });
});