module.exports = (data) => {
   const today = new Date();
   const day1 = `<tr><td>${data.sevenDaysPeriod[0].time}</td><td>${data.sevenDaysPeriod[0].amount}</td></tr>`
   const day2 = `<tr><td>${data.sevenDaysPeriod[1].time}</td><td>${data.sevenDaysPeriod[1].amount}</td></tr>`
   const day3 = `<tr><td>${data.sevenDaysPeriod[2].time}</td><td>${data.sevenDaysPeriod[2].amount}</td></tr>`
   const day4 = `<tr><td>${data.sevenDaysPeriod[3].time}</td><td>${data.sevenDaysPeriod[3].amount}</td></tr>`
   const day5 = `<tr><td>${data.sevenDaysPeriod[4].time}</td><td>${data.sevenDaysPeriod[4].amount}</td></tr>`
   const day6 = `<tr><td>${data.sevenDaysPeriod[5].time}</td><td>${data.sevenDaysPeriod[5].amount}</td></tr>`
   const day7 = `<tr><td>${data.sevenDaysPeriod[6].time}</td><td>${data.sevenDaysPeriod[6].amount}</td></tr>`
   
   let itemsRow = ``
   data.items.forEach(item => {
      itemsRow = itemsRow.concat(`<tr>
         <td>${item.name}</td>
         <td>${item.rating.oneStar}</td>
         <td>${item.rating.twoStar}</td>
         <td>${item.rating.threeStar}</td>
         <td>${item.rating.fourStar}</td>
         <td>${item.rating.fiveStar}</td>
      </tr>`)
   });

   return `
   <!doctype html>
   <html>
      <head>
         <meta charset="utf-8">
         <title>PDF Report</title>
         <style>
            h1, h2, p {
               margin: auto;
               max-width: 600px;
               color: #3232a8;
               padding:5px;
               width: 100%;
            }
            .table-title h3 {
               color: #fafafa;
               font-size: 30px;
               font-weight: 400;
               font-style:normal;
               font-family: "Roboto", helvetica, arial, sans-serif;
               text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
               text-transform:uppercase;
            }
            .table-fill {
               background: white;
               border-radius:3px;
               border-collapse: collapse;
               height: 320px;
               margin: auto;
               max-width: 600px;
               padding:5px;
               width: 100%;
               box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            }
            th {
               color:#D5DDE5;;
               background:#1b1e24;
               border-bottom:4px solid #9ea7af;
               border-right: 1px solid #343a45;
               font-size:23px;
               font-weight: 100;
               padding:10px;
               text-align:center;
               text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
               vertical-align:middle;
            }
            tr {
               border-top: 1px solid #C1C3D1;
               border-bottom-: 1px solid #C1C3D1;
               color:#000;
               font-size:16px;
               font-weight:normal;
            }
            td {
               background:#FFFFFF;
               padding:10px;
               text-align:center;
               vertical-align:middle;
               font-weight:300;
               font-size:18px;
               border-style: 1px solid #000;
            }
         </style>
      </head>
      <body>
         <h1>Report</h1>
         <p>Created: ${today.toTimeString()}</p>
         <h2>1. Sales</h2>
         <table class="table-fill">
               <thead>
                  <tr>
                     <th class="table-title">Date</th>
                     <th class="table-title">Sales</th>
                  </tr>
               </thead>
               <tbody>
                  ${day1}
                  ${day2}
                  ${day3}
                  ${day4}
                  ${day5}
                  ${day6}
                  ${day7}
               </tbody>
         </table>
         <h2>2. Menu and ratings</h2>
         <table class="table-fill">
               <thead>
                  <tr>
                     <th class="table-title">Name</th>
                     <th class="table-title">Poor</th>
                     <th class="table-title">OK</th>
                     <th class="table-title">Good</th>
                     <th class="table-title">Good+</th>
                     <th class="table-title">Exellent</th>
                  </tr>
               </thead>
               <tbody>
                  ${itemsRow}
               </tbody>
         </table>
      </body>
   </html>
   `;
};