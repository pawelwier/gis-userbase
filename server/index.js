require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

const db = require('./db/users')

app.use(express.json());
app.use(cors());

app.get('/api/v1/users', async (req, res) => {
    const result = await db.query('select * from users');

    res.status(200).json({
        count: result.rows
    })
})

app.post('/api/v1/users', async (req, res) => {
    try {
        const b = req.body;
        const result = await db.query(`insert into users(first_name, last_name, email,
             voivodeship, powiat, gmina, town, street, postcode, street_number, flat_number) 
             values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *;`,
             [b.firstName, b.lastName, b.email, b.voivodeship, b.powiat, b.gmina, b.town, b.street, b.postcode, b.streetNumber, b.flatNumber || null])
            
            const newId = result.rows[0].id;
            setLongitudeLatitude(b.streetNumber, b.postcode, b.street, b.town, newId);
    } catch (error) {
        console.log(error)
    }
         
})
app.delete('/api/v1/users/:id', async (req, res) => {
    const result = await db.query(`delete from users where id = $1 returning *`, [req.params.id])
    console.log(`${result.rows[0].id} deleted.`)
})

const setLongitudeLatitude = async (streetNumber, postcode, street, town, id) => {

    let latitude, longitude;
    const body = {  "reqs": [
        {
          "pkt_numer": streetNumber,
          "pkt_kodPocztowy": postcode,
          "ul_pelna": street,
          "miejsc_nazwa": town
        }
    ],
    "useExtServiceIfNotFound": true
}
    await axios.post('https://capap.gugik.gov.pl/api/fts/gc/pkt', body).then(result => {
        const coordinates = result.data[0].others ? result.data[0].others[0].geometry.coordinates : result.data[0].single.geometry.coordinates;
        longitude = coordinates[0]
        latitude = coordinates[1]
        db.query('update users set longitude = $1, latitude = $2 where id = $3', [longitude, latitude, id])
    })
}

const port = process.env.PORT || 3005
app.listen(port, () => {
    console.log(`server running on ${port}`)
})