## Design Document: CrUX Metrics Dashboard

### Project Overview

The goal of this project is to develop a web application that provides a user-friendly interface for displaying Core Web Vitals metrics using the CrUX (Chrome User Experience) Google API. The metrics will be presented in a tabular format, allowing users to compare and analyze the performance of different websites.

### Project Components

#### 1. Frontend

The frontend will be responsible for interacting with the CrUX API, retrieving data, and presenting it in a user-friendly manner. Key components include:

- **Metrics Table:** Displaying key performance metrics for each website in a tabular format.

- **Filtering Options:** Allow users to filter data based on different metrics such as TTFB, CLS, etc.

- **Sorting:** Enable users to sort the table based on different metrics to identify trends easily.

- **Improvements:** Use extemely helpful google docs to improvise on some of the metrics trends to enhance the performance of the website over time.

#### 2. Backend

The backend will handle API requests to the CrUX API, caching data for improved performance, and potentially implementing additional features like user authentication and authorization.

- **CrUX API Integration:** Implement logic to interact with the CrUX API and retrieve performance metrics data.

- **Error Handling:** Cache API responses to reduce load times and improve application performance.

- **Creating Wrapper APIs:** The original CrUX API sometimes have a tendency to provide the different metrics in an unsorted manner. So Implement a wrapper on top of these APIs, that will provide frontend, a stable format of data. Also, in proper format of milliseconds.

### Technology Stack

#### Frontend

- **Framework:** React.js, Typescript and Vite for App Scaffolding
- **State Management:** Context API
- **Styling:** Material-UI for a consistent and modern design
- **Data Fetching:** Axios or Fetch API

#### Backend

- **Framework:** Node.js with Express (or any other suitable framework)
- **Error Handling:** Express JS (optional)
- **Data Caching:** Browser or in-memory caching (optional) (bonus)

#### Deployment

- **Current App Deployment:** This application is currently to be published as a Private Repository on Github. But below strategies can be deployed for an effective deployment of this application segregated into backend and frontend repositories separately, into different hosting servers.
- **Frontend Deployment:** Netlify, Vercel, or any suitable static site hosting service ().
- **Backend Deployment:** Heroku, AWS, or any other server hosting service.

### Project Structure

#### Frontend Structure

- **src**
  - **assets:** Assets such as Images, SVGs
  - **components:** Reusable UI components.
  - **hooks:** React custom hooks that are used across different components of App.
  - **utils:** Utility functions.
  - **App.tsx:** Entry point component for the Frontend application

#### Backend Structure

- **src**
  - **index.js:** Handling API requests and responses.

### User Flow

1. **User accesses the application:**

   - Users navigate to the application and are presented with a clean, intuitive dashboard.

2. **User interacts with the Metrics Table:**

   - Users can filter metrics based on different criteria (URL, device type, time range).
   - Sorting options allow users to identify trends easily.

3. **Data Visualization & Improvments:**

   - Data is presented for each website, to the users in different colors, such as Danger(Red), Needs Improvement(Orange) and Performant(Green), to help users analyze quickly which metrics are good performing and which needs improvment.

4. **Metrics Improvments:**
   - Google Docs links are provided to the users to improve upon certain metrics that are falling below the minimum thresholds.

### USER TEST CASES

Run the app, and have the following scenarios tested out:

1. **Search for a single valid URL** in the SearchBar and test if data is shown in the table.

2. For a valid URL, after searching, see that a **filter with list of available metrics is available to user for selection**.

3. Based upon the metrics selected in the Filter, test that **only the corresponding columns of metrics get to be shown** in the table.

4. **Search for multiple valid URLs** and verify that the data for all the URLs (valid), are displayed to the user.

5. **Enter a random string as an invalid URL in the SearchBar**. Then verify that the **error message is shown below the SearchBar**, depicting the user that the entered string is not a valid url.

6. Now **enter a non-existent URL in the valid format**, and hit Search btn. Verify that instead, a **warning message is displayed depicting that no data was found for the URL** that the user has entered.

7. For valid data inside of the table, verify that the **Sorting Feature** is applied to all the metrics column of the Table data.

8. For better visualisation, display all the metrics numbers in 3 categories, depicting, **Good performant (Green), Needs improvement (Orange) and Poor (Red)**.

9. Also help the user in **suggesting how to improve their metrics for the metrics below threshold**. For that, user should be able to click on the number, which should **redirect him to the Google official doc for improvising on those metrics**.

10. Verify that the **Metrics Filter is a multi-select dropdown**. And updates the value selected in the Select Field, upon any modifications in selection.

11. Verify that the **Metrics Filter is successfully filtering the columns** to be displayed in the table.

### Potential Features (Future Enhancements)

- **User Authentication:** Secure the application and allow users to save preferences.
- **Historical Data:** Display historical trends for performance metrics.
- **Customizable Dashboards:** Allow users to create personalized dashboards.

### Conclusion

This design document provides an overview of the frontend project, outlining the key components, technology stack, project structure, and user flow. The application aims to present CrUX metrics in a user-friendly manner, facilitating easy analysis and comparison of website performance.
