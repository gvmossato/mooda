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
