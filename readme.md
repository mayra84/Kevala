## Questions Working Through Problem
    1. Once a duplicate is found, which one is kept? 
        - Currently this is handled by keeping the first one encountered


## Notes
    1. No 3rd party packages were installed to read/write from the CSV. This was intentional as my goal was to achieve this without fast-csv, csv-parser, papaParse, etc 
    2. There are additional CSV files in the repo which were used to test the program 

## How to run the Program
    1. The program is run via the terminal and can be run with any of the 3 following commands: 
        - node /file/path csvPath email
        - node /file/path csvPath phone
        - node /file/path csvPath email_or_phone

    Note: Any deviation from the field arguments will throw an error

## Expected Output
    1. A CSV file without any duplicates on the desired field
        - Available fields to parse on:
            - Email
            - Phone
            - Email or Phone