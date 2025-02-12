Timeseries Data Visualization Project

This project visualizes timeseries data from a JSON file and allows users to interact with and manipulate the data in a table format and on a line chart. The data represents electricity prices from different countries and is shown for different time intervals.


Features
•	Responsive Design: The application adapts to different screen sizes and is user-friendly.
•	Timeseries Data Table: Displays data for Germany, Greece, and France with the ability to filter by date.
•	Line Chart Visualization: Shows a line chart of the timeseries data, updating automatically when the table is edited.
•	Data Filtering: Allows users to filter the data by start and end dates using date pickers.
•	Data Editability: Users can edit the data directly within the table, with validation to ensure that input values are within a valid range.
•	Timeseries Toggle: Users can toggle the visibility of individual timeseries on both the table and the chart using checkboxes.
•	Input Validation: Ensures all input values are within the range of [-2000, 2000] and prompts users with an error message if the input is invalid.


Tech Stack

•	Vue.js: The front-end JavaScript framework used for building the user interface.
•	Vite: A build tool that provides a fast development experience for Vue.js projects.
•	Chart.js: Used for visualizing the timeseries data on a line chart.
•	HTML/CSS: For styling and creating the layout.


Project Structure

timeseries-visualization/
├── .vscode/               # VS Code settings (if applicable)
├── node_modules/          # Installed dependencies
├── public/                # Static assets
│   ├── timeseries.json    # JSON file containing timeseries data
│   ├── vite.svg           # Default Vite logo
├── src/                   # Main application source code
│   ├── assets/            # Additional assets (CSS, images, etc.)
│   ├── components/        # Vue components
│   │   ├── DataTable.vue  # Table component with editable cells and validation
│   │   ├── LineChart.vue  # Line chart component using Chart.js
│   ├── postcss/           # PostCSS configuration
│   ├── App.vue            # Root Vue component
│   ├── main.js            # Vue app entry point
│   ├── style.css          # Global styles
├── .gitignore             # Git ignore file
├── index.html             # HTML entry point
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Package lock file
├── README.md              # Project documentation
├── vite.config.js         # Vite configuration


Usage

•	Filtering Data by Date: Use the date inputs to filter displayed data.
•	Editing Table Values: Click on a table cell to edit values (only valid numbers between -2000 and 2000 are accepted).
•	Showing/Hiding Timeseries: Toggle checkboxes to show or hide specific timeseries on the table and chart.
•	Real-time Chart Updates: The chart updates automatically when valid values are entered in the table.


Validation Rules

•	Only numeric values are allowed.
•	Values must be between -2000 and 2000.
•	If an invalid input is detected, a warning message appears, and the value is not updated.


Customization

•	Modify timeseries.json to include different timeseries data.
•	Change chart colors in LineChart.vue.
•	Adjust styling in style.css.


Dependencies

•	Vue.js: npm install vue@next
•	Chart.js: npm install chart.js
•	Vite: npm install vite