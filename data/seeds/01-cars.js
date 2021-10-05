// STRETCH
exports.seed = async function (knex){
    await knex('cars').truncate()
    await knex('cars').insert([
        {
            vin: 'testing',
            make: 'ford',
            model: 'f150',
            mileage:100,
            title: 'woo',
            transmission: 'fast'
        }
    ])
}