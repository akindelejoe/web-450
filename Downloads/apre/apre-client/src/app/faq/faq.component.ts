import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  template: `
     <div class="faq">
      <h2 class="faq__title">Frequently Asked Questions</h2>
      <p class="faq__description">Below are some common questions about using the Report Tool application.</p>

      <div class="faq__cards">
        <div class="card faq__card">
          <div class="card__header faq__card-header">What does the Report Tool do?</div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">The Report Tool helps users view, analyze, and export key performance and sales data.
          It provides insights into regional sales trends, agent performance, and customer feedback
          to support better business decisions.</p>
          </div>
        </div>

        <div class="card faq__card">
          <div class="card__header faq__card-header">How do I generate a report</div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">Navigate to the “Reports” section, select your desired filters (such as date range,
          region, or product category), and click <strong>Generate Report</strong>. You can then
          view the report on screen or export it as a PDF or Excel file.</p>
          </div>
        </div>

        <div class="card faq__card">
          <div class="card__header faq__card-header">Can I export my reports?</div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">Yes. Reports can be exported in multiple formats, including PDF, CSV, and Excel. Look for
          the <strong>Export</strong> button at the top-right corner of the report view.</p>
          </div>
        </div>

        <div class="card faq__card">
          <div class="card__header faq__card-header"></div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">The system automatically syncs new data every 24 hours. However, administrators can trigger
          a manual data refresh if needed by using the <strong>Sync Data</strong> option in the
          admin dashboard.</p>
          </div>
        </div>

        <div class="card faq__card">
          <div class="card__header faq__card-header">What should I do if I notice incorrect data?</div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">If you find incorrect data, go to the <strong>Support</strong> tab and submit a ticket with
          the report name, date, and details of the issue. The admin team will review and correct it
          promptly.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .faq {
      padding: 20px;
      font-family: 'Roboto', sans-serif; /* Use global font */
      color: #333; /* Default text color */
    }

    .faq__title {
      color: #20c997; /* Match card header background color */
    }

    .faq__description {
      margin-bottom: 20px;
    }

    .faq__cards {
      display: flex;
      gap: 20px;
      flex-wrap: wrap; /* Ensure cards wrap on smaller screens */
    }

    .faq__card {
      flex: 1 1 calc(50% - 20px); /* Two cards per row with a gap of 20px */
      margin-bottom: 20px;
    }

    .faq__card-header {
      background-color: #20c997; /* Match card header background color */
      color: white;
      padding: 15px;
      font-size: 1.25em;
    }

    .faq__card-body {
      padding: 15px;
    }

    .faq__card-content {
      margin: 10px 0;
    }
  `
})
export class FaqComponent {

}
