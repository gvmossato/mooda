# mooda

## Database

* Make migrations

```
npx sequelize-cli migration:generate --name <name>
```

* Apply migrations in deploy

```
heroku run npx sequelize-cli db:migrate -a mood-a
```

## API

### GET

```
https://mood-a.herokuapp.com/api?sensor={{sensor_name}}&startDate={{from}}&endDate={{to}}
```

* `sensor_name`:
    * `luminosity`
    * `temperature`
    * `soilHumidity`
    * `airHumidity`
    * `airQuality`
    * `presence`
    * If not set, returns data for all sensors

* `startDate`:
    * The "from" date
    * If not set, is automatically set to last year from today

* `endtDate`:
    * The "to" date
    * If not set, is automatically set to tomorrow
