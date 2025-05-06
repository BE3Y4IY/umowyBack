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
  dataPodpisania: { type: DataTypes.DATEONLY, allowNull: true },
  numerUmowy: { type: DataTypes.STRING, allowNull: true },
  imieNazwisko: { type: DataTypes.STRING, allowNull: true },
  telefon: { type: DataTypes.STRING, allowNull: true },
  ulica: { type: DataTypes.STRING, allowNull: true },
  miejscowosc: { type: DataTypes.STRING, allowNull: true },
  kodPocztowy: { type: DataTypes.STRING, allowNull: true },
  powiat: { type: DataTypes.STRING, allowNull: true },
  wojewodztwo: { type: DataTypes.STRING, allowNull: true },
  rodzajKlienta: { type: DataTypes.STRING, allowNull: true },
  peselNip: { type: DataTypes.STRING, allowNull: true },
  dowod: { type: DataTypes.STRING, allowNull: true },
  tel2: { type: DataTypes.STRING, allowNull: true },
  kontaktowyTel: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: true },
  operatorOsd: { type: DataTypes.STRING, allowNull: true },
  czyWlascicielLicznika: { type: DataTypes.STRING, allowNull: true },
  adresImie: { type: DataTypes.STRING, allowNull: true },
  adresUlica: { type: DataTypes.STRING, allowNull: true },
  adresNrDomu: { type: DataTypes.STRING, allowNull: true },
  adresMiejscowosc: { type: DataTypes.STRING, allowNull: true },
  adresKodPocztowy: { type: DataTypes.STRING, allowNull: true },
  adresPowiat: { type: DataTypes.STRING, allowNull: true },
  adresWojewodztwo: { type: DataTypes.STRING, allowNull: true },
  czyPosiadaInstalacje: { type: DataTypes.STRING, allowNull: true },
  miejsceInstalacji: { type: DataTypes.STRING, allowNull: true },
  miUlica: { type: DataTypes.STRING, allowNull: true },
  miNrDomu: { type: DataTypes.STRING, allowNull: true },
  miMiejscowosc: { type: DataTypes.STRING, allowNull: true },
  miKod: { type: DataTypes.STRING, allowNull: true },
  miPowiat: { type: DataTypes.STRING, allowNull: true },
  miWojewodztwo: { type: DataTypes.STRING, allowNull: true },
  miejsceMontazu: { type: DataTypes.STRING, allowNull: true },
  lancuchy: { type: DataTypes.STRING, allowNull: true },
  licznikLokalizacja: { type: DataTypes.STRING, allowNull: true },
  zasiegInternetu: { type: DataTypes.STRING, allowNull: true },
  dwieKreski: { type: DataTypes.STRING, allowNull: true },
  odgromowa: { type: DataTypes.STRING, allowNull: true },
  numerDzialki: { type: DataTypes.STRING, allowNull: true },
  mocPrzylaczeniowa: { type: DataTypes.STRING, allowNull: true },
  zabezpieczenie: { type: DataTypes.STRING, allowNull: true },
  fazowa: { type: DataTypes.STRING, allowNull: true },
  taryfa: { type: DataTypes.STRING, allowNull: true },
  numerLicznika: { type: DataTypes.STRING, allowNull: true },
  numerPpm: { type: DataTypes.STRING, allowNull: true },
  cenaBrutto: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  pierwszaWplata: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  sposobPlatnosci1: { type: DataTypes.STRING, allowNull: true },
  czyJednaWplata: { type: DataTypes.STRING, allowNull: true },
  drugaWplata: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  sposobPlatnosci2: { type: DataTypes.STRING, allowNull: true },
  powierzchniaDomu: { type: DataTypes.INTEGER, allowNull: true },
  uwagiHandlowca: { type: DataTypes.TEXT, allowNull: true },
  banerZamontowany: { type: DataTypes.STRING, allowNull: true },
  handlowiecWynagrodzenie: { type: DataTypes.STRING, allowNull: true },
  created_at: { type: DataTypes.DATE, allowNull: true },
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

// Добавление обработчика для GET-запросов на корневой путь '/'
app.get('/', (req, res) => {
  res.send('Сервер API для генерации умов работает!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});