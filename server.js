const express = require("express");
const fs = require("fs");
const csvParser = require("csv-parser");
const { Client } = require("pg");
const db = require("./models");
const account = require("./models/account");
const location = require("./models/location");
const contact = require("./models/contact");
const app = express();

app.get("/", async (req, res) => {
  // Create a writable stream to handle CSV parsing
  const csvReadStream = fs.createReadStream("dummy.csv");

  // Use csv-parser to parse the CSV file
  csvReadStream
    .pipe(csvParser())
    .on("data", async (row) => {
      // Check the column headers and insert into the appropriate tables

      if (
        "companyName" in row &&
        "website" in row &&
        "employeeRange" in row &&
        "employeeSize" in row &&
        "revenueRange" in row &&
        "revenue" in row
      ) {
        const table1Id = await insertIntoTable1(row);
        let table2Id;
        if (table1Id) {
          if (
            "address" in row &&
            "city" in row &&
            "state" in row &&
            "country" in row &&
            "phone" in row &&
            "extras" in row
          ) {
            table2Id = await insertIntoTable2(row, table1Id);
          }
          if (table2Id) {
            await insertIntoTable3(row, table1Id, table2Id);
          }
        }
      } else {
        console.log("Invalid row format. Skipping:", row);
      }
    })
    .on("end", () => {
      // Disconnect from PostgreSQL when done
      client.end();
      res.send("Data inserted into the appropriate tables.");
    });
});

async function insertIntoTable1(row) {
  // Insert logic for table 1
  try {
    let object = {
      companyName: row.companyName,
      website: row.website,
      employeeRange: row.employeeRange,
      employeeSize: row.employeeSize,
      revenueRange: row.revenueRange,
      revenue: row.revenue,
    };

    const result = await db.account.create(object);
    console.log("Row inserted into Account Table:", result.rows[0]);
    return result.rows[0].id;
  } catch (err) {
    console.error("Error inserting row into Account Table:", err);
    return null;
  }
}

async function insertIntoTable2(row, table1Id) {
  try {
    const locationObject = {
      address: row.address,
      city: row.city,
      state: row.state,
      country: row.country,
      phone: row.phone,
      extras: row.extras,
      accountId: table1Id,
    };

    const result2 = await db.location.create(locationObject);
    console.log("Row inserted into Location Table", result2.rows[0]);
  } catch (err) {
    console.error("Error inserting row into Location Table", err);
  }
}

async function insertIntoTable3(row, table1Id, table2Id) {
  // Insert logic for table 3 with the foreign key reference to table1
  try {
    const contactObject = {
      employeeName: row.employeeName,
      designation: row.designation,
      department: row.department,
      experience: row.experience,
      accountId: table1Id,
      locationId: table2Id,
    };
    const result2 = await db.contact.create(contactObject);

    console.log("Row inserted into Contact Table", result2.rows[0]);
  } catch (err) {
    console.error("Error inserting row into Contact Table", err);
  }
}

app.listen(9100, () => {
  console.log(`Server is running on http://localhost:9100`);
});
