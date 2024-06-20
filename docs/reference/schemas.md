# Quick reference: Object schemas

## Quote Object Schema

| Property      | Type     | Required | Description                                           |
|---------------|----------|----------|-------------------------------------------------------|
| id            | integer  | Yes      | Unique identifier for the quote                       |
| author        | string   | Yes      | Author of the quote                                   |
| author_id     | integer  | Yes      | Unique identifier for the author                      |
| work          | string   | Yes      | Title of the work where the quote is from             |
| work_id       | integer  | Yes      | Unique identifier for the work                        |
| genre         | string   | Yes      | Genre of the work                                     |
| publish_date  | string   | Yes      | Publish date of the work                              |
| quote_length  | integer  | Yes      | Length of the quote in characters                     |
| source        | string   | Yes      | Source URL for the quote                              |
| quote         | string   | Yes      | The actual quote text |

## Pagination Object Schema

| Property       | Type     | Required | Description                            |
|----------------|----------|----------|----------------------------------------|
| current_page   | integer  | Yes      | Current page number                    |
| total_pages    | integer  | Yes      | Total number of pages                  |
| total_items    | integer  | Yes      | Total number of items across all pages |


