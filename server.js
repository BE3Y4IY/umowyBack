const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

const sequelize = new Sequelize('postgres://postgres:mypassword@localhost:5432/generator_umow', {
  dialect: 'postgres',
  logging: console.log,
});

sequelize.authenticate()
  .then(() => console.log('Connection to database has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const Umowy = sequelize.define('Umowy', {
  handlowiec: { type: DataTypes.STRING, allowNull: true },
  dataPodpisania: { type: DataTypes.DATEONLY, allowNull: true, field: 'data_podpisania' },
  numerUmowy: { type: DataTypes.STRING, allowNull: true, field: 'numer_umowy' },
  imieNazwisko: { type: DataTypes.STRING, allowNull: true, field: 'imie_nazwisko' },
  telefon: { type: DataTypes.STRING, allowNull: true },
  ulica: { type: DataTypes.STRING, allowNull: true },
  miejscowosc: { type: DataTypes.STRING, allowNull: true },
  kodPocztowy: { type: DataTypes.STRING, allowNull: true, field: 'kod_pocztowy' },
  powiat: { type: DataTypes.STRING, allowNull: true },
  wojewodztwo: { type: DataTypes.STRING, allowNull: true },
  rodzajKlienta: { type: DataTypes.STRING, allowNull: true, field: 'rodzaj_klienta' },
  peselNip: { type: DataTypes.STRING, allowNull: true, field: 'pesel_nip' },
  dowod: { type: DataTypes.STRING, allowNull: true },
  tel2: { type: DataTypes.STRING, allowNull: true },
  kontaktowyTel: { type: DataTypes.STRING, allowNull: true, field: 'kontaktowy_tel' },
  email: { type: DataTypes.STRING, allowNull: true },
  operatorOsd: { type: DataTypes.STRING, allowNull: true, field: 'operator_osd' },
  czyWlascicielLicznika: { type: DataTypes.STRING, allowNull: true, field: 'czy_wlasciciel_licznika' },
  adresImie: { type: DataTypes.STRING, allowNull: true, field: 'adres_imie' },
  adresUlica: { type: DataTypes.STRING, allowNull: true, field: 'adres_ulica' },
  adresNrDomu: { type: DataTypes.STRING, allowNull: true, field: 'adres_nr_domu' },
  adresMiejscowosc: { type: DataTypes.STRING, allowNull: true, field: 'adres_miejscowosc' },
  adresKodPocztowy: { type: DataTypes.STRING, allowNull: true, field: 'adres_kod_pocztowy' },
  adresPowiat: { type: DataTypes.STRING, allowNull: true, field: 'adres_powiat' },
  adresWojewodztwo: { type: DataTypes.STRING, allowNull: true, field: 'adres_wojewodztwo' },
  czyPosiadaInstalacje: { type: DataTypes.STRING, allowNull: true, field: 'czy_posiada_instalacje' },
  miejsceInstalacji: { type: DataTypes.STRING, allowNull: true, field: 'miejsce_instalacji' },
  miUlica: { type: DataTypes.STRING, allowNull: true, field: 'mi_ulica' },
  miNrDomu: { type: DataTypes.STRING, allowNull: true, field: 'mi_nr_domu' },
  miMiejscowosc: { type: DataTypes.STRING, allowNull: true, field: 'mi_miejscowosc' },
  miKod: { type: DataTypes.STRING, allowNull: true, field: 'mi_kod' },
  miPowiat: { type: DataTypes.STRING, allowNull: true, field: 'mi_powiat' },
  miWojewodztwo: { type: DataTypes.STRING, allowNull: true, field: 'mi_wojewodztwo' },
  miejsceMontazu: { type: DataTypes.STRING, allowNull: true, field: 'miejsce_montazu' },
  lancuchy: { type: DataTypes.STRING, allowNull: true },
  licznikLokalizacja: { type: DataTypes.STRING, allowNull: true, field: 'licznik_lokalizacja' },
  zasiegInternetu: { type: DataTypes.STRING, allowNull: true, field: 'zasieg_internetu' },
  dwieKreski: { type: DataTypes.STRING, allowNull: true, field: 'dwie_kreski' },
  odgromowa: { type: DataTypes.STRING, allowNull: true },
  numerDzialki: { type: DataTypes.STRING, allowNull: true, field: 'numer_dzialki' },
  mocPrzylaczeniowa: { type: DataTypes.STRING, allowNull: true, field: 'moc_przylaczeniowa' },
  zabezpieczenie: { type: DataTypes.STRING, allowNull: true },
  fazowa: { type: DataTypes.STRING, allowNull: true },
  taryfa: { type: DataTypes.STRING, allowNull: true },
  numerLicznika: { type: DataTypes.STRING, allowNull: true, field: 'numer_licznika' },
  numerPpm: { type: DataTypes.STRING, allowNull: true, field: 'numer_ppm' },
  cenaBrutto: { type: DataTypes.DECIMAL(10, 2), allowNull: true, field: 'cena_brutto' },
  pierwszaWplata: { type: DataTypes.DECIMAL(10, 2), allowNull: true, field: 'pierwsza_wplata' },
  sposobPlatnosci1: { type: DataTypes.STRING, allowNull: true, field: 'sposob_platnosci1' },
  czyJednaWplata: { type: DataTypes.STRING, allowNull: true, field: 'czy_jedna_wplata' },
  drugaWplata: { type: DataTypes.DECIMAL(10, 2), allowNull: true, field: 'druga_wplata' },
  sposobPlatnosci2: { type: DataTypes.STRING, allowNull: true, field: 'sposob_platnosci2' },
  powierzchniaDomu: { type: DataTypes.INTEGER, allowNull: true, field: 'powierzchnia_domu' },
  uwagiHandlowca: { type: DataTypes.TEXT, allowNull: true, field: 'uwagi_handlowca' },
  banerZamontowany: { type: DataTypes.STRING, allowNull: true, field: 'baner_zamontowany' },
  handlowiecWynagrodzenie: { type: DataTypes.STRING, allowNull: true, field: 'handlowiec_wynagrodzenie' },
}, {
  tableName: 'umowy',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(err => console.error('Sync error:', err));

const transformData = (data) => {
  const transformed = { ...data };
  transformed.cenaBrutto = data.cenaBrutto ? parseFloat(data.cenaBrutto) || null : null;
  transformed.pierwszaWplata = data.pierwszaWplata ? parseFloat(data.pierwszaWplata) || null : null;
  transformed.drugaWplata = data.drugaWplata ? parseFloat(data.drugaWplata) || null : null;
  transformed.powierzchniaDomu = data.powierzchniaDomu ? parseInt(data.powierzchniaDomu, 10) || null : null;
  if (data.dataPodpisania && !isNaN(Date.parse(data.dataPodpisania))) {
    transformed.dataPodpisania = data.dataPodpisania;
  } else {
    transformed.dataPodpisania = null;
  }
  return transformed;
};

app.post('/api/umowy', async (req, res) => {
  try {
    console.log('Полученные данные:', req.body);
    const data = transformData(req.body);
    console.log('Преобразованные данные:', data);
    const umowa = await Umowy.create(data);
    res.status(201).json({ message: 'Umowa zapisana', id: umowa.id });
  } catch (error) {
    console.error('Error saving umowa:', error.message, error.stack);
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Сервер API для генерации умов работает!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
