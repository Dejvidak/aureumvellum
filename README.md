# Aureum Vellum

Node.js web chovatelske stanice Aureum Vellum postaveny na Next.js a Payload CMS.
Soucasny verejny web je servirovany jako staticky frontend z `public/`, Payload bezi na stejnem serveru pro admin a API.

## Lokální spuštění

```bash
npm install
npm run dev
```

Web pobezi na `http://127.0.0.1:3000` a Payload administrace na `http://127.0.0.1:3000/admin`.

## Produkční build

```bash
npm run build
npm start
```

## Environment proměnné

Pro produkci nastav:

```bash
DATABASE_URL=file:./payload.db
PAYLOAD_SECRET=dlouhy-nahodny-tajny-retezec
```

`PAYLOAD_SECRET` musi byt vlastni dlouhy nahodny retezec. Bez nej nema smysl poustet Payload admin do produkce.

SQLite je nastavene jako nejjednodussi startovaci databaze. Pro skutecny dlouhodoby CMS provoz je lepsi prejit na externi databazi, typicky MongoDB Atlas nebo Postgres, aby data nebyla zavisla jen na souboru v aplikaci.

## Hostinger nastavení

- Node.js verze: `20.9.0` nebo novejsi
- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm start`
- Build output directory: `.next`
- Entry point: neni potreba vlastni `server.js`, aplikaci startuje `next start`
- Port: Hostinger obvykle doda pres promennou `PORT`, skript `npm start` ji respektuje

Payload admin najdes po nasazeni na:

```text
https://tvoje-domena.cz/admin
```
