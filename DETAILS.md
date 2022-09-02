# User Paginated App

## Live URL: [link](https://timely-mandazi-9663f1.netlify.app/)

> **Technology tools:**
>
> - HTML, CSS and Typescript
> - Parcel for building and transpilation
> - Random API [link](https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84) with pagination

> #### To run the app on your local computer
>
> - yarn add --dev parcel or npm install --save-dev parcel
> - yarn parcel src/index.html or npx parcel src/index.html
> - open http://localhost:1234 on your browser

> #### To run a production build
>
> - parcel build src/index.html

> #### How does this work
>
> - The app fetches 5 records on page load and displays the page 1 records in the table.
> - Next and previous buttons are used to display forward and backward pages respectively. If the current page is 1, clicking on Next button will fetch and replace the current records with that of the Page 2 and vice-versa.
> - The label beside the buttons shows the current data page.
> - If the current page is 1, the previous button is disabled.
> - The Next button is disabled and the text is set to 'Loading data' once it's clicked as this prevents user from double clicking.
